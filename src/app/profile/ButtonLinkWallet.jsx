import React, { useState } from 'react'
import SkewButton from '../../components/SkewButton';
import Modal from '../../components/Modal';
import MetaIcon from "./../../assets/MetaMask_Fox.svg"
import iconBox from "./../../assets/iconBox.png"

const ButtonLinkWallet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const handlePaste = async () => {
        setError("");
        try {
          if (!navigator.clipboard || !navigator.clipboard.readText) {
            throw new Error("Trình duyệt không hỗ trợ clipboard API.");
          }
          const text = await navigator.clipboard.readText(); // yêu cầu phải chạy trên HTTPS/localhost và do user click
          setValue(text);
          // đưa con trỏ vào cuối
          requestAnimationFrame(() => {
            inputRef.current?.focus();
            const len = text.length;
            inputRef.current?.setSelectionRange(len, len);
          });
        } catch (e) {
          setError("Không thể lấy nội dung clipboard. Hãy cấp quyền hoặc thử Ctrl/Cmd+V.");
          console.error(e);
        }
      };
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} animation='zoom'>
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className='w-24 h-24 bg-black rounded-full flex justify-center items-center'>
                        <img src={iconBox} alt="" className="w-16  object-contain " />
                    </div>
                    <h4 className='text-lg text-blue-400 font-bold '>Enter wallet address</h4>
                    <div className='w-full rounded-md border border-blue-500 bg-transparent h-[40px] relative'>
                            <input type='text' className='w-full bg-transparent h-full outline-none px-2 text-white '   value={value}
        onChange={(e) => setValue(e.target.value)}/>
                            <button type='button' className='absolute right-2 top-[20%] text-blue-500 font-medium hover:text-blue-400'   onClick={handlePaste}>Paste</button>
                    </div>
                    <SkewButton className='bg-blue-400 flex w-1/2 text-base items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(false)}> <span>Save</span></SkewButton>
                </div> 
            </Modal>
            <SkewButton className='bg-blue-400 flex w-1/2 text-xs items-center justify-center gap-2 !px-2 h-full' onClick={() => setIsOpen(true)}> <img src={MetaIcon} alt='' className='w-8' /> <span>Gift code</span></SkewButton>
        </>
    )
}

export default ButtonLinkWallet
