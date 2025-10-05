import SkewButton from "../../components/SkewButton";
import Item from "./../../assets/item.png"

export default function CarSkinShowcase({ setIsOpen }) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <h4 className='text-lg text-blue-400 font-bold '> Preview main car picture</h4>
            <div className="relative w-[126px] h-[126px]">

                <div className="absolute inset-0 rounded-full shadow-[0_0_22px_6px_rgba(56,189,248,.85)]" />

                <div
                    className="absolute inset-0 rounded-full z-10
                       [background:conic-gradient(from_0deg,#ffe680_0,#facc15_90deg,#f59e0b_180deg,#facc15_270deg,#ffe680_360deg)]
                       [mask:radial-gradient(circle,transparent_65%,#000_66%)]"
                />

                <div className="absolute z-10 inset-[6px] rounded-full bg-[linear-gradient(180deg,#0f172a,#0b1220)] ring-1 ring-white/10" />

                <img src={Item} alt="" className="absolute inset-0 m-auto w-[82px]  object-contain z-10" />


                <div className="absolute inset-0 pointer-events-none z-1   [animation:orbit-pause_2.4s_cubic-bezier(.05,.85,.25,1)_infinite]">
                    {/* đặt chấm tại tâm rồi đẩy lên theo bán kính */}
                    <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transform: 'translate(-50%, -50%) translateY(-58px)', // bán kính ~58px cho kích thước 126px
                        }}
                    >
                        <span
                            class="block w-2.5 h-2.5 rounded-full bg-sky-400/45
         shadow-[0_0_10px_3px_rgba(56,189,248,.85),0_0_18px_8px_rgba(56,189,248,.45)]" />
                    </div>
                </div>
            </div>


            <div className=" w-[120px] h-[72px] relative   bg-gradient-to-tr from-sky-500 to-sky-500/50 to-90% bg-clip-padding p-1 pb-2">
                <div className="bg-gradient-to-tr from-black to-black/50 to-90% w-full h-full  flex flex-col justify-center items-center">
                    <img src={Item} alt="" className="w-14 object-contain" />
                    <div className="w-[14px] h-[14px] rounded-[3px] bg-green-500 
                          [clip-path:polygon(20%_55%,40%_75%,80%_30%,90%_40%,40%_88%,10%_62%)]" />
                </div>
            </div>
            <SkewButton className='bg-blue-400 flex w-1/2 text-xs items-center justify-center gap-2 !px-2 ' onClick={() => setIsOpen(false)}> <span>SAVE</span></SkewButton>

        </div>

    );
}
