import React from 'react'

const slides = ({label , tittle , tittle2, foot}) => {
  return (
    <div>
      <div className="slide  bg-white w-[65vw]  h-[48vh] md:h-[55vh] flex justify-center items-center  mx-auto rounded-[20px] mt-[70px] md:mt-[40px]">
        <div className="items">
        <p className='font-circular md:text-[22px] text-[18px]  text-center w-[25vw] md:w-[5vw] mx-auto '>{label}</p>
        <h1 className='font-bold  text-[26px] md:text-[64px] font-circular  w-[50vw] mx-auto text-center mt-[5px]'>{tittle}</h1>
        <p className='font-circular text-[16px] md:text-[18px] text-[#85A662] w-[55vw] mx-auto text-center mt-[5px]'>{foot}</p>
        </div>
      </div>
    </div>
  )
}

export default slides
