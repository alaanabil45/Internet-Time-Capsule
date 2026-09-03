import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, ExternalLink, Film, Clapperboard, ChevronLeft, ChevronRight, Play } from "lucide-react";

function PosterImg({ poster, title, className }) {
    const [failed, setFailed] = useState(false);
    if (failed || !poster) {
        return (
            <div className={`flex items-center justify-center bg-black/10 ${className}`}>
                <Clapperboard size={20} strokeWidth={1.2} className="opacity-30" />
            </div>
        );
    }
    return <img src={poster} alt={title} onError={() => setFailed(true)} className={`object-cover ${className}`} draggable="false" />;
}

/* ===================== XP — Explorer folder view ===================== */
function MoviesXP({ yearData, movies }) {
    const [selected, setSelected] = useState(null);
    const [opened, setOpened] = useState(null);

    if (opened) {
        return (
            <div className="min-h-[500px] bg-[#ece9d8] font-sans text-[#1a1a1a]">
                <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-3 py-2">
                    <button
                        onClick={() => setOpened(null)}
                        className="flex items-center gap-1 rounded-sm border border-[#7f9db9] bg-[#e3e3e3] px-3 py-1 text-[10px] hover:bg-[#d3d3d3]"
                    >
                        <ArrowLeft size={11} /> Back
                    </button>
                    <span className="text-[10px] text-[#5a6a75]">My Videos \ {opened.title}</span>
                </div>

                <div className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="w-[140px] shrink-0 border-2 border-[#8f8a6f] bg-white p-1 shadow-md">
                            <PosterImg poster={opened.poster} title={opened.title} className="aspect-[2/3] w-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#3a6ea5]">Video File Properties</p>
                            <h2 className="mt-2 text-2xl font-bold text-[#0d3572]">{opened.title}</h2>
                            <table className="mt-4 text-[11px] text-[#333]">
                                <tbody>
                                    <tr><td className="pr-4 py-0.5 text-[#7a8590]">Rating:</td><td>★ {opened.rating}</td></tr>
                                    <tr><td className="pr-4 py-0.5 text-[#7a8590]">Director:</td><td>{opened.director}</td></tr>
                                    <tr><td className="pr-4 py-0.5 text-[#7a8590]">Genre:</td><td>{(opened.genres || []).join(", ")}</td></tr>
                                    <tr><td className="pr-4 py-0.5 align-top text-[#7a8590]">Cast:</td><td>{(opened.cast || []).join(", ")}</td></tr>
                                </tbody>
                            </table>
                            <p className="mt-4 max-w-xl text-[11px] leading-relaxed text-[#4a5866]">{opened.description}</p>

                            {opened.memory && (
                                <div className="mt-5 border-l-4 border-[#3a6ea5] bg-white p-3">
                                    <p className="text-[11px] italic text-[#0d3572]">"{opened.memory}"</p>
                                </div>
                            )}

                            {opened.searchUrl && (
                                <a href={opened.searchUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-sm border border-[#7f9db9] bg-[#e3e3e3] px-3 py-1.5 text-[10px] hover:bg-[#d3d3d3]">
                                    Learn more <ExternalLink size={11} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[500px] bg-[#ece9d8] font-sans text-[#1a1a1a]">
            <div className="border-b border-[#aca899] bg-gradient-to-b from-white to-[#eef2f5] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3a6ea5]">My Videos</p>
                <h2 className="mt-1 text-xl font-bold text-[#0d3572]">{yearData?.year} Movie Collection</h2>
            </div>

            <div className="grid grid-cols-3 gap-3 p-5 sm:grid-cols-4 md:grid-cols-5">
                {movies.map((movie) => (
                    <button
                        key={movie.id}
                        onClick={() => setSelected(movie.id)}
                        onDoubleClick={() => setOpened(movie)}
                        className={`flex flex-col items-center gap-1.5 rounded-sm p-2 text-center ${selected === movie.id ? "bg-[#3a6ea5]/25 outline outline-1 outline-dashed outline-[#3a6ea5]" : "hover:bg-black/5"
                            }`}
                    >
                        <div className="w-full border border-[#c8ccd0] bg-white p-1 shadow-sm">
                            <PosterImg poster={movie.poster} title={movie.title} className="aspect-[2/3] w-full" />
                        </div>
                        <span className="line-clamp-2 text-[10px] leading-tight text-[#1a1a1a]">{movie.title}</span>
                    </button>
                ))}
            </div>

            <div className="border-t border-[#aca899] bg-[#ece9d8] px-4 py-1.5 text-[9px] text-[#5a6a75]">
                {movies.length} objects {selected ? "· 1 object selected" : ""}
            </div>
        </div>
    );
}

/* ===================== AERO — glass flip card ===================== */
function MoviesAero({ yearData, movies }) {
    const [index, setIndex] = useState(0);
    const movie = movies[index];
    if (!movie) return null;

    const go = (dir) => setIndex((i) => (i + dir + movies.length) % movies.length);

    return (
        <div className="min-h-[520px] bg-black/70 md:bg-transparent p-8 text-black">
            <p className="font-sans text-[9px] tracking-[0.25em] text-black/50">FILM ARCHIVE — {yearData?.year}</p>

            <div className="mt-8 flex items-center justify-center gap-6">
                <button onClick={() => go(-1)} className="rounded-full border border-white/25 bg-white/10 p-2 hover:bg-white/20">
                    <ChevronLeft size={18} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, rotateY: 40, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: -40, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="w-[220px] rounded-xl border border-white/40 bg-white/[0.1] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                        style={{ perspective: 800 }}
                    >
                        <PosterImg poster={movie.poster} title={movie.title} className="aspect-[2/3] w-full rounded-lg" />
                    </motion.div>
                </AnimatePresence>

                <button onClick={() => go(1)} className="rounded-full border border-white/25 bg-white/10 p-2 hover:bg-white/20">
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className="mx-auto mt-8 max-w-lg text-center">
                <h2 className="text-2xl font-medium text-black [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">{movie.title}</h2>

                <div className="mt-2 flex items-center justify-center gap-2 text-black/60">
                    <Star size={12} className="text-amber-200" fill="currentColor" strokeWidth={0} />
                    <span className="text-[12px]">{movie.rating}</span>
                    <span className="text-[12px] opacity-60">· {movie.director}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-black/65">{movie.description}</p>

                {movie.memory && (
                    <p className="mt-4 border-l-2 border-white/30 bg-white/[0.06] px-4 py-2 text-left text-[13px] italic text-black/75 backdrop-blur-sm">
                        "{movie.memory}"
                    </p>
                )}

                {movie.searchUrl && (
                    <a href={movie.searchUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded border border-white/25 bg-white/[0.08] px-4 py-2 text-[10px] hover:bg-white/[0.18]">
                        Learn more <ExternalLink size={11} />
                    </a>
                )}
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
                {movies.map((m, i) => (
                    <button key={m.id} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/30"}`} />
                ))}
            </div>
        </div>
    );
}

/* ===================== DEFAULT — poster grid (2012+) ===================== */
function MoviesDefault({ yearData, movies }) {
    const [selected, setSelected] = useState(null);
    const mode = yearData?.desktop?.theme?.mode || "dark";
    const metro = mode === "metro";

    return (
        <div className={`min-h-[420px] ${metro ? "bg-[#161616]" : "bg-[#0a0a0e]"}`}>
            <AnimatePresence mode="wait">
                {selected ? (
                    <motion.div key="detail" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="p-6">
                        <button onClick={() => setSelected(null)} className="mb-6 flex items-center gap-2 text-[11px] text-white/45 hover:text-white">
                            <ArrowLeft size={13} /> Back to library
                        </button>

                        <div className="flex flex-col gap-6 md:flex-row">
                            <div className="mx-auto w-[150px] shrink-0 md:mx-0">
                                <PosterImg poster={selected.poster} title={selected.title} className="aspect-[2/3] w-full rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
                            </div>

                            <div className="min-w-0 flex-1 text-white/80">
                                <h2 className="text-2xl font-medium text-white/90">{selected.title}</h2>
                                <div className="mt-3 flex items-center gap-3 text-[11px] text-white/50">
                                    <Star size={13} className="text-amber-200/80" fill="currentColor" strokeWidth={0} /> {selected.rating}
                                    <span>Directed by {selected.director}</span>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {(selected.genres || []).map((g) => (
                                        <span key={g} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] text-white/45">{g}</span>
                                    ))}
                                </div>
                                <p className="mt-5 text-[12px] leading-relaxed text-white/55">{selected.description}</p>
                                {selected.memory && (
                                    <div className="mt-5 rounded-r border-l-2 border-white/20 bg-white/[0.03] px-4 py-3">
                                        <p className="text-[12px] italic text-white/55">"{selected.memory}"</p>
                                    </div>
                                )}
                                {selected.searchUrl && (
                                    <a href={selected.searchUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] text-white/60 hover:border-white/25 hover:text-white">
                                        Learn more <ExternalLink size={11} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                        <p className="font-sans text-[9px] tracking-[0.25em] text-white/30">{yearData?.year} · FILM ARCHIVE</p>
                        <h2 className="mt-2 mb-6 text-lg font-medium text-white/85">Movies of the year</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {movies.map((movie) => (
                                <button key={movie.id} onClick={() => setSelected(movie)} className="group flex flex-col overflow-hidden rounded-sm border border-white/8 bg-white/[0.03] text-left transition hover:border-white/20 hover:bg-white/[0.06]">
                                    <PosterImg poster={movie.poster} title={movie.title} className="aspect-[2/3] w-full" />
                                    <div className="p-2.5">
                                        <p className="truncate text-[12px] text-white/85">{movie.title}</p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <Star size={10} className="text-amber-200/80" fill="currentColor" strokeWidth={0} />
                                            <span className="text-[9px] text-white/35">{movie.rating}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ===================== MODERN — vertical streaming feed ===================== */
function MoviesModern({ yearData, movies }) {
    const [active, setActive] = useState(movies[0]);

    return (
        <div className="min-h-[540px] bg-gradient-to-br from-[#1a0a14] via-[#0a0a0e] to-[#0a1420] p-6 text-white">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">STREAMING · {yearData?.year}</p>
            <h2 className="mt-1 text-2xl font-bold text-white">What everyone was watching</h2>

            {/* Featured hero */}
            <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
                <PosterImg poster={active.poster} title={active.title} className="h-[220px] w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#ff5c8a] px-2.5 py-0.5 text-[9px] font-bold uppercase">Trending</span>
                        <span className="flex items-center gap-1 text-[11px] text-white/70">
                            <Star size={11} className="text-amber-300" fill="currentColor" strokeWidth={0} /> {active.rating}
                        </span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{active.title}</h3>
                    <p className="mt-1 line-clamp-2 max-w-md text-[12px] text-white/60">{active.description}</p>
                    {active.memory && (
                        <p className="mt-2 max-w-md text-[12px] italic text-white/75">"{active.memory}"</p>
                    )}
                    {active.searchUrl && (
                        <a href={active.searchUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-black hover:bg-white/85">
                            <Play size={11} fill="currentColor" /> More info
                        </a>
                    )}
                </div>
            </motion.div>

            {/* Horizontal scroll row */}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-white/40">Continue browsing</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {movies.map((movie) => (
                    <button
                        key={movie.id}
                        onClick={() => setActive(movie)}
                        className={`w-[110px] shrink-0 overflow-hidden rounded-xl border transition ${active.id === movie.id ? "border-[#ff5c8a] shadow-[0_0_0_2px_rgba(255,92,138,0.4)]" : "border-white/10 opacity-70 hover:opacity-100"
                            }`}
                    >
                        <PosterImg poster={movie.poster} title={movie.title} className="aspect-[2/3] w-full" />
                    </button>
                ))}
            </div>
        </div>
    );
}

function MoviesWindow({ yearData }) {
    const mode = yearData?.desktop?.theme?.mode || "dark";
    const movies = yearData?.movies || [];

    if (movies.length === 0) {
        return (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-3 bg-[#0a0a0e] text-white/40">
                <Film size={26} strokeWidth={1.2} className="opacity-20" />
                <p className="text-xs">No films archived for this year yet.</p>
            </div>
        );
    }

    if (mode === "xp") return <MoviesXP yearData={yearData} movies={movies} />;
    if (mode === "aero") return <MoviesAero yearData={yearData} movies={movies} />;
    if (mode === "modern") return <MoviesModern yearData={yearData} movies={movies} />;
    return <MoviesDefault yearData={yearData} movies={movies} />;
}

export default MoviesWindow;