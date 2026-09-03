import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, X, Maximize2, Minimize2 } from "lucide-react";

const WINDOW_STYLES = {
    dark: {
        shell: "rounded-md border border-white/10 bg-[#080d12]/95 shadow-[0_20px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl",
        titlebar: "h-10 border-b border-white/10 bg-white/[0.025]",
        titleFont: "font-mono text-white/70",
        iconBox: "rounded bg-white/[0.03] text-white/45",
        btn: "text-white/35 hover:bg-white/[0.08]",
        closeBtn: "hover:bg-red-500/70",
        toolbar: false,
        statusbar: false,
    },
    xp: {
        shell: "rounded-t-[10px] rounded-b-md border-2 border-[#0047ab] bg-[#ece9d8] shadow-[0_18px_55px_rgba(0,0,0,0.5)]",
        titlebar: "h-8 bg-gradient-to-b from-[#3d94f6] via-[#1c5fd6] to-[#0f3faa] border-b-2 border-[#0047ab] rounded-t-[8px]",
        titleFont: "font-sans text-[12.5px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] tracking-tight",
        iconBox: "rounded bg-transparent text-white",
        btn: "text-white hover:brightness-110",
        closeBtn: "hover:bg-[#e81123]",
        toolbar: true,
        toolbarClass: "bg-[#ece9d8] border-b border-[#aca899] text-[#1a1a1a]",
        toolbarItemClass: "hover:bg-[#c2d8f7] hover:border hover:border-[#7ba7e0] text-[#1a1a1a]",
        statusbar: true,
        statusbarClass: "bg-[#ece9d8] border-t border-[#aca899] text-[#3a3a3a]",
    },
    aero: {
        shell: "rounded-[9px] border border-white/45 bg-white/[0.16] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl",
        titlebar: "h-10 border-b border-white/25 bg-white/[0.10]",
        titleFont: "font-sans font-medium text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.65)]",
        iconBox: "rounded-md bg-white/15 shadow-inner text-white/85",
        btn: "text-white/75 hover:bg-white/[0.12]",
        closeBtn: "hover:bg-red-500/70",
        toolbar: true,
        toolbarClass: "bg-white/[0.07] border-b border-white/15",
        toolbarItemClass: "hover:bg-white/10 text-white/75",
        statusbar: true,
        statusbarClass: "bg-black/[0.08] border-t border-white/15",
    },
    metro: {
        shell: "rounded-none border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-[#0e0e12]/95",
        titlebar: "h-9 border-b border-white/15",
        titlebarStyle: true,
        titleFont: "font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white",
        iconBox: "rounded-none bg-white/10 text-white",
        btn: "text-white/80 hover:bg-white/15",
        closeBtn: "hover:bg-red-500/80",
        toolbar: false,
        statusbar: false,
    },
    modern: {
        shell: "rounded-2xl border border-white/10 bg-[#0b0b10]/95 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
        titlebar: "h-11 border-b border-white/10 bg-white/[0.03]",
        titleFont: "font-sans text-[11px] font-medium tracking-wide text-white/85",
        iconBox: "rounded-lg bg-white/[0.06] text-white/70",
        btn: "text-white/50 hover:bg-white/[0.08]",
        closeBtn: "hover:bg-red-500/70",
        toolbar: false,
        statusbar: false,
    },
};

function Window({ title, children, onClose, onMinimize, yearData }) {
    const [isMaximized, setIsMaximized] = useState(false);

    const mode = yearData?.desktop?.theme?.mode || "dark";
    const s = WINDOW_STYLES[mode] || WINDOW_STYLES.dark;

    const accent = yearData?.desktop?.theme?.accent || "#8aa8b8";

    const handleMaximize = () => setIsMaximized((previous) => !previous);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: 8, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed z-[80] overflow-hidden ${isMaximized
                ? "inset-3 h-[calc(100vh-24px)] w-[calc(100vw-24px)]"
                : "left-1/2 top-1/2 max-h-[82vh] w-[min(900px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2"
                } ${s.shell}`}
            style={{ "--window-accent": accent }}
        >
            {mode === "aero" && (
                <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-white/[0.18] via-white/[0.05] to-transparent" />
                    <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.18),transparent_32%)]" />
                </>
            )}

            {/* TITLE BAR */}
            <div
                className={`relative z-30 flex items-center justify-between px-2 ${s.titlebar}`}
                style={s.titlebarStyle ? { background: "var(--window-accent)" } : undefined}
            >
                <div className="flex min-w-0 items-center gap-2">
                    <div className={`ml-1 flex h-6 w-6 shrink-0 items-center justify-center ${s.iconBox}`}>
                        <span className="text-[10px]">
                            {mode === "aero" ? "◆" : mode === "metro" ? "▣" : "◈"}
                        </span>
                    </div>

                    <span className={`truncate text-xs ${s.titleFont}`}>{title}</span>
                </div>

                <div className={`flex h-full items-center ${mode === "xp" ? "gap-[2px] pr-1" : ""}`}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onMinimize}
                        className={`flex h-6 items-center justify-center transition ${mode === "xp" ? "w-6 rounded border border-white/40 bg-white/10" : "h-7 w-9"} ${s.btn}`}
                        aria-label="Minimize"
                    >
                        <Minus size={13} strokeWidth={1.6} />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleMaximize}
                        className={`flex items-center justify-center transition ${mode === "xp" ? "h-6 w-6 rounded border border-white/40 bg-white/10" : "h-7 w-9"} ${s.btn}`}
                        aria-label={isMaximized ? "Restore" : "Maximize"}
                    >
                        {isMaximized ? (
                            <Minimize2 size={11} strokeWidth={1.6} />
                        ) : (
                            <Maximize2 size={11} strokeWidth={1.6} />
                        )}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className={`flex items-center justify-center transition ${mode === "xp" ? "h-6 w-6 rounded border border-white/40 bg-white/10" : "h-7 w-9"} ${s.btn} ${s.closeBtn}`}
                        aria-label="Close"
                    >
                        <X size={13} strokeWidth={1.6} />
                    </motion.button>
                </div>
            </div>



            {/* CONTENT */}
            <div
                className={`relative z-10 ${isMaximized ? "h-[calc(100%-40px)]" : "max-h-[75vh]"
                    } overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10`}
            >
                {children}
            </div>

            {/* STATUS BAR (xp / aero only) */}
            {s.statusbar && (
                <div className={`relative z-30 flex h-6 items-center justify-between px-3 ${s.statusbarClass}`}>
                    <span className="text-[8px] opacity-70">Ready</span>
                    <span className="text-[8px] opacity-50">TIME.OS</span>
                </div>
            )}
        </motion.div>
    );
}

export default Window;