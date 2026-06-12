import MainLayout from '../components/layout/MainLayout'
import vaultGames from '../data/vaultGames'
import LongGameCard from '../components/vaultsection/LongGameCard'
import FeaturedHeading from '../components/shared/FeaturedHeading'

const Library = () => {
  return (
    <MainLayout>
      <div className='mt-5'>
        <FeaturedHeading heading={"Library"}/>
      </div>
       <div className='Library-grid gap-6 px-2 py-6'>
          {
          vaultGames.map((game)=>{
            return <LongGameCard
                id={game.id}
                name={game.name}
                image={game.image}
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