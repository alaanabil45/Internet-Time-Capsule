import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function SearchPanel({ icons, onOpen, onClose }) {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        if (!query.trim()) return icons;
        const q = query.trim().toLowerCase();
        return icons.filter((icon) => icon.label.toLowerCase().includes(q));
    }, [icons, query]);

    return (
        <>
            <div className="fixed inset-0 z-[110]" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                onClick={(event) => event.stopPropagation()}
                className="absolute bottom-[52px] left-4 z-[120] w-[280px] overflow-hidden rounded-md border border-white/10 bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                    <Search size={13} strokeWidth={1.6} className="opacity-50" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search this desktop..."
                        className="w-full bg-transparent font-mono text-[11px] text-white/80 outline-none placeholder:text-white/25"
                    />
                </div>

                <div className="max-h-[240px] overflow-y-auto p-1">
                    {results.length === 0 && (
                        <p className="px-3 py-4 text-center text-[10px] opacity-40">
                            No results found
                        </p>
                    )}

                    {results.map((icon) => (
                        <button
                            key={icon.id}
                            onClick={() => onOpen(icon.id)}
                            className="flex w-full items-center gap-3 rounded px-2 py-2 text-left transition hover:bg-white/10"
                        >
                            <img src={icon.image} alt="" className="h-6 w-6 object-contain" />
                            <span className="font-mono text-[10px] text-white/70">{icon.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

export default SearchPanel;