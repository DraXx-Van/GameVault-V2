import React from 'react'

const GoldButton = ({label,icon}) => {
  return (
    <button className=' bg-[#f59e0b]/80 px-8 py-3 uppercase rounded-lg flex gap-2 cursor-pointer group text-black font-black tracking-widest text-[12px] shadow-lg items-center hover:bg-[#f59e0b]'>

        {icon && (<i className={`${icon} text-[14px] group-hover:rotate-90 transition-transform`}></i>)}
        <span className=''>{label}</span>
        
    </button>
  )
}

export default GoldButton
