import React from 'react'

const GlassButton = ({label,icon,onClick}) => {
  return (
   <button onClick={onClick} className=' bg-black/40 border border-white/10 backdrop-blur-xl transition-all px-8 py-3 uppercase rounded-lg flex gap-2 cursor-pointer group text-white font-black tracking-widest text-[12px] shadow-2xl items-center hover:border-white/20'>
        <span className=''>
            {label}
        </span>
        {icon && (<i className={`${icon} text-[14px] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`}></i>)}
    </button>
  )
}

export default GlassButton
