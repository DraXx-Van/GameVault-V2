import MainLayout from '../components/layout/MainLayout'
import LongGameCard from '../components/vaultsection/LongGameCard'
import discoverGames from '@/data/discoverGames'
import LibraryHeading from '@/components/Library/LibraryHeading'
import { useEffect, useState } from 'react'
import { getCroppedImageUrl, getGames } from '@/services/rawgApi'

const Library = () => {
  
  const [filter,setFilter] = useState("all");
  const [library,setLibrary] = useState([]);

  useEffect( () => {
    async function loadLibrary() {
      const data = await getGames("","","","top");
      setLibrary(data.results);
    }
    loadLibrary();
  })

  return (
    <MainLayout>
      <LibraryHeading filter={filter} setFilter={setFilter}/>
       <div className='Library-grid gap-6 px-2 py-6'>
          {
          library.map((game)=>{
            return <LongGameCard
                id={game.id}
                name={game.name}
                image={getCroppedImageUrl(game.background_image)}
                status={game.status}
                rating={game.rating}
                hours={game.hours}
              />

          })}
        
        </div>
    </MainLayout>
  )
}

export default Library