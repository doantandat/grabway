import React, { useState } from 'react'
import SkewButton from '../../components/SkewButton'
import iconInfo from "./../../assets/iconInfo.png"
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const ButtonInspect = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >

        <div className="flex flex-col justify-center items-center gap-6">
          <img src={iconInfo} alt="" className="w-15  object-contain " />
          <h4 className='text-lg text-blue-400 font-bold '>Inspect Car!</h4>
          <p className='text-white text-center'>Are you sure you want to inspect this car ?</p>
          <div className='flex gap-2 w-full'>
            <SkewButton className='bg-yellow-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => {setIsOpen(false);toast.error("Insufficient GPoint")}}> <span>INSPECT</span></SkewButton>
            <SkewButton className='bg-transparent border border-blue-400 text-blue-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Cancel</span></SkewButton>
          </div>
        </div>
      </Modal>
      <SkewButton className='bg-yellow-400 border border-white flex w-1/2 text-xs items-center justify-center gap-2 !px-2  h-full shine-sweep shine-strong shine-fast'
      onClick={() => setIsOpen(true)}
      >
        <span className='uppercase'>INspect</span></SkewButton>
    </>
  )
}

export default ButtonInspect
