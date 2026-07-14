import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'

const LongGameCard = ({id,name,image,status="dropped",hours,rating}) => {

  const statusIcons = {
    playing:   "ri-gamepad-line",
    completed: "ri-check-double-line",
    backlog:   "ri-stack-line",
    dropped:   "ri-close-circle-line"
  }

  return (
    <Link to={`/vault/game/${id}`} key={id} className='w-full flex flex-col font-sans group transition-all duration-300 cursor-pointer hover:-translate-y-1 mb-2'>
      <div className='aspect-[3/4] w-full relative overflow-hidden rounded-md'>
        <img className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105' 
          src={image} alt={name} />
          
        {/* Hover Actions */}
        <div className='absolute top-3 right-3 flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0'>
          <button className='flex items-center justify-center rounded-lg backdrop-blur-md shadow-xl w-8 h-8 hover:bg-primary hover:text-black cursor-pointer bg-black/50 text-white border border-white/10 transition-colors' >
            <i className="ri-pencil-line"></i>
          </button>
          <button className='flex items-center justify-center rounded-lg hover:bg-red-500 hover:text-white backdrop-blur-md w-8 h-8 shadow-xl cursor-pointer bg-black/50 text-white border border-white/10 transition-colors' >
            <i className="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </div>
      
      <div className='flex flex-col mt-3 px-1'>
        <h4 className='font-sans font-semibold text-[15px] leading-tight text-white truncate'>{name}</h4>
        
        <div className='font-sans flex items-center gap-1.5 mt-1 text-xs text-white/60'>
          <i className={`${statusIcons[status.toLowerCase()] || "ri-checkbox-circle-line"}`}></i>
          <span className='capitalize'>{status}</span>
        </div>
        
        <div className='font-sans flex items-center justify-between mt-3 text-[11px] font-medium text-white/50'>
            <div className='flex items-center gap-1.5'>
                {hours && (
                  <>
                    <i className="ri-time-line"></i>
                    <span>{hours}</span>
                  </>
                )}
            </div>
            <div className='flex items-center gap-1'>
                <i className="ri-star-fill text-primary"></i>
                <span className="text-white/80">{rating}</span>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default LongGameCard
