import React from 'react'
import 'remixicon/fonts/remixicon.css'

const MarketCard = ({store,price,link}) => {
    return (
        <div className='flex justify-between p-2 rounded-lg border border-transparent items-center hover:bg-white/5 transition-all group text-white/40 hover:text-white'>
            <span className='text-[10px] uppercase transition-colors font-black tracking-widest font-mono'>STEAM</span>
            <div className='flex gap-2 items-center'>
                <span className='text-[10px] font-black font-mono'>$49.99</span>
                <span>
                    <a href="https://www.cheapshark.com/redirect?dealID=L8nVwSbts2e77PSdOgg8XnSWHftI2VVftwbkWl0b0Is%3D" target="_blank" rel="noopener noreferrer">
                        <i className="opacity-55 text-xs ri-external-link-fill hover:opacity-100"></i>
                    </a>
                </span>
            </div>
        </div>
    )
}

const GamePriceCard = ({ game }) => {
  return (
    <div className='p-6 flex flex-col gap-5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md'>
        <div className='flex gap-3 items-center'>
            <span className='uppercase text-[9px] tracking-[0.15rem] text-[#94a3b88e] font-black font-mono'>Best Deal</span>
            <span className='px-2 py-1 rounded bg-[#191919] uppercase text-[9px] tracking-widest text-[#94a3b88e] font-black font-mono'>VIA Cheapshark</span>
        </div>
        <div>
            <div className='flex flex-wrap items-end gap-2'>
                <p className='text-2xl font-black text-emerald-400 font-mono'>$16.49</p>
                <p className='line-through text-[#94a3b8] text-[10px] opacity-40 tracking-wide font-mono'>$49.99</p>
            </div>
        </div>

        <div className="border-t border-white/5"></div>
        
        <div>
            <h3 className='uppercase text-[10px] tracking-wider text-[#94a3b8] font-black font-mono'>Other platforms</h3>
            <div className='py-2'>
                <MarketCard />
                <MarketCard />
            </div>
        </div>
    </div>
  )
}

export default GamePriceCard
