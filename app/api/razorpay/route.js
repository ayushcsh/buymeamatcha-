import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment"; // Corrected import name to match standard convention
import User from "@/models/user";
import connectDB from "@/db/connectDB";
import { revalidatePath } from "next/cache";

const buildRedirectUrl = (req, pathname, searchParams = {}) => {
    const baseUrl = req.nextUrl.origin || process.env.NEXTAUTH_URL;
    const url = new URL(pathname, baseUrl);

    Object.entries(searchParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    return url;
};

export const GET = async (req) => {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
};

export const POST = async (req) => {
    let body = {};

    try {
        const formData = await req.formData();
        body = Object.fromEntries(formData);
    } catch (error) {
        console.error("RAZORPAY CALLBACK ERROR: Unable to read callback request.", error);
        return NextResponse.json(
            { success: false, message: "Invalid payment callback request" },
            { status: 400 }
        );
    }

    // --- LOGS FOR DEBUGGING ---
    console.log("--- RAZORPAY API ROUTE START ---");
    console.log("Received Body:", body);
    // -------------------------

    // 1. Get the payment details from Razorpay's request
    const razorpay_order_id = body.razorpay_order_id;
    const razorpay_payment_id = body.razorpay_payment_id;
    const razorpay_signature = body.razorpay_signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        console.error("RAZORPAY CALLBACK ERROR: Missing payment verification fields.", body);
        return NextResponse.json(
            { success: false, message: "Missing payment verification fields" },
            { status: 400 }
        );
    }

    try {
        await connectDB();

        // 2. Find the payment document in your database using the order ID
        let p = await Payment.findOne({ oid: razorpay_order_id });
        if (!p) {
            console.error("DATABASE ERROR: Payment record not found for order ID:", razorpay_order_id);
            return NextResponse.json({ success: false, message: "Order ID not found" }, { status: 404 });
        }
        console.log("Found payment document in DB:", p);

        // 3. Find the user who is being paid to get their secret key
        let user = await User.findOne({ username: p.to_user });
        if (!user || !user.razorpaysecret) {
            console.error("DATABASE ERROR: User not found or missing Razorpay secret for user:", p.to_user);
            return NextResponse.json({ success: false, message: "User configuration error" }, { status: 500 });
        }
        const secret = user.razorpaysecret;
        console.log("Found user in DB and got their secret key.");

        // 4. Verify the payment signature to ensure it's a real payment
        const isVerified = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            secret
        );
        console.log("SIGNATURE VERIFICATION RESULT:", isVerified); // <<< THIS IS THE MOST IMPORTANT LOG

        // 5. If verification fails, stop and do not update the database
        if (!isVerified) {
            console.error("CRITICAL ERROR: Payment signature is NOT valid.");
            // For debugging, we can still redirect, but ideally, we should just show an error
            return NextResponse.redirect(
                buildRedirectUrl(req, `/${p.to_user}`, {
                    paymentdone: "false",
                    error: "verification_failed",
                }),
                { status: 303 }
            );
        }

        // 6. If verification SUCCEEDS, update the payment status to "done"
        console.log("Signature is valid. Updating payment status in DB...");
        await Payment.findOneAndUpdate({ oid: razorpay_order_id }, { done: true });
        console.log("Database update complete.");


        revalidatePath(`/${p.to_user}`);

        // 7. Redirect the user back to the profile page with a success message
        const redirectUrl = buildRedirectUrl(req, `/${p.to_user}`, { paymentdone: "true" });
        console.log("Redirecting to:", redirectUrl);
        
        return NextResponse.redirect(redirectUrl, { status: 303 });
    } catch (error) {
        console.error("RAZORPAY CALLBACK ERROR: Unable to complete payment callback.", error);
        return NextResponse.json(
            { success: false, message: "Unable to complete payment callback" },
            { status: 500 }
        );
    }
}
