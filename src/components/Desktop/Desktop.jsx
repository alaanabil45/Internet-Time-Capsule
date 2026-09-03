import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Volume2, Wifi, Grid2X2, Search as SearchIcon, BatteryFull } from "lucide-react";
import SystemPopover from "./panels/SystemPopover";
import CalendarPanel from "./panels/CalendarPanel";
import VolumePanel from "./panels/VolumePanel";
import WifiPanel from "./panels/WifiPanel";
import BatteryPanel from "./panels/BatteryPanel";
import SearchPanel from "./panels/SearchPanel";

import Window from "../Window/Window";
import MusicWindow from "../Music/MusicWindow";
import InternetWindow from "../Internet/InternetWindow";
import MemoriesWindow from "../Memories/MemoriesWindow";
import TechWindow from "../Tech/TechWindow";
import MoviesWindow from "../Movies/MoviesWindow";
import useUISound from "../../hooks/useUISound";
import StartMenu from "../StartMenu/StartMenu";
import DesktopContextMenu from "./DesktopContextMenu";
import DesktopIcon from "./DesktopIcon";

// One entry per OS "era". Add more later just by adding a key here and
// pointing a year's yearData.desktop.theme.mode at it — nothing else in
// this file needs to change.
const CHROME = {
    dark: {
        label: "font-mono",
        mainBg: "bg-[#020508]",
        taskbar:
            "border-t border-white/10 bg-black/40 backdrop-blur-md",
        startBtn:
            "rounded-md border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
        startBtnActive: "border-white/25 bg-white/[0.1]",
        startIcon: "text-white/70",
        startText: "font-mono text-[9px] tracking-[0.15em] text-white/60",
        divider: "bg-white/10",
        yearLabel: "font-mono text-[9px] text-white/20",
        sideIcon: "text-white/40",
        time: "font-mono text-[10px] text-white/60",
        date: "font-mono text-[8px] text-white/20",
        glow: false,
    },
    xp: {
        label: "font-sans",
        mainBg: "bg-[#3a6ea5]",
        taskbar:
            "border-t-2 border-[#1941a5] bg-gradient-to-b from-[#2a6fdb] via-[#1958c9] to-[#0d3a9e] shadow-[0_-2px_8px_rgba(0,0,0,0.4)]",
        startBtn:
            "rounded-r-full rounded-l-md border-2 border-[#2e7d32] bg-gradient-to-b from-[#6fce4f] via-[#3fa73a] to-[#1e7a1e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.4)] hover:from-[#7fde5f] hover:to-[#2e8a2e]",
        startBtnActive: "from-[#5fbe3f] to-[#1a6a1a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
        startIcon: "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]",
        startText:
            "font-sans text-[13px] font-bold italic lowercase tracking-tight text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]",
        divider: "bg-[#4a7fd4]",
        yearLabel: "font-sans text-[9px] tracking-[0.15em] text-blue-50/80",
        sideIcon: "text-blue-50/90",
        time: "font-sans text-[11px] font-medium text-white",
        date: "hidden font-sans text-[8px] text-blue-100/70 sm:block",
        glow: false,
    },
    aero: {
        label: "font-sans",
        mainBg: "bg-[#4c7190]",
        taskbar:
            "border-t border-white/30 bg-slate-900/45 shadow-[0_-8px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl",
        startBtn:
            "rounded-full border-white/35 bg-gradient-to-b from-white/25 to-white/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.22)] hover:from-white/35",
        startBtnActive: "from-white/35 to-white/10",
        startIcon: "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]",
        startText:
            "font-sans text-[10px] font-medium tracking-[0.12em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]",
        divider: "bg-white/20",
        yearLabel: "font-sans text-[9px] tracking-[0.2em] text-white/50 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]",
        sideIcon: "text-white/65 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]",
        time: "font-sans text-[11px] font-medium text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]",
        date: "hidden font-sans text-[8px] text-white/45 sm:block",
        glow: true,
        glowColor: "rgba(255,255,255,0.45)",
    },
    metro: {
        label: "font-sans",
        mainBg: "bg-[#1f1f1f]",
        taskbar: "border-t border-white/10 bg-[color:var(--year-accent)]",
        startBtn:
            "rounded-none border-transparent bg-white/[0.06] hover:bg-white/[0.14]",
        startBtnActive: "bg-white/[0.2]",
        startIcon: "text-white",
        startText:
            "font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-white",
        divider: "bg-white/15",
        yearLabel: "font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70",
        sideIcon: "text-white/80",
        time: "font-sans text-[11px] font-semibold text-white",
        date: "hidden font-sans text-[8px] uppercase tracking-widest text-white/50 sm:block",
        glow: false,
    },
    modern: {
        label: "font-sans",
        mainBg: "bg-[#0b0b10]",
        taskbar:
            "border-t border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_-6px_30px_rgba(0,0,0,0.3)]",
        startBtn:
            "rounded-xl border-white/10 bg-white/[0.06] hover:bg-white/[0.12]",
        startBtnActive: "bg-white/[0.16]",
        startIcon: "text-white/90",
        startText: "font-sans text-[10px] font-medium tracking-wide text-white/85",
        divider: "bg-white/10",
        yearLabel: "font-sans text-[9px] tracking-[0.2em] text-white/40",
        sideIcon: "text-white/60",
        time: "font-sans text-[11px] font-medium text-white/90",
        date: "hidden font-sans text-[8px] text-white/35 sm:block",
        glow: false,
    },
};

