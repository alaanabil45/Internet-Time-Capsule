import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function CalendarPanel({ year }) {
    const [viewMonth, setViewMonth] = useState(11);
    const [viewYear, setViewYear] = useState(year);

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const goPrev = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else {
            setViewMonth((m) => m - 1);
        }
    };

    const goNext = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else {
            setViewMonth((m) => m + 1);
        }
    };

    return (
        <div className="w-[210px]">
            <div className="mb-2 flex items-center justify-between">
                <button onClick={goPrev} className="opacity-60 transition hover:opacity-100">
                    <ChevronLeft size={13} />
                </button>

                <span className="text-[10px] tracking-wide">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                </span>

                <button onClick={goNext} className="opacity-60 transition hover:opacity-100">
                    <ChevronRight size={13} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-[9px] opacity-50">
                {WEEK_DAYS.map((d, i) => (
                    <span key={i}>{d}</span>
                ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[10px]">
                {cells.map((day, i) => {
                    const isToday = day === 31 && viewMonth === 11 && viewYear === year;

                    return (
                        <span
                            key={i}
                            className="mx-auto flex h-6 w-6 items-center justify-center rounded-full"
                            style={{
                                opacity: day ? 1 : 0,
                                background: isToday ? "var(--year-accent)" : "transparent",
                                color: isToday ? "#0a0a0a" : "inherit",
                                fontWeight: isToday ? 600 : 400,
                            }}
                        >
                            {day || ""}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default CalendarPanel;