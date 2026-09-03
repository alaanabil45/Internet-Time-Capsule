import { Settings2 } from "lucide-react";

function MobileXP({ year, icons, wallpaper, time, onOpenApp, onOpenMenu }) {
    return (
        <div
            className="relative flex h-full w-full flex-col bg-[#1c3f6e] font-mono text-white"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-[#0b2244]/55" />

            {/* Status bar — feature-phone style */}
            <div className="relative z-10 flex h-7 items-center justify-between border-b border-white/20 bg-[#0b3d91] px-3 text-[10px]">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                        <span key={bar} className="inline-block h-2 w-1 bg-white/80" style={{ height: `${4 + bar * 2}px` }} />
                    ))}
                    <span className="ml-1">TIME.NET</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>{time}</span>
                    <span className="rounded-sm border border-white/70 px-1 text-[8px]">100%</span>
                </div>
            </div>

            {/* App grid */}
            <div className="relative z-10 flex-1 overflow-hidden p-4">
                <p className="mb-3 text-[9px] tracking-[0.25em] text-white/50">TIME.OS — {year}</p>
                <div className="grid h-full grid-cols-3 content-start gap-4">
                    {icons.map((icon) => (
                        <button
                            key={icon.id}
                            onClick={() => onOpenApp(icon.id)}
                            className="flex flex-col items-center rounded-md text-center"
                        >
                            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-white/40 bg-white/10 shadow-inner">
                                <img src={icon.image} alt="" className="h-8 w-8 object-contain rounded-md" draggable="false" />
                            </div>
                            <span className="max-w-[64px] truncate text-[9px] text-white/85">{icon.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Soft keys bar */}
            <div className="relative z-10 flex h-9 items-center justify-between border-t border-white/20 bg-[#0b3d91] px-4 text-[10px] font-semibold">
                <button onClick={onOpenMenu} className="flex items-center gap-1">
                    <Settings2 size={12} /> Menu
                </button>
                <span className="opacity-40">Select</span>
                <span>Name</span>
            </div>
        </div>
    );
}

export default MobileXP;