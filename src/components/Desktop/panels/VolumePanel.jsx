import { useState } from "react";
import { Volume2, Volume1, VolumeX } from "lucide-react";

function VolumePanel() {
    const [level, setLevel] = useState(70);
    const [muted, setMuted] = useState(false);

    const effective = muted ? 0 : level;
    const Icon = effective === 0 ? VolumeX : effective < 50 ? Volume1 : Volume2;

    return (
        <div className="w-[170px]">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setMuted((m) => !m)}
                    className="opacity-70 transition hover:opacity-100"
                >
                    <Icon size={16} strokeWidth={1.6} />
                </button>

                <input
                    type="range"
                    min={0}
                    max={100}
                    value={effective}
                    onChange={(event) => {
                        setMuted(false);
                        setLevel(Number(event.target.value));
                    }}
                    className="h-1 flex-1 accent-[color:var(--year-accent)]"
                />
            </div>

            <p className="mt-2 text-center text-[9px] opacity-50">
                {muted ? "Muted" : `${level}%`}
            </p>
        </div>
    );
}

export default VolumePanel;