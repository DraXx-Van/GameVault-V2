
const SearchBar = ({search,setSearch,setPage}) => {
  return (
   <div className='relative group flex-1'>
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm"></i>
        <input type="text" 
          className='bg-[#121214] py-2 pl-9  w-full pr-4 rounded-lg outline-none text-xs border placeholder:text-white/50 border-white/5 transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 hover:bg-gv-card'
          placeholder='Search Game....'
          value={search}
          onChange={(event)=> {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
    </div>
  )
}

export default SearchBar
