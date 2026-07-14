import FilterButton from '../shared/FilterButton'
import GameCard from './GameCard'
import FeaturedHeading from '../shared/FeaturedHeading'
import discoverGames from '../../data/discoverGames'

const DiscoverSection = () => {
  return (
    <div className='flex flex-col shrink-0 w-full mt-4'>
        <div className='flex items-center justify-between group px-2'>
          <FeaturedHeading heading={"Discover Deals"}/>
          <div className='bg-gv-card/30 rounded-lg flex gap-1 p-1 border-white/5 border'>
            <FilterButton isActive={true} label={"Deals"}/>
            <FilterButton isActive={false} label={"Top rated"}/>
            <FilterButton isActive={false} label={"Trending"}/>
          </div>
        </div>

        <div className='flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-6 w-full px-2 py-6'>
          {discoverGames.map((game)=>{
            return <GameCard 
              key={game.id}
              name={game.name} 
              image={game.image}
              rating={game.rating}
              className="w-[280px] md:w-[320px]"
            />
          })}
        </div>
    </div>
  )
}

export default DiscoverSection