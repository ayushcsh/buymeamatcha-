import mongoose from "mongoose";

// This object will hold our connection state to prevent multiple connections.
const connection = {};

const connectDB = async () => {
    // 1. If we are already connected, exit the function.
    if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    // 2. If we are NOT connected, try to connect.
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        
        // 3. Update our connection state object.
        connection.isConnected = db.connections[0].readyState;
        
        console.log("New database connection established.");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;