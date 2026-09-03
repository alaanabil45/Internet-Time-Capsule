import { motion } from "framer-motion";
import StartMenuXP from "./StartMenuXP";

import {
    Globe,
    Music2,
    Camera,
    Laptop,
    Film,
    Newspaper,
    Clock3,
    RotateCw,
    Power,
    Search,
    User,
    Settings,
    Folder,
    Monitor,
    ChevronRight,
    Menu,
    Grid3X3,
} from "lucide-react";

const applications = [
    { id: "internet", label: "Internet", Icon: Globe },
    { id: "music", label: "Music", Icon: Music2 },
    { id: "memories", label: "Memories", Icon: Camera },
    { id: "tech", label: "Tech", Icon: Laptop },
    { id: "movies", label: "Movies", Icon: Film },
];

/* =========================================================
   2009 — WINDOWS 7 / AERO
   ========================================================= */

function StartMenu2009({
    year,
    onOpen,
    onClose,
    onChangeYear,
    onRestart,
    onShutdown,
}) {
    return (
        <>
            {/* Glass overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/20"
            />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                }}
                onClick={(e) => e.stopPropagation()}
                className="
                    absolute bottom-[68px] left-4 z-50
                    w-[430px]
                    overflow-hidden
                    rounded-t-[10px] rounded-b-md
                    border border-white/50
                    bg-gradient-to-br
                    from-[#315b82]/95
                    via-[#183e61]/95
                    to-[#0b243d]/95
                    shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                    backdrop-blur-xl
                "
            >
                {/* Aero shine */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/25 to-transparent" />

                {/* USER HEADER */}
                <div className="relative flex items-center gap-3 border-b border-white/20 px-4 py-3">
                    <div
                        className="
                            flex h-11 w-11 items-center justify-center
                            rounded-full
                            border-2 border-white/60
                            bg-gradient-to-br from-white/50 to-white/10
                            shadow-[0_2px_8px_rgba(0,0,0,0.5)]
                        "
                    >
                        <User size={22} className="text-white" />
                    </div>

                    <div>
                        <p className="font-sans text-[13px] font-semibold text-white drop-shadow">
                            TIME.OS
                        </p>
                        <p className="text-[9px] text-white/60">
                            Windows 7 Era
                        </p>
                    </div>

                    <span className="ml-auto font-mono text-[10px] text-white/50">
                        {year}
                    </span>
                </div>

                {/* MAIN CONTENT */}
                <div className="relative flex min-h-[285px]">
                    {/* LEFT — PROGRAMS */}
                    <div className="w-[57%] bg-white/[0.04] p-2">
                        <p className="px-2 py-1 font-sans text-[9px] font-semibold text-white/50">
                            Programs
                        </p>

                        {applications.map((app) => {
                            const Icon = app.Icon;

                            return (
                                <motion.button
                                    key={app.id}
                                    whileHover={{
                                        x: 2,
                                        backgroundColor:
                                            "rgba(255,255,255,0.14)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onOpen(app.id)}
                                    className="
                                        group flex w-full items-center
                                        gap-3 rounded-[3px]
                                        px-2 py-[7px]
                                        text-left
                                    "
                                >
                                    <div
                                        className="
                                            flex h-7 w-7 items-center
                                            justify-center rounded-[3px]
                                            border border-white/20
                                            bg-white/10
                                            shadow-inner
                                        "
                                    >
                                        <Icon
                                            size={15}
                                            className="text-white/85"
                                        />
                                    </div>

                                    <span className="font-sans text-[11px] text-white/90">
                                        {app.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* RIGHT — WINDOWS 7 SHORTCUTS */}
                    <div className="w-[43%] border-l border-white/15 bg-black/10 p-2">
                        {[
                            {
                                label: "Documents",
                                Icon: Folder,
                            },
                            {
                                label: "Computer",
                                Icon: Monitor,
                            },
                            {
                                label: "Control Panel",
                                Icon: Settings,
                            },
                        ].map(({ label, Icon }) => (
                            <motion.button
                                key={label}
                                whileHover={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.10)",
                                }}
                                className="
                                    flex w-full items-center
                                    justify-between
                                    rounded-[3px]
                                    px-2 py-2.5
                                    text-left
                                "
                            >
                                <span className="flex items-center gap-2">
                                    <Icon
                                        size={14}
                                        className="text-white/75"
                                    />
                                    <span className="font-sans text-[10px] text-white/80">
                                        {label}
                                    </span>
                                </span>

                                <ChevronRight
                                    size={11}
                                    className="text-white/30"
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* SEARCH */}
                <div className="border-t border-white/20 bg-black/15 px-3 py-2">
                    <div
                        className="
                            flex items-center gap-2
                            rounded-sm
                            border border-white/20
                            bg-white/90
                            px-2 py-1.5
                            shadow-inner
                        "
                    >
                        <Search size={13} className="text-gray-500" />

                        <span className="font-sans text-[10px] text-gray-500">
                            Search programs and files
                        </span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between bg-black/20 px-3 py-2">
                    <div className="flex items-center gap-2">
                        <select
                            value={year}
                            onChange={(e) =>
                                onChangeYear(Number(e.target.value))
                            }
                            className="
                                rounded border border-white/20
                                bg-black/50
                                px-2 py-1
                                font-sans text-[9px] text-white
                                outline-none
                            "
                        >
                            <option className="bg-white/10" value={2004}>2004</option>
                            <option value={2009}>2009</option>
                            <option value={2012}>2012</option>
                            <option value={2019}>2019</option>
                        </select>

                        <button
                            onClick={() => onChangeYear(Number(year))}
                            className="
                                rounded border border-white/20
                                bg-white/10 px-2 py-1
                                font-sans text-[9px] text-white
                                hover:bg-white/20
                            "
                        >
                            GO
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onShutdown}
                        className="
                            flex items-center gap-2
                            rounded border border-white/20
                            bg-gradient-to-b from-white/20 to-white/5
                            px-3 py-1.5
                            font-sans text-[9px]
                            text-white
                        "
                    >
                        <Power size={13} />
                        Shut down
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}

/* =========================================================
   2012 — WINDOWS 8 / METRO
   ========================================================= */

function StartMenu2012({
    year,
    onOpen,
    onClose,
    onChangeYear,
    onRestart,
    onShutdown,
}) {
    const tiles = [
        {
            ...applications[0],
            size: "large",
        },
        {
            ...applications[1],
            size: "large",
        },
        {
            ...applications[2],
            size: "small",
        },
        {
            ...applications[3],
            size: "small",
        },
        {
            ...applications[4],
            size: "small",
        },

    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/10"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.96, x: -15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                }}
                onClick={(e) => e.stopPropagation()}
                className="
                    absolute bottom-[68px] left-4 z-50
                    w-[480px]
                    overflow-hidden
                    bg-[#111]
                    shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                "
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3">
                    <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
                            Start
                        </p>

                        <h2 className="mt-1 font-sans text-2xl font-light text-white">
                            TIME.OS
                        </h2>
                    </div>

                    <span className="font-sans text-[10px] text-white/35">
                        {year}
                    </span>
                </div>

                {/* SEARCH */}
                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                        <Search size={14} className="text-white/40" />

                        <span className="font-sans text-[10px] text-white/40">
                            Search
                        </span>
                    </div>
                </div>

                {/* TILES */}
                <div className="grid grid-cols-4 gap-[3px] px-5 pb-5">
                    {tiles.map((app, index) => {
                        const Icon = app.Icon;
                        const isLarge = index < 2;

                        return (
                            <motion.button
                                key={app.id}
                                onClick={() => onOpen(app.id)}
                                whileHover={{
                                    scale: 0.97,
                                    filter: "brightness(1.2)",
                                }}
                                whileTap={{ scale: 0.94 }}
                                className={`
                                    group
                                    relative
                                    flex
                                    ${isLarge ? "col-span-2 h-[92px]" : "col-span-1 h-[88px]"}
                                    flex-col
                                    items-start
                                    justify-between
                                    overflow-hidden
                                    bg-white/[0.10]
                                    p-3
                                    text-left
                                    transition
                                    hover:bg-white/[0.17]
                                `}
                            >
                                <Icon
                                    size={isLarge ? 25 : 20}
                                    strokeWidth={1.4}
                                    className="text-white/90"
                                />

                                <div>
                                    <p className="font-sans text-[10px] font-medium uppercase tracking-wide text-white">
                                        {app.label}
                                    </p>

                                    {isLarge && (
                                        <p className="mt-1 font-sans text-[8px] text-white/40">
                                            Open application
                                        </p>
                                    )}
                                </div>

                                {/* Metro accent */}
                                <div className="absolute right-0 top-0 h-1 w-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
                            </motion.button>
                        );
                    })}
                </div>

                {/* BOTTOM */}
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                    <div className="flex items-center gap-2">
                        <Grid3X3 size={13} className="text-white/40" />

                        <select
                            value={year}
                            onChange={(e) =>
                                onChangeYear(Number(e.target.value))
                            }
                            className="
                                bg-black/80
                                font-sans text-[9px]
                                text-white/60
                                outline-none
                            "
                        >
                            <option value={2004}>2004</option>
                            <option value={2009}>2009</option>
                            <option value={2012}>2012</option>
                            <option value={2019}>2019</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onRestart}
                            className="p-2 text-white/40 hover:text-white"
                            title="Restart"
                        >
                            <RotateCw size={14} />
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onShutdown}
                            className="p-2 text-white/40 hover:text-white"
                            title="Shut down"
                        >
                            <Power size={15} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

/* =========================================================
   2019 — WINDOWS 10
   ========================================================= */

function StartMenu2019({
    year,
    onOpen,
    onClose,
    onChangeYear,
    onRestart,
    onShutdown,
}) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/10"
            />

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
                onClick={(e) => e.stopPropagation()}
                className="
                    absolute bottom-[68px] left-4 z-50
                    w-[470px]
                    overflow-hidden
                    rounded-md
                    border border-white/10
                    bg-[#1b1b1b]/95
                    shadow-[0_25px_80px_rgba(0,0,0,0.7)]
                    backdrop-blur-2xl
                "
            >
                {/* TOP */}
                <div className="flex items-center gap-3 px-4 pt-4">
                    <button
                        className="
                            rounded-full
                            p-1.5
                            text-white/50
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        <Menu size={16} />
                    </button>

                    <div>
                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Start Menu
                        </p>

                        <p className="font-sans text-sm font-medium text-white/90">
                            TIME.OS
                        </p>
                    </div>

                    <span className="ml-auto font-mono text-[9px] text-white/25">
                        {year}
                    </span>
                </div>

                {/* CONTENT */}
                <div className="flex px-3 py-4">
                    {/* LEFT — ALL APPS */}
                    <div className="w-[52%] pr-2">
                        <div className="mb-2 flex items-center justify-between px-2">
                            <span className="font-sans text-[8px] uppercase tracking-widest text-white/30">
                                All apps
                            </span>

                            <ChevronRight
                                size={12}
                                className="text-white/25"
                            />
                        </div>

                        {applications.map((app) => {
                            const Icon = app.Icon;

                            return (
                                <motion.button
                                    key={app.id}
                                    whileHover={{
                                        x: 2,
                                        backgroundColor:
                                            "rgba(255,255,255,0.08)",
                                    }}
                                    onClick={() => onOpen(app.id)}
                                    className="
                                        group flex w-full
                                        items-center gap-3
                                        rounded-sm
                                        px-2 py-2
                                        text-left
                                    "
                                >
                                    <Icon
                                        size={15}
                                        strokeWidth={1.5}
                                        className="text-white/55 group-hover:text-white"
                                    />

                                    <span className="font-sans text-[10px] text-white/65 group-hover:text-white">
                                        {app.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* RIGHT — LIVE TILES */}
                    <div className="w-[48%] border-l border-white/10 pl-3">
                        <p className="mb-2 px-1 font-sans text-[8px] uppercase tracking-widest text-white/30">
                            Pinned
                        </p>

                        <div className="grid grid-cols-2 gap-1.5">
                            {applications.slice(0, 5).map((app, index) => {
                                const Icon = app.Icon;

                                return (
                                    <motion.button
                                        key={app.id}
                                        onClick={() => onOpen(app.id)}
                                        whileHover={{
                                            scale: 0.97,
                                            backgroundColor:
                                                "rgba(255,255,255,0.14)",
                                        }}
                                        whileTap={{ scale: 0.94 }}
                                        className="
                                            relative
                                            flex h-[62px]
                                            flex-col
                                            items-start
                                            justify-between
                                            rounded-sm
                                            bg-white/[0.07]
                                            p-2
                                            text-left
                                        "
                                    >
                                        <Icon
                                            size={17}
                                            className="text-white/75"
                                        />

                                        <span className="font-sans text-[8px] text-white/65">
                                            {app.label}
                                        </span>

                                        {index === 0 && (
                                            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SEARCH */}
                <div className="border-t border-white/10 px-4 py-3">
                    <div
                        className="
                            flex items-center gap-2
                            rounded-sm
                            border border-white/10
                            bg-white/[0.05]
                            px-3 py-2
                        "
                    >
                        <Search
                            size={13}
                            className="text-white/35"
                        />

                        <span className="font-sans text-[9px] text-white/35">
                            Type here to search
                        </span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                        <Settings
                            size={13}
                            className="text-white/35"
                        />

                        <select
                            value={year}
                            onChange={(e) =>
                                onChangeYear(Number(e.target.value))
                            }
                            className="
                                bg-black/50
                                font-sans text-[9px]
                                text-white/50
                                outline-none
                            "
                        >
                            <option value={2004}>2004</option>
                            <option value={2009}>2009</option>
                            <option value={2012}>2012</option>
                            <option value={2019}>2019</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onRestart}
                            className="
                                rounded p-2
                                text-white/35
                                hover:bg-white/10
                                hover:text-white
                            "
                            title="Restart"
                        >
                            <RotateCw size={14} />
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onShutdown}
                            className="
                                rounded p-2
                                text-white/35
                                hover:bg-white/10
                                hover:text-white
                            "
                            title="Shut down"
                        >
                            <Power size={15} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

/* =========================================================
   MAIN START MENU
   ========================================================= */

function StartMenu({
    year,
    mode = "dark",
    onOpen,
    onClose,
    onChangeYear,
    onRestart,
    onShutdown,
}) {
    /*
     * 2004 = XP
     * 2009 = Windows 7 / Aero
     * 2012 = Windows 8 / Metro
     * 2019 = Windows 10
     */

    if (year === 2004 || mode === "xp") {
        return (
            <StartMenuXP
                year={year}
                onOpen={onOpen}
                onClose={onClose}
                onChangeYear={onChangeYear}
                onRestart={onRestart}
                onShutdown={onShutdown}
            />
        );
    }

    if (year === 2009) {
        return (
            <StartMenu2009
                year={year}
                onOpen={onOpen}
                onClose={onClose}
                onChangeYear={onChangeYear}
                onRestart={onRestart}
                onShutdown={onShutdown}
            />
        );
    }

    if (year === 2012) {
        return (
            <StartMenu2012
                year={year}
                onOpen={onOpen}
                onClose={onClose}
                onChangeYear={onChangeYear}
                onRestart={onRestart}
                onShutdown={onShutdown}
            />
        );
    }

    if (year === 2019) {
        return (
            <StartMenu2019
                year={year}
                onOpen={onOpen}
                onClose={onClose}
                onChangeYear={onChangeYear}
                onRestart={onRestart}
                onShutdown={onShutdown}
            />
        );
    }

    // Fallback
    return (
        <StartMenu2019
            year={year}
            onOpen={onOpen}
            onClose={onClose}
            onChangeYear={onChangeYear}
            onRestart={onRestart}
            onShutdown={onShutdown}
        />
    );
}

export default StartMenu;