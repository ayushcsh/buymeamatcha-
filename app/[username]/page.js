// This is a SERVER Component. There is NO 'use client' here.
import React from 'react';
import connectDB from '@/db/connectDB';
import User from '@/models/user';
import Payment from '@/models/payment'; // Make sure you have a Payment model
import { notFound } from 'next/navigation';
import Paymentpage from '@/components/paymentpage'; // Your Client Component

const UsernamePage = async ({ params }) => {
    // 1. THIS CODE RUNS ON THE SERVER
    await connectDB();
    const currentUser = await User.findOne({ username: params.username }).lean();

    // 2. If the user is not found in the database, call notFound().
    // This will immediately stop and show your 404 page.
    if (!currentUser) {
        return notFound();
    }

    const payments = await Payment.find({ to_user: params.username, done: true }).sort({ createdAt: -1 }).lean();

    // 3. If the user IS found, render the CLIENT component and pass the data as props.
    return (
        <Paymentpage 
            username={params.username}
            currentUser={JSON.parse(JSON.stringify(currentUser))}
            initialPayments={JSON.parse(JSON.stringify(payments))}
        />
    );
};

export default UsernamePage;

export async function generateMetadata({ params }) {
    return {
        title: `${params.username} - Buy Me A Matcha`,
        description: 'Support your favorite creators by sending them a matcha!',
    };
}