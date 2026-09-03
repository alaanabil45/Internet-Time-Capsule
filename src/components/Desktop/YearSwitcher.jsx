import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

function YearSwitcher({
    currentYear,
    years,
    onChangeYear,
}) {
    return (
        <div className="absolute right-4 top-4 z-[100]">
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-2 py-1.5 backdrop-blur-md">

                <Clock3
                    size={13}
                    strokeWidth={1.5}
                    className="text-white/35"
                />

                <select
                    value={currentYear}
                    onChange={(event) =>
                        onChangeYear(Number(event.target.value))
                    }
                    className="bg-transparent font-mono text-[10px] text-white/55 outline-none"
                >
                    {years.map((item) => (
                        <option
                            key={item.year}
                            value={item.year}
                            className="bg-[#080d12] text-white"
                        >
                            {item.year}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}

export default YearSwitcher;