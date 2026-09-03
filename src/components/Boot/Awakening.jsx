import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Awakening({ onComplete }) {
    const [stage, setStage] = useState(0);
    // 0: nothing yet · 1: whisper line · 2: title · 3: second line · 4: hint to continue

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1700),
            setTimeout(() => setStage(3), 4200),
            setTimeout(() => setStage(4), 6600),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <main
            onClick={onComplete}
            className="relative flex min-h-screen cursor-pointer items-center justify-center overflow-hidden bg-[#07070a] text-white"
        >
            {/* ambient glow — slow breathing, like something waking up rather than switching on */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: [0.25, 0.45, 0.25],
                    scale: [0.9, 1.05, 0.9],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.05] blur-[110px]"
            />

            {/* fine grain, kept consistent with the boot screen */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.8)_3px)]" />

            {/* content */}
            <div className="relative z-10 px-6 text-center">
                <AnimatePresence>
                    {stage >= 1 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="font-mono text-[9px] tracking-[0.45em] text-white/25"
                        >
                            CONNECTION ESTABLISHED
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {stage >= 2 && (
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.6, ease: "easeOut" }}
                            className="mt-5 text-4xl font-light tracking-tight text-white/95 md:text-6xl"
                        >
                            Something is still here.
                        </motion.h1>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {stage >= 3 && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="mt-6 font-mono text-[10px] tracking-[0.2em] text-amber-100/40"
                        >
                            CHOOSE A YEAR TO REMEMBER
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {stage >= 4 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="mt-16 font-mono text-[8px] tracking-[0.3em] text-white/15"
                        >
                            click anywhere to continue
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

export default Awakening;