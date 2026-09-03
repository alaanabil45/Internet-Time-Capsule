import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Archive, Hourglass } from "lucide-react";
import { years } from "../../data/years/index";
import useUISound from "../../hooks/useUISound";

// Gentle wave offset so each row of nodes drifts like points along a soft
// curve instead of sitting in a flat, mechanical line. Repeats every 4
// items so it stays graceful no matter how many years exist.
function arcOffset(index) {
    const t = (index % 4) / 3;
    return Math.sin(t * Math.PI) * -16;
}

// An original ambient device — concentric rotating rings around a small
// hourglass. Inspired by the *idea* of a time-turner (rings that spin to
// carry you backward), but its own design: no borrowed shapes, no IP.
// Purely decorative, very slow, meant to be felt more than noticed.
function TimeDevice() {
    return (
        <div className="pointer-events-none absolute -right-28 top-1/2 hidden -translate-y-1/2 opacity-70 md:block lg:-right-12">
            <div className="relative h-[340px] w-[340px]">
                <div className="absolute inset-0 rounded-full bg-amber-400/[0.06] blur-[70px]" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-amber-200/15"
                />

                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-amber-200/10"
                />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[72px] rounded-full border border-dashed border-amber-100/20"
                />

                {/* tick marks on the outer ring */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-3 w-px bg-amber-200/15"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(-166px)`,
                        }}
                    />
                ))}

                <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Hourglass
                        size={22}
                        strokeWidth={1}
                        className="text-amber-100/50"
                    />
                </motion.div>
            </div>
        </div>
    );
}

