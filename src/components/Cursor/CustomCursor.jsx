import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
    const [position, setPosition] = useState({
        x: -100,
        y: -100,
    });

    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (event) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        const handleOver = (event) => {
            const target = event.target;

            if (
                target.closest("button") ||
                target.closest("a") ||
                target.closest("[data-cursor='interactive']")
            ) {
                setHovering(true);
            } else {
                setHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleOver);
        };
    }, []);

    return (
        <>
            {/* Outer glow */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-white/20 md:block"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: hovering ? 1.5 : 1,
                    opacity: hovering ? 0.8 : 0.45,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                    mass: 0.2,
                }}
            />

            {/* Core */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-1.5 w-1.5 rounded-full bg-white md:block"
                animate={{
                    x: position.x - 3,
                    y: position.y - 3,
                    scale: hovering ? 0.6 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 900,
                    damping: 35,
                    mass: 0.1,
                }}
            />
        </>
    );
}

export default CustomCursor;