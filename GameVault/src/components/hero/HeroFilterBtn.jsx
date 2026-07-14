import React from 'react'

const HeroFilterBtn = ({isActive,label}) => {
   return (
    <button className={`flex items-center rounded-full px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer 
    ${isActive 
          ? 'bg-primary text-black shadow-md' 
          : 'text-white/50 hover:text-white hover:bg-white/10'
        }`}>{label}
    </button>
  )
}

export default HeroFilterBtn