import React, { useState } from 'react'
import HistoryIcon from "./../../assets/historyIcon.png"
import Modal from '../../components/Modal';
import SkewButton from '../../components/SkewButton';
const TransactionItem = ({ value }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}  >
                <div className="flex flex-col justify-center items-center h-full">
                    <img src={HistoryIcon} alt="" className="w-24  object-contain " />
                    <h4 className='text-lg text-blue-400 font-bold '>Transaction detail</h4>
                    <p className="text-white text-center  mb-6">{value.title} with {value.amount} {value.unit}</p>
                    <SkewButton className="w-full border border-blue-400 text-blue-400 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-sm shadow-md" onClick={() => setIsOpen(false)}>
                        Back
                    </SkewButton>
                </div>
            </Modal>
            <div className='grid grid-cols-6 h-[100px] gap-2' onClick={()=>setIsOpen(true)}>
                <div className='bg-white/80 rounded-md border border-gray-40 text-blue-400  flex flex-col justify-center items-center col-span-2 '>
                    <span className={``} >{value.dateLabel}</span>

                </div>
                <div className='bg-white/80 rounded-md flex flex-col justify-center items-start col-span-4 px-2'>
                    <span className={`text-gray-600`} >{value.title}</span>
                    <span className={`text-gray-600`} >with {value.amount} {value.unit}</span>
                    <span className={`text-blue-400 text-xs`} >{value.datetime}</span>

                </div>
            </div>
        </>
    )
}

export default TransactionItem
