import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function TimeTransition({ fromYear, toYear, onComplete }) {
    const [currentYear, setCurrentYear] = useState(fromYear);
    const [phase, setPhase] = useState("starting");

    const distance = Math.abs(toYear - fromYear);

    // Overall duration — scales gently with distance, but stays inside a
    // reasonable window so it never drags and never feels rushed.
    const duration = Math.min(4200, Math.max(2600, 2100 + distance * 200));

    // How many full spins each ring completes over that duration.
    // Kept modest and proportionate so the motion reads as smooth and
    // intentional rather than frantic.
    const baseTurns = Math.min(5, Math.max(2, Math.round(distance / 4) + 2));

    const ghostYears = useMemo(() => {
        const step = toYear >= fromYear ? 1 : -1;
        const values = [];
        let year = fromYear;

        while (year !== toYear) {
            year += step;
            if (year !== toYear) values.push(year);
        }

        return values.slice(0, 7);
    }, [fromYear, toYear]);

    useEffect(() => {
        setPhase("starting");

        const phaseTimer = setTimeout(() => setPhase("shifting"), 300);

        const start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out on the number itself, so it settles gently on arrival
            // even while the rings keep a constant, steady speed.
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(fromYear + (toYear - fromYear) * eased);

            setCurrentYear(value);

            if (progress >= 1) {
                clearInterval(interval);
                setPhase("arriving");
                setTimeout(onComplete, 700);
            }
        }, 35);

        return () => {
            clearTimeout(phaseTimer);
            clearInterval(interval);
        };
    }, [fromYear, toYear, duration, onComplete]);

    const durationSec = duration / 1000;

    return (
        <motion.main
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#07070a] text-white"
        >
            {/* Atmosphere — warm amber, matching the rest of the capsule */}

            <motion.div
                animate={{
                    scale: phase === "shifting" ? [1, 1.4, 1] : 1,
                    opacity: phase === "shifting" ? [0.08, 0.2, 0.08] : 0.08,
                }}
                transition={{
                    duration: 1.4,
                    repeat: phase === "shifting" ? Infinity : 0,
                    ease: "easeInOut",
                }}
                className="absolute h-[45vh] w-[45vh] rounded-full bg-amber-400/[0.09] blur-[120px]"
            />

            <motion.div
                animate={{
                    scale: phase === "shifting" ? [0.75, 1.25, 0.85] : 1,
                    opacity: phase === "shifting" ? [0.05, 0.14, 0.04] : 0.05,
                }}
                transition={{
                    duration: 0.9,
                    repeat: phase === "shifting" ? Infinity : 0,
                    ease: "easeInOut",
                }}
                className="absolute h-[65vh] w-[65vh] rounded-full border border-amber-100/[0.05]"
            />

            {/* ==================================================
          THE DEVICE — an original gyroscope of nested rings.
          Each ring holds a fixed tilt in 3D space and spins around
          its own axis at one constant, steady speed. Real, physical,
          no jitter — a single clean motion per ring.
      ================================================== */}

            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: 58, rotateY: -18, rotateZ: 0 }}
                animate={{
                    rotateX: 58 + 360 * 1,
                    rotateY: -18 + 360 * 0.7,
                    rotateZ: 360 * baseTurns,
                }}
                transition={{ duration: durationSec, ease: "linear" }}
                className="absolute h-[360px] w-[360px] rounded-full border border-amber-100/[0.14]"
            >
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-100/60 shadow-[0_0_12px_rgba(252,211,145,0.4)]" />
                <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-100/25" />
                <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-100/25" />
                <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-100/25" />
                <div className="absolute left-[18%] top-[10%] h-1 w-1 rounded-full bg-amber-100/20" />
                <div className="absolute bottom-[18%] right-[10%] h-1 w-1 rounded-full bg-amber-100/20" />
            </motion.div>

            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: -52, rotateY: 30, rotateZ: 0 }}
                animate={{
                    rotateX: -52 - 360 * 0.8,
                    rotateY: 30 + 360 * 1.1,
                    rotateZ: -360 * (baseTurns * 1.6),
                }}
                transition={{ duration: durationSec, ease: "linear" }}
                className="absolute h-[280px] w-[280px] rounded-full border border-amber-100/[0.18]"
            >
                <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-100/40" />
                <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-100/25" />
                <div className="absolute left-[10%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-amber-100/20" />
                <div className="absolute right-[10%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-amber-100/20" />
            </motion.div>

            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: 33, rotateY: -44, rotateZ: 0 }}
                animate={{
                    rotateX: 33 + 360 * 1.3,
                    rotateY: -44 - 360 * 0.9,
                    rotateZ: 360 * (baseTurns * 2.3),
                }}
                transition={{ duration: durationSec, ease: "linear" }}
                className="absolute h-[185px] w-[185px] rounded-full border border-amber-100/[0.22]"
            >
                <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-100/50 shadow-[0_0_10px_rgba(252,211,145,0.3)]" />
                <div className="absolute bottom-1/2 right-0 h-1 w-1 -translate-y-1/2 rounded-full bg-amber-100/30" />
                <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-100/25" />
            </motion.div>

            {/* faint outer halo ring, barely moving, gives depth */}

            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: -70, rotateY: 22, rotateZ: 0 }}
                animate={{
                    rotateX: -70 - 360 * 0.4,
                    rotateY: 22 + 360 * 0.3,
                    rotateZ: -360 * (baseTurns * 0.6),
                }}
                transition={{ duration: durationSec, ease: "linear" }}
                className="absolute h-[420px] w-[420px] rounded-full border border-amber-100/[0.04]"
            />

            {/* Ghost years */}

            <div className="pointer-events-none absolute inset-0">
                {ghostYears.map((year, index) => {
                    const positions = [
                        "left-[18%] top-[25%]",
                        "right-[17%] top-[30%]",
                        "left-[12%] bottom-[28%]",
                        "right-[14%] bottom-[25%]",
                        "left-[27%] top-[15%]",
                        "right-[28%] bottom-[15%]",
                        "left-[42%] top-[8%]",
                    ];

                    return (
                        <motion.span
                            key={`${year}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: phase === "shifting" ? [0, 0.18, 0] : 0,
                                scale: phase === "shifting" ? [0.8, 1.2, 0.9] : 0.8,
                            }}
                            transition={{
                                duration: 0.7 + index * 0.05,
                                repeat: phase === "shifting" ? Infinity : 0,
                                delay: index * 0.06,
                            }}
                            className={`absolute ${positions[index]} font-mono text-[10px] tracking-[0.2em] text-amber-100/25`}
                        >
                            {year}
                        </motion.span>
                    );
                })}
            </div>

            {/* Center */}

            <motion.div
                animate={{
                    scale:
                        phase === "shifting"
                            ? [1, 1.08, 1]
                            : phase === "arriving"
                                ? [1, 1.2, 0.95]
                                : 1,
                    filter:
                        phase === "shifting"
                            ? ["blur(0px)", "blur(1px)", "blur(0px)"]
                            : "blur(0px)",
                }}
                transition={{
                    duration: phase === "arriving" ? 0.55 : 0.45,
                    repeat: phase === "shifting" ? Infinity : 0,
                }}
                className="relative z-20 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-amber-100/25 bg-[#0a0805]/80 shadow-[0_0_80px_rgba(252,211,145,0.12)] backdrop-blur-md"
            >
                <motion.span
                    animate={{
                        opacity: phase === "shifting" ? [1, 0.65, 1, 0.8, 1] : 1,
                        x: phase === "shifting" ? [0, -1, 1, 0] : 0,
                    }}
                    transition={{
                        duration: 0.18,
                        repeat: phase === "shifting" ? Infinity : 0,
                    }}
                    className="font-mono text-2xl font-light tracking-tight text-amber-50/90"
                >
                    {currentYear}
                </motion.span>
            </motion.div>

            {/* Label */}

            <div className="absolute bottom-[18%] z-30 text-center">
                <motion.p
                    animate={{
                        opacity: phase === "shifting" ? [0.2, 0.65, 0.2] : 0.35,
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: phase === "shifting" ? Infinity : 0,
                    }}
                    className="font-mono text-[8px] tracking-[0.45em] text-white/30"
                >
                    {phase === "arriving" ? "ARCHIVE FOUND" : "TIME SHIFTING"}
                </motion.p>

                <p className="mt-3 font-mono text-[9px] tracking-[0.25em] text-white/20">
                    {fromYear} → {toYear}
                </p>
            </div>

            {/* Scanlines */}

            <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.045] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.8)_3px)]" />

            {/* Arrival flash — warm instead of stark white */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: phase === "arriving" ? [0, 0.5, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-0 z-50 bg-[#fff3de]"
            />
        </motion.main>
    );
}

export default TimeTransition;