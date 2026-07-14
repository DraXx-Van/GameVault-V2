import 'remixicon/fonts/remixicon.css'
import Filterbtn from './HeroFilterBtn'

const Hero = () => {
  return (
    <div className='relative w-full h-[60%] min-h-100 rounded-2xl p-10 flex flex-col justify-end shrink-0'>

        <div className='absolute inset-0 bg-black overflow-hidden rounded-2xl'>
            <img className='absolute w-full h-full object-cover inset-0 rounded-2xl opacity-60 transition-opacity duration-100' 
                src="https://gaming-cdn.com/img/products/5679/pcover/5679.jpg?v=1713793245" alt="" />
        </div>

        <div className='absolute inset-0 bg-[linear-gradient(to_top,#050505_0%,rgba(5,5,5,0.4)_40%,transparent_100%),linear-gradient(to_right,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.5)_40%,transparent_100%)]'></div>
        
        <div className='z-20 h-11.25 w-full flex justify-end' >

            <div className='bg-black/40 backdrop-blur-md rounded-full flex gap-1 p-1 border-white/10 shadow-2xl'>
                <Filterbtn label={"Top deals"} isActive={true}/>
                <Filterbtn label={"Trending"}  isActive={false}/>
                <Filterbtn label={"Top Rated"} isActive={false}/>
            </div>
            
        </div>

        <div className='flex flex-col relative gap-5 h-full max-w-lg justify-end'>

            <div className='flex gap-2'>
                <span className='bg-black/60 text-primary text-[10px] uppercase px-3 py-1 rounded-md backdrop-blur-md border 
                    border-primary/50 tracking-wide flex items-center font-bold font-sans'>Top rated masterpiece
                </span>
                <span className='uppercase text-[10px] px-3 py-2 rounded-md backdrop-blur-md bg-black/40 border 
                    font-bold border-white/10 tracking-wide text-white/90 font-sans'>Steam rating: 92%
                </span>
            </div>

            <div className='min-h-25 flex items-center'>
                <img className='max-w-75 max-h-30 object-contain drop-shadow-2xl' 
                src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/logo.png" alt="" />
            </div>

            <div className='flex gap-3 mt-2'>
                <button className='bg-primary hover:bg-white transition-colors px-6 py-3 rounded-lg text-black uppercase space-x-4 flex items-center cursor-pointer font-bold shadow-xl font-sans'>
                        <span className='tracking-widest text-[11px] font-black'>GET DEAL</span>
                        <span className='font-bold border-l border-black/20 pl-4'>$14.99
                            <span className='line-through opacity-40 ml-4'>$59.99</span>
                        </span>
                </button>
                <button className='font-sans font-semibold uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg px-6 text-[12px] backdrop-blur-md flex items-center hover:bg-white/15 text-white transition-all shadow-xl cursor-pointer'>
                    <i className="ri-add-line mr-1"></i> View Game
                </button>
            </div>
        </div>
    </div>
  )
}

export default Hero
