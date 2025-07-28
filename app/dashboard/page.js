'use client'
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateprofile } from '@/actions/useractions'
import { get, set } from 'mongoose'
import { ToastContainer, Bounce } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setform] = React.useState({ name: '', email: '', username: '', profileimage: '', coverimage: '', razorpayid: '', razorpaysecret: '' });
  const [error1, setError1] = React.useState('');
  const [error2, setError2] = React.useState('');



  useEffect(() => {
    console.log("Session data:", session);
    if (!session?.user?.name) { // Check for name instead of username
      console.error("Name is undefined in session. Check authentication provider.");
      return;
    }

    const getdata = async () => {
      try {
        if (!session?.user?.username) {
          console.error("Session does not contain name. Redirecting to login.");
          router.push("/login");
          return;
        }

        let data = await fetchuser(session.user.username); // Use name for database query
        setform(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getdata();
  }, [session, router]);
  

 useEffect(() => {
  document.title = 'Dashboard - Buy Me A Matcha';
  if (status === "unauthenticated") {
    router.push("/login");
  }
}, [status, router]);


  if (status === "loading") {
    return <div className="h-full w-full flex items-center justify-center mt-[40vh] text-4xl text-bold">Loading...</div>;
  }




  const handleChange = async (e) => {

    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handlesubmit = async (formData) => {
    const plainForm = Object.fromEntries(formData.entries());
    const result = await updateprofile(plainForm, session.user.username);
    if (result?.error) {
      alert("Error: " + result.error);
      return;
    }

    // Force the session to update with the new data
    await update(true);

    alert("Profile updated successfully");
    // toast('Profile updated successfully', {

    //     style: {
    //       textDecoration: 'none',
    //       borderBottom: '2px solid #85A662',
    //       paddingBottom: '2px',
    //     },
    //     progressClassName: "custom-progress-bar",
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    const newUsername = formData.get('username');
    router.push(`/${newUsername}`);

    
  }

  const handleUsernameChange = async (e) => {
    setError1("you cannot change your username");
    e.preventDefault();
  }
  const handleEmailChange = async (e) => {
    setError2("you cannot change your email");
    e.preventDefault();
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


      <div className='fbg-white p-6 rounded-[40px] shadow-md bg-white w-[90%] max-w-[600px] mx-auto '>
        <h1 className='font-circular  text-[22px] md:text-[24px] text-center'>Welcome to your dashboard</h1>

        {/* --- FIX: Use the 'action' prop with the server action handler --- */}
        <form className="flex flex-col w-full px-8" action={handlesubmit}>
          <div className='flex flex-col justify-center items-center mx-auto mt-[10px] gap-3 w-full'>
            {/* --- FIX: Added 'name' attribute and 'onChange' handler to all inputs --- */}
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="name">Name</label>
              <input name="name" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' placeholder='Enter your name' value={form.name || ''} onChange={(e) => {
                handleChange(e);
                handleUsernameChange(e);
              }} readOnly onFocus={() => setError1("You can't change your username")} onBlur={() => setError1('')} />
              {error1 && <p className="text-red-500 text-sm ">{error1}</p>}
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="email">Email</label>
              <input name="email" type="email" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' placeholder='Enter your email' value={form.email || ''} onChange={(e) => {
                handleChange(e);
                handleEmailChange(e);
              }} readOnly onFocus={() => setError2("You can't change your email")} onBlur={() => setError2('')} />
              {error2 && <p className="text-red-500 text-sm ">{error2}</p>}
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="username">Username</label>
              <input name="username" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' placeholder='Enter your username' value={form.username || ''} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="profileimage">Profile Picture URL</label>
              <input name="profileimage" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' placeholder='Enter image URL' value={form.profileimage || ''} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="coverimage">Cover Picture URL</label>
              <input name="coverimage" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' placeholder='Enter cover image URL' value={form.coverimage || ''} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="razorpayid">Razorpay ID</label>
              <input name="razorpayid" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' value={form.razorpayid || ''} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 w-[72vw] md:w-[33vw]'>
              <label htmlFor="razorpaysecret">Razorpay Secret</label>
              <input name="razorpaysecret" type="text" className='border border-[#f0f0f0] bg-[#f0f0f0] rounded-[10px] p-2' value={form.razorpaysecret || ''} onChange={handleChange} />
            </div>
            <button type="submit" className='bg-[#85A662] text-white p-2 rounded-[10px] w-[33vw] mt-[20px]'>Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Dashboard;


