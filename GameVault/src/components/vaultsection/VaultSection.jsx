import FilterButton from '../shared/FilterButton'
import FeaturedHeading from '../shared/FeaturedHeading'
import LongGameCard from './LongGameCard'
import vaultGames from '../../data/vaultGames'


const VaultSection = () => {

  return (
    <div className='flex flex-col shrink-0 w-full'>
        <div className='flex items-center justify-between group px-2'>
          <FeaturedHeading heading={"My vault"}/>
          <div className='bg-[#18181b]/30 rounded-lg flex gap-1 p-1 border-white/5 border'>
            <FilterButton label={"all"} isActive = {true}/>
            <FilterButton label={"playing"} />
            <FilterButton label={"completed"} />
            <FilterButton label={"dropped"}/>
          </div>
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
      </div>
  )
}

export default VaultSection