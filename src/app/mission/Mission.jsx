import React from 'react'

import Coin from "./../../assets/coin.png";
import SkewButton from '../../components/SkewButton';
import BgGeneral from '../../components/BgGeneral';
import TextGlowTitle from '../../components/TextGlowTitle';
const Mission = () => {
  const itemsMission = [
    { title: "Join Telegram Channel", price: 1, status: "Go" },
    { title: "Join Telegram Group", price: 1, status: "Claim" },
    { title: "Follow Us On X", price: 1, status: "Complete" },

  ]
  return (
    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden 
      
     
    "

    >
           <BgGeneral/>

      <div className='flex flex-col h-screen w-full relative z-10'>

        <div className=' relative z-50 flex gap-1 flex-col w-full justify-start pt-3 items-center h-[100px] '>
        <TextGlowTitle text={"Mission"}/>
        


        </div>
        <div className='overflow-y-scroll px-4 space-y-3 h-[calc(100vh-200px)] w-full'>
          {itemsMission.map((value, index) => {
            return <div className='grid grid-cols-12 grid-rows-1 gap-2 min-h-[100px] bg-gradient-to-r from-gray-300 to-white'>
              <div className='col-span-2 bg-gradient-to-r from-red-600  to-red-400 flex justify-center items-center'>
              <img src={Coin} alt="" className='h-[40px] object-contain' />
              </div>
              <div className='col-span-7 flex items-center gap-2'>
                <div className='w-2/3'>{value?.title}</div>
                <div className='flex items-center gap-2 w-1/3 text-blue-400'>+{value?.price} <img src={Coin} alt="" className='h-full object-contain' /></div>
              </div>
              <div className='col-span-3 flex items-center justify-center'>
                <SkewButton className={`w-full -ml-5 text-xs  
                ${value.status=="Go"?"bg-red-400 hover:bg-red-500":""}
                ${value.status=="Claim"?"bg-yellow-400 hover:bg-yellow-500":""}
                ${value.status=="Complete"?"bg-gray-400 ":""}
                 text-black  rounded-sm shadow-md !px-2 !py-1`}>
                  {value.status}
                </SkewButton>
              </div>
            </div>

          })}

        </div>
      </div>

    </div>
  )
}
export default Mission 