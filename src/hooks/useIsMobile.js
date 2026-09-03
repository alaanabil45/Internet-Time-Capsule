import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function detectMobile() {
    if (typeof window === "undefined") return false;
    const uaMobile = /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile/i.test(
        navigator.userAgent || ""
    );
    const narrowScreen = window.innerWidth <= MOBILE_BREAKPOINT;
    return uaMobile || narrowScreen;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(detectMobile);

    useEffect(() => {
        const handleResize = () => setIsMobile(detectMobile());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}

export default useIsMobile;