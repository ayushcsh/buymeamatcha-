'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({ error, reset }) {
  useEffect(() => {
    // You can log the error to an error reporting service here
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
        <Image
          src="/error-icon.svg" // Make sure to have an error icon in your public folder
          alt="Error"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Oops, Something Went Wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. We&#39;ve been notified and are working to fix it. Please try again later.
        </p>

        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-[#85A662] text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#85A662]"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}