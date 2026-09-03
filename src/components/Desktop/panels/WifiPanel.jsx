import { useState } from "react";
import { Wifi, Check, Lock } from "lucide-react";

function networksForYear(year) {
    if (year <= 2009) {
        return [
            { id: "dialup", label: "Dial-Up Connection", secure: false },
            { id: "neighbor", label: "linksys", secure: true },
        ];
    }

    return [
        { id: "home", label: "Home Network", secure: true },
        { id: "hotspot", label: "My Phone", secure: true },
        { id: "cafe", label: "Free Public WiFi", secure: false },
    ];
}

function WifiPanel({ year }) {
    const networks = networksForYear(year);
    const [connected, setConnected] = useState(networks[0].id);

    return (
        <div className="w-[200px]">
            <p className="mb-2 text-[9px] uppercase tracking-widest opacity-40">
                Available networks
            </p>

            <div className="flex flex-col gap-1">
                {networks.map((net) => (
                    <button
                        key={net.id}
                        onClick={() => setConnected(net.id)}
                        className="flex items-center justify-between rounded px-2 py-1.5 text-left text-[10px] transition hover:bg-white/10"
                    >
                        <span className="flex items-center gap-2">
                            <Wifi size={12} strokeWidth={1.6} className="opacity-70" />
                            {net.label}
                            {net.secure && <Lock size={9} strokeWidth={1.8} className="opacity-40" />}
                        </span>

                        {connected === net.id && <Check size={12} strokeWidth={1.8} />}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WifiPanel;