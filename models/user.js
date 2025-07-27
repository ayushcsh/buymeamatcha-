import mongoose from "mongoose";

const {Schema , model} = mongoose;

const Userschema = new Schema({
    name: { type : String , required: true},
    email: {type : String , required: true},
    username: {type : String , required: true},
    profileimage: {type : String },
    coverimage: {type : String },
    razorpayid: {type : String },
    razorpaysecret: {type: String }, 
})

export default mongoose.models.User || model("User", Userschema); ; 