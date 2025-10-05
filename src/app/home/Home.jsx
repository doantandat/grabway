import React from 'react'
import BgHome from "./../../assets/bghome.png"
import Coin from "./../../assets/coin.png"
import lootBox from "./../../assets/lootBox.png"
import StarRating from '../../components/StarRating';
import ModelOnPedestal from '../../components/Three/ModelOnPedestal';

import StatChipBorderSVG from '../../components/StatChipBorderSVG';
import { IoIosSpeedometer, IoMdLock } from 'react-icons/io';
import TextGlowTitle from '../../components/TextGlowTitle';
import SkewButton from '../../components/SkewButton';
import { BiCar } from 'react-icons/bi';
import { GiStarsStack } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../utils/routes';
import { usePersistentTint } from "@/hooks/usePersistentTint";

const Home = () => {
  const navigate=useNavigate();
  const { savedTint } = usePersistentTint("carColor",false);

  return (

    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden
     
    "
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <div className='relative z-50 flex gap-1 flex-col w-full justify-center items-center pt-4 
      inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent'>
        <span className='text-green-600 font-bold italic text-sm'>GRABWAY</span>
        <TextGlowTitle text={"GRABWAY"} />

        <StarRating rate={3} />
        <div className="inset-0 w-[80%] flex items-center justify-center p-1
                  bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.8)_50%,rgba(0,0,0,0)_100%)]" >
          <span className='text-yellow-400 text-base font-bold'>NFT ID: 37348</span>
        </div>

        <div className='grid grid-cols-2 w-[80%] justify-center items-center gap-2 '>
          <div>
            <StatChipBorderSVG shape="slant-right" width={150} height={35} strokeWidth={2}
              strokeStops={[
                { offset: "0%", color: "#22c55e", opacity: 1 },
                { offset: "100%", color: "#22c55e", opacity: 0.4 },
              ]}
              icon={<img src={Coin} alt="" className='h-full object-contain' />}

              iconSide="left"
              iconBg="rgba(255,255,255,.08)"  // kính mờ
              iconScale={0.8}
              iconGlow={0.7}
            >

              <span className="text-white font-semibold">0.05</span>
            </StatChipBorderSVG>
          </div>
          <div>
            {/* Slant-left, viền xanh dương */}
            <StatChipBorderSVG shape="slant-right" width={150} height={35} strokeStops={[
              { offset: "0%", color: "#3b82f6", opacity: 1 },
              { offset: "100%", color: "#3b82f6", opacity: 0.4 },
            ]}
              icon={<IoIosSpeedometer className='text-orange-500 text-2xl' />}

              iconSide="left"
              iconBg="rgba(255,255,255,.08)"  // kính mờ
              iconScale={0.8}
              iconGlow={0.7}                   // tăng/giảm độ sán
            >

              <span className="text-white font-semibold">0</span>
            </StatChipBorderSVG>
          </div>
          <div className='col-span-2 flex items-center justify-center'>
            {/* Pill bo tròn hai bên */}
            <StatChipBorderSVG shape="pill" width={150} height={35} strokeStops={[
              { offset: "0%", color: "#3b82f6", opacity: 1 },
              { offset: "100%", color: "#3b82f6", opacity: 0.4 },
            ]}
              icon={<IoMdLock className='text-blue-500 text-2xl' />}

              iconSide="left"
              iconBg="rgba(255,255,255,.08)"  // kính mờ
              iconScale={0.8}
              iconGlow={0.7}
            >

              <span className="text-white font-semibold">0</span>
            </StatChipBorderSVG>
          </div>
        </div>
      </div>
      <Link className="group absolute z-50 top-[30%] left-5" to={routes.Box}>
        <div
          className="absolute  w-24 h-24
               transform-gpu transition-transform duration-300 ease-out
               group-hover:scale-110"
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
      </Link>

      <ModelOnPedestal scale={0.02} url="/models/f-16_fighting_falcon_-_fighter_jet_-_free.glb"   tint={savedTint}  />

      <div className='flex w-full gap-2 p-4 absolute z-50 bottom-[76px] '>
        <SkewButton className='bg-red-500 flex w-1/2 text-xs items-center justify-center gap-2 !px-2  h-full shine-sweep shine-strong shine-fast' onClick={()=>navigate(routes.Garage)} >
        <BiCar className='text-2xl' /> <span className='uppercase'>Garage</span></SkewButton>
        <SkewButton className='bg-yellow-400 flex w-1/2 text-xs items-center justify-center gap-2 !px-2  h-full shine-sweep shine-strong shine-fast' onClick={()=>navigate(routes.LeaderBoard)}><GiStarsStack className='text-2xl'  /> <span className='uppercase'>Leader Board</span></SkewButton>
      </div>
    </div>

  )
}

export default Home