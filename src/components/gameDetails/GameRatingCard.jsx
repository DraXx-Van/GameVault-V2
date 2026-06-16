import React from 'react'

const GameRatingCard = ({ game }) => {
  if (!game) return null;

  const ratings = game.ratings || [];
  const topRating = ratings.length > 0 
    ? ratings.reduce((prev, current) => (prev.count > current.count ? prev : current))
    : null;
  const ratingTitle = topRating ? topRating.title : "recommended";
  const formattedRatingTitle = ratingTitle.charAt(0).toUpperCase() + ratingTitle.slice(1);

  const getRatingStyle = (title) => {
    switch (title.toLowerCase()) {
      case "exceptional":
        return { color: "text-emerald-400", icon: "ri-award-fill" };
      case "recommended":
        return { color: "text-blue-400", icon: "ri-thumb-up-fill" };
      case "meh":
        return { color: "text-amber-500", icon: "ri-meh-fill" };
      case "skip":
        return { color: "text-rose-500", icon: "ri-thumb-down-fill" };
      default:
        return { color: "text-blue-400", icon: "ri-thumb-up-fill" };
    }
  };

  const ratingStyle = getRatingStyle(ratingTitle);
  const ratingsCount = game.ratings_count || 0;
  const playtime = game.playtime ? `${game.playtime}H` : "N/A";

  return (
    <div className='p-6 flex flex-col gap-5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md'>
      <div className='flex justify-between items-center'>
        <span className='uppercase text-[9px] tracking-[0.15rem] text-[#94a3b88e] font-black font-mono'>Community Pulse</span>
        <span className='px-2 py-1 rounded bg-[#191919] uppercase text-[9px] tracking-widest text-[#94a3b88e] font-black font-mono'>VIA RAWG</span>
      </div>
      <div>
        <div className='flex flex-wrap items-center gap-2'>
          <p className={`text-xl font-black ${ratingStyle.color}`}>{formattedRatingTitle}</p>
          <i className={`${ratingStyle.icon} ${ratingStyle.color} text-lg`}></i>
        </div>
        <span className='uppercase text-[10px] tracking-widest text-[#94a3b8] font-bold font-mono pl-0.5'>
          {ratingsCount.toLocaleString()} Ratings
        </span>
      </div>

      <div className="border-t border-white/5"></div>
      
      <div>
        <div className='flex items-center gap-2 flex-wrap'>
          <p className='uppercase italic text-xl font-black font-mono text-white/90'>{playtime}</p>
          <i className="ri-time-line text-white/50 text-lg"></i>
        </div>
        <span className='uppercase text-[10px] tracking-widest text-[#94a3b88e] font-bold font-mono pl-0.5'>Average Playtime</span>
      </div>
    </div>
  );
};

export default GameRatingCard;
