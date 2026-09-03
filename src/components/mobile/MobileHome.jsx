import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2, X, RotateCw, Power } from "lucide-react";

import useUISound from "../../hooks/useUISound";
import MobileAppView from "./MobileAppView";
import MobileXP from "./shells/MobileXP";
import MobileAero from "./shells/MobileAero";
import MobileDark from "./shells/MobileDark";
import MobileModern from "./shells/MobileModern";

const SHELLS = {
    xp: MobileXP,
    aero: MobileAero,
    dark: MobileDark,
    modern: MobileModern,
    metro: MobileModern,
};

function MobileHome({ year, yearData, onChangeYear, onShutdown }) {
    const [openApp, setOpenApp] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [time, setTime] = useState("");
    const sounds = useUISound();

    const mode = yearData?.desktop?.theme?.mode || "dark";
    const Shell = SHELLS[mode] || MobileDark;

    const icons = yearData?.mobile?.icons ?? yearData?.desktop?.icons ?? [];
    const wallpaper = yearData?.mobile?.wallpaper ?? yearData?.desktop?.wallpaper ?? "";

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        update();
        const interval = setInterval(update, 1000 * 10);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setOpenApp(null);
        setMenuOpen(false);
    }, [year]);

    const openApplication = (id) => {
        sounds.open();
        setOpenApp(id);
    };

    const closeApplication = () => {
        sounds.close();
        setOpenApp(null);
    };

    return (
        <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-black">
            <Shell
                year={year}
                yearData={yearData}
                icons={icons}
                wallpaper={wallpaper}
                time={time}
                onOpenApp={openApplication}
                onOpenMenu={() => {
                    sounds.click();
                    setMenuOpen(true);
                }}
            />

            <AnimatePresence>
                {openApp && (
                    <MobileAppView
                        appId={openApp}
                        yearData={yearData}
                        mode={mode}
                        onClose={closeApplication}
                    />
                )}
            </AnimatePresence>

            {/* Settings sheet — change year / return to selector */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-[400] bg-black/50"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            className="fixed inset-x-0 bottom-0 z-[410] rounded-t-2xl bg-[#1a1a1c] p-5 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
                        >
                            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Device Settings</span>
                                <button onClick={() => setMenuOpen(false)} className="text-white/40 hover:text-white">
                                    <X size={18} />
                                </button>
                            </div>

                            <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">Time Travel</p>
                            <select
                                value={year}
                                onChange={(event) => {
                                    setMenuOpen(false);
                                    onChangeYear(Number(event.target.value));
                                }}
                                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
                            >
                                <option value={2004}>2004</option>
                                <option value={2009}>2009</option>
                                <option value={2012}>2012</option>
                                <option value={2019}>2019</option>
                            </select>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        sounds.open();
                                    }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-[12px] hover:bg-white/10"
                                >
                                    <RotateCw size={14} /> Restart
                                </button>
                                <button
                                    onClick={() => {
                                        sounds.close();
                                        setMenuOpen(false);
                                        onShutdown?.();
                                    }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2.5 text-[12px] text-red-300 hover:bg-red-500/20"
                                >
                                    <Power size={14} /> Exit
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MobileHome;