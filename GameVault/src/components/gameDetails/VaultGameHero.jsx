import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "./Buttons/ActionButton";

const VaultGameHero = ({ game, status, onStatusChange, onBack, playTime = 0, onPlayTimeChange, lastPlayed }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const navigate = useNavigate();

  const formatLastPlayed = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) return "Today";
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  const statuses = ["Backlog", "Playing", "Completed", "Dropped"];

  const getStatusStyle = (s) => {
    switch (s) {
      case "Playing": return { text: "text-primary", border: "border-primary", bg: "bg-primary/10", icon: "ri-play-fill" };
      case "Completed": return { text: "text-blue-400", border: "border-blue-400", bg: "bg-blue-400/10", icon: "ri-check-double-line" };
      case "Dropped": return { text: "text-rose-400", border: "border-rose-400", bg: "bg-rose-400/10", icon: "ri-close-circle-line" };
      case "Backlog": return { text: "text-amber-400", border: "border-amber-400", bg: "bg-amber-400/10", icon: "ri-stack-line" };
      default: return { text: "text-white", border: "border-white/20", bg: "bg-white/5", icon: "ri-gamepad-line" };
    }
  };

  const style = getStatusStyle(status);

  return (
    <div className="relative rounded-3xl shadow-2xl min-h-[65vh] transition-all duration-1000 p-8 md:p-10 flex flex-col justify-between group/bg shrink-0 bg-gv-surface">

      {/* Background artwork — overflow-hidden only on this inner wrapper so dropdown doesn't clip */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <img
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 transition-all duration-700 group-hover/bg:scale-[1.02]"
          src={game.background_image}
          alt={game.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gv-bg via-gv-bg/60 to-gv-bg/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* ── Top Row ── */}
      <div className="z-10 flex justify-between items-start">
        <ActionButton onClick={onBack} action="Back" icon="ri-arrow-left-long-line" />
        <ActionButton onClick={() => navigate(`/game/${game.id}`)} action="View Game Page" icon="ri-external-link-line" />
      </div>

      {/* ── Bottom Content ── */}
      <div className="z-10 flex flex-col gap-6 mt-auto max-w-4xl">

        {/* Genres as tiny pills */}
        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genres.slice(0, 4).map(g => (
              <span key={g.id} className="bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider text-white/60 uppercase font-mono">
                {g.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-white font-black tracking-wide leading-[1.1] uppercase font-display select-none"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            textShadow: "0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {game.name}
        </h1>

        {/* ── Action Bar ── */}
        <div className="flex flex-wrap items-center gap-6">
          
          {/* Status Button */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className={`flex items-center gap-2.5 pl-5 pr-4 py-3 rounded-xl border ${style.border} ${style.bg} ${style.text} backdrop-blur-md text-[13px] font-black uppercase tracking-widest transition-all cursor-pointer hover:brightness-125`}
            >
              <i className={`${style.icon} text-lg`}></i>
              {status}
              <i className={`ri-arrow-down-s-line text-base transition-transform ${showStatusMenu ? "rotate-180" : ""}`}></i>
            </button>

            {showStatusMenu && (
              <div className="absolute left-0 top-full mt-2 w-full min-w-[180px] bg-[#0e0e10] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                {statuses.map(s => {
                  const st = getStatusStyle(s);
                  return (
                    <div
                      key={s}
                      onClick={() => { onStatusChange(s); setShowStatusMenu(false); }}
                      className={`px-4 py-3 text-[12px] font-bold tracking-wider cursor-pointer uppercase flex items-center gap-2.5 transition-colors hover:bg-white/5 ${s === status ? `${st.text} bg-white/5` : "text-white/60"}`}
                    >
                      <i className={`${st.icon}`}></i>
                      {s}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>

          {/* Play Time */}
          <div className="flex items-center gap-3 group/pt">
            <div className="flex flex-col">
              <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase">Play Time</span>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-2xl leading-none font-display">{playTime}</span>
                <span className="text-white/40 text-[10px] font-mono">HRS</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 opacity-0 group-hover/pt:opacity-100 transition-opacity">
              <button onClick={() => onPlayTimeChange(playTime + 1)} className="w-5 h-5 rounded bg-white/10 hover:bg-primary hover:text-black flex items-center justify-center text-white/50 cursor-pointer transition-colors text-[10px]"><i className="ri-add-line"></i></button>
              <button onClick={() => onPlayTimeChange(Math.max(0, playTime - 1))} className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 cursor-pointer transition-colors text-[10px]"><i className="ri-subtract-line"></i></button>
            </div>
          </div>

          {/* Last Played */}
          <div className="flex flex-col">
            <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase">Last Played</span>
            <span className="text-white/80 font-bold text-sm">{formatLastPlayed(lastPlayed)}</span>
          </div>

          {/* Avg Completion from RAWG */}
          {game.playtime > 0 && (
            <div className="flex flex-col">
              <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase">Avg. Completion</span>
              <span className="text-primary/80 font-bold text-sm">{game.playtime} Hours</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultGameHero;
