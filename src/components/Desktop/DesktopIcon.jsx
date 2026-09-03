import { motion } from "framer-motion";

function DesktopIcon({
    icon,
    label,
    selected,
    onSelect,
    onOpen,
    onContextMenu,
}) {
    return (
        <motion.button
            onClick={(event) => {
                event.stopPropagation();
                onSelect();
            }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onOpen();
            }}
            onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onSelect();

                onContextMenu({
                    x: event.clientX,
                    y: event.clientY,
                });
            }}
            whileHover={{
                y: -1,
            }}
            whileTap={{
                scale: 0.96,
            }}
            className={`group flex w-[82px] select-none flex-col items-center gap-1.5 rounded-sm p-1.5 text-center outline-none transition-colors ${selected
                    ? "bg-white/[0.14]"
                    : "hover:bg-white/[0.05]"
                }`}
        >
            <div className="flex h-12 w-12 items-center justify-center">
                <img
                    src={icon}
                    alt=""
                    draggable="false"
                    className="h-11 w-11 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
                />
            </div>

            <span
                className={`max-w-[78px] break-words text-[11px] leading-[1.25] transition-colors ${selected
                        ? "text-white"
                        : "text-white/80"
                    }`}
                style={{
                    textShadow:
                        "0 1px 3px rgba(0,0,0,0.9)",
                }}
            >
                {label}
            </span>
        </motion.button>
    );
}

export default DesktopIcon;