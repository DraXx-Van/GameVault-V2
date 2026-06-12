import React from 'react'

const HeroFilterBtn = ({isActive,label}) => {
   return (
    <button className={`flex items-center rounded-full px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer 
    ${isActive 
          ? 'bg-[#f59e0b] text-White shadow-lg shadow-[#f59e0b]/20' 
          : 'text-white/50 hover:text-white hover:bg-white/10'
        }`}>{label}
    </button>
  )
}

export default HeroFilterBtn