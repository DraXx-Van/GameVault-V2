import FeaturedHeading from '../shared/FeaturedHeading'
import FilterButton from '../shared/FilterButton'

const LibraryHeading = ({filter,setFilter}) => {
  return (
    <div className='flex items-center justify-between group px-2 mt-5'>
        <FeaturedHeading heading={"Your Library"}/>
        <div className='bg-gv-card/30 rounded-lg flex gap-1 p-1 border-white/5 border'>
            <FilterButton label={"all"} isActive = {filter === "all"} onSelect={()=> setFilter("all")}/>
            <FilterButton label={"playing"}  isActive = {filter === "playing"} onSelect={()=> setFilter("playing")}/>
            <FilterButton label={"completed"} isActive = {filter === "completed"} onSelect={()=> setFilter("completed")}/>
            <FilterButton label={"dropped"} isActive = {filter === "dropped"} onSelect={()=> setFilter("dropped")}/>
        </div>
    </div>
  )
}

export default LibraryHeading