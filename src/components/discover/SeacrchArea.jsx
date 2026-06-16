import SearchBar from "../shared/SearchBar";
import { Select, SelectTrigger,SelectValue,SelectContent,SelectItem } from "../ui/select";

const SeacrchArea = ({search,setSearch,genres,selectedGenre,setSelectedGenre,platform,setPlatform,setPage}) => {

  const parentPlatforms = [
    { id: 1, name: "PC" },
    { id: 2, name: "PlayStation" },
    { id: 3, name: "Xbox" },
    { id: 7, name: "Nintendo" },
  ];

  return (
    <div className="mt-4 flex flex-row space-x-3 justify-between pr-5">
      <SearchBar search={search} setSearch={setSearch} setPage={setPage}/>
      <div className="flex items-center gap-2">
        <Select
          value={selectedGenre || "all"}
          onValueChange={(value) => {
            setSelectedGenre(value === "all" ? "" : value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>

            {genres.map((genre) => (
              <SelectItem
                key={genre.id}
                value={genre.slug}
              >
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={platform || "all"}
          onValueChange = {(value) => {
            setPlatform(value === "all" ? "" : value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder = "All Platforms" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {parentPlatforms.map((platform) => 
              <SelectItem
                key={platform.id}
                value ={String(platform.id)}
              >
                {platform.name}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SeacrchArea;
