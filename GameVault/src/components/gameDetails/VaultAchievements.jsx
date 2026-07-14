import { useEffect, useState } from "react";
import FeaturedHeading from "../shared/FeaturedHeading";
import { getAchievements, getCroppedImageUrl } from "../../services/rawgApi";

const VaultAchievements = ({ gameId }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      if (!gameId) return;
      try {
        setLoading(true);
        const data = await getAchievements(gameId);
        setAchievements(data);
      } catch (error) {
        console.error("Failed to load achievements:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAchievements();
  }, [gameId]);

  if (loading) return null;
  if (achievements.length === 0) return null;

  return (
    <div className="w-full mt-4 flex flex-col gap-4">
      <FeaturedHeading heading="Game Achievements" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {achievements.slice(0, 9).map(ach => (
          <div key={ach.id} className="flex items-center gap-3 p-3 rounded-xl bg-gv-surface border border-white/5 hover:bg-white/5 transition-colors group">
            <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/5">
              <img 
                loading="lazy" 
                decoding="async" 
                src={getCroppedImageUrl(ach.image)} 
                alt={ach.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-white/90 font-bold text-sm truncate">{ach.name}</h4>
              <p className="text-white/50 text-[11px] mt-0.5 truncate" title={ach.description}>{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultAchievements;
