import React, { useEffect, useState } from 'react'
import GarageBg from "./../../assets/garage.png"
import Bttn from "./../../assets/bttn.png"
import Bttnl from "./../../assets/bttnl.png"
import Coin from "./../../assets/coin.png"
import StarRating from '../../components/StarRating';
import ModelOnPedestal from '../../components/Three/ModelOnPedestal';

import TextGlowTitle from '../../components/TextGlowTitle';
import SkewButton from '../../components/SkewButton';
import { FaAngleDoubleLeft, FaCar, FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import Item from "./../../assets/item.png"
import Modal from '../../components/Modal'
import AutoSavingsPanel from './AutoSavingsPanel'
import ColorSlider from '../../components/ColorSlider'
import ButtonPower from './ButtonPower'
import ButtonAcceleration from './ButtonAcceleration'
import ButtonNitro from './ButtonNitro'
import { usePersistentTint } from "@/hooks/usePersistentTint";
import ButtonClaim from './ButtonClaim'
import ButtonInspect from './ButtonInspect'
import toast from 'react-hot-toast'

const Garage = () => {
  const { savedTint, save, reset } = usePersistentTint("carColor");
  const [draftTint, setDraftTint] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  useEffect(() => {
    // reset();
    return () => {

    };
  }, []);
  const handleReset = () => {
    reset();                  // xoá LS + state
    setDraftTint(undefined);  // tắt preview
    setResetCounter(c => c + 1); // ⬅️ ép reset cứng
  };
  return (

    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden
     
    "
      style={{ backgroundImage: `url(${GarageBg})` }}
    >
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} animation='zoom' className={"p-0"}>
        <AutoSavingsPanel onClose={() => setIsOpen(false)} />

      </Modal>
      <div className='absolute w-full h-full z-0  inset-0 bg-gradient-to-b from-black/50  to-transparent '></div>
      <Link className='absolute z-[99] top-2 left-2' to={routes.Home}><FaAngleDoubleLeft className='text-5xl text-white' /></Link>
      <div className='relative z-50 flex gap-1 flex-col w-full justify-center items-center pt-4 
      inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent'>
        <span className='text-green-600 font-bold italic text-sm'>GRABWAY</span>
        <TextGlowTitle text={"GRABWAY"} />

        <StarRating rate={3} />
        <div className="inset-0 w-[80%] flex items-center justify-center p-1
                  bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.8)_50%,rgba(0,0,0,0)_100%)]" >
          <span className='text-yellow-400 text-base font-bold'>NFT ID: free</span>
        </div>

        <div className='flex flex-col w-full justify-center items-center px-4 py-2'>

          <div className='grid grid-cols-3 w-full font-medium'>
            <div className='flex gap-2 items-center justify-center'>
              <ButtonPower />
            </div>
            <div className='flex gap-2 items-center  justify-center'>
              <ButtonAcceleration />
            </div>
            <div className='flex gap-2 items-center justify-center'>
              <ButtonNitro />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full justify-center items-center px-8'>
          <div className='grid grid-cols-2 w-full font-medium'>
            <div className='flex  items-center justify-center flex-col'>
              <span className='text-white text-sm'>Current Inspect</span>
              <span className='text-sky-500 text-xl font-batman [-webkit-text-stroke:0.5px_#fff]'>0</span>
            </div>
            <div className='flex items-center  justify-center flex-col'><span className='text-white text-sm'>Next Inspect</span>
              <span className='text-yellow-500 text-xl font-batman [-webkit-text-stroke:0.5px_#fff]'>01/11, 17:52</span>

            </div>

          </div>

        </div>
        <div className='flex flex-col w-full justify-center items-center px-8 mt-4'>
          <button className='w-[80%] flex justify-between items-center rounded-full h-[30px] border border-white  bg-gradient-to-r from-black to-70% via-gray-400   to-green-400' onClick={() => setIsOpen(true)}>
            <div className=''><img src={Coin} alt="" className='h-full object-contain' /></div>
            <div className='text-yellow-400 font-bold text-xl'>0</div>
            <div className='-mr-2 relative'>
              <FaCertificate className='text-5xl text-yellow-300' />
              <span className='absolute left-0 top-0 w-full h-full flex justify-center items-center text-red-500 text-sm font-medium'>0%</span></div>
          </button>

        </div>
      </div>

      <ModelOnPedestal scale={0.018} url="/models/f-16_fighting_falcon_-_fighter_jet_-_free.glb" className={"top-16"}
        tint={draftTint ?? savedTint}   // ưu tiên preview trên màn này
        resetCounter={resetCounter}
      />


      <div className='flex flex-col justify-center items-center w-full gap-1 p-4 absolute bottom-0 '>
        <div className='flex  w-[80%] justify-center items-center px-4 py-2 gap-2'>
          <ColorSlider value={draftTint ?? savedTint} onChange={setDraftTint} />
          <SkewButton
            className='bg-yellow-500 border border-white flex  text-xs items-center justify-center gap-2 !px-2  h-5  shine-sweep shine-strong shine-fast'
            onClick={() => draftTint && save(draftTint)}>
            <span className='uppercase'>Save</span>
          </SkewButton>
          <SkewButton
            className='bg-blue-500 border border-white flex  text-xs items-center justify-center gap-2 !px-2  h-5  shine-sweep shine-strong shine-fast'
            onClick={() => { handleReset() }}>
            <span className='uppercase'>Reset</span>

          </SkewButton>
        </div>
        <div className='flex flex-col w-full justify-center items-center px-4 py-2'>
          <button className='w-[80%] flex justify-between items-center rounded-full h-[30px] border border-white 
      bg-gradient-to-r from-yellow-300/20  via-gray-400/0   to-yellow-300/20
     '>
            <div className='-ml-2'>   <img src={Bttnl} alt='' className='h-full object-contain ' /></div>
            <div className='text-yellow-400 font-bold text-base flex gap-2'><img src={Coin} alt="" className='h-full object-contain' /> 0.05 Gpoints / Hou</div>
            <div className='-mr-2 relative'>
              <img src={Bttn} alt='' className='h-full object-contain' />
            </div>
          </button>
        </div>
        <div className='flex flex-col w-full justify-center items-center px-4 py-2'>
          <div className=" w-[120px] h-[72px] relative   bg-gradient-to-tr from-sky-500 to-sky-500/50 to-90% bg-clip-padding p-[1px] ">
            <div className="bg-gradient-to-tr from-black to-black/50 to-90% w-full h-full  flex flex-col justify-center items-center">
              <StarRating rate={3} className={"!text-[8px]"} />
              <img src={Item} alt="" className="w-14 object-contain" />
              <div className="w-[14px] h-[14px] rounded-[3px] bg-green-500 
                          [clip-path:polygon(20%_55%,40%_75%,80%_30%,90%_40%,40%_88%,10%_62%)]" />
            </div>
          </div>
        </div>
        <div className='flex w-full gap-2  items-center '>
        <ButtonClaim/>
          <SkewButton className='bg-blue-500  border border-white flex w-1/2 text-xs items-center justify-center gap-2 !px-2  h-full shine-sweep shine-strong shine-fast'
          
          onClick={()=>toast.success("Set main car successfully")}
          >
            <span className='uppercase'>Set main car</span></SkewButton>
         <ButtonInspect/>
        </div>
      </div>
    </div>

  )
}

export default Garage