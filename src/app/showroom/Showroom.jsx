import React from 'react'


import Bg from "./../../assets/bg.png"
import crateBlue from "./../../assets/boxBlue.png";
import crateGreen from "./../../assets/boxGreen.png";
import crateOrange from "./../../assets/boxYellow.png";
import cratePurple from "./../../assets/boxPurple.png";
import Blue from "./../../assets/blue.png";
import Green from "./../../assets/green.png";
import Orange from "./../../assets/orange.png";
import Purple from "./../../assets/purple.png";
import CardPack from '../../components/CardPack';
import BgGeneral from '../../components/BgGeneral';
import TextGlowTitle from '../../components/TextGlowTitle';
const Showroom = () => {
  const itemsCard = [
    { title: "Beginner", price: 1000, apr: 180, bg: Blue, box: crateBlue },
    { title: "Standard", price: 10000, apr: 240, bg: Green, box: crateGreen },
    { title: "Performance", price: 20000, apr: 300, bg: Orange, box: crateOrange },
    { title: "Ultimate", price: 50000, apr: 360, bg: Purple, box: cratePurple },
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
        <TextGlowTitle text={"Showroom"}/>
        

        </div>
        <div className='overflow-y-scroll px-4 gap-2 h-[calc(100vh-200px)]'>
          {itemsCard.map((value, index) => {
            return <CardPack key={index} item={value} />

          })}

        </div>
      </div>

    </div>
  )
}
export default Showroom 