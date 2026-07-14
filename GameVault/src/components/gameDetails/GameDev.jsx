import React from 'react'

const GameDev = ({ game }) => {
  if (!game) return null;

  const developers = game.developers?.map(d => d.name).join(", ") || "N/A";
  const publishers = game.publishers?.map(p => p.name).join(", ") || "N/A";
  const releaseDate = game.released || "N/A";

  return (
    <div className='p-6 border border-white/5 bg-[#121214] flex flex-col gap-4 rounded-2xl backdrop-blur-md'>
      <div>
        <h3 className='text-[9px] mb-1 opacity-40 uppercase font-black tracking-widest text-[#94a3b8] font-mono'>Developer</h3>
        <span className='text-[12px] font-bold text-white/90 font-sans'>{developers}</span>
      </div>
      <div>
        <h3 className='text-[9px] mb-1 opacity-40 uppercase font-black tracking-widest text-[#94a3b8] font-mono'>Released</h3>
        <span className='text-[12px] font-bold text-white/90 font-mono'>{releaseDate}</span>
      </div>
      <div>
        <h3 className='text-[9px] mb-1 opacity-40 uppercase font-black tracking-widest text-[#94a3b8] font-mono'>Publisher</h3>
        <span className='text-[12px] font-bold text-white/90 font-sans'>{publishers}</span>
      </div>
    </div>
  );
};

export default GameDev;
