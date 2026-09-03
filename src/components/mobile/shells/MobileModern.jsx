import { Settings2 } from "lucide-react";

function MobileModern({ year, icons, wallpaper, time, onOpenApp, onOpenMenu }) {
    const dock = icons.slice(0, 4);
    const grid = icons.slice(4);

    return (
        <div
            className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a0a14] via-[#0a0a0e] to-[#0a1420] font-sans text-white"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/20" />

            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />

            {/* Status bar */}
            <div className="relative z-10 flex h-9 items-center justify-between px-6 pt-1 text-[11px] font-semibold">
                <span>{time}</span>
                <div className="flex items-center gap-1.5 opacity-90">
                    <span>5G</span>
                    <div className="h-2.5 w-4 rounded-[3px] border border-white/70">
                        <div className="h-full w-4/5 rounded-[1px] bg-white" />
                    </div>
                </div>
            </div>

            {/* Icon grid */}
            <div className="relative z-10 flex-1 overflow-hidden px-6 pt-6">
                <div className="grid grid-cols-4 gap-x-5 gap-y-8">
                    {(grid.length ? grid : icons).map((icon) => (
                        <button key={icon.id} onClick={() => onOpenApp(icon.id)} className="flex flex-col items-center gap-2">
                            <div className="h-14 w-14 overflow-hidden rounded-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                                <img src={icon.image} alt="" className="h-full w-full object-cover" draggable="false" />
                            </div>
                            <span className=" text-[10px] text-white/85">{icon.label}</span>
                        </button>
                    ))}

                    <button onClick={onOpenMenu} className="flex flex-col items-center gap-2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                            <img src="/icons/2019/phsettings.jpg" alt="Settings" className="h-full w-full object-cover" draggable="false" />
                        </div>
                        <span className="text-[10px] text-white/85">Settings</span>
                    </button>
                </div>
            </div>

            <div className="relative z-10 flex justify-center gap-1.5 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>

            {/* Dock */}
            <div className="relative z-10 mx-4 mb-3 flex justify-around rounded-[26px] border border-white/10 bg-white/[0.08] p-2.5 backdrop-blur-2xl">
                {(dock.length ? dock : icons.slice(0, 4)).map((icon) => (
                    <button key={icon.id} onClick={() => onOpenApp(icon.id)}>
                        <div className="h-12 w-12 overflow-hidden rounded-[15px]">
                            <img src="/icons/2019/phsettings.jpg" alt="" className="h-full w-full object-cover" draggable="false" />
                        </div>
                    </button>
                ))}
            </div>

            {/* Home indicator */}
            <div className="relative z-10 flex justify-center pb-1.5">
                <div className="h-1 w-28 rounded-full bg-white/70" />
            </div>
        </div>
    );
}

export default MobileModern;