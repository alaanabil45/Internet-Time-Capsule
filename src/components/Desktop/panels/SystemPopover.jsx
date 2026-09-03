import { motion } from "framer-motion";
import { X } from "lucide-react";

const STYLES = {
    dark: {
        shell: "rounded-md border border-white/10 bg-[#080d12]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        header: "border-b border-white/10 px-3 py-2",
        title: "font-mono text-[9px] tracking-[0.25em] text-white/40",
        close: "text-white/30 hover:text-white/70",
        body: "font-mono text-white/70",
    },
    xp: {
        shell: "rounded-lg border border-blue-200/50 bg-gradient-to-b from-[#4f8bd6] to-[#1650a6] shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        header: "border-b border-blue-100/30 px-3 py-2 bg-white/10",
        title: "font-sans text-[11px] font-bold text-white drop-shadow",
        close: "text-white/80 hover:text-white",
        body: "font-sans text-white",
    },
    aero: {
        shell: "rounded-xl border border-white/40 bg-white/[0.14] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.35)]",
        header: "border-b border-white/25 px-3 py-2",
        title: "font-sans text-[11px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]",
        close: "text-white/70 hover:text-white",
        body: "font-sans text-white/90",
    },
    metro: {
        shell: "rounded-none border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.4)]",
        header: "px-3 py-2 border-b border-white/15",
        title: "font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white",
        close: "text-white/70 hover:text-white",
        body: "font-sans text-white",
    },
    modern: {
        shell: "rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.4)]",
        header: "border-b border-white/10 px-3 py-2",
        title: "font-sans text-[10px] font-medium tracking-wide text-white/70",
        close: "text-white/40 hover:text-white/80",
        body: "font-sans text-white/85",
    },
};

function SystemPopover({ mode = "dark", title, onClose, children, width = 250 }) {
    const s = STYLES[mode] || STYLES.dark;
    const isMetro = mode === "metro";

    return (
        <>
            <div className="fixed inset-0 z-[110]" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                onClick={(event) => event.stopPropagation()}
                style={{
                    width,
                    background: isMetro
                        ? "color-mix(in srgb, var(--year-accent) 92%, black)"
                        : undefined,
                }}
                className={`absolute bottom-[52px] right-4 z-[120] overflow-hidden ${s.shell}`}
            >
                <div className={`flex items-center justify-between ${s.header}`}>
                    <span className={s.title}>{title}</span>
                    <button
                        onClick={onClose}
                        className={`flex h-5 w-5 items-center justify-center rounded ${s.close}`}
                    >
                        <X size={12} strokeWidth={1.6} />
                    </button>
                </div>

                <div className={`p-3 ${s.body}`}>{children}</div>
            </motion.div>
        </>
    );
}

export default SystemPopover;