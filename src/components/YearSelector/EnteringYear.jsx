import { useEffect, useState } from "react";

function EnteringYear({ year, onComplete }) {
    const [current, setCurrent] = useState(year + 7);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        let value = year + 7;

        const interval = setInterval(() => {
            value -= 1;

            if (value <= year) {
                clearInterval(interval);

                setTimeout(() => {
                    setFinished(true);

                    setTimeout(() => {
                        onComplete();
                    }, 1200);
                }, 400);

                return;
            }

            setCurrent(value);
        }, 180);

        return () => clearInterval(interval);
    }, [year, onComplete]);

    return (
        <main
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-1000 ${finished ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="text-center font-mono">
                <p className="mb-8 text-[10px] tracking-[0.5em] text-white/30">
                    TIME TRAVEL PROTOCOL
                </p>

                <div className="h-28 overflow-hidden">
                    <div
                        key={current}
                        className="animate-pulse text-7xl font-light tracking-tight md:text-9xl"
                    >
                        {current}
                    </div>
                </div>

                <div className="mx-auto mt-10 h-px w-64 bg-white/10">
                    <div
                        className="h-full bg-white transition-all duration-200"
                        style={{
                            width: `${((year + 7 - current) / 7) * 100}%`,
                        }}
                    />
                </div>

                <p className="mt-6 text-[10px] tracking-[0.35em] text-white/30">
                    RESTORING {year}...
                </p>
            </div>
        </main>
    );
}

export default EnteringYear;