import React from 'react'
import Footer from '@/components/footer'

const resources = () => {

    return (
        <>
        <div className='mb-[20px] '>
            <div className='flex flex-col items-center  mt-[10px] md:mt-[60px] min-h-screen text-center p-4 w-[60vw] mx-auto mb-[20px]'>
                <h1 className='md:text-4xl text-2xl font-bold font-circular mb-[20px] text-[#576d40]'>Need Assistance?</h1>

                <h1 className='md:text-2xl text-xl font-bold font-circular mb-[10px] mt-[10px]'>Getting Started</h1>
                <div className='mb-[10px] h-[43vh] w-[80vw] md:h-[35vh] md:w-[60vw] bg-white rounded-[20px] p-4 shadow-md text-[16px] md:text-[20px] font-circular flex flex-col justify-center items-center'>
                    <p>New to Matcha? Here’s how to set up your page, share your link, and start receiving love.</p>
                    <ul className="list-none pl-5 space-y-2 text-sm text-gray-700 list-normal mt-[15px]">
                        <li>🎉 <strong>Create your Matcha page</strong> — it takes less than 2 minutes!</li>
                        <li>🔗 <strong>Personalize your link</strong> to match your vibe and brand.</li>
                        <li>💳 <strong>Connect your payment method</strong> securely and start receiving support.</li>
                        <li>📤 <strong>Share your page</strong> on Instagram, Twitter, or your bio to let people know.</li>
                        <li>💡 <strong>Set a goal</strong> to give your supporters a reason to chip in (like a new mic or coffee fund!).</li>
                    </ul>
                </div>

                <div className='mb-[10px] mt-[20px]'>
                    <h2 className="md:text-2xl text-xl font-bold text-black-900 mb-2">Creator Toolkit</h2>
                    <div className="text-center  mb-[10px] h-[33vh] w-[80vw] md:h-[35vh] md:w-[60vw] bg-white rounded-[20px] p-4 shadow-md text-[16px] md:text-[20px] font-circular flex flex-col justify-center items-center">

                        <p className="text-gray-700 mb-6">Resources to make your Matcha link pop!</p>

                        <ul className="list-none space-y-3 text-sm text-gray-700">
                            <li>🖼️ <strong>Templates</strong> to make your page visually stunning</li>
                            <li>📢 <strong>Banners</strong> and graphics for promoting your page</li>
                            <li>📱 <strong>Social media ideas</strong> to boost engagement</li>
                            <li>🧠 <strong>Content tips</strong> to keep your supporters coming back</li>
                        </ul>
                    </div>

                </div>

                <div className='mb-[10px] mt-[20px]'>
                    <h2 className="md:text-2xl text-xl font-bold text-black-900 mb-2">Grow Your Support</h2>
                    <div className="text-center h-[33vh] w-[80vw] md:h-[35vh] md:w-[60vw] bg-white rounded-[20px] p-4 shadow-md text-[16px] md:text-[20px] font-circular flex flex-col justify-center items-center">

                        <p className="text-gray-700 mb-6">Help creators increase visibility and support:</p>

                        <ul className="list-none space-y-3 text-sm text-gray-700">
                            <li>🤝 How to ask for support without being pushy</li>
                            <li>💌 Ways to thank your supporters</li>
                            <li>🌟 Success stories of other creators</li>
                            <li>➡️ <strong>&quot;Turn casual followers into loyal supporters.&quot;</strong></li>

                        </ul>
                    </div>
                </div>

                <div className='mb-[10px] mt-[20px]'>
                    <h2 className="md:text-2xl text-xl font-bold text-black-900 mb-2">Payments & Fees</h2>
                    <div className="text-center h-[33vh] w-[80vw] md:h-[35vh] md:w-[60vw] bg-white rounded-[20px] p-4 shadow-md text-[16px] md:text-[20px] font-circular flex flex-col justify-center items-center">
                        <p className="text-gray-700 mb-6">Understand how payments and fees work:</p>

                        <ul className="list-none space-y-3 text-sm text-gray-700">
                            <li>💳 Payment methods your supporters can use</li>
                            <li>🔍 Transparent breakdown of transaction fees</li>
                            <li>📈 How we ensure fast & secure payouts</li>
                            <li>💸 No hidden charges – what you see is what you get</li>
                        </ul>
                    </div>
                </div>

                <div className='mb-[10px] mt-[20px] '>
                    <h2 className="md:text-2xl text-xl font-bold text-black-900 mb-2">Privacy & Security</h2>
                    <div className="text-center h-[25vh] w-[80vw] md:h-[35vh] md:w-[60vw] bg-white rounded-[20px] p-4 shadow-md text-[16px] md:text-[20px] font-circular flex flex-col justify-center items-center">
                        <p className="text-gray-700 mb-6">How we keep your data safe and secure:</p>

                        <ul className="list-none space-y-3 text-sm text-gray-700">
                            <li>🔐 End-to-end encryption for sensitive data</li>
                            <li>🧑‍⚖️ GDPR & data compliance ready</li>
                            <li>👁️‍🗨️ Full control over your privacy settings</li>
                            <li>🚨 Regular security audits & updates</li>
                        </ul>
                    </div>
                </div>


            </div>

        </div>

        <Footer />
        
          
            </>
    )
}

export default resources

export async function generateMetadata() {
    return {
        title: 'Resources - Buy Me A Matcha',
        description: 'Find resources to help you get started with Buy Me A Matcha, including guides, templates, and tips for creators.',
    };
}
