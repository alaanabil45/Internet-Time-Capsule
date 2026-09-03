import { useEffect, useState } from "react";

function useCursor() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const move = (event) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return position;
}

export default useCursor;