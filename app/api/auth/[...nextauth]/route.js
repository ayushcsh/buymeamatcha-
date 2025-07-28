import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/user'
import connectDB from '@/db/connectDB'

const handler = NextAuth({
  providers: [
    // Your GitHub provider configuration
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    // This function runs when a user tries to sign in
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        // Connect to your production database on Atlas
        await connectDB();

        // Check if the user already exists in your database
        const currentUser = await User.findOne({ email: user.email });

        // If the user doesn't exist, create a new one
        if (!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split('@')[0], // Create a username from the email
            name: user.name,
            profileimage: user.image, // Save the profile image from GitHub
            coverimage: '', // You can set a default cover image here if you want
          });
        }

        // Allow the sign-in to proceed
        return true;
      }
      // By default, deny sign-in for other providers if you haven't configured them
      return false;
    },

    // This function runs to create the session object
    async session({ session, user, token }) {
      // Find the user in your database to get their username
      const dbUser = await User.findOne({ email: session.user.email });
      
      // Add the username from your database to the session object
      if (dbUser) {
        session.user.username = dbUser.username;
      }
      
      // Return the modified session object
      return session;
    }
  }
});

export { handler as GET, handler as POST };