function YearSelector({ onSelect }) {
    const [selectedYear, setSelectedYear] = useState(2004);
    const [hoveredYear, setHoveredYear] = useState(null);
    const sounds = useUISound();

    const selected = years.find(
        (item) => item.year === selectedYear
    );

    const hovered = hoveredYear
        ? years.find((item) => item.year === hoveredYear)
        : null;

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07070a] text-white">

            {/* Ambient background — warm instead of cold, matches the rest of the capsule */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,180,90,0.07),transparent_55%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.7)_3px)]" />

            {/* A few slow drifting motes, echoing the boot screen so the whole app feels like one place */}

            <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute h-[2px] w-[2px] rounded-full bg-amber-100/30"
                        style={{ left: `${(i * 97) % 100}%` }}
                        initial={{ top: "105%", opacity: 0 }}
                        animate={{ top: "-5%", opacity: [0, 0.4, 0] }}
                        transition={{
                            duration: 10 + (i % 5) * 2,
                            delay: i * 1.3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <TimeDevice />

            {/* Main content */}

            <div className="relative z-10 mx-auto flex min-h-screen w-[90%] max-w-6xl flex-col justify-center py-16">

                {/* Header */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    <div className="flex items-center gap-3">

                        <Archive
                            size={16}
                            strokeWidth={1.5}
                            className="text-amber-200/30"
                        />

                        <span className="font-mono text-[9px] tracking-[0.4em] text-white/30">
                            DIGITAL MEMORY ARCHIVE
                        </span>

                    </div>

                    <h1 className="mt-7 max-w-3xl text-4xl font-light tracking-tight text-white/90 md:text-7xl">
                        Choose a year
                        <br />
                        to remember.
                    </h1>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/35">
                        Every year holds a different version of the internet —
                        and a different version of you. Pick one, and step back inside.
                    </p>

                </motion.div>

                {/* Timeline */}

                <div className="mt-24">

                    <div className="relative">

                        {/* A soft curved line instead of a flat, mechanical one */}

                        <svg
                            className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-8 w-full md:block"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 20"
                        >
                            <motion.path
                                d="M 0 14 Q 25 2, 50 14 T 100 14"
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="0.4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.6, ease: "easeOut" }}
                            />
                        </svg>

                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

                            {years.map((item, index) => {
                                const active = item.year === selectedYear;
                                const isHovered = item.year === hoveredYear;

                                return (
                                    <motion.button
                                        key={item.year}
                                        onClick={() => {
                                            sounds.click();
                                            setSelectedYear(item.year);
                                        }}
                                        onMouseEnter={() => setHoveredYear(item.year)}
                                        onMouseLeave={() => setHoveredYear(null)}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{
                                            opacity: 1,
                                            y: arcOffset(index),
                                        }}
                                        transition={{
                                            delay: 0.1 + index * 0.1,
                                            duration: 0.6,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            y: arcOffset(index) - 6,
                                            scale: 1.05,
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group relative text-left outline-none"
                                    >

                                        {/* Hover preview — a whisper of what this year holds, before you commit to it */}

                                        <AnimatePresence>
                                            {isHovered && !active && (
                                                <motion.span
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 6 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="absolute -top-7 left-0 whitespace-nowrap font-mono text-[8px] tracking-[0.2em] text-amber-100/50"
                                                >
                                                    {item.title}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>

                                        {/* Timeline point */}

                                        <div className="relative z-10 flex h-7 items-center">

                                            <motion.div
                                                animate={{
                                                    scale: active ? 1 : 0.7,
                                                    backgroundColor: active
                                                        ? "rgba(252,211,145,1)"
                                                        : "rgba(255,255,255,0.2)",
                                                    boxShadow: active
                                                        ? "0 0 14px 2px rgba(252,211,145,0.45)"
                                                        : "0 0 0px 0px rgba(252,211,145,0)",
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="h-2.5 w-2.5 rounded-full"
                                            />

                                            {active && (
                                                <motion.div
                                                    layoutId="yearGlow"
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        rotate: {
                                                            duration: 12,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        },
                                                    }}
                                                    className="absolute -left-2.5 h-7 w-7 rounded-full border border-dashed border-amber-200/25"
                                                />
                                            )}

                                        </div>

                                        {/* Year */}

                                        <p
                                            className={`mt-5 font-mono text-sm transition-colors duration-300 ${active
                                                ? "text-amber-100"
                                                : "text-white/25 group-hover:text-white/55"
                                                }`}
                                        >
                                            {item.year}
                                        </p>

                                        {/* Title */}

                                        <p
                                            className={`mt-3 text-xs transition-colors duration-300 ${active
                                                ? "text-white/60"
                                                : "text-white/20 group-hover:text-white/40"
                                                }`}
                                        >
                                            {item.title}
                                        </p>

                                    </motion.button>
                                );
                            })}

                        </div>

                    </div>

                </div>

                {/* Selected year */}

                <div className="mt-20 min-h-[170px]">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={selectedYear}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                        >

                            <p className="font-mono text-[8px] tracking-[0.35em] text-white/20">
                                SELECTED ARCHIVE
                            </p>

                            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                                <div>

                                    <div className="flex items-baseline gap-4">

                                        <span className="text-6xl font-light tracking-tight text-white/95 md:text-8xl">
                                            {selected.year}
                                        </span>

                                        <span className="font-mono text-[8px] tracking-widest text-amber-200/30">
                                            ARCHIVE
                                        </span>

                                    </div>

                                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/35">
                                        {selected.description}
                                    </p>

                                </div>

                                {/* Enter button — a slow pulse, like a door that's warm to the touch */}

                                <motion.button
                                    onClick={() => onSelect(selected.year)}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.97 }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 0px 0px rgba(252,211,145,0)",
                                            "0 0 16px 1px rgba(252,211,145,0.12)",
                                            "0 0 0px 0px rgba(252,211,145,0)",
                                        ],
                                    }}
                                    transition={{
                                        boxShadow: {
                                            duration: 3.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    className="group flex w-fit items-center gap-4 border border-white/15 bg-white/[0.03] px-5 py-3 transition-colors duration-300 hover:border-amber-200/40 hover:bg-white/[0.07]"
                                >

                                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/60 group-hover:text-amber-100">
                                        ENTER {selected.year}
                                    </span>

                                    <ArrowRight
                                        size={14}
                                        strokeWidth={1.5}
                                        className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-100"
                                    />

                                </motion.button>

                            </div>

                        </motion.div>

                    </AnimatePresence>

                </div>

                {/* Footer */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-5"
                >

                    <span className="font-mono text-[8px] text-white/15">
                        TIME.OS / ARCHIVE SELECTOR
                    </span>

                    <span className="font-mono text-[8px] text-white/15">
                        01 — 04
                    </span>

                </motion.div>

            </div>

        </main>
    );
}

export default YearSelector;