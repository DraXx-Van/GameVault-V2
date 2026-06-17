import "remixicon/fonts/remixicon.css";

const StoreRow = ({ store, link,id }) => {

  const getPlatformIcon = (id) => {
    switch (id) {
      case 1:    return "ri-steam-fill";
      case 3:    return "ri-playstation-fill";
      case 2:    return "ri-xbox-fill";
      case 6:    return "ri-switch-fill"
      case 4:    return "ri-app-store-fill"
      case 8:    return "ri-google-play-fill"
      default:   return "ri-store-2-line";
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center justify-between
        p-3 rounded-lg
        border border-transparent
        hover:border-gv-accent/20
        hover:bg-gv-accent/5
        transition-all duration-300
        group
      "
      >
      <div className="flex items-center gap-3">
        <i className={`${getPlatformIcon(Number(id))} text-white/40 group-hover:text-gv-accent transition-colors`}></i>
        <span className="text-xs uppercase tracking-wider font-black font-mono text-white/80">
          {store}
        </span>
      </div>

      <i className="ri-external-link-line text-white/30 group-hover:text-white transition-colors"></i>
    </a>
  );
};

const GamePriceCard = ({ game,stores }) => {

  return (
    <div className="p-6 flex flex-col gap-5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">

      <div className="flex justify-between items-center">
        <span className="uppercase text-[9px] tracking-[0.15rem] text-[#94a3b88e] font-black font-mono">
          Available On
        </span>

        <span className="px-2 py-1 rounded bg-[#191919] uppercase text-[9px] tracking-widest text-[#94a3b88e] font-black font-mono">
          {stores?.length || 0} Stores
        </span>
      </div>

      <div className="border-t border-white/5"></div>

      <div className="flex flex-col gap-2">
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreRow
              id={store.store_id}
              key={store.id}
              store={game.find((s) => s.store.id === store.store_id).store?.name}
              link={store.url}
            />
          ))
        ) : (
          <div className="text-center py-4 text-white/40 font-mono text-xs uppercase tracking-wider">
            No Store Links Available
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePriceCard;