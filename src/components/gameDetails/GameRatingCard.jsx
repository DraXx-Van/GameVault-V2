import React, { useState } from 'react';

const GameRatingCard = ({ game }) => {
  if (!game) return null;

  // Simulated backend state for the 5 tiers so the UI feels alive.
  const [votes, setVotes] = useState({
    masterpiece: 124,
    exceptional: 56,
    recommended: 12,
    mixed: 4,
    skip: 2
  });
  
  // Tracks if the user clicked "Rate Game" to see the full breakdown
  const [showRatingMenu, setShowRatingMenu] = useState(false);
  // Tracks the current user's local vote
  const [userVote, setUserVote] = useState(null);

  const ratingTiers = [
    { id: "masterpiece", title: "Masterpiece", color: "text-[#f59e0b]", icon: "ri-trophy-fill" },
    { id: "exceptional", title: "Exceptional", color: "text-emerald-400", icon: "ri-award-fill" },
    { id: "recommended", title: "Recommended", color: "text-blue-400", icon: "ri-thumb-up-fill" },
    { id: "mixed", title: "Mixed", color: "text-amber-500", icon: "ri-meh-fill" },
    { id: "skip", title: "Skip", color: "text-rose-500", icon: "ri-thumb-down-fill" }
  ];

  const handleVote = (tierId) => {
    setVotes(prev => {
      const newVotes = { ...prev };
      
      if (userVote) newVotes[userVote]--;
      
      if (userVote !== tierId) {
        newVotes[tierId]++;
        setUserVote(tierId);
      } else {
        setUserVote(null);
      }
      
      return newVotes;
    });
  };

  // Calculations for Default View
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const positiveVotes = votes.masterpiece + votes.exceptional + votes.recommended;
  const recommendedPercentage = totalVotes === 0 ? 0 : Math.round((positiveVotes / totalVotes) * 100);

  const playtime = game.playtime ? `${game.playtime}H` : "N/A";

  return (
    <div className='p-6 flex flex-col gap-5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md'>
      
      {/* Header */}
      <div className='flex justify-between items-center h-6'>
        <span className='uppercase text-[9px] tracking-[0.15rem] text-[#94a3b88e] font-black font-mono'>Community Pulse</span>
        <span className='px-2 py-1 rounded bg-white/5 border border-white/10 uppercase text-[9px] tracking-widest text-white/40 font-black font-mono'>
          GAMEVAULT
        </span>
      </div>
      
      <div className='flex flex-col gap-4'>
        {/* Dynamic Content Area (Default View vs Breakdown View) */}
        <div className='min-h-[70px] flex flex-col justify-center transition-all duration-300'>
          {showRatingMenu ? (
            
            /* VIEW 2: The 5-Tier Breakdown & Interactive Voting */
            <div className='flex flex-wrap gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300'>
              {ratingTiers.map(tier => {
                const count = votes[tier.id];
                const isSelected = userVote === tier.id;
                
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleVote(tier.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all border ${
                      isSelected 
                        ? 'bg-white/10 border-white/30 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]' 
                        : 'bg-[#191919] border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <i className={`${tier.icon} ${tier.color} text-[13px] ${isSelected ? 'opacity-100 scale-110 transition-transform' : 'opacity-80'}`}></i>
                    <span className={`${tier.color} font-black text-[10px] uppercase tracking-wider ${isSelected ? 'opacity-100' : 'opacity-80'}`}>
                      {tier.title}
                    </span>
                    <span className={`font-mono text-[10px] ml-1 ${isSelected ? 'text-white' : 'text-white/30'}`}>
                      {count.toLocaleString()}
                    </span>
                  </button>
                )
              })}
            </div>

          ) : (

            /* VIEW 1: Default Aggregated View */
            <div className='animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-1'>
              <div className='flex flex-wrap items-center gap-2 mb-1'>
                <p className={`text-3xl font-black ${
                  recommendedPercentage >= 75 ? 'text-emerald-400' : 
                  recommendedPercentage >= 40 ? 'text-amber-500' : 
                  'text-rose-500'
                }`}>
                  {recommendedPercentage}%
                </p>
                
                <div className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-400/10 border border-blue-400/20'>
                  <i className="ri-thumb-up-fill text-blue-400 text-xs"></i>
                  <span className='text-blue-400 font-black uppercase tracking-wider text-[10px]'>Recommended</span>
                </div>
              </div>
              
              <span className='uppercase text-[10px] tracking-widest text-[#94a3b8] font-bold font-mono pl-0.5 mt-0.5'>
                Based on {totalVotes.toLocaleString()} Ratings
              </span>
            </div>

          )}
        </div>

        {/* Prominent Full-Width Rate Button */}
        <button 
          onClick={() => setShowRatingMenu(!showRatingMenu)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all border font-black font-mono text-[10px] uppercase tracking-widest ${
            showRatingMenu 
              ? 'bg-white/10 border-white/20 text-white' 
              : userVote 
                ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/20' 
                : 'bg-[#191919] border-white/10 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          {showRatingMenu ? (
            <><i className="ri-arrow-up-s-line text-sm"></i> Close Rating Menu</>
          ) : userVote ? (
            <><i className="ri-check-double-line text-sm"></i> You Voted</>
          ) : (
            <><i className="ri-star-fill text-sm"></i> Rate Game</>
          )}
        </button>
      </div>

      <div className="border-t border-white/5"></div>
      
      {/* Playtime (Always visible) */}
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
