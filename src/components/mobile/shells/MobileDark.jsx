import { Settings2 } from "lucide-react";

function MobileDark({ year, icons, wallpaper, time, onOpenApp, onOpenMenu }) {
    const dock = icons.slice(0, 4);
    const grid = icons.slice(4);

    return (
        <div
            className="relative flex h-full w-full flex-col bg-[#0a0a0e] font-sans text-white"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/25" />

            {/* Status bar */}
            <div className="relative z-10 flex h-6 items-center justify-between px-4 text-[10px] font-medium">
                <span>{time}</span>
                <div className="flex items-center gap-1.5 opacity-80">
                    <span>LTE</span>
                    <div className="h-2 w-3.5 rounded-[1px] border border-white/70">
                        <div className="h-full w-2/3 bg-white" />
                    </div>
                </div>
            </div>

            {/* Icon grid */}
            <div className="relative z-10 flex-1 overflow-hidden px-6 pt-8">
                <div className="grid grid-cols-4 gap-x-5 gap-y-7">
                    {(grid.length ? grid : icons).map((icon) => (
                        <button key={icon.id} onClick={() => onOpenApp(icon.id)} className="flex flex-col items-center gap-1.5">
                            <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
                                <img src={icon.image} alt="" className="h-full w-full object-cover" draggable="false" />
                            </div>
                            <span className="max-w-[62px] truncate text-[9.5px] text-white/80">{icon.label}</span>
                        </button>
                    ))}

                    <button onClick={onOpenMenu} className="flex flex-col items-center gap-1.5">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px] border border-white/40 bg-white/15 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                            <img src="/icons/2012/phsettings.jpg" alt="Settings" className="h-full w-full object-cover" draggable="false" />
                        </div>
                        <span className="text-[9.5px] text-white/70">Settings</span>
                    </button>
                </div>
            </div>

            <div className="relative z-10 flex justify-center gap-1.5 pb-2">
                <span className="h-1 w-1 rounded-full bg-white/70" />
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="h-1 w-1 rounded-full bg-white/25" />
            </div>

            {/* Dock */}
            <div className="relative z-10 mx-3 mb-3 flex justify-around rounded-2xl bg-white/[0.06] p-2 backdrop-blur-md">
                {(dock.length ? dock : icons.slice(0, 4)).map((icon) => (
                    <button key={icon.id} onClick={() => onOpenApp(icon.id)}>
                        <div className="h-11 w-11 overflow-hidden rounded-xl border border-white/10">
                            <img src={icon.image} alt="" className="h-full w-full object-cover" draggable="false" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MobileDark;