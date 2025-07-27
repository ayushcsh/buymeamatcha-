import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sessionwrapper from "@/components/sessionwrapper";

import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a Matcha",
  description: "this website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Sessionwrapper>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} > 
        <Navbar/>
        {children}
        
      </body>
      </Sessionwrapper>
    </html>
  );
}
