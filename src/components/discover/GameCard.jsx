import { Link } from "react-router-dom"
import { getCroppedImageUrl } from "../../services/rawgApi"

const GameCard = ({ game, id, image, name }) => {
  // Fallback for DiscoverSection dummy data if `game` object isn't passed directly
  const gameData = game || { id, name, background_image: image };
  
  const title = gameData.name || name;
  const coverImage = gameData.background_image || image;
  const gameId = gameData.id || id;
  
  const releaseDate = gameData.released ? new Date(gameData.released).getFullYear() : '';
  const genres = gameData.genres?.map(g => g.name).slice(0, 2).join(', ');

  // Placeholder rating data — will be replaced by real DB values once backend is ready
  const ratingCount = 10;

  return (
    <Link to={`/game/${gameId}`} className="block">
        <div className='group flex flex-col gap-3 hover:-translate-y-1 hover:bg-[#1a1b22]/40 border border-white/5 transition-all duration-200 ease-in-out shrink-0 p-3 rounded-xl cursor-pointer bg-gv-surface'>
        <div className='h-37.5 rounded-xl relative overflow-hidden bg-gv-card'>
            <img 
              loading="lazy" 
              decoding="async" 
              className='w-full h-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500' 
              src={getCroppedImageUrl(coverImage)} 
              alt={title || 'Game cover'} 
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        
        <div className='pl-1 flex flex-col space-y-2 mt-1'>
            <h4 className='uppercase font-bold tracking-wide truncate text-[14px] text-white/90'>{title}</h4>
            
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {releaseDate && (
                      <span className='px-2 py-0.5 bg-white/5 border border-white/10 font-black font-mono text-[9px] rounded text-white/60'>
                        {releaseDate}
                      </span>
                    )}
                    {genres && (
                      <span className='text-[9px] uppercase tracking-widest font-bold opacity-50 text-white truncate max-w-[110px]'>
                          {genres}
                      </span>
                    )}
                </div>

                {/* GV Rating count */}
                <div className='flex items-center gap-1'>
                  <i className="ri-shield-star-fill text-gv-accent text-[11px]"></i>
                  <span className='text-[9px] font-mono font-bold text-white/50'>
                    {ratingCount}
                  </span>
                </div>
            </div>
        </div>
        </div>
    </Link>
  )
}

export default GameCard
