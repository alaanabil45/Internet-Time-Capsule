import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import MusicWindow from "../Music/MusicWindow";
import InternetWindow from "../Internet/InternetWindow";
import MemoriesWindow from "../Memories/MemoriesWindow";
import TechWindow from "../Tech/TechWindow";
import MoviesWindow from "../Movies/MoviesWindow";

const HEADER_STYLES = {
    xp: "bg-[#0b3d91] text-white border-b border-black/40",
    aero: "bg-black/90 text-white border-b border-white/10 backdrop-blur-md",
    dark: "bg-[#111214] text-white border-b border-white/10",
    modern: "bg-[#141416]/90 text-white border-b border-white/5 backdrop-blur-xl",
};

function MobileAppView({ appId, yearData, mode, onClose }) {
    const headerClass = HEADER_STYLES[mode] || HEADER_STYLES.dark;

    let content = null;
    if (appId === "music") content = <MusicWindow yearData={yearData} />;
    else if (appId === "internet") content = <InternetWindow yearData={yearData} />;
    else if (appId === "memories") content = <MemoriesWindow yearData={yearData} />;
    else if (appId === "tech") content = <TechWindow yearData={yearData} />;
    else if (appId === "movies") content = <MoviesWindow yearData={yearData} />;
    else {
        content = (
            <div className="flex h-full items-center justify-center p-8 text-center text-white/40">
                <p className="text-xs">This app is currently being restored.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] flex h-[100dvh] w-screen flex-col overflow-hidden"
        >
            <div className={`flex h-12 shrink-0 items-center gap-3 px-3 ${headerClass}`}>
                <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
                    aria-label="Back"
                >
                    <ArrowLeft size={18} />
                </button>
                <span className="text-[13px] font-medium capitalize">{appId}</span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {content}
            </div>
        </motion.div>
    );
}

export default MobileAppView;