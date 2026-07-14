import { useEffect, useState } from "react";
import FeaturedHeading from "../shared/FeaturedHeading";
import { getScreenshots } from "../../services/rawgApi";

const VaultMediaGallery = ({ gameId }) => {
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    async function loadScreenshots() {
      if (!gameId) return;
      try {
        setLoading(true);
        const data = await getScreenshots(gameId);
        setScreenshots(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to load screenshots:", error);
      } finally {
        setLoading(false);
      }
    }
    loadScreenshots();
  }, [gameId]);

  if (loading) return null;
  if (screenshots.length === 0) return null;

  return (
    <div className="w-full mt-2 flex flex-col gap-4">
      <FeaturedHeading heading="Screenshots" />

      {/* Horizontal scroll gallery — clean, no overlays */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory scroll-smooth">
        {screenshots.map((screen) => (
          <div
            key={screen.id}
            onClick={() => setSelectedImg(screen.image)}
            className="shrink-0 w-[320px] md:w-[420px] aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/5"
          >
            <img
              src={screen.image}
              alt="Screenshot"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer animate-in fade-in duration-200"
        >
          <img
            src={selectedImg}
            alt="Full screenshot"
            className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
          />
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl">
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default VaultMediaGallery;
