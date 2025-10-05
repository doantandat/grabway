import React, { useState } from 'react'
import SkewButton from '../../components/SkewButton'
import Flag from "./../../assets/flag.png"
import Modal from '../../components/Modal';
import confetti from "canvas-confetti";

const ButtonClaim = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fire = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >

        <div className="flex flex-col justify-center items-center gap-6">
          <img src={Flag} alt="" className="w-15  object-contain " />
          <h4 className='text-lg text-blue-400 font-bold '>Claim Successful!</h4>
          <p className='text-white text-center'>You have claimed 0.5752 GPoints from this car</p>
          <div className='flex gap-2 w-full'>
            <SkewButton className='bg-yellow-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => {setIsOpen(false);}}> <span>Okay</span></SkewButton>
            <SkewButton className='bg-transparent border border-blue-400 text-blue-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Back</span></SkewButton>
          </div>
        </div>
      </Modal>
      <SkewButton className='bg-yellow-500 border border-white flex w-1/2 text-xs items-center justify-center gap-2 !px-2  h-full shine-sweep shine-strong shine-fast'
      onClick={()=>{fire();setIsOpen(true)}}
      ><span className='uppercase'>Claim</span></SkewButton>
    </>
  )
}

export default ButtonClaim
