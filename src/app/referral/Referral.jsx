import React, { useState } from 'react'

import { FaCopy } from 'react-icons/fa';
import { LuContact } from 'react-icons/lu';
import Friends from './Friends';
import Reward from './Reward';
import BgGeneral from '../../components/BgGeneral';
import TextGlowTitle from '../../components/TextGlowTitle';
const Referral = () => {

  const [sponsor, setSponsor] = useState(null);
  const [tab, setTab] = useState(1);
  const text = "wb0kjoxGlQ";
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200); // reset trạng thái
    } catch (err) {
      // Fallback nếu Clipboard API bị chặn
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };
  const handleSave=()=>{
    setSaving(true);
    setTimeout(() => {
    setSaving(false);
      
    }, 1000);
  }
  return (
    <div
      className="
      relative w-full min-h-[100dvh]
      bg-center bg-no-repeat bg-cover  
      overflow-hidden 
      
     
    "

    >
      <BgGeneral />
      <div className='flex flex-col h-screen w-full relative z-10'>

        <div className=' relative z-50 flex gap-1 flex-col w-full justify-start pt-3 items-center h-[50px] '>
          <TextGlowTitle text={"Referral"} />

        </div>
        <div className='w-full p-4'>

          <div
            className='bg-gradient-to-tl from-black/90   to-sky-900/95 to-90%  h-[300px] bg-clip-padding    
            border-transparent   [border-image:linear-gradient(to_bottom,rgba(56,189,248,.95),rgba(56,189,248,.10))_1]
         border-2

            flex flex-col gap-2 p-3
            '>
            <div className='flex justify-between'>
              <span className='text-white'>Invite link</span>
              <span className='text-white'>Invited: <span className='text-sky-500'>0</span></span>
            </div>

            <div className='border border-gray-400 rounded-lg h-[40px] flex justify-center items-center text-white'>
              {text}
            </div>
            <button className='border bg-gray-600 border-gray-400 rounded-lg h-[40px]  justify-center items-center text-white font-bold italic flex gap-2' onClick={handleCopy}>
              <span className="uppercase">{copied ? "Copied!" : "Copy Link"}</span> <FaCopy />
            </button>
            <button className='border bg-blue-400 border-gray-400 rounded-lg h-[40px]  justify-center items-center text-white font-bold italic flex gap-2'>
              <span className='text-white uppercase italic'> Invite contact</span> <LuContact />
            </button>
            <div className='h-[40px] flex justify-start items-center text-white'>
              Have a sponsor code?
            </div>
            <div className='h-[40px] flex justify-start items-center gap-2 text-white transition-all duration-300'>
              <input
                type='text'
                className='border bg-gray-600 border-gray-400 rounded-lg h-[40px] w-full outline-none px-2 transition-all duration-300'
                onChange={(e) => setSponsor(e.target.value)}
              />
              {sponsor && <button className='border bg-yellow-400 border-gray-400 rounded-lg h-[40px]  justify-center items-center text-white font-bold italic flex gap-2 px-2'
              onClick={handleSave}
              >
                <span className='text-black uppercase italic'> {saving?"Saving...":"Apply"} </span>
              </button>}
            </div>
          </div>


          <div className='h-[40px] grid grid-cols-2 justify-between items-center gap-2 text-white transition-all duration-300 '>
            <button className={`border border-gray-400 backdrop-blur-md ${tab == 1 ? "bg-blue-400" : ""} uppercase transition-all duration-300 px-2 py-1`} onClick={() => setTab(1)}>Reward</button>
            <button className={`border border-gray-400 backdrop-blur-md ${tab == 2 ? "bg-blue-400" : ""} uppercase transition-all duration-300 px-2 py-1`} onClick={() => setTab(2)}>Friends</button>
          </div>
          {tab == 1 ? <Reward /> : <Friends />}
        </div>
      </div>

    </div>
  )
}
export default Referral 