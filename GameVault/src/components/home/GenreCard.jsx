import { Link } from "react-router-dom";
import { getCroppedImageUrl } from "../../services/rawgApi";

const GenreCard = ({ genre, className }) => {
  return (
    <Link to={`/discover?genre=${genre.slug}`} className={`block group ${className || ""}`}>
      <div className="font-sans relative overflow-hidden rounded-2xl cursor-pointer bg-gv-surface border border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="aspect-video w-full relative">
          <img
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            src={getCroppedImageUrl(genre.image_background)}
            alt={genre.name}
          />
          {/* Dark gradient overlay anchored to the bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300"></div>
          
          {/* Dark hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Text content placed at bottom left */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h4 className="font-bold text-white text-[15px] tracking-wide truncate drop-shadow-md">
              {genre.name}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GenreCard;
