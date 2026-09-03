import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUISound from "../../hooks/useUISound";

const recoveryStages = [
    { label: "SIGNAL", value: "RECOVERED" },
    { label: "MEMORY", value: "INTACT" },
    { label: "FRAGMENTS", value: "ALIGNED" },
    { label: "ARCHIVE", value: "UNSEALED" },
];

const driftLines = [
    "some things are never really deleted.",
    "they just wait for someone to look.",
];

function BootScreen({ onComplete }) {
    const [visibleLines, setVisibleLines] = useState(0);
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    const sounds = useUISound();

    // A handful of fixed "dust" particles — stable across renders
    const particles = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 6,
                duration: 6 + Math.random() * 6,
                size: 1 + Math.random() * 1.6,
            })),
        []
    );

    useEffect(() => {
        const lineTimer = setInterval(() => {
            setVisibleLines((previous) => {
                if (previous >= recoveryStages.length) {
                    clearInterval(lineTimer);
                    return previous;
                }
                return previous + 1;
            });
        }, 460);

        return () => clearInterval(lineTimer);
    }, []);

    useEffect(() => {
        if (visibleLines < recoveryStages.length) return;

        const progressTimer = setInterval(() => {
            setProgress((previous) => {
                const next = previous + Math.floor(Math.random() * 10) + 4;

                if (next >= 100) {
                    clearInterval(progressTimer);
                    setProgress(100);
                    setReady(true);
                    return 100;
                }

                return next;
            });
        }, 150);

        return () => clearInterval(progressTimer);
    }, [visibleLines]);

    useEffect(() => {
        if (!ready) return;

        const timer = setTimeout(() => {
            onComplete();
        }, 1100);

        return () => clearTimeout(timer);
    }, [ready, onComplete]);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.7 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] text-white"
        >
            {/* Warm archive glow — amber instead of cold blue, feels like an old lamp, not a server room */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.05] blur-[140px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/[0.04] blur-[90px]" />

            {/* Fine grain / CRT texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.8)_3px)]" />

            {/* Drifting dust — the "memory particles" resettling as the capsule opens */}
            <div className="pointer-events-none absolute inset-0">
                {particles.map((p) => (
                    <motion.span
                        key={p.id}
                        className="absolute rounded-full bg-amber-100/40"
                        style={{
                            left: `${p.left}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        initial={{ top: "110%", opacity: 0 }}
                        animate={{ top: "-10%", opacity: [0, 0.5, 0] }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Vignette so the edges fall into darkness — draws the eye inward */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />

            {/* Content */}
            <div className="relative z-10 w-[88%] max-w-xl font-mono">
                {/* Wordmark */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-[9px] tracking-[0.45em] text-white/25">
                        TIME.OS — CAPSULE PROTOCOL
                    </p>

                    <h1 className="mt-4 text-2xl font-light tracking-tight text-white/90 md:text-4xl">
                        Opening a time capsule
                    </h1>

                    <AnimatePresence>
                        {visibleLines >= 1 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="mt-3 text-[17px] italic tracking-wide text-white/30"
                            >
                                {driftLines[0]}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Recovery stages */}
                <div className="mt-12 space-y-3">
                    {recoveryStages.map((stage, index) => {
                        const visible = index < visibleLines;

                        return (
                            <motion.div
                                key={stage.label}
                                animate={{ opacity: visible ? 1 : 1 }}
                                className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-[10px]"
                            >
                                <span
                                    className={
                                        visible ? "text-white/45" : "text-white/10"
                                    }
                                >
                                    {stage.label}
                                </span>

                                <motion.span
                                    animate={
                                        visible
                                            ? { color: "rgba(252,211,145,0.75)" }
                                            : { color: "rgba(255,255,255,0.1)" }
                                    }
                                    className="tracking-[0.15em]"
                                >
                                    {visible ? stage.value : "· · ·"}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress */}
                <div className="mt-12">
                    <div className="flex items-center justify-between text-[12px] tracking-[0.2em]">
                        <span className="text-white/25">RESTORING WHAT WAS SAVED</span>
                        <span className="text-white/35">
                            {String(progress).padStart(3, "0")}%
                        </span>
                    </div>

                    <div className="mt-3 h-px bg-white/10">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-200/70 to-orange-300/80"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.25 }}
                        />
                    </div>
                </div>

                {/* Ready message */}
                <div className="mt-8 h-5">
                    {ready && (
                        <motion.p
                            initial={{ opacity: 0, letterSpacing: "0.1em" }}
                            animate={{ opacity: 1, letterSpacing: "0.25em" }}
                            transition={{ duration: 3 }}
                            className="text-[15px] text-amber-100/50"
                        >
                            {driftLines[1]}
                        </motion.p>
                    )}
                </div>
            </div>
        </motion.main>
    );
}

export default BootScreen;