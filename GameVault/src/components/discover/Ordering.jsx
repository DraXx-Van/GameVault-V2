import FeaturedHeading from '../shared/FeaturedHeading'
import FilterButton from '../shared/FilterButton'

const Ordering = ({sortOptions,setSortOptions,setPage}) => {

const options = [
  { label: "All Games", value: "" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
  { label: "Upcoming", value: "upcoming" },
];

  return (
    <div className="mt-5 mb-3 flex flex-row justify-between items-center px-2">
        <FeaturedHeading heading={"Discover Games"} />
        <div className='bg-gv-card/30 rounded-lg flex gap-1 p-1 border-white/5 border'>
        {options.map((option) => 
            <FilterButton
                label={option.label}
                isActive = {sortOptions === option.value}
                onSelect={()=> {
                  setSortOptions(option.value);
                  setPage(1);
                }}
                key = {option.label} 
            />
        )}
        </div>
    </div>
  )
}

export default Ordering