import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

function MemImg({ src, className }) {
    const [failed, setFailed] = useState(false);
    if (failed || !src) {
        return <div className={`flex items-center justify-center bg-black/10 ${className}`}><ImageIcon size={22} strokeWidth={1.2} className="opacity-25" /></div>;
    }
    return <img src={src} onError={() => setFailed(true)} alt="" className={`object-cover ${className}`} />;
}

/* ===================== XP — Picture and Fax Viewer ===================== */
function MemoriesXP({ yearData, memories }) {
    const [index, setIndex] = useState(0);
    const memory = memories[index];
    if (!memory) return null;

    const go = (dir) => setIndex((i) => (i + dir + memories.length) % memories.length);

    return (
        <div className="min-h-[520px] bg-[#3a3a3a] font-sans text-white">
            <div className="flex items-center gap-2 border-b border-black/40 bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] px-3 py-2">
                <span className="text-[11px] font-semibold">Windows Picture and Fax Viewer — {memory.title}</span>
            </div>

            <div className="flex min-h-[400px] items-center justify-center bg-black p-6">
                <button onClick={() => go(-1)} className="mr-3 rounded-full bg-white/10 p-2 hover:bg-white/20">
                    <ChevronLeft size={18} />
                </button>

                <div className="border-4 border-[#8f8a6f] bg-black shadow-2xl">
                    <MemImg src={memory.image} className="max-h-[340px] w-auto" />
                </div>

                <button onClick={() => go(1)} className="ml-3 rounded-full bg-white/10 p-2 hover:bg-white/20">
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className="border-t border-black/40 bg-[#ece9d8] px-6 py-4 text-[#1a1a1a]">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#3a6ea5]">{memory.date ?? "Archived"} · {yearData?.year}</p>
                <h3 className="mt-1 text-lg font-bold text-[#0d3572]">{memory.title}</h3>
                <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-[#4a5866]">{memory.story ?? memory.caption}</p>
            </div>

            {/* filmstrip */}
            <div className="flex gap-1.5 overflow-x-auto border-t border-black/40 bg-[#2a2a2a] p-2">
                {memories.map((m, i) => (
                    <button key={m.id ?? i} onClick={() => setIndex(i)} className={`h-12 w-16 shrink-0 overflow-hidden border-2 ${i === index ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}>
                        <MemImg src={m.image} className="h-full w-full" />
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ===================== AERO — polaroid stack ===================== */
function MemoriesAero({ yearData, memories }) {
    const [opened, setOpened] = useState(null);
    const rotations = [-6, 4, -3, 7, -8, 3, -5, 6];

    return (
        <div className="min-h-[520px] bg-black/70 md:bg-transparent p-8 text-white">
            <p className="font-sans text-[9px] tracking-[0.25em] text-white/50">MEMORY ARCHIVE — {yearData?.year}</p>
            <h2 className="mt-2 text-2xl font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">Scattered moments</h2>

            <div className="mt-10 flex flex-wrap justify-center gap-x-2 gap-y-10">
                {memories.map((memory, index) => (
                    <motion.button
                        key={memory.id ?? index}
                        initial={{ opacity: 0, y: 10, rotate: 0 }}
                        animate={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
                        whileHover={{ y: -8, rotate: 0, scale: 1.05, zIndex: 10 }}
                        onClick={() => setOpened(memory)}
                        className="w-[150px] rounded-sm border border-white/40 bg-white p-2 pb-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                    >
                        <MemImg src={memory.image} className="aspect-square w-full" />
                        <p className="mt-2 truncate text-center text-[10px] text-black/70">{memory.title}</p>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {opened && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={(e) => e.stopPropagation()} className="max-w-lg overflow-hidden rounded-2xl border border-white/30 bg-white/[0.1] shadow-2xl backdrop-blur-2xl">
                            <MemImg src={opened.image} className="max-h-[300px] w-full" />
                            <div className="p-6">
                                <p className="text-[9px] tracking-[0.25em] text-white/45">{opened.date ?? yearData?.year}</p>
                                <h3 className="mt-2 text-xl font-medium text-white">{opened.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/70">{opened.story ?? opened.caption}</p>
                                {opened.source && (
                                    <button onClick={() => window.open(opened.source, "_blank", "noopener,noreferrer")} className="mt-4 inline-flex items-center gap-2 rounded border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] hover:bg-white/20">
                                        VIEW SOURCE <ExternalLink size={11} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ===================== DEFAULT — grid + modal (existing) ===================== */
function MemoriesDefault({ yearData, memories }) {
    const year = yearData?.year;
    const [selectedMemory, setSelectedMemory] = useState(null);

    return (
        <div className="min-h-[58vh] overflow-hidden bg-[#0b1015] text-white">
            <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 md:px-8">
                <p className="font-mono text-[9px] tracking-[0.35em] text-white/30">TIME CAPSULE / MEMORY ARCHIVE</p>
                <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Memories of {year}</h2>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/40">Moments and fragments that make {year} feel like a real place in time.</p>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
                {memories.map((memory, index) => (
                    <motion.button key={memory.id ?? index} onClick={() => setSelectedMemory(memory)} whileHover={{ y: -5 }} whileTap={{ scale: 0.985 }} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] text-left shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <MemImg src={memory.image} className="h-full w-full transition duration-500 group-hover:scale-[1.045]" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 font-mono text-[8px] tracking-[0.18em] text-white/75 backdrop-blur-md">
                                {String(index + 1).padStart(2, "0")} / {year}
                            </span>
                        </div>
                        <div className="p-4">
                            <p className="font-mono text-[8px] tracking-[0.22em] text-white/25">{memory.date ?? "ARCHIVED"}</p>
                            <h3 className="mt-2 text-base font-medium text-white/90">{memory.title}</h3>
                            <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/40">{memory.caption}</p>
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {selectedMemory && (
                    <motion.div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMemory(null)}>
                        <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} onClick={(e) => e.stopPropagation()} className="z-[1000] max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-black/90 text-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                                <button onClick={() => setSelectedMemory(null)} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-white/45 hover:text-white">
                                    <ArrowLeft size={13} /> BACK TO ARCHIVE
                                </button>
                                <button onClick={() => setSelectedMemory(null)} className="rounded-md p-2 text-white/45 hover:bg-white/10 hover:text-white"><X size={16} /></button>
                            </div>
                            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                                <div className="relative min-h-[280px] bg-black">
                                    <MemImg src={selectedMemory.image} className="min-h-[280px] w-full" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="font-mono text-[9px] tracking-[0.3em] text-white/30">ARCHIVE RECORD</p>
                                    <h2 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">{selectedMemory.title}</h2>
                                    <p className="mt-7 text-sm font-light leading-relaxed text-white/55">{selectedMemory.story ?? selectedMemory.caption}</p>
                                    {selectedMemory.source && (
                                        <button onClick={() => window.open(selectedMemory.source, "_blank", "noopener,noreferrer")} className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-4 py-2.5 font-mono text-[9px] tracking-[0.18em] text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white">
                                            VIEW SOURCE <ExternalLink size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ===================== MODERN — Instagram-style stories ===================== */
function MemoriesModern({ yearData, memories }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-[520px] bg-gradient-to-br from-[#1a0a14] via-[#0a0a0e] to-[#0a1420] p-6 text-white">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">MEMORIES · {yearData?.year}</p>
            <h2 className="mt-1 text-2xl font-bold">Your story archive</h2>

            {/* Story circles row */}
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                {memories.map((memory, index) => (
                    <button key={memory.id ?? index} onClick={() => setOpenIndex(index)} className="flex shrink-0 flex-col items-center gap-1.5">
                        <div className="rounded-full bg-gradient-to-tr from-[#ff5c8a] via-[#ffd15c] to-[#5c9dff] p-[2.5px]">
                            <div className="rounded-full border-2 border-[#0a0a0e] p-[1px]">
                                <MemImg src={memory.image} className="h-16 w-16 rounded-full" />
                            </div>
                        </div>
                        <span className="max-w-[70px] truncate text-[9px] text-white/60">{memory.title}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {openIndex !== null && memories[openIndex] && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenIndex(null)} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/85 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10"
                        >
                            {/* progress bars */}
                            <div className="absolute left-2 right-2 top-2 z-10 flex gap-1">
                                {memories.map((_, i) => (
                                    <div key={i} className={`h-[2px] flex-1 rounded-full ${i <= openIndex ? "bg-white" : "bg-white/25"}`} />
                                ))}
                            </div>

                            <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
                                <MemImg src={memories[openIndex].image} className="h-full w-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-lg font-bold">{memories[openIndex].title}</h3>
                                    <p className="mt-2 text-[12px] leading-relaxed text-white/75">
                                        {memories[openIndex].story ?? memories[openIndex].caption}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between bg-[#141018] px-4 py-2 text-[10px]">
                                <button
                                    disabled={openIndex === 0}
                                    onClick={() => setOpenIndex((i) => Math.max(0, i - 1))}
                                    className="text-white/50 hover:text-white disabled:opacity-30"
                                >
                                    ← Previous
                                </button>
                                <button
                                    disabled={openIndex === memories.length - 1}
                                    onClick={() => setOpenIndex((i) => Math.min(memories.length - 1, i + 1))}
                                    className="text-white/50 hover:text-white disabled:opacity-30"
                                >
                                    Next →
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid below stories */}
            <div className="mt-8 grid grid-cols-3 gap-1.5">
                {memories.map((memory, index) => (
                    <button key={memory.id ?? index} onClick={() => setOpenIndex(index)} className="aspect-square overflow-hidden rounded-lg">
                        <MemImg src={memory.image} className="h-full w-full transition hover:scale-105" />
                    </button>
                ))}
            </div>
        </div>
    );
}

function MemoriesWindow({ yearData }) {
    const mode = yearData?.desktop?.theme?.mode || "dark";
    const memories = yearData?.memories ?? [];

    if (mode === "xp") return <MemoriesXP yearData={yearData} memories={memories} />;
    if (mode === "aero") return <MemoriesAero yearData={yearData} memories={memories} />;
    if (mode === "modern") return <MemoriesModern yearData={yearData} memories={memories} />;
    return <MemoriesDefault yearData={yearData} memories={memories} />;
}

export default MemoriesWindow;