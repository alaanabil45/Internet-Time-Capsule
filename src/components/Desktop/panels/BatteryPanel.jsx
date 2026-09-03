function BatteryPanel() {
    return (
        <div className="w-[170px] text-[10px]">
            <div className="flex items-center justify-between">
                <span className="opacity-60">Battery</span>
                <span className="font-semibold">100%</span>
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full w-full rounded-full"
                    style={{ background: "var(--year-accent)" }}
                />
            </div>

            <p className="mt-2 opacity-45">Plugged in, charging</p>
        </div>
    );
}

export default BatteryPanel;