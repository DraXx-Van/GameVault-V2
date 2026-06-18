import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { getGameDetails, getScreenshots, getStores,getSimilarGames, getAchievements } from "@/services/rawgApi";
import { useParams } from "react-router-dom";
import GameContent from "@/components/gameDetails/GameContent";
import Loader from "@/components/shared/loader";

export default function GameDetails() {

  const { id } = useParams();
  const [game,setGame] = useState(null);
  const [screenshots,setScreenshots] = useState([]);
  const [stores,setStores] = useState([]);
  const [error,setError] = useState(null);
  const [similarGames,setSimilarGames] = useState([]);
  const [loading,setLoading] = useState(false);
  const [achievements,setAchievements] = useState([]);

  useEffect( () => {
    async function loadGameDetails(){
      setLoading(true);
      try{
        const data = await getGameDetails(id);
        const stores = await getStores(id);
        setGame(data);
        setStores(stores);
        setLoading(false);
      }catch(err){
        setError(err);
      }
    }

    loadGameDetails();
  },[id]);

  useEffect( () => {
    async function loadScreenshots() {
      try{
        const data = await getScreenshots(id);
        const achievement = await getAchievements(id);
        setScreenshots(data);
        setAchievements(achievement);
      }catch(err){
        console.log(err);
      }
    }
    loadScreenshots();
  },[id])

  useEffect(() => {
    if (!game) return;

    async function loadSimilarGames() {
      const genres = game.genres
        .map(g => g.slug)
        .join(",");

      const data = await getSimilarGames(
        genres,
        game.id
      );

      setSimilarGames(data);
    }

    loadSimilarGames();
  },[game]);

  if(error) {
    return (
      <MainLayout>
        <h3 className="text-xl font-mono text-center mt-10">Game Not Found</h3>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {!loading && game ? <GameContent achievements={achievements} similarGames={similarGames} stores={stores} screenshots={screenshots} game={game}/> : <div className="h-full w-full flex items-center justify-center"><Loader /> </div>}
    </MainLayout>
  );
}