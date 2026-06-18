import MainLayout from "../components/layout/MainLayout";
import GameCard from "../components/discover/GameCard";
import { getGames,getGenres } from "../services/rawgApi";
import { useEffect, useState } from "react";
import SeacrchArea from "../components/discover/SeacrchArea";
import Ordering from "../components/discover/Ordering";
import GameCardSkeleton from "@/components/discover/GameCardSkeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Discover = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [platform,setPlatform] = useState("");
  const [sortOptions,setSortOptions] = useState("");
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  let filteredGames = [...games];

  if (sortOptions === "top") {
    filteredGames = games.filter(
      game =>
        game.rating >= 4 &&
        game.ratings_count >= 30
    );
  }

  //Fetch Genres From API
  useEffect(() => {
    async function loadGeneres() {
      const genres = await getGenres();
      setGenres(genres);
    }

    loadGeneres();
  }, []);

  const loadGames = async () => {
    try{
      setLoading(true);
      const games = await getGames(search,
      selectedGenre,
      platform,
      sortOptions,
      page
    );
      setPreviousPage(games.previous);
      setNextPage(games.next)
      setGames(games.results);
    }catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
   
  };

  //Load Games API Call
  useEffect(() => {
    const timer = setTimeout(() => {
      loadGames();
    }, 500);

    return () => clearTimeout(timer);
  },[search,selectedGenre,platform,sortOptions,page]);

  return (
    <MainLayout>
      <SeacrchArea
        search={search}
        setSearch={setSearch}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        platform = {platform}
        setPlatform ={setPlatform}
        setPage={setPage}
      />
      <Ordering 
        sortOptions={sortOptions} 
        setSortOptions={setSortOptions}
        setPage={setPage}
      />
      {!loading  && filteredGames.length === 0 &&  (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-xl font-semibold text-white">
            No games found
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Try a different search term or filter.
          </p>
        </div>
      )}
      <div className="discover-grid gap-4 space-x-2 mb-5">
        
        {loading 
          ? Array.from({length : 12}).map((_,index) => {
            return <GameCardSkeleton key={index} />
          })
          :filteredGames.map((game) => {
            return (
              <GameCard
                id={game.id}
                key={game.id}
                name={game.name}
                image={game.background_image}
                rating={game.rating}
                game={game}
              />
            );
        })}
      </div>
      <Pagination>
        <PaginationContent className={"flex gap-4 cursor-pointer"}>
          <PaginationItem>
            <PaginationPrevious className={!previousPage ? "opacity-50" : ""} onClick={ ()=> previousPage && setPage(prev => prev -1)}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              onClick={() =>
                nextPage && setPage(prev => prev + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MainLayout>
  );
};

export default Discover;
