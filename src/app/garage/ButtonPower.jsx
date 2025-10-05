import React, { useState } from 'react'
import { FaAnglesUp, FaCarRear } from 'react-icons/fa6'
import Modal from '../../components/Modal';
import iconInfo from "./../../assets/iconInfo.png"
import SkewButton from '../../components/SkewButton';

const ButtonPower = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col'>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >

                <div className="flex flex-col justify-center items-center gap-6">
                    <img src={iconInfo} alt="" className="w-18  object-contain " />
                    <h4 className='text-lg text-blue-400 font-bold '>Upgrade Car</h4>
                   <p className='text-white text-center'>Are you sure you want to upgrade power for 2.55 GPoints?</p>
                   <div className='flex gap-2 w-full'> 
                    <SkewButton className='bg-yellow-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Upgrade</span></SkewButton>
                    <SkewButton className='bg-transparent border border-blue-400 text-blue-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Cancel</span></SkewButton>
                    </div>
                </div>
            </Modal>
            <div className='flex gap-2 items-center justify-center'><FaCarRear className='text-white' /> <span className='text-white'>power</span> </div>
            <div className='flex gap-2 items-center justify-center'>   <span className='text-white'>2.0</span>
                <button className='scale-pulse' onClick={() => setIsOpen(true)}><FaAnglesUp className='text-xl font-black text-blue-400 ' /></button></div>
        </div>
    )
}

export default ButtonPower
