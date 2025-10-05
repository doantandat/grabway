import React from 'react'

import Bg from "./../assets/bg.png"
 const BgGeneral = () => {
  return (
    <> <img src={Bg} alt='' className='object-cover  absolute w-full h-full blur-[1.5px] brightness-80 z-0 ' />
      <div className='absolute w-full h-full z-0  inset-0 bg-gradient-to-b from-black/60  to-transparent '></div></>
  )
}

export default BgGeneral;