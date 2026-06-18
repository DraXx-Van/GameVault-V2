import GameDeatilsHero from './GameDeatilsHero';
import GamePriceCard from './GamePriceCard';
import { getCroppedImageUrl } from '../../services/rawgApi';
import GameRatingCard from './GameRatingCard';
import GameDev from './GameDev';
import { useRef, useState } from 'react';
import GameCard from '../discover/GameCard';

const AboutSection = ({ game,achievements }) => {
  const [fullDetails, setDetails] = useState(true);
  const description = game.description_raw || game.description || "No description available.";
  
  const pcPlatform = game.platforms?.find(p => p.platform.slug === 'pc');
  const minimumReq = pcPlatform?.requirements?.minimum;
  const recommendedReq = pcPlatform?.requirements?.recommended;

  return (
    <div className='md:col-span-2'>
      <h3 className='uppercase tracking-[0.2rem] text-xs font-black text-gv-muted mb-4 font-mono'>About</h3>
      <div className={`leading-[1.8] text-gv-muted text-[15px] mb-4 transition-all duration-700 font-sans
        ${fullDetails && "max-h-70 overflow-hidden"}`}>
        <p className="whitespace-pre-line">{description}</p>
      </div>
      <button onClick={() => setDetails(!fullDetails)} className='uppercase text-xs text-gv-accent font-bold tracking-wider flex items-center transition-colors cursor-pointer mb-8 gap-1 hover:text-white font-mono'>
        Show {fullDetails ? "more" : "less"}
        <i className={`ri-arrow-${fullDetails ? "down" : "up"}-s-line text-lg`}></i>
      </button>

      {(minimumReq || recommendedReq) ? (
        <div>
          <h3 className='uppercase text-gv-muted font-bold tracking-widest pt-8 border-t border-white/10 font-mono'>
            System Requirements For Pc
          </h3>
          <div className='mt-5 grid grid-cols-1 gap-8 md:grid-cols-2 text-white/60 leading-relaxed text-[13px] font-mono'>
            {minimumReq && (
              <div className="space-y-2 opacity-80 whitespace-pre-line">
                {minimumReq}
              </div>
            )}
            {recommendedReq && (
              <div className="space-y-2 opacity-80 whitespace-pre-line">
                {recommendedReq}
              </div>
            )}
          </div>
        </div>
      ) : <h3 className='text-center opacity-80 whitespace-pre-line'>System Requirements Not Available</h3>}
      {achievements && achievements.length > 0 && (
        <div className='mt-8 pt-5 border-t border-white/10'>
          <h3 className='uppercase text-gv-muted font-bold tracking-widest font-mono mb-4 flex items-center gap-2'>
            Game Achievements
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {achievements.slice(0, 6).map(ach => (
              <div key={ach.id} className='flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group'>
                <div className='w-11 h-11 shrink-0 rounded md:rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]'>
                  <img loading="lazy" decoding="async" src={getCroppedImageUrl(ach.image)} alt={ach.name} className='w-full h-full object-contain group-hover:scale-103 transition-transform duration-500' />
                </div>
                <div className='flex-1 min-w-0 flex flex-col justify-center'>
                  <h4 className='text-white/90 font-bold text-xs truncate'>{ach.name}</h4>
                  <p className='text-white/50 text-[10px] mt-0.5 truncate' title={ach.description}>{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Image = ({ src }) => {
  return (
    <div className='w-[320px] md:w-125 lg:w-175 shrink-0 rounded-xl
      overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.02] snap-center transform-gpu'>
      <img className='w-full h-full object-cover' loading='lazy' decoding='async' src={src} alt="Game screenshot" />
    </div>
  );
};

const MediaGallery = ({ screenshots }) => {
  
 if( screenshots.length === 0 ){
    return null;
 }
  return (
    <div className='mt-8 pt-5 border-t border-white/10'>
      <h3 className='uppercase text-gv-muted font-bold tracking-widest mb-3 font-mono'>Media Gallery</h3>
      <div className='flex gap-6 overflow-x-auto scrollbar-hide pb-5 p-5 snap-x snap-mandatory scroll-smooth'>
        {screenshots.map((src) => (
          <Image key={src.id} src={src.image} />
        ))}
      </div>
    </div>
  );
};

const RealatedGames = ({similarGames}) => {
  return (
    <div className='mt-8 pt-5 border-t border-white/10' >
      <h3 className='uppercase text-gv-muted font-bold tracking-widest font-mono'>Similar Games</h3>
      <div className='flex gap-4 overflow-x-auto scrollbar-thumb-gv-accent snap-x pb-6 w-full px-2 py-6'>
        {similarGames.map( game => {
          return (
            <div key={game.id} className='w-72 shrink-0'>
            <GameCard
              name={game.name}
              image={game.background_image} 
              id={game.id}
              game={game}
            />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GameContent = ({ game,screenshots,stores,similarGames,achievements }) => {

  const storesref  = useRef(null);

  return (
    <div className='flex-1 flex flex-col gap-6 rounded-3xl h-full overflow-x-hidden overflow-y-auto pb-10'>
      <GameDeatilsHero game={game} storesRef={storesref} />
      <div className='px-10 py-2'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <AboutSection achievements={achievements} game={game} />
          <div className='flex-col gap-5 flex sticky top-6 self-start'>
            <GameRatingCard game={game} />
            <GameDev game={game} />
            <div ref={storesref}>
              <GamePriceCard stores={stores} game={game.stores} />
            </div>
          </div>
        </div>
        <MediaGallery screenshots={screenshots}/>
        <RealatedGames similarGames={similarGames}/>
      </div>
    </div>
  );
};

export default GameContent