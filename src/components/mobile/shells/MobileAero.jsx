import { Settings2 } from "lucide-react";

function MobileAero({ year, icons, wallpaper, time, onOpenApp, onOpenMenu }) {
    const dock = icons.slice(0, 4);
    const grid = icons.slice(4);

    return (
        <div
            className="relative flex h-full w-full flex-col bg-gradient-to-b from-[#4c7190] to-[#1c3450] font-sans text-white"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Status bar */}
            <div className="relative z-10 flex h-7 items-center justify-between bg-black px-4 text-[11px] font-medium">
                <span>{time}</span>
                <div className="flex items-center gap-1.5">
                    <div className="flex items-end gap-[1px]">
                        {[3, 5, 7, 9].map((h, i) => (
                            <span key={i} className="w-[2px] bg-white" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                    <span className="text-[9px]">3G</span>
                    <div className="h-2.5 w-4 rounded-[2px] border border-white/70">
                        <div className="h-full w-3/4 bg-white" />
                    </div>
                </div>
            </div>

            {/* Icon grid */}
            <div className="relative z-10 flex-1 overflow-hidden px-5 pt-6">
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                    {(grid.length ? grid : icons).map((icon) => (
                        <button key={icon.id} onClick={() => onOpenApp(icon.id)} className="flex flex-col items-center gap-1.5">
                            <div className="relative h-14 w-14 overflow-hidden rounded-[16px] border border-white/40 bg-gradient-to-b from-white/40 to-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                                <img src={icon.image} alt="" className="h-full w-full object-cover" draggable="false" />
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                            </div>
                            <span className="max-w-[64px] truncate text-[10px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                                {icon.label}
                            </span>
                        </button>
                    ))}

                    <button onClick={onOpenMenu} className="flex flex-col items-center gap-1.5">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px] border border-white/40 bg-white/15 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                            <img src="/icons/2009/phsettings.jpg" alt="Settings" className="h-full w-full object-cover" draggable="false" />
                        </div>
                        <span className="text-[10px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] rounded-[16px]">Settings</span>
                    </button>
                </div>
            </div>

            {/* Page dots */}
            <div className="relative z-10 flex justify-center gap-1.5 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>

            {/* Dock */}
            <div className="relative z-10 mx-3 mb-3 flex justify-around rounded-2xl border border-white/25 bg-black/30 p-2 backdrop-blur-xl">
                {dock.length > 0
                    ? dock.map((icon) => (
                        <button key={icon.id} onClick={() => onOpenApp(icon.id)}>
                            <div className="h-12 w-12 overflow-hidden rounded-[14px] border border-white/30 shadow-md">
                                <img src={icon.image} alt="" className="h-full w-full object-cover" draggable="false" />
                            </div>
                        </button>
                    ))
                    : <span className="py-2 text-[9px] text-white/40">— {year} —</span>}
            </div>
        </div>
    );
}

export default MobileAero;