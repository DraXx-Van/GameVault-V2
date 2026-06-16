import { Link } from "react-router-dom"

const GameCard = ({id,image,name,rating}) => {
  return (
    <Link to={`/game/${id}`}>
        <div className='group flex flex-col gap-3 hover:-translate-y-1 hover:bg-[#1a1b22]/40 border border-white/5 transition-all duration-200 ease-in-out shrink-0 p-3 rounded-xl cursor-pointer bg-gv-surface'>
        <div className='h-37.5 rounded-xl relative overflow-hidden bg-gv-card'>
            <img className='w-full h-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500' src={image} alt={name || 'Game cover'} />
            <div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'></div>
        </div>
        
        <div className='pl-2 flex flex-col space-y-2'>
            <h4 className='uppercase font-bold tracking-wide truncate text-[15px]'>{name}</h4>
            <span className='text-[10px] uppercase tracking-widest font-black opacity-70 text-gv-muted'>STEAM:
                <span className='text-yellow-400'>{rating}</span>
            </span>
            <div className='flex gap-2 justify-between'>
                <div className='flex items-center space-x-2'>
                    <span className='px-3 py-1 bg-gv-accent/20 font-black text-xs rounded text-gv-accent'>
                    $29.69
                    </span>
                    <span className='line-through text-[10px] text-gv-muted tracking-wide'>
                        $50.99 
                    </span>
                </div>
                <span className='bg-green-500/10 text-green-500 rounded px-2 py-1 font-black flex items-center text-[10px]'>
                    -34%
                </span>
            </div>
        </div>
        </div>
    </Link>
  )
}

export default GameCard
