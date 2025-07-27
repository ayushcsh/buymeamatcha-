import React from 'react'
import Footer from '@/components/footer'

const page = () => {
    return (
        <div className="flex flex-col items-center mt-[10px] md:mt-[100px] max-h-screen text-center p-4 w-[80vw] md:w-[60vw] mx-auto">
            <h1 className="font-circular text-4xl md:text-5xl font-bold ">Wall of  <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 63 58"
                fill="none"
                className="w-15 h-15 inline-block translate-x-1 md:translate-y-[-8px]"
                
            >
            
                <path
                    d="M31.5 56.9062C31.0208 56.9062 30.4583 56.7396 29.8125 56.4062C29.1667 56.0938 28.5417 55.7292 27.9375 55.3125C22.4792 51.7708 17.7292 48.0417 13.6875 44.125C9.64583 40.1875 6.51042 36.1458 4.28125 32C2.05208 27.8542 0.9375 23.6562 0.9375 19.4062C0.9375 16.5521 1.39583 13.9583 2.3125 11.625C3.22917 9.27083 4.5 7.23958 6.125 5.53125C7.75 3.82292 9.61458 2.51042 11.7188 1.59375C13.8438 0.677083 16.1042 0.21875 18.5 0.21875C21.5208 0.21875 24.1146 0.979167 26.2812 2.5C28.4688 4 30.2083 5.95833 31.5 8.375C32.8125 5.95833 34.5521 4 36.7188 2.5C38.8854 0.979167 41.4688 0.21875 44.4688 0.21875C46.8854 0.21875 49.1458 0.677083 51.25 1.59375C53.375 2.51042 55.25 3.82292 56.875 5.53125C58.5 7.23958 59.7604 9.27083 60.6562 11.625C61.5729 13.9583 62.0312 16.5521 62.0312 19.4062C62.0312 23.6562 60.9167 27.8542 58.6875 32C56.4792 36.1458 53.3542 40.1875 49.3125 44.125C45.2708 48.0417 40.5208 51.7708 35.0625 55.3125C34.4375 55.7292 33.8021 56.0938 33.1562 56.4062C32.5104 56.7396 31.9583 56.9062 31.5 56.9062Z"
                    fill="#85A662"
                />
            </svg>
            <h1>Love</h1>
            </h1>
            <p className='font-circular text-lg text-gray-700 mt-[30px]'>Buy Me a Matcha has been quietly brewing since 2025 — created with warmth, honesty, and a whole lot of green. In this short time, we’ve connected creators and supporters in a calmer, cozier way. Here’s what the internet has been saying about us recently: “Minimal. Peaceful. And it actually feels like someone cares.” “This is the first time I felt like tipping wasn’t awkward.” “Buy Me a Matcha feels like sending love, not just money.” Want to be featured on our Wall of Love? Share your experience with the hashtag #buymeamatcha on Instagram or Twitter. Behind it all is Ayush — a creator and coder who built this space to make the internet feel more human. What started as a small passion project is now a growing movement of soft support and sincere connection. </p>

        </div>

    )
}

export default page

export const metadata = {
    title: 'Wall of Love - Buy Me A Matcha',
}

