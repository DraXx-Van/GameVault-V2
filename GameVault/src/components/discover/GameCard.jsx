import { Link } from "react-router-dom"
import { getCroppedImageUrl } from "../../services/rawgApi"

const GameCard = ({ game, id, image, name, className }) => {
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
    <Link to={`/game/${gameId}`} className={`block ${className || ""}`}>
        <div className='font-sans group flex flex-col gap-3 hover:-translate-y-1 hover:bg-[#1a1b22]/40 border border-white/5 transition-all duration-300 ease-in-out shrink-0 p-3 rounded-2xl cursor-pointer bg-gv-surface'>
        <div className='aspect-video w-full rounded-xl relative overflow-hidden bg-gv-card'>
            <img 
              loading="lazy" 
              decoding="async" 
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
              src={getCroppedImageUrl(coverImage)} 
              alt={title || 'Game cover'} 
            />
            {/* Subtle gradient overlay on hover for premium feel */}
            <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
        </div>
        
        <div className='px-1 flex flex-col space-y-1.5'>
            <h4 className='font-bold truncate text-[15px] text-white/95 group-hover:text-primary transition-colors'>{title}</h4>
            
            <div className='flex items-center justify-between mt-1'>
                <div className='flex items-center gap-1.5 text-[11px] font-medium text-white/50 truncate pr-2'>
                    {releaseDate && (
                      <span>{releaseDate}</span>
                    )}
                    {releaseDate && genres && (
                      <span className="text-white/20">•</span>
                    )}
                    {genres && (
                      <span className='truncate'>{genres}</span>
                    )}
                </div>

                {/* GV Rating count */}
                <div className='flex items-center gap-1 shrink-0 bg-white/5 px-2 py-0.5 rounded-md border border-white/5'>
                  <i className="ri-shield-star-fill text-primary text-[12px]"></i>
                  <span className='text-[10px] font-bold text-white/80'>
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
