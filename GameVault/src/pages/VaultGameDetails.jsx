import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { getGameDetails } from "../services/rawgApi";
import VaultGameHero from "../components/gameDetails/VaultGameHero";
import VaultMediaGallery from "../components/gameDetails/VaultMediaGallery";
import VaultAchievements from "../components/gameDetails/VaultAchievements";
import VaultDLCs from "../components/gameDetails/VaultDLCs";

const VaultGameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock User Data (In a real app, this would come from a database)
  const [userData, setUserData] = useState({
    status: "Playing",
    hoursPlayed: 45,
    rating: "masterpiece",
    dateLastPlayed: new Date().toISOString(),
    dateStarted: "2023-10-12",
    dateCompleted: "",
  });

  useEffect(() => {
    async function loadGame() {
      try {
        setLoading(true);
        const data = await getGameDetails(id);
        setGame(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [id]);

  if (loading || !game) {
    return (
      <MainLayout>
        <div className="w-full h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 p-2 pb-10">
        <VaultGameHero 
            game={game} 
            status={userData.status} 
            onStatusChange={(s) => setUserData({ ...userData, status: s, dateLastPlayed: new Date().toISOString() })} 
            onBack={() => navigate(-1)}
            playTime={userData.hoursPlayed}
            onPlayTimeChange={(val) => setUserData({ ...userData, hoursPlayed: val, dateLastPlayed: new Date().toISOString() })}
            lastPlayed={userData.dateLastPlayed}
        />
        
        <VaultMediaGallery gameId={game.id} />
        
        <VaultDLCs gameId={game.id} />
        
        <VaultAchievements gameId={game.id} />
      </div>
    </MainLayout>
  );
};

export default VaultGameDetails;
