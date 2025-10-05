import React, { useState } from 'react'
import TextGlowTitle from '../../components/TextGlowTitle';
import BgGeneral from '../../components/BgGeneral';
import EnergyRingPlus from '../../components/EnergyRing';
import goldWreath from "./../../assets/goldWreath.png"
import Coin from "./../../assets/coin.png"
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import routes from '../../utils/routes';
const LeaderBoard = () => {
    // transactions.js
     const leaderboardData = [
        { rank: 2,  wallet: "7855...4629", amount: "78.819k", amountNum: 78819 },
        { rank: 3,  wallet: "7869...7823", amount: "58.492k", amountNum: 58492 },
        { rank: 4,  wallet: "7316...3813", amount: "57.029k", amountNum: 57029 },
        { rank: 5,  wallet: "6780...7270", amount: "44.567k", amountNum: 44567 },
        { rank: 6,  wallet: "7065...0395", amount: "43.674k", amountNum: 43674 },
        { rank: 7,  wallet: "6619...7235", amount: "38.952k", amountNum: 38952 },
        { rank: 8,  wallet: "6629...5859", amount: "35.947k", amountNum: 35947 },
        { rank: 9,  wallet: "7435...5236", amount: "33.087k", amountNum: 33087 },
        { rank: 10, wallet: "7652...8216", amount: "30.359k", amountNum: 30359 },
        { rank: 11, wallet: "7924...3795", amount: "28.451k", amountNum: 28451 },
        { rank: 12, wallet: "6409...1687", amount: "27.521k", amountNum: 27521 },
        { rank: 13, wallet: "8042...6022", amount: "27.496k", amountNum: 27496 },
        { rank: 14, wallet: "7383...8752", amount: "25.918k", amountNum: 25918 },
        { rank: 15, wallet: "8365...1617", amount: "25.522k", amountNum: 25522 },
        { rank: 16, wallet: "7475...4386", amount: "24.770k", amountNum: 24770 },
        { rank: 17, wallet: "7783...1675", amount: "24.130k", amountNum: 24130 },
        { rank: 18, wallet: "7194...4292", amount: "23.465k", amountNum: 23465 },
        { rank: 19, wallet: "5775...7622", amount: "22.827k", amountNum: 22827 },
        { rank: 20, wallet: "8114...3773", amount: "22.233k", amountNum: 22233 },
        { rank: 21, wallet: "6600...6637", amount: "22.100k", amountNum: 22100 },
        { rank: 22, wallet: "1374...1911", amount: "21.807k", amountNum: 21807 },
        { rank: 23, wallet: "7960...4726", amount: "21.314k", amountNum: 21314 },
        { rank: 24, wallet: "8372...0659", amount: "20.561k", amountNum: 20561 },
        { rank: 25, wallet: "7876...9899", amount: "20.114k", amountNum: 20114 },
        { rank: 26, wallet: "7916...4420", amount: "19.917k", amountNum: 19917 },
        { rank: 27, wallet: "8158...2797", amount: "19.709k", amountNum: 19709 },
        { rank: 28, wallet: "7718...5435", amount: "18.108k", amountNum: 18108 },
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

            <BgGeneral />
            <Link className='absolute z-[99] top-2 left-2' to={routes.Home}><FaAngleDoubleLeft className='text-5xl text-white' /></Link>
            <div className='flex flex-col h-screen w-full relative z-10'>

                <div className=' relative z-50 flex gap-1 flex-col w-full justify-start pt-3 items-center
     h-[80px] '>

                    <TextGlowTitle text={"Leader Board"} className={"text-[25px]"} />
                </div>
                <div className='w-full flex justify-center flex-col items-center gap-4 p-4'>
                    <div className='w-full flex gap-2 justify-center items-center '>
                        <EnergyRingPlus intensity={5} size={120} onClick={() => setIsOpen(true)} >
                            <div className='w-full flex gap-2 justify-center items-center z-50 scale-animate '>
                                <img src={goldWreath} alt='' className='w-24' />
                                <div className='absolute w-full h-full flex items-center justify-center scale-animate'>
                                    <span className='text-3xl font-serif font-black italic text-yellow-400'>1</span>
                                </div>
                            </div>
                        </EnergyRingPlus>

                    </div>

                    <div className="inset-0 w-full  flex items-center justify-center gap-5  p-1
                  bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.8)_50%,rgba(0,0,0,0)_100%)]" >
                        <span className='text-white text-base font-bold'>7934...4828</span>
                        <span className='text-blue-400 text-base font-bold flex gap-2'>115.15k <img src={Coin} alt="" className='h-full object-contain' /></span>
                    </div>

                   


                    <div className='w-full flex flex-col gap-2  '>
                      
                        <div className='h-[calc(100vh-420px)] overflow-y-scroll space-y-2 mt-2 '>
                            {leaderboardData.map((value, index) => {
                                return <div className='grid grid-cols-12 bg-white px-4 py-2 items-center'>

                                    <div className='col-span-2'><span className='font-batman text-red-500 text-2xl italic'>{value.rank}</span> </div>
                                    <div className='col-span-6'> <span>{value.wallet}</span></div>
                                    <div className='col-span-4 flex gap-2 items-center'>  <span className='text-blue-400 font-medium'>{value.amount}</span> <img src={Coin} alt="" className='h-full object-contain' /></div>

                                </div>
                            })}
                        </div>


                        <div className='mt-2 border-t'>
                            <div className=' font-bold my-2'>Current rank:</div>
                            <div className='grid grid-cols-12 bg-white px-4 py-2 items-center border border-blue-400'>

                                    <div className='col-span-2'><span className='font-batman text-blue-500 text-2xl italic'>-1</span> </div>
                                    <div className='col-span-6'> <span className='text-blue-400 '>1953420036</span></div>
                                    <div className='col-span-4 flex gap-2 items-center'>  <span className='text-blue-400 font-medium'>0.72</span> <img src={Coin} alt="" className='h-full object-contain' /></div>

                                </div>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default LeaderBoard
