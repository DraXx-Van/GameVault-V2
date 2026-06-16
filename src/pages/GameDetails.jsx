import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { getGameDetails } from "@/services/rawgApi";
import { useParams } from "react-router-dom";
import GameContent from "@/components/gameDetails/GameContent";

export default function GameDetails() {

  const { id } = useParams();
  const [game,setGame] = useState(null);

  useEffect( () => {
    async function loadGameDetails(){
      const data = await getGameDetails(id);
      setGame(data);
    }
    loadGameDetails();
  },[id])

  return (
    <MainLayout>
      {game ? <GameContent game={game}/> : <h3>Loading</h3> }
    </MainLayout>
  );
}