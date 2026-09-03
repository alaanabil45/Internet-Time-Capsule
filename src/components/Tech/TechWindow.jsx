import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";

function TechImg({ src, name, className }) {
    const [failed, setFailed] = useState(false);
    if (failed || !src) {
        return <div className={`flex items-center justify-center ${className}`}><Cpu size={20} strokeWidth={1.2} className="opacity-30" /></div>;
    }
    return <img src={src} alt={name} onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} draggable="false" />;
}

/* ===================== XP — Explorer report view (table) ===================== */
function TechXP({ yearData, items }) {
    const [opened, setOpened] = useState(null);

    if (opened) {
        return (
            <div className="min-h-[480px] bg-[#ece9d8] font-sans text-[#1a1a1a]">
                <div className="flex items-center gap-2 border-b border-[#aca899] px-3 py-2">
                    <button onClick={() => setOpened(null)} className="flex items-center gap-1 rounded-sm border border-[#7f9db9] bg-[#e3e3e3] px-3 py-1 text-[10px] hover:bg-[#d3d3d3]">
                        <ArrowLeft size={11} /> Back
                    </button>
                    <span className="text-[10px] text-[#5a6a75]">Tech Archive \ {opened.name}</span>
                </div>

                <div className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div className="h-60 w-60 shrink-0 overflow-hidden border-2 border-[#8f8a6f] bg-white p-1 shadow-md">
                            <TechImg src={opened.image} name={opened.name} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#3a6ea5]">{opened.category}</p>
                            <h2 className="mt-2 text-2xl font-bold text-[#0d3572]">{opened.name}</h2>
                            <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-[#4a5866]">{opened.detail}</p>
                        </div>
                    </div>
                    <div className="mt-8 border-l-4 border-[#3a6ea5] bg-white p-4">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#3a6ea5]">How it felt</p>
                        <p className="mt-2 text-[13px] italic text-[#0d3572]">{opened.context}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[480px] bg-[#ece9d8] font-sans text-[#1a1a1a]">
            <div className="border-b border-[#aca899] bg-gradient-to-b from-white to-[#eef2f5] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3a6ea5]">Tech Archive</p>
                <h2 className="mt-1 text-xl font-bold text-[#0d3572]">The future, according to {yearData?.year}</h2>
            </div>

            {/* Column headers — classic Explorer report view */}
            <div className="grid grid-cols-[1fr_120px] gap-2 border-b border-[#aca899] bg-[#dcd8c4] px-4 py-1.5 text-[9px] font-bold text-[#5a6a75]">
                <span>Name</span>
                <span>Category</span>
            </div>

            <div className="divide-y divide-[#e5e2d3]">
                {items.map((item, index) => (
                    <button
                        key={item.name}
                        onDoubleClick={() => setOpened(item)}
                        onClick={() => setOpened(item)}
                        className={`grid w-full grid-cols-[1fr_120px] items-center gap-2 px-4 py-2 text-left ${index % 2 === 0 ? "bg-white" : "bg-[#f5f3e8]"} hover:bg-[#c2d8f7]`}
                    >
                        <span className="flex items-center gap-2 truncate text-[11px]">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden border border-[#c8ccd0] bg-white">
                                <TechImg src={item.image} name={item.name} />
                            </span>
                            {item.name}
                        </span>
                        <span className="truncate text-[10px] text-[#5a6a75]">{item.category}</span>
                    </button>
                ))}
            </div>

            <div className="border-t border-[#aca899] px-4 py-1.5 text-[9px] text-[#5a6a75]">{items.length} objects</div>
        </div>
    );
}

/* ===================== AERO — floating glass cards ===================== */
function TechAero({ yearData, items }) {
    const [opened, setOpened] = useState(null);

    return (
        <div className="min-h-[500px] bg-black/70 md:bg-transparentt p-7 text-black">
            <p className="font-sans text-[9px] tracking-[0.25em] text-white/50">TECHNOLOGY ARCHIVE</p>
            <h2 className="mt-3 text-2xl font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                The future, according to {yearData?.year}.
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                {items.map((item, index) => (
                    <motion.button
                        key={item.name}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        onClick={() => setOpened(item)}
                        className="flex flex-col items-center gap-2 rounded-xl border border-white/25 bg-white/[0.08] p-4 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:border-white/45 hover:bg-white/[0.14]"
                    >
                        <div className="h-16 w-16 overflow-hidden rounded-lg border border-white/20 bg-white/10">
                            <TechImg src={item.image} name={item.name} />
                        </div>
                        <span className="text-[11px] font-medium text-black/90">{item.name}</span>
                        <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[8px] text-black/60">{item.category}</span>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {opened && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpened(null)}
                        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-lg rounded-2xl border border-white/30 bg-white/[0.12] p-7 shadow-2xl backdrop-blur-2xl"
                        >
                            <div className="mx-auto h-20 w-20 overflow-hidden rounded-lg border border-white/25 bg-white/10">
                                <TechImg src={opened.image} name={opened.name} />
                            </div>
                            <h3 className="mt-4 text-center text-xl font-medium text-white">{opened.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/70">{opened.detail}</p>
                            <p className="mt-4 border-l-2 border-white/30 pl-3 text-[13px] italic text-white/75">{opened.context}</p>
                            <button onClick={() => setOpened(null)} className="mt-5 w-full rounded-lg border border-white/25 bg-white/10 py-2 text-[11px] hover:bg-white/20">Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ===================== DEFAULT — vertical timeline ===================== */
function TechDefault({ yearData, items }) {
    const [selectedTech, setSelectedTech] = useState(null);

    return (
        <div className="bg-[#0a0a0e] text-white">
            <AnimatePresence mode="wait">
                {!selectedTech ? (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="px-6 py-7 md:px-8">
                            <p className="font-sans text-[9px] tracking-[0.25em] text-white/30">TECHNOLOGY ARCHIVE</p>
                            <h2 className="mt-3 text-3xl font-medium text-white/90 md:text-4xl">The future, according to {yearData?.year}.</h2>
                        </div>

                        <div className="relative px-6 pb-8 md:px-8">
                            <div className="absolute left-[38px] top-0 h-full w-px bg-white/10 md:left-[46px]" />
                            <div className="flex flex-col gap-1">
                                {items.map((item, index) => (
                                    <button key={item.name} onClick={() => setSelectedTech(item)} className="group relative flex w-full items-start gap-4 py-4 text-left md:gap-6">
                                        <div className="relative z-10 flex w-6 shrink-0 justify-center pt-1 md:w-8">
                                            <span className="h-2.5 w-2.5 rounded-full bg-white/15 transition group-hover:bg-white" />
                                        </div>
                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] md:h-16 md:w-16">
                                            <TechImg src={item.image} name={item.name} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-[10px] text-white/25">0{index + 1}</span>
                                                <h3 className="text-base text-white/85 md:text-lg">{item.name}</h3>
                                                <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[8px] tracking-widest text-white/45">{item.category}</span>
                                            </div>
                                            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-white/40">{item.context}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="detail" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                        <div className="px-6 py-5 md:px-8">
                            <button onClick={() => setSelectedTech(null)} className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/45 hover:text-white/85">
                                <ArrowLeft size={13} /> BACK TO ARCHIVE
                            </button>
                        </div>
                        <div className="p-6 md:p-10">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                <div className="h-40 w-40 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] md:h-48 md:w-48">
                                    <TechImg src={selectedTech.image} name={selectedTech.name} />
                                </div>
                                <div>
                                    <p className="font-sans text-[9px] tracking-[0.25em] text-white/30">{selectedTech.category}</p>
                                    <h2 className="mt-3 text-3xl text-white/90 md:text-4xl">{selectedTech.name}</h2>
                                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{selectedTech.detail}</p>
                                </div>
                            </div>
                            <div className="mt-12 border-l border-white/20 pl-5">
                                <p className="font-sans text-[9px] tracking-[0.25em] text-white/30">HOW IT FELT</p>
                                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/65">{selectedTech.context}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ===================== MODERN — colorful masonry cards ===================== */
function TechModern({ yearData, items }) {
    const [opened, setOpened] = useState(null);
    const accents = ["#ff5c8a", "#5c9dff", "#5cffb0", "#ffd15c"];

    return (
        <div className="min-h-[500px] bg-gradient-to-br from-[#1a0a14] via-[#0a0a0e] to-[#0a1420] p-6 text-white">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">TECH · {yearData?.year}</p>
            <h2 className="mt-1 text-2xl font-bold">The tech everyone had an opinion on</h2>

            <div className="mt-6 columns-2 gap-3 md:columns-3">
                {items.map((item, index) => {
                    const accent = accents[index % accents.length];
                    return (
                        <motion.button
                            key={item.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setOpened(item)}
                            className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left"
                        >
                            <div className="h-28 w-full overflow-hidden">
                                <TechImg src={item.image} name={item.name} className="h-full w-full" />
                            </div>
                            <div className="p-3">
                                <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase" style={{ backgroundColor: `${accent}30`, color: accent }}>
                                    {item.category}
                                </span>
                                <p className="mt-2 text-[13px] font-semibold">{item.name}</p>
                                <p className="mt-1 line-clamp-2 text-[10px] text-white/45">{item.context}</p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {opened && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)} className="fixed inset-0 z-[500] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-t-3xl border border-white/10 bg-[#141018] p-6 sm:rounded-3xl"
                        >
                            <div className="h-32 w-full overflow-hidden rounded-xl"><TechImg src={opened.image} name={opened.name} className="h-full w-full" /></div>
                            <h3 className="mt-4 text-xl font-bold">{opened.name}</h3>
                            <p className="mt-2 text-[12px] leading-relaxed text-white/60">{opened.detail}</p>
                            <p className="mt-3 text-[12px] italic text-white/75">"{opened.context}"</p>
                            <button onClick={() => setOpened(null)} className="mt-5 w-full rounded-full bg-white/10 py-2 text-[11px] hover:bg-white/20">Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TechWindow({ yearData }) {
    const mode = yearData?.desktop?.theme?.mode || "dark";
    const items = yearData?.tech || [];

    if (mode === "xp") return <TechXP yearData={yearData} items={items} />;
    if (mode === "aero") return <TechAero yearData={yearData} items={items} />;
    if (mode === "modern") return <TechModern yearData={yearData} items={items} />;
    return <TechDefault yearData={yearData} items={items} />;
}

export default TechWindow;