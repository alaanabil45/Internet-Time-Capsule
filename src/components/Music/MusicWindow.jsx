import { useState } from "react";

import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Shuffle,
    Repeat,
    ExternalLink,
    Home,
    Search,
    Library,
    Heart,
    Plus,
    MoreHorizontal,
    ChevronDown,
    ListMusic
} from "lucide-react";

import useAudioPlayer from "../../hooks/useAudioPlayer";
import useJamendoPlaylist from "../../hooks/useJamendoPlaylist";

function MusicWindow({ yearData }) {
    const year = yearData?.year;

    const {
        playlist: jamendoPlaylist = [],
        loading,
        error,
    } = useJamendoPlaylist(year);

    // Use Jamendo when available.
    // Otherwise use the local playlist for that year.
    const playlist =
        jamendoPlaylist.length > 0
            ? jamendoPlaylist
            : (yearData?.music ?? []);

    const mode = yearData?.desktop?.theme?.mode;

    const is2009 = mode === "aero";
    const is2004 = mode === "xp";
    const is2019 = year === 2019;

    // IMPORTANT:
    // currentSong MUST come from the hook BEFORE we use it.
    const {
        currentSong,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        togglePlay,
        next,
        previous,
        seek,
        changeVolume,
        selectSong,
        formatTime,
    } = useAudioPlayer(playlist);

    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] =
        useState(volume);

    const openSource = () => {
        if (!currentSong?.sourceUrl) {
            return;
        }

        window.open(
            currentSong.sourceUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    if (!currentSong) {
        return (
            <div className="flex min-h-[420px] items-center justify-center">
                <p className="text-xs text-white/30">
                    {loading
                        ? "Loading music..."
                        : error
                            ? "Couldn't load music right now."
                            : "No music available for this year."}
                </p>
            </div>
        );
    }

    /*
     * ============================================================
     * 2004 — WINDOWS MEDIA PLAYER 9 ERA (classic silver skin)
     * ============================================================
     */

    if (is2004) {
        return (
            <div className="min-h-[560px] bg-gradient-to-b from-[#e8e6da] to-[#d4d0bc] font-sans text-[#1a1a1a]">

                {/* Title strip */}
                <div className="flex h-7 items-center gap-2 border-b border-[#8f8a6f] bg-gradient-to-b from-[#4a4a4a] to-[#1a1a1a] px-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#7fc4f0] to-[#1c5fd6] shadow-inner" />
                    <span className="text-[11px] font-semibold text-white/90">Windows Media Player</span>
                    <span className="ml-auto text-[8px] tracking-wider text-white/35">TIME.OS {currentSong.year}</span>
                </div>

                {/* Menu bar */}
                <div className="flex items-center gap-4 border-b border-[#b5af95] bg-[#ece9d8] px-3 py-1 text-[10px] text-[#333]">
                    {["File", "View", "Play", "Tools", "Help"].map((m) => (
                        <span key={m} className="cursor-default px-1 hover:bg-[#c2d8f7]">{m}</span>
                    ))}
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-[210px_1fr] md:p-7">

                    {/* Album art — beveled silver frame */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-sm border-2 border-[#8f8a6f] bg-black/10 p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2)]">
                            <img src={currentSong.cover} alt={currentSong.album} className="h-full w-full rounded-sm object-cover" />
                        </div>

                        {/* Classic WMP visualizer bars below art */}
                        <div className="mt-3 flex h-10 items-end gap-[2px] overflow-hidden rounded-sm border border-[#8f8a6f] bg-black/80 p-1">
                            {Array.from({ length: 28 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#1c5fd6] to-[#7fc4f0]"
                                    style={{
                                        height: isPlaying ? `${20 + ((index * 13) % 75)}%` : "10%",
                                        opacity: 0.85,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Info + controls */}
                    <div className="flex min-w-0 flex-col justify-between">
                        <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#3a6ea5]">Now Playing</p>
                            <h2 className="mt-2 truncate text-2xl font-normal text-[#0d3572]">{currentSong.title}</h2>
                            <p className="mt-1 text-sm text-[#4a5866]">{currentSong.artist}</p>
                            <p className="mt-1 text-[10px] text-[#7a8590]">{currentSong.album}</p>
                        </div>

                        {/* Progress — beveled groove */}
                        <div className="mt-6">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.1"
                                value={Math.min(currentTime, duration || 0)}
                                onChange={(event) => seek(event.target.value)}
                                className="w-full accent-[#1c5fd6]"
                            />
                            <div className="mt-1 flex justify-between font-mono text-[9px] text-[#7a8590]">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls — chunky beveled buttons */}
                        <div className="mt-5 flex items-center gap-2">
                            <button
                                onClick={previous}
                                className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#8f8a6f] bg-gradient-to-b from-white to-[#d4d0bc] text-[#333] shadow-sm hover:from-[#f5f3e8] hover:to-[#e0dcc8]"
                            >
                                <SkipBack size={14} />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1c5fd6] bg-gradient-to-b from-[#7fc4f0] to-[#1c5fd6] text-white shadow-[0_2px_6px_rgba(0,0,0,0.3)] hover:from-[#8fd0fa] hover:to-[#2a6fe0]"
                            >
                                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                            </button>

                            <button
                                onClick={next}
                                className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#8f8a6f] bg-gradient-to-b from-white to-[#d4d0bc] text-[#333] shadow-sm hover:from-[#f5f3e8] hover:to-[#e0dcc8]"
                            >
                                <SkipForward size={14} />
                            </button>

                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (isMuted) {
                                            changeVolume(previousVolume || 0.8);
                                            setIsMuted(false);
                                        } else {
                                            setPreviousVolume(volume);
                                            changeVolume(0);
                                            setIsMuted(true);
                                        }
                                    }}
                                    className="text-[#4a5866] hover:text-[#0d3572]"
                                >
                                    {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                                </button>

                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        changeVolume(value);
                                        setIsMuted(value === 0);
                                    }}
                                    className="w-20 accent-[#1c5fd6]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Memory strip */}
                <div className="border-y border-[#b5af95] bg-[#e0dcc8] px-6 py-5 md:px-7">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#3a6ea5]">
                        A Memory From {currentSong.year}
                    </p>
                    <p className="mt-3 max-w-2xl text-xs leading-6 text-[#4a5866]">{currentSong.memory}</p>
                </div>

                {/* Media Library list */}
                <div className="p-6 md:p-7">
                    <div className="mb-3 flex items-center justify-between border-b border-[#b5af95] pb-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3a6ea5]">Media Library</p>
                        <span className="text-[9px] text-[#7a8590]">{playlist.length} tracks</span>
                    </div>

                    <div className="overflow-hidden rounded-sm border border-[#b5af95] bg-white">
                        {playlist.map((item, index) => {
                            const active = index === currentIndex;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => selectSong(index)}
                                    className={`flex w-full items-center gap-3 border-b border-[#e5e2d3] px-3 py-2 text-left last:border-0 ${active ? "bg-[#c2d8f7]" : "hover:bg-[#f0f5fb]"
                                        }`}
                                >
                                    <span className="w-5 text-[10px] text-[#7a8590]">
                                        {active ? "▶" : String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="h-7 w-7 overflow-hidden rounded-sm border border-[#c8ccd0]">
                                        <img src={item.cover} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[11px] text-[#1a1a1a]">{item.title}</p>
                                        <p className="truncate text-[9px] text-[#7a8590]">{item.artist}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * 2009 — WINDOWS MEDIA PLAYER (aero) ERA
     * ============================================================
     */

    if (is2009) {
        return (
            <div className="min-h-[560px] bg-black/70 md:bg-transparent font-sans text-black">
                <div className="flex h-9 items-center justify-between border-b border-white/15 bg-gradient-to-b from-white/15 to-white/[0.03] px-3">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-br from-white/70 to-white/10 shadow-inner">
                            <span className="text-[9px] text-[#315b78]">▶</span>
                        </div>
                        <span className="text-[10px] text-white/80">Windows Media Player</span>
                    </div>
                    <span className="text-[8px] tracking-wider text-white/35">TIME.OS {currentSong.year}</span>
                </div>

                <div className="grid gap-7 p-6 md:grid-cols-[230px_1fr] md:p-8">
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-sm border border-white/25 bg-black/30 p-1 shadow-[0_15px_45px_rgba(0,0,0,0.45)]">
                            <img src={currentSong.cover} alt={currentSong.album} className="h-full w-full object-cover" />
                        </div>
                        <div className="pointer-events-none absolute inset-x-1 top-1 h-[35%] bg-gradient-to-b from-white/20 to-transparent" />
                    </div>

                    <div className="flex min-w-0 flex-col justify-between">
                        <div>
                            <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-black/40">Now Playing</p>
                            <h2 className="mt-3 truncate text-2xl font-normal text-black">{currentSong.title}</h2>
                            <p className="mt-1 text-sm text-black/55">{currentSong.artist}</p>
                            <p className="mt-1 text-[10px] text-black/30">{currentSong.album}</p>
                        </div>

                        <div className="mt-8 flex h-10 items-end gap-[3px] overflow-hidden">
                            {Array.from({ length: 34 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 rounded-t-sm bg-white/30 transition-all ${isPlaying ? "animate-pulse" : ""}`}
                                    style={{
                                        height: isPlaying ? `${18 + ((index * 17) % 78)}%` : `${18 + ((index * 7) % 38)}%`,
                                        opacity: 0.25 + ((index % 5) * 0.1),
                                    }}
                                />
                            ))}
                        </div>

                        <div className="mt-6">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.1"
                                value={Math.min(currentTime, duration || 0)}
                                onChange={(event) => seek(event.target.value)}
                                className="w-full accent-black"
                            />
                            <div className="mt-1 flex justify-between font-mono text-[8px] text-black/35">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-4">
                            <button onClick={previous} className="text-black/50 transition hover:text-black" aria-label="Previous">
                                <SkipBack size={18} />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/40 bg-gradient-to-b from-black/25 to-black/[0.05] shadow-lg transition hover:from-black/35 hover:to-black/10"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            </button>

                            <button onClick={isShuffle ? () => { } : next} className="text-black/50 transition hover:text-black" aria-label="Next">
                                <SkipForward size={18} />
                            </button>

                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (isMuted) {
                                            changeVolume(previousVolume || 0.8);
                                            setIsMuted(false);
                                        } else {
                                            setPreviousVolume(volume);
                                            changeVolume(0);
                                            setIsMuted(true);
                                        }
                                    }}
                                    className="text-black/45 hover:text-black"
                                    aria-label="Mute"
                                >
                                    {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                                </button>

                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        changeVolume(value);
                                        if (value > 0) setIsMuted(false);
                                    }}
                                    className="w-20 accent-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-y border-white/10 bg-black/10 px-6 py-5 md:px-8">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-black/30">
                        A Memory From {currentSong.year}
                    </p>
                    <p className="mt-3 max-w-2xl text-xs leading-6 text-black/55">{currentSong.memory}</p>
                </div>

                <div className="p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-black/35">Playlist</p>
                        <span className="text-[8px] text-black/25">{playlist.length} tracks</span>
                    </div>

                    <div className="space-y-1">
                        {playlist.map((item, index) => {
                            const active = index === currentIndex;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => selectSong(index)}
                                    className={`group flex w-full items-center gap-3 rounded-sm border p-2 text-left transition ${active ? "border-black/20 bg-black/10" : "border-transparent hover:border-black/10 hover:bg-black/[0.05]"
                                        }`}
                                >
                                    <div className="h-9 w-9 overflow-hidden rounded-sm border border-black/15">
                                        <img src={item.cover} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`truncate text-[11px] ${active ? "text-black" : "text-black/60 group-hover:text-black/85"}`}>
                                            {item.title}
                                        </p>
                                        <p className="mt-0.5 truncate text-[8px] text-black/30">{item.artist}</p>
                                    </div>
                                    <span className="text-[8px] text-black/25">
                                        {active ? "▶" : String(index + 1).padStart(2, "0")}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * 2019 — MODERN STREAMING PLAYER
     * Spotify-inspired streaming layout.
     * Only 2019 uses this branch; all other years stay unchanged.
     * ============================================================
     */

    if (is2019) {
        return (
            <div className="min-h-[620px] overflow-hidden bg-[#121212] font-sans text-white">
                <div className="grid min-h-[620px] md:grid-cols-[190px_1fr]">
                    <aside className="hidden border-r border-white/[0.06] bg-[#090909] md:flex md:flex-col">
                        <div className="px-5 pb-5 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1db954] text-black">
                                    <span className="text-[11px] font-black">T</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold tracking-tight">TIME.OS</p>
                                    <p className="text-[7px] uppercase tracking-[0.2em] text-white/30">2019 music</p>
                                </div>
                            </div>
                        </div>

                        <nav className="px-3">
                            <button className="flex w-full items-center gap-3 rounded-md bg-white/10 px-3 py-2.5 text-left text-[10px] font-semibold text-white">
                                <Home size={15} fill="currentColor" /> Home
                            </button>
                            <button className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[10px] text-white/45 transition hover:bg-white/[0.06] hover:text-white">
                                <Search size={15} /> Search
                            </button>
                            <button className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[10px] text-white/45 transition hover:bg-white/[0.06] hover:text-white">
                                <Library size={15} /> Your Library
                            </button>
                        </nav>

                        <div className="mx-5 my-5 border-t border-white/[0.06]" />

                        <div className="px-5">
                            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/25">YOUR COLLECTION</p>
                            <button className="mt-4 flex w-full items-center gap-3 text-left text-[9px] text-white/45 transition hover:text-white">
                                <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#3b3b3b] to-[#181818]"><Heart size={13} fill="currentColor" /></div>
                                Liked Songs
                            </button>
                            <button className="mt-3 flex w-full items-center gap-3 text-left text-[9px] text-white/45 transition hover:text-white">
                                <div className="flex h-7 w-7 items-center justify-center rounded bg-white/10"><ListMusic size={13} /></div>
                                TIME.OS 2019
                            </button>
                        </div>

                        <div className="mt-auto px-5 pb-5">
                            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">THE SOUND OF</p>
                            <p className="mt-1 text-[11px] text-white/55">2019</p>
                        </div>
                    </aside>

                    <main className="min-w-0 bg-gradient-to-b from-[#242424] via-[#171717] to-[#121212]">
                        <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-2 md:px-8">
                            <div>
                                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">TIME.OS / MUSIC</p>
                                <p className="mt-1 text-[9px] text-white/35">A snapshot of 2019</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsShuffle(!isShuffle)} className={`rounded-full p-2 transition ${isShuffle ? "text-[#1db954]" : "text-white/35 hover:text-white"}`} aria-label="Shuffle"><Shuffle size={14} /></button>
                                <button onClick={() => setIsRepeat(!isRepeat)} className={`rounded-full p-2 transition ${isRepeat ? "text-[#1db954]" : "text-white/35 hover:text-white"}`} aria-label="Repeat"><Repeat size={14} /></button>
                            </div>
                        </div>

                        <section className="px-5 pb-8 pt-3 md:px-12 md:pt-4">
                            <div className="mx-auto max-w-[420px] text-center">
                                <div className="relative mx-auto w-[min(58vw,280px)]">
                                    <div className="aspect-square overflow-hidden rounded-md bg-black shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
                                        <img src={currentSong.cover} alt={currentSong.album} className={`h-full w-full object-cover transition-transform duration-700 ${isPlaying ? "scale-[1.025]" : "scale-100"}`} />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-black/20 via-transparent to-white/[0.06]" />
                                </div>

                                <div className="mt-5">
                                    <div className="flex items-start justify-between gap-4 text-left">
                                        <div className="min-w-0">
                                            <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#1db954]">NOW PLAYING · 2019</p>
                                            <h2 className="mt-2 truncate text-2xl font-bold tracking-tight md:text-3xl">{currentSong.title}</h2>
                                            <p className="mt-1 truncate text-sm text-white/55">{currentSong.artist}</p>
                                            <p className="mt-1 truncate text-[9px] text-white/25">{currentSong.album}</p>
                                        </div>
                                        <button onClick={openSource} className="mt-1 shrink-0 rounded-full p-2 text-white/30 transition hover:bg-white/10 hover:text-white" aria-label="Open song source" title="Open source"><MoreHorizontal size={17} /></button>
                                    </div>
                                </div>

                                <div className="mt-1">
                                    <input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(event.target.value)} className="h-1 w-full cursor-pointer accent-[#1db954]" />
                                    <div className="mt-2 flex justify-between font-mono text-[8px] text-white/30"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
                                </div>

                                <div className="mt-0 flex items-center justify-center gap-6">
                                    <button onClick={previous} className="text-white/45 transition hover:text-white" aria-label="Previous"><SkipBack size={18} /></button>
                                    <button onClick={togglePlay} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105" aria-label={isPlaying ? "Pause" : "Play"}>
                                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                                    </button>
                                    <button onClick={next} className="text-white/45 transition hover:text-white" aria-label="Next"><SkipForward size={18} /></button>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2">
                                    <button onClick={() => { if (isMuted) { changeVolume(previousVolume || 0.8); setIsMuted(false); } else { setPreviousVolume(volume); changeVolume(0); setIsMuted(true); } }} className="text-white/35 transition hover:text-white" aria-label="Mute">
                                        {isMuted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                    </button>
                                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => { const value = Number(event.target.value); changeVolume(value); setIsMuted(value === 0); }} className="w-24 accent-[#1db954]" />
                                </div>
                            </div>
                        </section>

                        <section className="border-y border-white/[0.06] bg-black/20 px-5 py-5 md:px-12">
                            <div className="mx-auto max-w-3xl">
                                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#1db954]/70">A MEMORY FROM {currentSong.year}</p>
                                <p className="mt-2 text-xs leading-6 text-white/45">{currentSong.memory}</p>
                            </div>
                        </section>

                        <section className="px-5 pb-8 pt-6 md:px-12">
                            <div className="mx-auto max-w-3xl">
                                <div className="mb-3 flex items-center justify-between">
                                    <div><p className="text-[11px] font-semibold">2019 playlist</p><p className="mt-1 text-[8px] text-white/25">Songs that bring the year back</p></div>
                                    <span className="font-mono text-[8px] text-white/25">{playlist.length} TRACKS</span>
                                </div>
                                <div className="space-y-1">
                                    {playlist.map((item, index) => {
                                        const active = index === currentIndex;
                                        return (
                                            <button key={item.id} onClick={() => selectSong(index)} className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition ${active ? "bg-white/10" : "hover:bg-white/[0.06]"}`}>
                                                <span className="w-5 text-center font-mono text-[8px] text-white/25">{active ? <span className="text-[#1db954]">●</span> : String(index + 1).padStart(2, "0")}</span>
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded"><img src={item.cover} alt="" className="h-full w-full object-cover" /></div>
                                                <div className="min-w-0 flex-1"><p className={`truncate text-[11px] ${active ? "font-semibold text-white" : "text-white/65 group-hover:text-white"}`}>{item.title}</p><p className="mt-0.5 truncate text-[8px] text-white/30">{item.artist}</p></div>
                                                <span className="hidden text-[8px] text-white/20 sm:block">{item.album}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * DEFAULT — MINIMAL MUSIC DISCOVERY (2012+/dark/metro/modern)
     * ============================================================
     */

    return (
        <div className="min-h-[560px] bg-[#060a0e] p-6 font-sans text-white md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-mono text-[9px] tracking-[0.35em] text-white/30">MUSIC ARCHIVE</p>
                    <p className="mt-2 text-[10px] text-white/20">THE SOUND OF {currentSong.year}</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`rounded p-2 transition ${isShuffle ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                    >
                        <Shuffle size={13} />
                    </button>

                    <button
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`rounded p-2 transition ${isRepeat ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                    >
                        <Repeat size={13} />
                    </button>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-7 md:flex-row">
                <div className="relative h-52 w-52 shrink-0 overflow-hidden rounded-lg shadow-2xl">
                    <img
                        src={currentSong.cover}
                        alt={currentSong.album}
                        className={`h-full w-full object-cover transition-transform duration-700 ${isPlaying ? "scale-[1.025]" : "scale-100"}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.08]" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <p className="font-mono text-[9px] tracking-[0.3em] text-white/25">NOW PLAYING</p>
                        <h2 className="mt-3 text-3xl font-light md:text-4xl">{currentSong.title}</h2>
                        <p className="mt-2 text-sm text-white/40">{currentSong.artist}</p>
                        <p className="mt-1 text-[10px] text-white/20">{currentSong.album}</p>
                    </div>

                    <div className="mt-8">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={Math.min(currentTime, duration || 0)}
                            onChange={(event) => seek(event.target.value)}
                            className="w-full accent-white"
                        />
                        <div className="mt-2 flex justify-between font-mono text-[9px] text-white/20">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        <div className="mt-5 flex items-center gap-5">
                            <button onClick={previous} className="text-white/35 transition hover:text-white">
                                <SkipBack size={17} />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-white hover:bg-white hover:text-black"
                            >
                                {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
                            </button>

                            <button onClick={next} className="text-white/35 transition hover:text-white">
                                <SkipForward size={17} />
                            </button>

                            <div className="ml-auto flex items-center gap-2">
                                {isMuted || volume === 0 ? (
                                    <VolumeX size={14} className="text-white/25" />
                                ) : (
                                    <Volume2 size={14} className="text-white/25" />
                                )}

                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        changeVolume(value);
                                        setIsMuted(value === 0);
                                    }}
                                    className="w-20 accent-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 border-y border-white/10 py-6">
                <p className="font-mono text-[9px] tracking-[0.3em] text-white/20">A MEMORY FROM {currentSong.year}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">{currentSong.memory}</p>
            </div>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-[9px] tracking-[0.3em] text-white/30">THE SOUND OF {currentSong.year}</p>
                    <span className="font-mono text-[9px] text-white/20">{playlist.length} TRACKS</span>
                </div>

                <div className="space-y-1">
                    {playlist.map((item, index) => {
                        const active = index === currentIndex;
                        return (
                            <button
                                key={item.id}
                                onClick={() => selectSong(index)}
                                className={`group flex w-full items-center gap-4 rounded px-3 py-3 text-left transition ${active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}
                            >
                                <span className="w-5 font-mono text-[9px] text-white/20">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="h-8 w-8 overflow-hidden rounded">
                                    <img src={item.cover} alt="" className="h-full w-full object-cover" />
                                </div>

                                <div className="flex-1">
                                    <p className={`text-sm ${active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-[10px] text-white/20">{item.artist}</p>
                                </div>

                                <span className="font-mono text-[9px] text-white/20">
                                    {active ? "PLAYING" : item.year}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MusicWindow;