import { motion } from "framer-motion";
import {
    Globe, Music2, Camera, Laptop, Film, Newspaper,
    LogOut, Power, User, Folder, Monitor, Settings,
} from "lucide-react";

const apps = [
    { id: "internet", label: "Internet Explorer", Icon: Globe },
    { id: "music", label: "Windows Media Player", Icon: Music2 },
    { id: "memories", label: "My Pictures", Icon: Camera },
    { id: "tech", label: "Tech Archive", Icon: Laptop },
    { id: "movies", label: "My Videos", Icon: Film },
];

function StartMenuXP({ year, onOpen, onClose, onChangeYear, onRestart, onShutdown }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/10"
            />

            <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                onClick={(event) => event.stopPropagation()}
                className="absolute bottom-[48px] left-2 z-50 w-[340px] overflow-hidden rounded-t-lg rounded-b-md border-2 border-[#0047ab] bg-[#ece9d8] shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
            >
                {/* User header — classic XP blue gradient with avatar */}
                <div className="flex items-center gap-3 bg-gradient-to-b from-[#3d94f6] via-[#1c5fd6] to-[#1149ae] px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-white/70 bg-white/20 shadow-inner">
                        <User size={20} strokeWidth={1.8} className="text-white" />
                    </div>
                    <span className="text-[15px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                        Time.OS User
                    </span>
                </div>

                {/* Two columns */}
                <div className="flex">
                    {/* LEFT — programs */}
                    <div className="flex-1 bg-white px-1.5 py-2">
                        {apps.map((app) => {
                            const Icon = app.Icon;
                            return (
                                <button
                                    key={app.id}
                                    onClick={() => onOpen(app.id)}
                                    className="flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left transition hover:bg-[#2a6fdb] hover:text-white"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center">
                                        <Icon size={16} strokeWidth={1.7} className="text-[#1c5fd6] group-hover:text-white" />
                                    </div>
                                    <span className="text-[12px] font-medium text-[#15315c]">
                                        {app.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT — system + time travel */}
                    <div className="w-[130px] border-l border-[#aca899] bg-[#d8e4f5] px-1.5 py-2">
                        <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition hover:bg-[#2a6fdb] hover:text-white">
                            <Folder size={14} className="text-[#e0a940]" />
                            <span className="text-[11px] font-medium text-[#15315c]">My Documents</span>
                        </button>

                        <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition hover:bg-[#2a6fdb] hover:text-white">
                            <Monitor size={14} className="text-[#3a6ea5]" />
                            <span className="text-[11px] font-medium text-[#15315c]">My Computer</span>
                        </button>

                        <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition hover:bg-[#2a6fdb] hover:text-white">
                            <Settings size={14} className="text-[#6b6b6b]" />
                            <span className="text-[11px] font-medium text-[#15315c]">Control Panel</span>
                        </button>

                        <div className="my-2 border-t border-[#aca899]" />

                        <p className="px-2 text-[9px] font-semibold uppercase tracking-wide text-[#4a6fa5]">
                            Time Travel
                        </p>

                        <select
                            value={year}
                            onChange={(event) => onChangeYear(Number(event.target.value))}
                            className="mt-1.5 w-full rounded border border-[#7ba7e0] bg-white px-1.5 py-1 text-[10px] text-[#15315c] outline-none"
                        >
                            <option value={2004}>2004</option>
                            <option value={2009}>2009</option>
                            <option value={2012}>2012</option>
                            <option value={2019}>2019</option>
                        </select>
                    </div>
                </div>

                {/* Bottom power bar — classic XP green strip */}
                <div className="flex items-center justify-end gap-2 border-t-2 border-[#1941a5] bg-gradient-to-b from-[#2a6fdb] to-[#1149ae] px-3 py-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onRestart}
                        className="flex items-center gap-1.5 rounded border border-white/30 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white transition hover:bg-white/20"
                    >
                        <LogOut size={12} strokeWidth={2} />
                        Log Off
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onShutdown}
                        className="flex items-center gap-1.5 rounded border border-red-300/50 bg-red-600/40 px-2.5 py-1.5 text-[10px] font-semibold text-white transition hover:bg-red-600/60"
                    >
                        <Power size={12} strokeWidth={2} />
                        Turn Off
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}

export default StartMenuXP;