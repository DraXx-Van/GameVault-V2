import 'remixicon/fonts/remixicon.css'

const LongGameCard = ({id,name,image,status,hours,rating}) => {

  const statusStyle = {
    playing:   "bg-yellow-500/10 text-yellow-500/90",
    completed: "bg-green-500/10 text-green-500/90",
    backlog:   "bg-yellow-500/10 text-yellow-500/90",
    dropped:   "bg-red-500/10 text-red-500/90"
  }
  return (
    <div key={id} className='aspect-2/3 w-full relative overflow-hidden group rounded-2xl bg-[#18181b] border border-white/5 transition-all duration-500 hover:-translate-y-1.25 ease cursor-pointer'>
      <img className='relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
      src={image} alt="Not found" />

      <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80'></div>
      <div className='absolute top-3 right-3 flex gap-2 items-center p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100'>
        <button className='flex items-center justify-center rounded backdrop-blur-md shadow-xl w-8 h-8 hover:bg-yellow-300 cursor-pointer bg-[#18181b]/90' >
          <i className="ri-pencil-line"></i>
        </button>
        <button className='flex items-center justify-center rounded hover:bg-red-500 backdrop-blur-md w-8 h-8 shadow-xl cursor-pointer bg-[#18181b]/90' >
          <i className="ri-delete-bin-6-line"></i>
        </button>
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-4'>
        <span className={`inline-block px-1.5 py-1 text-[8px] rounded uppercase font-black tracking-widest mb-2 shadow-sm border border-white/6 ${statusStyle[status.toLowerCase()]}`}>{status}
        </span>
        <h4 className='font-bold text-[14px] leading-tight text-white mb-2 drop-shadow-md line-clamp-2'>{name}</h4>
        <div className='flex items-center justify-between text-[10px] text-[#94a3b8] font-bold pt-2 border-t border-white/10'>
            <div className='flex items-center space-x-1.5 opacity-70'>
                <i className="ri-time-line text-yellow-500/80"></i>
                <span>{hours}</span>
            </div>
            <div className='flex items-center space-x-1 text-yellow-500/80'>
                <i className="ri-star-fill"></i>
                <span className="flex items-center text-[10px]">{rating}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LongGameCard
