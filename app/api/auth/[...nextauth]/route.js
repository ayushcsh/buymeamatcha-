import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose, { connect } from 'mongoose'
import User from '@/models/user'
import connectDB from '@/db/connectDB'

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    
     if(account.provider == 'github'){
      await connectDB();
      //connect to the database 
      const client = await mongoose.connect("mongodb://localhost:27017/buymeamatcha");
      // check if user is exist or not if exist we do nothing but if not so we create a new schema 
      const currentuser = await User.findOne({email: user.email})
      if(!currentuser){
         const newuser = new User({
          email : user.email,
          name : user.name,
          username : user.name.split(" ")[0],
         
        })
        await newuser.save();
        user.name = user.name;      
      }
      else{
        user.name = currentuser.name;
      }
      return true; 
     }
  },

  // want to fetch session.user.username
  async session({ session, token, user }) {
    await connectDB();

    if (!session.user.email) {
      console.error("Email is missing in session.user. Check authentication provider.");
      session.user.email = token.email || user.email; // Fallback to token or user email
    }

    const dbUser = await User.findOne({ email: session.user.email });
    if (dbUser) {
      session.user.username = dbUser.username; // Add username to session
    } else {
      session.user.username = user.name.split(" ")[0]; // Fallback to first name if not found in DB
    }

    return session;
  }
}

})

export { handler as GET , handler as POST}