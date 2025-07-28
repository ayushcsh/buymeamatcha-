import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import payment from "@/models/payment";
import connectDB from "@/db/connectDB";
import User from "@/models/user";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);
    


    // check if razorpay signature is valid
    let p = await payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ error: "hiiiiiiii", body, oid: body.razorpay_order_id }, { status: 404 });
    }

    // fetch the razorpay instance which user to be paid
    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret // Use user's secret or fallback to env variable


    // verify the payment signature
    const isvalid = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret);

    if (!isvalid) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }
    else {
        // update the payment status 
        const update = await payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true });
        
        // Get the base URL with proper fallback
        const baseUrl = process.env.NEXTAUTH_URL_INTERNAL || process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
        const redirectUrl = `${baseUrl}/${p.to_user}?paymentdone=true`;
        
        // Validate URL before redirecting
        try {
            new URL(redirectUrl);
            return NextResponse.redirect(redirectUrl);
        } catch (error) {
            console.error('Invalid redirect URL:', redirectUrl, error);
            // Fallback to a safe redirect
            return NextResponse.redirect(`/${p.to_user}?paymentdone=true`);
        }
    }
}