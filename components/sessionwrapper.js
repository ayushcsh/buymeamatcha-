'use client'
import { SessionProvider } from "next-auth/react"

export default function sessionwrapper({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}