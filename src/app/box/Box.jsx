import React, { useState } from 'react'

import lootBox from "./../../assets/lootBox.png"

import BgGeneral from '../../components/BgGeneral';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import routes from '../../utils/routes';
import Modal from '../../components/Modal';
import SkewButton from '../../components/SkewButton';
import toast from 'react-hot-toast';
const Box = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden 
      
     
    "

    >
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} animation='zoom'>
        <div className="flex flex-col justify-center items-center gap-3">
        <img src={lootBox} alt="" className="w-32  object-contain " />
          <h4 className='text-lg text-blue-400 font-bold '>Open Blind Box</h4>
          <p className='text-center text-white'>Are you sure you want to open this blind box for 500 G-Point?</p>
          <div className='flex gap-2 w-full'>
            <SkewButton className='bg-yellow-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => {setIsOpen(false);toast.error("Insufficient GPoint")}}> <span>Open</span></SkewButton>
            <SkewButton className='bg-transparent border border-blue-400 text-blue-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Back</span></SkewButton>
          </div>
        </div>
      </Modal>
      <BgGeneral />
      <Link className='absolute z-[99] top-2 left-2' to={routes.Home}><FaAngleDoubleLeft className='text-5xl text-white' /></Link>
      <div className='flex flex-col h-screen w-full relative z-10 items-center justify-center'>
        <div
          className="absolute  w-[80%]
              scale-pulse
               group-hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={lootBox}
            alt=""
            className="w-full h-full drop-shadow-xl
                 animate-left-right-attn
                 motion-reduce:animate-none
                 will-change-transform backface-hidden"
          />
        </div>
      </div>

    </div>
  )
}
export default Box 