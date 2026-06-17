import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { getGameDetails, getScreenshots, getStores } from "@/services/rawgApi";
import { useParams } from "react-router-dom";
import GameContent from "@/components/gameDetails/GameContent";
import Loader from "@/components/shared/loader";

export default function GameDetails() {

  const { id } = useParams();
  const [game,setGame] = useState(null);
  const [screenshots,setScreenshots] = useState([]);
  const [stores,setStores] = useState([]);
  const [error,setError] = useState(null);

  useEffect( () => {
    async function loadGameDetails(){
      try{
        const data = await getGameDetails(id);
        const stores = await getStores(id);
        setGame(data);
        setStores(stores);
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
        setScreenshots(data);
      }catch(err){
        console.log(err);
      }
    }
    loadScreenshots();
  },[id])

  if(error) {
    return (
      <MainLayout>
        <h3 className="text-xl font-mono text-center mt-10">Game Not Found</h3>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {game ? <GameContent stores={stores} screenshots={screenshots} game={game}/> : <Loader /> }
    </MainLayout>
  );
}