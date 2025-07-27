'use server'
import Razorpay from "razorpay"
import payment from "@/models/payment"
import connectDB from "@/db/connectDB"
import mongoose from "mongoose"
import User from "@/models/user"

export const createorder = async(amount , to_username , payment_form) =>{
    await connectDB();

     // fetch the razorpay instance which user to be paid
        let user = await User.findOne({ username: to_username });
        const secret = user.razorpaysecret
        const id = user.razorpayid // Use the Razorpay ID from the user document

    var instance = new Razorpay({
        key_id:  id, // Use the Razorpay ID from the user document
        key_secret: secret // Use the Razorpay secret from the user document
    })
    const options = {
        amount : Number.parseInt(amount),
        currency: "INR",
    }

    const order = await instance.orders.create(options);
    // create a pending payment in the database 

    await payment.create({
        amount: amount/100,
        oid : order.id, 
        to_user: to_username,
        name: payment_form.name,
        message: payment_form.message
    })

    return order;
}


export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username }).lean(); // Use lean() to return plain objects
    if (!u) {
        throw new Error(`User with username ${username} not found`);
    }
    u._id = u._id.toString(); // Convert _id to string
    return u; // Return plain object directly
};

export const fetchpayment = async (username) => {
    await connectDB();
    const payments = await payment.find({ to_user: username , done : true }).sort({ amount: -1 }).limit(10).lean(); // Use lean() for plain objects
    return payments;
};


export const updateprofile = async(data , oldusername)=>{
    await connectDB();
    let ndata = data;
    // Update the user profile in the database
    let u = await User.findOne({username: oldusername});
    // Check if the user exists
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username});
        if(u){
            return { error: "Username already exists" };
        }

        await User.updateOne({email: ndata.email} , ndata);
        // Update the username in all payments made by the user
        await payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });

    }
    else{
        await User.updateOne({email: ndata.email} , ndata);
    }
    
    
    
};
