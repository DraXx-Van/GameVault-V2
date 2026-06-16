import GameDeatilsHero from './GameDeatilsHero';
import GamePriceCard from './GamePriceCard';
import GameRatingCard from './GameRatingCard';
import GameDev from './GameDev';
import { useState } from 'react';

const AboutSection = ({ game }) => {
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

      {(minimumReq || recommendedReq) && (
        <div>
          <h3 className='uppercase text-gv-muted font-bold tracking-widest pt-8 border-t border-white/10 font-mono'>
            System Requirements
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
      )}
    </div>
  );
};

const Image = ({ src }) => {
  return (
    <div className='w-100 md:w-150 shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.02] snap-center transform-gpu'>
      <img className='w-full h-full object-cover' loading='lazy' decoding='async' src={src} alt="Game screenshot" />
    </div>
  );
};

const MediaGallery = ({ game }) => {
  const images = [];
  if (game.background_image) images.push(game.background_image);
  if (game.background_image_additional) images.push(game.background_image_additional);

  if (images.length === 0) return null;

  return (
    <div className='mt-8 pt-8 border-t border-white/10'>
      <h3 className='uppercase text-gv-muted font-bold tracking-widest mb-5 font-mono'>Media Gallery</h3>
      <div className='flex gap-6 overflow-x-auto scrollbar-hide pb-5 snap-x snap-mandatory scroll-smooth'>
        {images.map((src, index) => (
          <Image key={index} src={src} />
        ))}
      </div>
    </div>
  );
};

const GameContent = ({ game }) => {
  return (
    <div className='flex-1 flex flex-col gap-6 rounded-3xl h-full overflow-x-hidden overflow-y-auto pb-10'>
      <GameDeatilsHero game={game} />
      <div className='px-10 py-2'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <AboutSection game={game} />
          <div className='flex-col gap-5 flex'>
            <GameRatingCard game={game} />
            <GameDev game={game} />
            <GamePriceCard game={game} />
          </div>
        </div>
        <MediaGallery game={game} />
      </div>
    </div>
  );
};

export default GameContent