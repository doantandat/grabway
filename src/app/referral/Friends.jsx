import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Friends = () => {
  const itemsFriend = [
    { player: "1st Level", gpoint: 15, },
    { player: "2nd Level", gpoint: 10,},
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "1st Level", gpoint: 15, },
    { player: "2nd Level", gpoint: 10,},
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "1st Level", gpoint: 15, },
    { player: "2nd Level", gpoint: 10,},
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },
    { player: "3rd Level", gpoint: 5, },

  ]
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}     // bắt đầu ngoài màn hình bên phải
        animate={{ x: 0, opacity: 1 }}           // trượt vào giữa
        exit={{ x: "-100vw", opacity: 0 }}       // trượt ra ngoài bên trái
        transition={{ type: "tween", duration: 0.4 }}>
           <div className='grid grid-cols-6 bg-white/80 h-[30px] w-full'>
            <div className='col-span-1 flex justify-center items-center text-blue-400 font-bold'># </div>
            <div className='col-span-3 flex justify-center items-center text-blue-400 font-bold'>Player</div>
            <div className='col-span-2 flex justify-center items-center text-blue-400 font-bold'>Gpoint</div>

          </div>
          
        <div className='h-[calc(100vh-520px)] overflow-y-scroll w-full'>
         
          {itemsFriend.map((value, index) => {
                        return  <div key={index} className='grid grid-cols-6 bg-white/80 h-[30px] hover:bg-gray-300'>
                        <div className='col-span-1 flex justify-center items-center '>{index+1}</div>
                        <div className='col-span-3 flex justify-center items-center '>{value.player}</div>
                        <div className='col-span-2 flex justify-center items-center '>{value.gpoint}</div>
            
                      </div>
                    })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default Friends;
