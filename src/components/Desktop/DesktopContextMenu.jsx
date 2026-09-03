import { motion } from "framer-motion";

function DesktopContextMenu({
    x,
    y,
    onClose,
    onRefresh,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            className="fixed z-[300] w-[190px] overflow-hidden rounded-md border border-white/15 bg-[#080d12]/95 p-1 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            style={{
                left: Math.min(x, window.innerWidth - 200),
                top: Math.min(y, window.innerHeight - 250),
            }}
            onClick={(event) => event.stopPropagation()}
        >
            <button
                onClick={() => {
                    onRefresh();
                    onClose();
                }}
                className="w-full rounded px-3 py-2 text-left font-mono text-[10px] text-white/60 transition hover:bg-white/[0.07] hover:text-white"
            >
                Refresh
            </button>

            <div className="my-1 border-t border-white/[0.06]" />

            <button
                onClick={onClose}
                className="w-full rounded px-3 py-2 text-left font-mono text-[10px] text-white/40 transition hover:bg-white/[0.07] hover:text-white"
            >
                Display settings
            </button>

            <button
                onClick={onClose}
                className="w-full rounded px-3 py-2 text-left font-mono text-[10px] text-white/40 transition hover:bg-white/[0.07] hover:text-white"
            >
                Sort by
            </button>

            <div className="my-1 border-t border-white/[0.06]" />

            <button
                onClick={onClose}
                className="w-full rounded px-3 py-2 text-left font-mono text-[10px] text-white/40 transition hover:bg-white/[0.07] hover:text-white"
            >
                About TIME.OS
            </button>
        </motion.div>
    );
}

export default DesktopContextMenu;