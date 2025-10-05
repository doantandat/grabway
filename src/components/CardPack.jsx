import React, { useState } from "react";
import Modal from "./Modal";
import SkewButton from "./SkewButton";
import toast from "react-hot-toast";
import Coin from "./../assets/coin.png"
export default function CardPack({
  item = null,
  className = "",

}) {
  if (!item) {
    return null
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const confirm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      toast.error("Insufficient GPoint", {
        style: {
          border: '1px solid #facc15',   // vàng
          // padding: '16px',
          color: '#000',
          background: '#fef9c3',         // nền vàng nhạt
        },
        iconTheme: {
          primary: '#facc15',
          secondary: '#fff',
        },
      })
    }, 1000);
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col justify-center items-center">
          <img src={item?.box} alt="" className="w-24  object-contain mb-6" />
          <p className="text-white text-center  mb-6">Are you sure you want to purchase <span className="uppercase">{item.title}</span> by {item?.price?.toLocaleString()} GPoints ?</p>
          <div className="flex gap-2">
            <SkewButton className="w-1/2 bg-yellow-400 text-black hover:bg-yellow-500 rounded-sm shadow-md" onClick={() => confirm()}>
              {isLoading ? <span className="text-sm text-red-600 -ml-4">processing...</span> : "Confirm"}
            </SkewButton>
            <SkewButton className="w-1/2 border border-blue-400 text-blue-400 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-sm shadow-md" onClick={() => setIsOpen(false)}>
              Back
            </SkewButton>
          </div>
        </div>
      </Modal>
      <div

        onClick={() => setIsOpen(true)}
        className={`h-[150px] flex justify-center items-center w-full p-2  ${className} bg-no-repeat bg-contain`}
        style={{ backgroundImage: `url(${item?.bg})` }}
      >
        <div className="w-[90%] h-[90%] grid grid-cols-2">
          <div>
            <h4 className="font-batman text-white text-xl">{item?.title}</h4>
            <span className="font-bold text-xl text-yellow-200 scale-pulse ">APR: {item?.apr}</span>

            <div className="flex gap-2 mt-2">
            <img src={Coin} alt="" className='h-full object-contain' /> <span className="font-medium text-xl ">{item?.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src={item?.box} alt="" className="w-24  object-contain mb-6 bounce-light" />
          </div>
        </div>
      </div>
    </>
  );
}

