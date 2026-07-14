import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedHeading from "../shared/FeaturedHeading";
import { getGameAdditions, getCroppedImageUrl } from "../../services/rawgApi";

const VaultDLCs = ({ gameId }) => {
  const [dlcs, setDlcs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDLCs() {
      if (!gameId) return;
      try {
        setLoading(true);
        const data = await getGameAdditions(gameId);
        setDlcs(data || []);
      } catch (error) {
        console.error("Failed to load DLCs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDLCs();
  }, [gameId]);

  if (loading) return null;
  if (dlcs.length === 0) return null;

  return (
    <div className="w-full mt-2 flex flex-col gap-4">
      <FeaturedHeading heading="DLCs & Expansions" />

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory scroll-smooth">
        {dlcs.map((dlc) => (
          <Link
            to={`/game/${dlc.id}`}
            key={dlc.id}
            className="shrink-0 w-[280px] md:w-[320px] flex flex-col rounded-xl overflow-hidden bg-gv-surface border border-white/5 group hover:-translate-y-1 transition-all duration-300 snap-start"
          >
            {/* DLC Image */}
            <div className="aspect-video overflow-hidden">
              <img
                src={getCroppedImageUrl(dlc.background_image)}
                alt={dlc.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* DLC Info */}
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-white font-bold text-sm truncate group-hover:text-primary transition-colors">
                {dlc.name}
              </h4>
              <div className="flex items-center gap-3 text-white/40 text-[10px] font-mono uppercase tracking-wider">
                {dlc.released && (
                  <span>{new Date(dlc.released).getFullYear()}</span>
                )}
                {dlc.metacritic && (
                  <span className="text-primary/70 font-bold">
                    Meta {dlc.metacritic}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VaultDLCs;
