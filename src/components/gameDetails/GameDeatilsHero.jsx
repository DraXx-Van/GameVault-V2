import { useEffect, useRef, useState } from "react";
import GoldButton from "./Buttons/GoldButton";
import GlassButton from "./Buttons/GlassButton";
import ActionButton from "./Buttons/ActionButton";
import { getGameTrailer, searchYouTubeTrailer } from "@/services/rawgApi";

const   GameDeatilsHero = ({ game }) => {
  
  const [youtubeId, setYoutubeId]= useState(null);
  const [rawgUrl, setRawgUrl] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const iframeKey = useRef(0); // force iframe re-mount on game change
  const[ui,setUi] = useState(true);

  useEffect(() => {
    if (!game) return;

    // Reset on game switch
    setYoutubeId(null);
    setRawgUrl(null);
    setVideoLoaded(false);
    setIsMuted(true);
    iframeKey.current++;

    // ── Priority 1: RAWG clip field (embedded in game details, no extra call)
    const clipUrl =
      game.clip?.clips?.full ||
      game.clip?.clips?.["640"] ||
      game.clip?.clip ||
      null;

    // ── Priority 2: RAWG /movies endpoint + YouTube search run in parallel
    Promise.all([
      getGameTrailer(game.id),
      searchYouTubeTrailer(game.name),
    ]).then(([rawg, ytId]) => {
      // YouTube beats everything else because it has trailers for every game
      if (ytId) {
        setYoutubeId(ytId);
      } else if (rawg) {
        setRawgUrl(rawg);
      } else if (clipUrl) {
        // Only fall back to RAWG clip if nothing else found
        setRawgUrl(clipUrl);
      }
    });
  }, [game?.id]);

  const getPlatformIcon = (slug) => {
    switch (slug) {
      case "pc":          return "ri-computer-line";
      case "playstation": return "ri-playstation-fill";
      case "xbox":        return "ri-xbox-fill";
      case "nintendo":    return "ri-nintendo-fill";
      case "android":
      case "ios":         return "ri-smartphone-line";
      default:            return "ri-gamepad-line";
    }
  };

  const toggleMute = () => {
    if (youtubeId) {
      // Post message to YouTube iframe to toggle mute
      const iframe = document.getElementById("yt-bg-iframe");
      if (iframe) {
        const cmd = isMuted ? "unMute" : "mute";
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: cmd }),
          "*"
        );
        setIsMuted(!isMuted);
      }
    } else if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const hasMedia = youtubeId || rawgUrl;

  // Build YouTube embed URL with all background-video settings
  const ytSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}`
    : null;

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${videoLoaded ? "min-h-[90%]" : "min-h-[60%]" } transition-all duration-1000 p-10 flex flex-col justify-between group shrink-0 bg-gv-surface`}>

      {/* ── Background artwork (always visible as base / while media loads) */}
      <img
        className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${
          videoLoaded ? "opacity-0" : "opacity-90 group-hover:scale-[1.02]"
        }`}
        src={game.background_image}
        alt={game.name}
      />

      {/* ── YouTube iframe background ── */}
      {ytSrc && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            id="yt-bg-iframe"
            key={iframeKey.current}
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              /* Scale up to cover at 16:9 — works for any container size */
              width: "max(100%, calc(100vh * 16 / 9))",
              height: "max(100%, calc(100vw * 9 / 16))",
              transform: "translate(-50%, -50%)",
              border: "none",
              opacity: videoLoaded ? 0.9 : 0,
              transition: "opacity 0.7s ease",
            }}
            src={ytSrc}
            allow="autoplay; encrypted-media"
            title={`${game.name} trailer`}
            onLoad={() => {
              setTimeout( ()=> {
                setVideoLoaded(true);setUi(false);
              },3000)
              }}
          />
        </div>
      )}

      {/* ── RAWG MP4 clip / movie fallback ──
      {!youtubeId && rawgUrl && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
            videoLoaded ? "opacity-10" : "opacity-0"
          }`}
          src={rawgUrl}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        />
      )} */}

      {/* ── Gradient overlays ── */}
      <div className={`absolute inset-0 bg-linear-to-t from-gv-bg ${ui ? "via-gv-bg50" : "via-gv-bg/10"} to-transparent transition duration-1000`}/> 
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

      {/* ── Top Row ── */}
      <div className="z-10 flex justify-between items-start">
        <ActionButton
          link={"/discover"}
          action={"Back"}
          icon={"ri-arrow-left-long-line transition-transform"}
        />

        <div className="flex items-center gap-2">  
          <button
            onClick={ () => setUi(!ui) }
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:border-white/30 transition-all text-[11px] font-mono tracking-wider"
          >

            <i className="ri-eye-off-line text-sm"></i>
            {ui ? "Hide" : "Show"}
          </button>
          {/* Mute toggle — only when media is live */}
          {hasMedia && videoLoaded && (
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:border-white/30 transition-all text-[11px] font-mono tracking-wider"
            >
              <i className={`${isMuted ? "ri-volume-mute-line" : "ri-volume-up-line"} text-sm`}></i>
              {isMuted ? "UNMUTE" : "MUTE"}
            </button>
          )}

          {/* Status pill */}
          {hasMedia && (
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-full border backdrop-blur-md text-[11px] font-mono tracking-wider transition-all ${
              videoLoaded
                ? "bg-gv-accent/15 border-gv-accent/30 text-gv-accent"
                : "bg-white/5 border-white/10 text-white/40"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${videoLoaded ? "bg-gv-accent animate-pulse" : "bg-white/30 animate-pulse"}`}></span>
              {videoLoaded ? "TRAILER LIVE" : "LOADING..."}
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Content ── */}
      
      <div className={`z-10 flex flex-col space-y-6 ${ui ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 items-center">
          {game.metacritic && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gv-accent/10 border border-gv-accent/30 backdrop-blur-md font-mono">
              <img
                className="w-3.5 h-3.5 object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png"
                alt="Metacritic"
              />
              <span className="text-gv-accent font-black text-xs tracking-wider">
                {game.metacritic} <span className="text-[10px] font-normal text-white/50">META</span>
              </span>
            </div>
          )}

          {game.parent_platforms?.length > 0 && (
            <div className="flex gap-3 px-3.5 py-1.5 border border-white/10 bg-black/40 items-center backdrop-blur-md rounded-full font-mono text-white/70">
              {game.parent_platforms.map(({ platform }) => (
                <i
                  key={platform.id}
                  className={`${getPlatformIcon(platform.slug)} text-sm hover:text-gv-accent transition-colors`}
                  title={platform.name}
                ></i>
              ))}
            </div>
          )}

          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] tracking-wider text-white/70 uppercase font-mono"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Title & release */}
        <div className="space-y-2">
          <h1
            className="text-white font-black tracking-wide leading-tight uppercase font-display select-none"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              textShadow: "0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {game.name}
          </h1>
          {game.released && (
            <div className="flex items-center gap-2 text-white/40 text-[11px] font-mono uppercase tracking-wider pl-0.5">
              <span>Released:</span>
              <span className="text-white/70 font-bold">
                {new Date(game.released).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <GoldButton label={"Add to library"} icon={"ri-add-line"} />
          <GlassButton label={"View Stores"} icon={"ri-arrow-right-up-line"} />
        </div>
      </div>
    </div>
  );
};

export default GameDeatilsHero;
