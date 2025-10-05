import React, { useState } from 'react'

import Item from "./../../assets/item.png"
import Coin from "./../../assets/coin.png"

import EnergyRing from '../../components/EnergyRing';
import BgGeneral from '../../components/BgGeneral';
import TextGlowTitle from '../../components/TextGlowTitle';
import TransactionItem from './TransactionItem';
import ButtonLinkWallet from './ButtonLinkWallet';
import ButtonGiftCode from './ButtonGiftCode';
import Modal from '../../components/Modal';
import CarSkinShowcase from './CarSkinShowcase';
const Profile = () => {
  // transactions.js
  const transactions = [
    {
      id: "txn_001",
      dateLabel: "Oct 05",
      datetime: "2025-10-05T10:08:00",
      title: "Upgrade Car Grabway",
      amount: 2.525,
      unit: "GPoint",
      type: "upgrade",
    },
    {
      id: "txn_002",
      dateLabel: "Oct 05",
      datetime: "2025-10-05T09:41:00",
      title: "Purchase Beginner Crate",
      amount: 1.000,
      unit: "GPoint",
      type: "purchase",
    },
    {
      id: "txn_003",
      dateLabel: "Oct 05",
      datetime: "2025-10-05T08:12:00",
      title: "Mission Reward – Daily Login",
      amount: 0.250,
      unit: "GPoint",
      type: "reward",
    },
    {
      id: "txn_004",
      dateLabel: "Oct 04",
      datetime: "2025-10-04T22:18:00",
      title: "Upgrade Nitro Kit",
      amount: 1.750,
      unit: "GPoint",
      type: "upgrade",
    },
    {
      id: "txn_005",
      dateLabel: "Oct 04",
      datetime: "2025-10-04T17:03:00",
      title: "Referral Bonus",
      amount: 0.500,
      unit: "GPoint",
      type: "bonus",
    },
    {
      id: "txn_006",
      dateLabel: "Oct 04",
      datetime: "2025-10-04T12:39:00",
      title: "Purchase Standard Crate",
      amount: 10.000,
      unit: "GPoint",
      type: "purchase",
    },
    {
      id: "txn_007",
      dateLabel: "Oct 03",
      datetime: "2025-10-03T21:55:00",
      title: "Event Reward – Time Trial",
      amount: 0.800,
      unit: "GPoint",
      type: "reward",
    },
    {
      id: "txn_008",
      dateLabel: "Oct 03",
      datetime: "2025-10-03T15:27:00",
      title: "Upgrade Aero Kit",
      amount: 3.200,
      unit: "GPoint",
      type: "upgrade",
    },
    {
      id: "txn_009",
      dateLabel: "Oct 02",
      datetime: "2025-10-02T10:06:00",
      title: "Purchase Performance Crate",
      amount: 20.000,
      unit: "GPoint",
      type: "purchase",
    },
    {
      id: "txn_010",
      dateLabel: "Oct 02",
      datetime: "2025-10-02T08:44:00",
      title: "Daily Streak Reward",
      amount: 0.300,
      unit: "GPoint",
      type: "reward",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden 
      
     
    "

    >
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} animation='zoom' >
               <CarSkinShowcase setIsOpen={setIsOpen}/>
               
          </Modal>
      <BgGeneral />
      <div className='flex flex-col h-screen w-full relative z-10'>

        <div className=' relative z-50 flex gap-1 flex-col w-full justify-start pt-3 items-center
     h-[80px] '>

          <TextGlowTitle text={"Profile"} />
        </div>
        <div className='w-full flex justify-center flex-col items-center gap-4 p-4'>
          <div className='w-full flex gap-2 justify-center items-center mb-5'>
            <EnergyRing intensity={5} size={120} src={Item} onClick={()=>setIsOpen(true)} />

          </div>
          <div className="inset-0 w-full  flex items-center justify-center gap-5  p-1
                  bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.8)_50%,rgba(0,0,0,0)_100%)]" >
            <span className='text-white text-base font-bold'>Datdoan</span>
            <span className='text-blue-400 text-base font-bold flex gap-2'>0.68 <img src={Coin} alt="" className='h-full object-contain' /></span>
          </div>

          <div className='w-full flex gap-2 justify-center items-center h-[40px]'>
           <ButtonLinkWallet/>
           <ButtonGiftCode/>
          </div>


          <div className='w-full flex flex-col gap-2  '>
            <span className='font-medium'>History Claimed</span>

            <div className='h-[calc(100vh-460px)] overflow-y-scroll space-y-2 mt-2'>
              {transactions.map((value, index) => {
                return <TransactionItem key={index} value={value}/>
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
export default Profile 