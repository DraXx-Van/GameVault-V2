
const FilterButton = ({isActive = false,label,onSelect}) => {

  return (
    <div>
      <button
      onClick={onSelect}
      value={label}
      className={`flex items-center rounded-md px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer 
      ${isActive 
      ? 'bg-gv-accent text-black ' 
      : 'text-white/50 hover:text-white hover:bg-white/10'
      }`}>{label}
    </button>
    </div>
  )
}

export default FilterButton
