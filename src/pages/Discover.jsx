import MainLayout from '../components/layout/MainLayout'
import FeaturedHeading from '../components/shared/FeaturedHeading'
import discoverGames from '../data/discoverGames'
import GameCard from '../components/discover/GameCard'

const Discover = () => {
  return (
    <MainLayout>
      <div className='mt-5'>
        <FeaturedHeading heading={"Discover Games"}/>
      </div>
      <div className='flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-6 w-full px-2 py-6'>
          {discoverGames.map((game)=>{
            return <GameCard 
              key={game.id}
              name={game.name} 
              image={game.image}
              rating={game.rating}
            />
          })}
      </div>
    </MainLayout>
  )
}

export default Discover