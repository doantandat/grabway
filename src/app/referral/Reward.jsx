import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FaDotCircle } from 'react-icons/fa';
const Reward = () => {
    const itemsReward = [
        { title: "1st Level", percent: 15, desc: "Requires 10 refs left", price: 0, color: "#3B82F6" },
        { title: "2nd Level", percent: 10, desc: "Requires 20 refs left", price: 0, color: "#FACC15" },
        { title: "3rd Level", percent: 5, desc: "Requires 30  refs left", price: 0, color: "#4ADE80" },


    ]
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "100vw", opacity: 0 }}     // bắt đầu ngoài màn hình bên phải
                animate={{ x: 0, opacity: 1 }}           // trượt vào giữa
                exit={{ x: "-100vw", opacity: 0 }}       // trượt ra ngoài bên trái
                transition={{ type: "tween", duration: 0.4 }}>
                <div className='flex gap-2'>
                    <span className='text-gray-700 font-bold'>Referral Status: </span>
                    <span className='bg-gray-500/40 border border-gray-400 w-[80px] rounded-full text-xs flex items-center justify-center gap-2 opacity-70'>
                        <FaDotCircle className='text-[10px]' />
                        inactive
                    </span>
                </div>

                <div className='h-[calc(100vh-490px)] overflow-y-scroll space-y-2 mt-2'>
                    {itemsReward.map((value, index) => {
                        return <div key={index} className='grid grid-cols-2 h-[100px] gap-2'>
                            <div className='bg-white/80 rounded-md border border-gray-400  flex flex-col justify-center items-center '>
                                <span className={``} style={{ color: value.color }}>{value.title}</span>
                                <span className={`font-batman text-3xl italic`} style={{ color: value.color }}>{value.percent}%</span>
                                <span className={`text-xs text-gray-500`} >{value.desc}   </span>
                            </div>
                            <div className='bg-white/80 rounded-md flex flex-col justify-center items-center'>
                                <span className={`text-gray-500`} >Reward</span>
                                <span className={`text-gray-500`} >0.0000 </span>
                                <span className={`text-gray-500 text-xl`} > GPoint</span>

                            </div>
                        </div>
                    })}
                </div>

            </motion.div>
        </AnimatePresence>
    )
}
export default Reward;