const ICON_CELL = 96;

function Atmosphere({ mode }) {
    if (mode === "aero") {
        return (
            <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-blue-950/[0.18]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/[0.14] via-white/[0.03] to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_28%,rgba(120,210,255,0.12),transparent_32%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-blue-950/[0.16] to-transparent" />
            </>
        );
    }

    if (mode === "xp") {
        return (
            <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-300/20 via-transparent to-emerald-900/25" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_45%)]" />
            </>
        );
    }

    if (mode === "metro") {
        return (
            <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                    background:
                        "linear-gradient(160deg, color-mix(in srgb, var(--year-accent) 70%, black) 0%, color-mix(in srgb, var(--year-accent) 40%, black) 100%)",
                }}
            />
        );
    }

    if (mode === "modern") {
        return (
            <>
                <div className="pointer-events-none absolute inset-0 bg-[#0b0b10]/60" />
                <div className="pointer-events-none absolute left-1/2 top-[30%] h-[40vh] w-[55vw] -translate-x-1/2 rounded-full bg-[color:var(--year-accent)] opacity-[0.07] blur-[110px]" />
            </>
        );
    }

    // dark / fallback

}

function Desktop({ year, yearData, onChangeYear, onShutdown }) {
    const [activeWindow, setActiveWindow] = useState(null);
    const [time, setTime] = useState("11:47 PM");
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [maxRows, setMaxRows] = useState(6);

    const sounds = useUISound();
    const desktopAreaRef = useRef(null);
    const iconGridRef = useRef(null);

    const theme = yearData?.desktop?.theme ?? {
        mode: "dark",
        accent: "#8aa8b8",
        window: "dark-glass",
        taskbar: "dark",
        desktopText: "light",
    };

    const mode = CHROME[theme.mode] ? theme.mode : "dark";
    const chrome = CHROME[mode];

    const wallpaper = yearData?.desktop?.wallpaper ?? "";
    const icons = yearData?.desktop?.icons ?? [];

    const refreshDesktop = () => {
        sounds.click();
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 450);
    };

    const [openPanel, setOpenPanel] = useState(null); // "calendar" | "volume" | "wifi" | "battery" | null
    const [searchOpen, setSearchOpen] = useState(false);

    const restartDesktop = () => {
        sounds.open();
        setActiveWindow(null);
        setSelectedIcon(null);
        setContextMenu(null);
        setOpenPanel(null);
        setSearchOpen(false);
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 600);
    };

    const togglePanel = (panel) => {
        sounds.click();
        setSearchOpen(false);
        setOpenPanel((current) => (current === panel ? null : panel));
    };

    const toggleSearch = () => {
        sounds.click();
        setOpenPanel(null);
        setSearchOpen((v) => !v);
    };

    // Reset temporary desktop state whenever the user enters another year —
    // it's effectively a different machine, so icon layout resets too.
    useEffect(() => {
        setActiveWindow(null);
        setStartMenuOpen(false);
        setSelectedIcon(null);
        setContextMenu(null);
        setRefreshing(false);
        setOpenPanel(null);
        setSearchOpen(false);
    }, [year]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // How many icons fit in one column before a new one starts — measured
    // against the real available height, so it behaves like a real desktop
    // on any screen size instead of a fixed guess.
    useEffect(() => {
        const computeRows = () => {
            if (!iconGridRef.current) return;
            const height = iconGridRef.current.clientHeight;
            setMaxRows(Math.max(3, Math.floor(height / ICON_CELL)));
        };

        computeRows();
        window.addEventListener("resize", computeRows);
        return () => window.removeEventListener("resize", computeRows);
    }, [year]);

    const openWindow = (id) => {
        sounds.open();
        setActiveWindow(id);
        setStartMenuOpen(false);
        setContextMenu(null);
    };

    const closeWindow = () => {
        sounds.close();
        setActiveWindow(null);
    };

    const toggleStartMenu = () => {
        sounds.click();
        setStartMenuOpen((previous) => !previous);
    };

    return (
        <main
            className={`relative h-screen w-full overflow-hidden transition-all duration-700 ${chrome.mainBg}`}
            style={{ "--year-accent": theme.accent }}
            onClick={() => setContextMenu(null)}
        >
            {/* WALLPAPER */}

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: wallpaper ? `url(${wallpaper})` : undefined }}
            />

            {/* YEAR-SPECIFIC ATMOSPHERE — driven entirely by theme.mode */}

            <Atmosphere mode={mode} />

            {/* SCREEN EFFECTS */}

            <div className="crt-reflection pointer-events-none absolute inset-0 z-[5]" />
            <div className="crt-grain pointer-events-none absolute inset-0 z-[5]" />

            {/* DESKTOP CONTENT */}

            <div ref={desktopAreaRef} className="relative z-10 min-h-screen p-7 pb-24 md:p-10 md:pb-24">

                {/* SYSTEM LABEL */}

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-8"
                >
                    <p className={`tracking-[0.4em] ${chrome.yearLabel}`}>TIME.OS</p>
                    <p className={`mt-2 ${chrome.label} text-[9px] tracking-[0.2em] text-white/30`}>
                        SYSTEM RESTORED — {year}
                    </p>
                </motion.div>

                {/* DESKTOP ICONS — a real grid that fills one column top to
                    bottom, then automatically starts the next column, plus
                    each icon can be dragged anywhere on the desktop. */}

                <motion.div
                    ref={iconGridRef}
                    animate={{ opacity: refreshing ? [1, 0.35, 1] : 1 }}
                    transition={{ duration: 0.45 }}
                    className="absolute left-5 top-24 z-10 grid gap-x-1 gap-y-1"
                    style={{
                        gridAutoFlow: "column",
                        gridTemplateRows: `repeat(${maxRows}, ${ICON_CELL}px)`,
                        height: `${maxRows * ICON_CELL}px`,
                        maxHeight: "calc(100vh - 150px)",
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                        setSelectedIcon(null);
                        setContextMenu(null);
                    }}
                >
                    {icons.map((icon) => (
                        <motion.div
                            key={icon.id}
                            drag
                            dragMomentum={false}
                            dragElastic={0.06}
                            dragConstraints={desktopAreaRef}
                            whileDrag={{ scale: 1.05, zIndex: 50 }}
                            className="cursor-grab active:cursor-grabbing"
                        >
                            <DesktopIcon
                                icon={icon.image}
                                label={icon.label}
                                selected={selectedIcon === icon.id}
                                onSelect={() => {
                                    setSelectedIcon(icon.id);
                                    setContextMenu(null);
                                }}
                                onOpen={() => {
                                    setSelectedIcon(icon.id);
                                    openWindow(icon.id);
                                }}
                                onContextMenu={(position) => {
                                    setSelectedIcon(icon.id);
                                    setContextMenu({ ...position, iconId: icon.id });
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* RIGHT SIDE MESSAGE */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className={`absolute bottom-24 right-8 hidden max-w-[250px] text-right md:block ${mode === "aero" || mode === "xp" ? "text-white/45" : "text-white/20"
                        }`}
                >
                    <p
                        className={
                            mode === "aero" || mode === "xp"
                                ? "font-sans text-[22px] leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
                                : "font-mono text-[20px] leading-relaxed"
                        }
                    >
                        {mode === "aero"
                            ? "The future used to look like this."
                            : mode === "xp"
                                ? "A simpler time. A familiar screen. Memories that never really left"
                                : "Some things from this computer were never meant to be forgotten."}
                    </p>
                </motion.div>
            </div>

            {/* START MENU */}

            <AnimatePresence>
                {startMenuOpen && (
                    <StartMenu
                        year={year}
                        mode={mode}
                        onClose={() => setStartMenuOpen(false)}
                        onOpen={(id) => {
                            sounds.click();
                            openWindow(id);
                            setStartMenuOpen(false);
                        }}
                        onChangeYear={(newYear) => {
                            setStartMenuOpen(false);
                            onChangeYear(newYear);
                        }}
                        onRestart={() => {
                            setStartMenuOpen(false);
                            restartDesktop();
                        }}
                        onShutdown={() => {
                            sounds.close();
                            setStartMenuOpen(false);
                            onShutdown?.();
                        }}
                    />
                )}
            </AnimatePresence>

            {/* ACTIVE WINDOW */}

            <AnimatePresence>
                {activeWindow && (
                    <Window
                        title={
                            mode === "aero" || mode === "modern" || mode === "metro"
                                ? activeWindow.replace(/(^\w|-\w)/g, (match) =>
                                    match.replace("-", " ").toUpperCase()
                                )
                                : `${activeWindow.toUpperCase()}.EXE`
                        }
                        onClose={closeWindow}
                        onMinimize={closeWindow}
                        yearData={yearData}
                    >
                        {activeWindow === "music" ? (
                            <MusicWindow yearData={yearData} />
                        ) : activeWindow === "internet" ? (
                            <InternetWindow yearData={yearData} />
                        ) : activeWindow === "memories" ? (
                            <MemoriesWindow yearData={yearData} />
                        ) : activeWindow === "tech" ? (
                            <TechWindow yearData={yearData} />
                        ) : activeWindow === "movies" ? (
                            <MoviesWindow yearData={yearData} />
                        ) : (
                            <div className={`p-8 ${chrome.label}`}>
                                <p className="text-xs tracking-[0.3em] text-white/30">
                                    SYSTEM MODULE
                                </p>
                                <h2 className="mt-4 text-4xl font-light capitalize text-white">
                                    {activeWindow}
                                </h2>
                                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                                    This part of the internet is currently being restored.
                                </p>
                            </div>
                        )}
                    </Window>
                )}
            </AnimatePresence>

            {/* CONTEXT MENU */}

            <AnimatePresence>
                {contextMenu && (
                    <DesktopContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        onRefresh={() => {
                            setSelectedIcon(null);
                            refreshDesktop();
                        }}
                    />
                )}
            </AnimatePresence>

            {/* TASKBAR — visually distinct per era, all driven by `chrome` */}

            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className={`absolute bottom-0 left-0 right-0 z-[100] h-12 ${chrome.taskbar}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex h-full items-center justify-between px-4 md:px-6">

                    {/* LEFT */}

                    <div className="flex items-center gap-3">

                        <motion.button
                            onClick={toggleStartMenu}
                            whileHover={{ scale: 1.035 }}
                            whileTap={{ scale: 0.96 }}
                            className={`relative flex h-9 items-center gap-2 overflow-hidden border transition-all ${chrome.startBtn} ${startMenuOpen ? chrome.startBtnActive : ""
                                }`}
                        >
                            {chrome.glow && (
                                <div
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, ${chrome.glowColor}, transparent 55%)`,
                                    }}
                                />
                            )}

                            <img
                                src={`/windows/${year}.png`}
                                alt={`Windows ${year}`}
                                className="relative h-9 w-9 object-contain"
                            />
                        </motion.button>

                        <motion.button
                            onClick={toggleSearch}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.94 }}
                            className={`flex h-9 w-9 items-center justify-center border transition-all ${chrome.startBtn} ${searchOpen ? chrome.startBtnActive : ""}`}
                        >
                            <SearchIcon size={14} strokeWidth={1.6} className={chrome.startIcon} />
                        </motion.button>

                        <div className={`hidden h-6 w-px sm:block ${chrome.divider}`} />

                        <span className={`hidden sm:block ${chrome.label} text-[9px] ${chrome.sideIcon}`}>
                            TIME.OS {year}
                        </span>
                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-4">
                        <button onClick={() => togglePanel("volume")} className="transition hover:opacity-70">
                            <Volume2 size={15} strokeWidth={1.6} className={chrome.sideIcon} />
                        </button>

                        <button onClick={() => togglePanel("wifi")} className="transition hover:opacity-70">
                            <Wifi size={15} strokeWidth={1.6} className={chrome.sideIcon} />
                        </button>

                        <button onClick={() => togglePanel("battery")} className="transition hover:opacity-70">
                            <BatteryFull size={16} strokeWidth={1.6} className={chrome.sideIcon} />
                        </button>

                        <button onClick={() => togglePanel("calendar")} className="text-right transition hover:opacity-70">
                            <p className={chrome.time}>{time}</p>
                            <p className={chrome.date}>12 / 31 / {year}</p>
                        </button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {openPanel === "calendar" && (
                    <SystemPopover mode={mode} title="Calendar" onClose={() => setOpenPanel(null)}>
                        <CalendarPanel year={year} />
                    </SystemPopover>
                )}
                {openPanel === "volume" && (
                    <SystemPopover mode={mode} title="Volume" onClose={() => setOpenPanel(null)}>
                        <VolumePanel />
                    </SystemPopover>
                )}
                {openPanel === "wifi" && (
                    <SystemPopover mode={mode} title="Network" onClose={() => setOpenPanel(null)}>
                        <WifiPanel year={year} />
                    </SystemPopover>
                )}
                {openPanel === "battery" && (
                    <SystemPopover mode={mode} title="Battery" onClose={() => setOpenPanel(null)}>
                        <BatteryPanel />
                    </SystemPopover>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {searchOpen && (
                    <SearchPanel
                        icons={icons}
                        onOpen={(id) => {
                            openWindow(id);
                            setSearchOpen(false);
                        }}
                        onClose={() => setSearchOpen(false)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}

export default Desktop;