import { Link } from "react-router-dom";
import FeaturedHeading from "../shared/FeaturedHeading";
import GenreCard from "./GenreCard";

const curatedGenres = [
  {
    id: 1,
    name: "Action",
    slug: "action",
    image_background: "https://media.rawg.io/media/games/1aa/1aa4ca34a8a6bb57a2e065c8332dc230.jpg" // God of War
  },
  {
    id: 2,
    name: "Adventure",
    slug: "adventure",
    image_background: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg" // RDR 2
  },
  {
    id: 3,
    name: "RPG",
    slug: "role-playing-games-rpg",
    image_background: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" // Witcher 3
  },
  {
    id: 4,
    name: "Shooter",
    slug: "shooter",
    image_background: "https://media.rawg.io/media/games/3ea/3ea3c9bbd940b6cb7f2139e42d3d443f.jpg" // DOOM Eternal
  },
  {
    id: 5,
    name: "Racing",
    slug: "racing",
    image_background: "https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg" // Forza Horizon 5
  },
  {
    id: 6,
    name: "Fighting",
    slug: "fighting",
    image_background: "https://media.rawg.io/media/games/eb5/eb514db62d397c64288160d5bd8fd67a.jpg" // Mortal Kombat 11
  },
  {
    id: 7,
    name: "Sports",
    slug: "sports",
    image_background: "https://media.rawg.io/media/games/104/10404407d458d90f4559a1f587c2650a.jpg" // EA Sports FC 24
  },
  {
    id: 8,
    name: "Strategy",
    slug: "strategy",
    image_background: "https://media.rawg.io/media/games/997/997ab4d67e96fb20a4092383477d4463.jpg" // Civilization VI
  }
];

const BrowseCategoriesSection = () => {
  return (
    <div className="flex flex-col shrink-0 w-full mt-4">
      <div className="flex items-center justify-between group px-2">
        <FeaturedHeading heading={"Browse By Categories"} />
        <Link to="/discover" className="text-[12px] font-sans font-bold text-primary hover:text-white transition-colors cursor-pointer flex items-center gap-1">
          Explore All <i className="ri-arrow-right-s-line text-[16px]"></i>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full px-2 py-6">
        {curatedGenres.map((genre) => (
          <GenreCard 
            key={genre.id} 
            genre={genre} 
            className="w-full" 
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseCategoriesSection;
