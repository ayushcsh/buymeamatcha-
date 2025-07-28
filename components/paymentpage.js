'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { createorder } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
import { fetchuser, fetchpayment } from '@/actions/useractions'
import { ToastContainer, Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Paymentpage = ({ username }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({ name: '', message: '', amount: '' });
    const [currentuser, setcurrentuser] = useState({});
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams();


    useEffect(() => {
        if (!username) return;
        getdata();
    }, [username]);

    // In Paymentpage.js, add this code block

    useEffect(() => {
        // 1. Check if the URL says the payment was done
        if (searchParams.get("paymentdone")) {

            // 2. Show a "Payment Successful!" pop-up message
            toast('Payment Successful!', {
                position: "top-right",
                autoClose: 5000,
                // ... other toast options
            });

            // 3. THIS IS THE MOST IMPORTANT LINE:
            // It tells Next.js to get the new, updated list of payments from your database.
            router.refresh();

            // 4. (Optional but good) Clean up the URL
            const url = new URL(window.location);
            url.searchParams.delete('paymentdone');
            router.replace(url.toString(), { scroll: false });
        }
    }, [searchParams, router]); // Dependency array is very important



    const handlechange = (e) => {
        setPaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })

    }



    const getdata = async () => {
        // Fetch data from an API or perform any asynchronous operation
        let u = await fetchuser(username);
        setcurrentuser(u);
        let dbpayments = await fetchpayment(username);
        setpayments(dbpayments);
        console.log(dbpayments, u);

        console.log("--- getdata() FINISHED ---");
        console.log("Payments received from server:", dbpayments);
        console.log("Payments received from server:", payments);
    }


    const pay = async (amount) => {
        // alert(`This payment is being started from: ${window.location.origin}`);
        // create a razorpay order
        let order = await createorder(amount, username, paymentform);
        let order_id = order.id;
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits.
            "currency": "INR",
            "name": "Buy me a Matcha", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": typeof window !== "undefined" ? `${window.location.origin}/api/razorpay` : "",//This is the URL where you want to redirect after payment
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new window.Razorpay(options);

        rzp1.open();



    }
    return (
        <>
            <ToastContainer
                progressClassName="custom-progress-bar"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />


            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='h-[35vh] md:h-[60vh]  w-full mt-[30px] relative'>
                <div className='absolute top-0 left-0 w-full  h-[35vh] md:h-[65vh]'>
                    {currentuser.coverimage && currentuser.coverimage.startsWith('http') ? (
                        <Image className='object-cover flex justify-center' src={currentuser.coverimage} alt='bg-image error please use secure link' quality={100} priority fill />
                    ) : (
                        <Image className='object-cover flex justify-center' src='/placeholder-cover.jpg' alt='bg image error please use secure link' quality={100} priority fill />
                    )}
                </div>
                <div className='absolute bottom-0 left-[34%] md:left-[46%] translate-y-[55%]'>
                    {currentuser.profileimage && currentuser.profileimage.startsWith('http') ? (
                        <Image className='rounded-full object-cover' src={currentuser.profileimage} alt='profile-image' width={130} height={130} style={{ width: '130px', height: '130px' }} />
                    ) : (
                        <Image className='rounded-full object-cover justify-center flex' src='/placeholder-profile.jpg' alt='placeholder-profile-image' width={130} height={130} style={{ width: '130px', height: '130px' }} />
                    )}
                </div>
            </div>

            <div className=' flex mt-[70px] flex-col justify-center items-center'>
                <div className='flex  '>
                    <h1 className='font-bold text-[23px]'>{`@${username}`}</h1>
                </div>
                <div className='flex '>
                    <p className='text-gray-800'>buy me a Matcha</p>
                </div>
                <div className='flex list-none gap-3 '>
                    {/* // calculate alll money recieved */}
                    <li className='text-gray-800'>₹{payments.reduce((acc, payment) => acc + payment.amount, 0)} raised</li>
                    <li className='text-gray-800'>{payments.length} payments</li>
                </div>
            </div>

            <div className='thisis flex flex-col md:flex-row justify-center items-center w-[90%] md:w-[80%] h-auto mx-auto mt-[40px] md:mt-[120px] gap-5 mb-[120px]'>
                <div className='flex flex-col w-full md:w-1/2 bg-white rounded-[30px] h-[55vh] order-2 md:order-1'>
                    <h1 className='font-bold text-[25px] mt-[20px] flex justify-center items-center text-[#85A662]'> Top 10 supporters</h1>
                    <div className='flex flex-col list-none mt-[15px] ml-[40px] gap-1 h-[50vh] overflow-y-scroll scrollbar-hide overflow-x-hidden text-wrap'>
                        {payments.length === 0 && (
                            <p className='text-gray-500 flex mr-8 mt-[130px] justify-center items-center'>
                                No supporters yet
                            </p>
                        )}
                        {payments.map((payment, index) => (
                            <li key={payment.id} className='flex gap-2 w-[90%] items-start '>
                                <Image
                                    className='rounded-full shrink-0'
                                    src="/icons8-avatar.gif"
                                    alt="supporter"
                                    width={30}
                                    height={30}
                                />
                                <span className='break-words text-left w-full'>
                                    {payment.name} donated ₹{Number.parseInt(payment.amount)} with message {payment.message}
                                </span>
                            </li>
                        ))}
                    </div>

                </div>
                <div className='flex flex-col w-full mt-[20px] md:mt-0 md:w-1/2 bg-white rounded-[30px] h-[43vh] md:h-[55vh] order-1 md:order-2'>
                    <div className='flex flex-col mt-[15px]  gap-1'>
                        <h1 className='font-bold text-[25px]  flex justify-center items-center text-[#85A662]'>Buy {username} a Matcha</h1>
                        <div className='flex flex-col gap-2 mt-[15px] ml-[40px]   '>
                            <input onChange={handlechange} name="name" value={paymentform.name} type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-3 w-[70vw] md:w-[33vw]' placeholder='enter your name' />
                            <input onChange={handlechange} name="message" value={paymentform.message} type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-3 w-[70vw] md:w-[33vw]' placeholder='enter message' />
                            <input onChange={handlechange} name="amount" value={paymentform.amount} type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-3 w-[70vw] md:w-[33vw]' placeholder='enter amount' />
                            <div>
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className='bg-[#85A662] text-white p-2 rounded-[10px] w-[70vw] md:w-[33vw] disabled:opacity-50 cursor-pointer' disabled={!paymentform.name || !paymentform.message || !paymentform.amount}>Pay</button>
                            </div>
                            <div className='flex gap-2 '>
                                <button className='bg-[#85A662] text-white p-1.5 text-[16px] md:p-2 rounded-[10px] disabled:opacity-50 cursor-pointer' disabled={!paymentform.name || !paymentform.message} onClick={() => pay(10000)}>Pay ₹100</button>
                                <button className='bg-[#85A662] text-white p-1.5 text-[16px] md:p-2 rounded-[10px] disabled:opacity-50 cursor-pointer' disabled={!paymentform.name || !paymentform.message} onClick={() => pay(2000)}>Pay ₹200</button>
                                <button className='bg-[#85A662] text-white p-1.5  text-[16px] md:p-2 rounded-[10px] disabled:opacity-50 cursor-pointer' disabled={!paymentform.name || !paymentform.message} onClick={() => pay(5000)}>Pay ₹500</button>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )

}

export default Paymentpage
