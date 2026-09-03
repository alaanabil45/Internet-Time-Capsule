import { useState } from "react";
import {
    ArrowLeft, ArrowRight, RotateCw, Home, Star, Search,
    ShieldCheck, Globe2, Plus, X, Rss, History, ExternalLink,
    Lock, MoreVertical, Menu,
} from "lucide-react";

function InternetWindow({ yearData }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [query, setQuery] = useState("");

    const themeMode = yearData?.desktop?.theme?.mode;
    const is2004 = themeMode === "xp";
    const is2009 = themeMode === "aero";
    const isModern = themeMode === "modern"; // 2019
    const is2012 = !is2004 && !is2009 && !isModern; // dark / default

    const items = yearData?.internet ?? [];

    const filteredItems = items.filter((item) => {
        const text = `${item.name} ${item.description}`.toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const goBack = () => setSelectedItem(null);
    const currentUrl = selectedItem
        ? `the-internet.local/${selectedItem.id}`
        : "the-internet.local";

    /*
     * ============================================================
     * 2004 — INTERNET EXPLORER 6 / WINDOWS XP ERA
     * ============================================================
     */

    if (is2004) {
        return (
            <div className="min-h-[55vh] overflow-hidden bg-[#ece9d8] font-sans text-[#000]">

                <div className="border-b border-[#003c74] bg-gradient-to-b from-[#3d94f6] via-[#1c5fd6] to-[#0f3faa]">
                    <div className="flex items-center gap-2 px-3 py-1.5">
                        <Globe2 size={14} className="text-white" />
                        <span className="text-[12px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                            {selectedItem ? selectedItem.name : "Time Archive"} - Microsoft Internet Explorer
                        </span>
                    </div>

                    <div className="flex items-center gap-4 border-t border-[#0047ab] bg-[#ece9d8] px-3 py-1 text-[11px] text-[#000]">
                        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
                            <span key={m} className="cursor-default hover:bg-[#c2d8f7] px-1">{m}</span>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 border-t border-[#aca899] bg-[#ece9d8] px-2 py-1.5">
                        <button
                            onClick={goBack}
                            disabled={!selectedItem}
                            className={`flex items-center gap-1 rounded border border-transparent px-2 py-1 text-[10px] ${selectedItem ? "text-[#333] hover:border-[#7ba7e0] hover:bg-[#c2d8f7]" : "text-[#aaa]"}`}
                        >
                            <ArrowLeft size={13} /> Back
                        </button>
                        <button disabled className="flex items-center gap-1 rounded border border-transparent px-1.5 py-1 text-[#aaa]">
                            <ArrowRight size={13} />
                        </button>
                        <button className="flex items-center gap-1 rounded border border-transparent px-1.5 py-1 text-[10px] text-[#333] hover:border-[#7ba7e0] hover:bg-[#c2d8f7]">
                            <RotateCw size={12} /> Refresh
                        </button>
                        <button onClick={goBack} className="flex items-center gap-1 rounded border border-transparent px-1.5 py-1 text-[10px] text-[#333] hover:border-[#7ba7e0] hover:bg-[#c2d8f7]">
                            <Home size={12} /> Home
                        </button>
                        <div className="mx-1 h-5 w-px bg-[#aca899]" />
                        <button className="flex items-center gap-1 rounded border border-transparent px-1.5 py-1 text-[10px] text-[#333] hover:border-[#7ba7e0] hover:bg-[#c2d8f7]">
                            <Star size={12} /> Favorites
                        </button>
                    </div>

                    <div className="flex items-center gap-2 border-t border-[#aca899] bg-[#ece9d8] px-2 py-1.5">
                        <span className="text-[10px] text-[#333]">Address</span>
                        <div className="flex h-6 min-w-0 flex-1 items-center rounded-sm border border-[#7f9db9] bg-white">
                            <span className="truncate px-2 font-sans text-[11px] text-[#000]">
                                http://{currentUrl}
                            </span>
                        </div>
                        <button className="rounded-sm border border-[#7f9db9] bg-[#e3e3e3] px-3 py-1 text-[10px] text-[#000] hover:bg-[#d3d3d3]">
                            Go
                        </button>
                    </div>

                    {/* Search bar row */}
                    <div className="flex items-center gap-2 border-t border-[#aca899] bg-[#ece9d8] px-2 py-1.5">
                        <Search size={12} className="text-[#5a6a75]" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search this archive..."
                            className="h-6 min-w-0 flex-1 rounded-sm border border-[#7f9db9] bg-white px-2 text-[10px] text-[#000] outline-none"
                        />
                    </div>
                </div>

                <div className="min-h-[50vh] bg-white">
                    {!selectedItem ? (
                        <div>
                            <div className="border-b border-[#d4d9dd] bg-gradient-to-b from-white to-[#eef2f5] px-7 py-9 md:px-12">
                                <p className="text-[9px] font-semibold tracking-[0.2em] text-[#3a6ea5]">TIME ARCHIVE</p>
                                <h2 className="mt-3 text-3xl font-normal tracking-tight text-[#0d3572] md:text-5xl">
                                    Welcome to the Internet.
                                </h2>
                                <p className="mt-4 max-w-xl text-xs leading-6 text-[#5a6a75]">
                                    A quiet, dial-up-shaped corner of the web, from back when a homepage still felt like a place you kept coming back to.
                                </p>
                            </div>

                            <div className="px-7 py-7 md:px-12">
                                <div className="mb-5 flex items-center justify-between">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#788791]">Suggested Sites</p>
                                    <span className="text-[9px] text-[#a0a9ae]">{yearData?.year}</span>
                                </div>

                                <div className="grid gap-2 md:grid-cols-2">
                                    {filteredItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className="group flex items-center gap-4 rounded-sm border border-[#c8ccd0] bg-white p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:border-[#3a6ea5] hover:bg-[#f0f5fb]"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#c8ccd0] bg-[#f5f5f5] text-xl">
                                                {typeof item.icon === "string" && item.icon.startsWith("/") ? (
                                                    <img src={item.icon} alt={item.name} className="h-full w-full object-cover" />
                                                ) : item.icon}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-semibold text-[#0d3572]">{item.name}</p>
                                                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#697580]">{item.description}</p>
                                            </div>
                                            <ExternalLink size={12} className="shrink-0 text-[#a0a9ae] group-hover:text-[#3a6ea5]" />
                                        </button>
                                    ))}
                                </div>

                                {!filteredItems.length && (
                                    <div className="py-10 text-center text-xs text-[#89959d]">No results found in this archive.</div>
                                )}
                            </div>

                            <div className="border-t border-[#d7dde1] bg-[#ece9d8] px-7 py-2 md:px-12">
                                <span className="text-[9px] text-[#4a5866]">Done</span>
                            </div>
                        </div>
                    ) : (
                        <div className="px-7 py-10 md:px-12">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-sm border border-[#c8ccd0] bg-[#f5f5f5] text-4xl">
                                    {typeof selectedItem.icon === "string" && selectedItem.icon.startsWith("/") ? (
                                        <img src={selectedItem.icon} alt={selectedItem.name} className="h-full w-full object-cover" />
                                    ) : selectedItem.icon}
                                </div>
                                <div>
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87949d]">Archived Website</p>
                                    <h2 className="mt-2 text-3xl font-normal text-[#0d3572]">{selectedItem.name}</h2>
                                    <p className="mt-4 max-w-xl text-xs leading-6 text-[#5a6a75]">{selectedItem.description}</p>
                                </div>
                            </div>

                            <div className="mt-10 rounded-sm border border-[#d5dde2] bg-[#f7f9fa] p-5">
                                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7c8a93]">
                                    <Globe2 size={11} /> Memory Fragment
                                </div>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4a5866]">"{selectedItem.memory}"</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * 2009 — INTERNET EXPLORER 8 / WINDOWS 7 ERA
     * ============================================================
     */

    if (is2009) {
        return (
            <div className="min-h-[55vh] overflow-hidden bg-[#f5f5f5] font-sans text-[#222]">

                <div className="border-b border-[#8d9aa5] bg-gradient-to-b from-[#edf4fa] via-[#dbe8f2] to-[#c6d5e1]">

                    <div className="flex items-end px-2 pt-2">
                        <div className="relative flex h-8 min-w-[190px] items-center gap-2 rounded-t-md border border-[#a9b7c2] border-b-white bg-gradient-to-b from-white/90 to-[#e4edf4] px-4 text-[11px] text-[#334a5c] shadow-[0_-1px_3px_rgba(0,0,0,0.08)]">
                            <Globe2 size={13} className="text-[#3976a8]" />
                            <span className="truncate">{selectedItem ? selectedItem.name : "Time Archive"}</span>
                            <button className="ml-auto rounded p-0.5 text-[#607384] hover:bg-black/10">
                                <X size={11} />
                            </button>
                        </div>
                        <button className="ml-1 mb-1 flex h-6 w-6 items-center justify-center rounded text-[#496477] hover:bg-white/60" aria-label="New tab">
                            <Plus size={13} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 border-t border-white/60 px-3 py-2">
                        <button
                            onClick={goBack}
                            disabled={!selectedItem}
                            className={`rounded-full p-1 ${selectedItem ? "text-[#4f6475] hover:bg-white/70" : "text-[#a7b3bb]"}`}
                            aria-label="Back"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <button className="rounded-full p-1 text-[#81909b]" aria-label="Forward" disabled>
                            <ArrowRight size={16} />
                        </button>
                        <button className="rounded-full p-1 text-[#4f6475] hover:bg-white/70" aria-label="Refresh">
                            <RotateCw size={14} />
                        </button>

                        <div className="flex h-7 min-w-0 flex-1 items-center rounded border border-[#aab7c1] bg-white shadow-inner">
                            <div className="flex h-full items-center border-r border-[#d4d9dd] px-2">
                                <Globe2 size={12} className="text-[#4784b5]" />
                            </div>
                            <span className="min-w-0 flex-1 truncate px-2 font-sans text-[10px] text-[#4c5963]">
                                http://{currentUrl}
                            </span>
                        </div>

                        <button onClick={goBack} className="rounded p-1.5 text-[#536b7d] hover:bg-white/70" aria-label="Home">
                            <Home size={14} />
                        </button>
                        <button className="rounded p-1.5 text-[#536b7d] hover:bg-white/70" aria-label="Favorites">
                            <Star size={14} />
                        </button>
                    </div>

                    <div className="flex h-8 items-center gap-2 border-t border-[#b5c3ce] bg-[#e8eef3] px-4">
                        <Search size={11} className="text-[#587081]" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search the archive..."
                            className="h-6 min-w-0 max-w-xs flex-1 rounded border border-[#aab7c1] bg-white px-2 text-[10px] text-[#334a5c] outline-none"
                        />

                        <div className="ml-auto flex items-center gap-1 text-[9px] text-[#70818d]">
                            Protected Mode
                            <ShieldCheck size={11} className="text-[#4f8b51]" />
                        </div>
                    </div>
                </div>

                <div className="min-h-[50vh] bg-white">
                    {!selectedItem ? (
                        <div>
                            <div className="border-b border-[#d4d9dd] bg-gradient-to-b from-white to-[#edf3f7] px-7 py-9 md:px-12">
                                <p className="text-[9px] font-semibold tracking-[0.22em] text-[#6e7d87]">TIME ARCHIVE</p>
                                <h2 className="mt-3 text-3xl font-normal tracking-tight text-[#294a61] md:text-5xl">
                                    Welcome to the<br />Internet.
                                </h2>
                                <p className="mt-4 max-w-xl text-xs leading-6 text-[#68757d]">
                                    A small preserved corner of the web, from the years when opening a website still felt like going somewhere.
                                </p>
                            </div>

                            <div className="px-7 py-7 md:px-12">
                                <div className="mb-5 flex items-center justify-between">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#788791]">Suggested Sites</p>
                                    <span className="text-[9px] text-[#a0a9ae]">{yearData?.year}</span>
                                </div>

                                <div className="grid gap-2 md:grid-cols-2">
                                    {filteredItems.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className="group flex items-center gap-4 rounded border border-[#d5dce1] bg-gradient-to-b from-white to-[#f1f4f6] p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:border-[#a9bccb] hover:from-white hover:to-[#e9f0f5] hover:shadow-md"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-[#aebdc7] bg-gradient-to-br from-[#f9fcfe] to-[#c9d9e4] text-xl text-[#47718e] shadow-inner">
                                                {item.icon}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <p className="truncate text-xs font-semibold text-[#35566c]">{item.name}</p>
                                                    <span className="text-[8px] text-[#9aa7af]">0{index + 1}</span>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#74818a]">{item.description}</p>
                                            </div>
                                            <ExternalLink size={12} className="shrink-0 text-[#9aa7af] transition group-hover:text-[#3c6f93]" />
                                        </button>
                                    ))}
                                </div>

                                {!filteredItems.length && (
                                    <div className="py-12 text-center text-xs text-[#89959d]">No results found in this archive.</div>
                                )}
                            </div>

                            <div className="border-t border-[#d7dde1] bg-[#f5f7f8] px-7 py-4 md:px-12">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-[#89959d]">Internet Explorer 8</span>
                                    <span className="flex items-center gap-1 text-[9px] text-[#6c8a72]">
                                        <ShieldCheck size={10} /> Protected Mode
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="px-7 py-10 md:px-12">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded border border-[#aebdc7] bg-gradient-to-br from-white to-[#c8d8e3] text-4xl text-[#47718e] shadow-inner">
                                    {selectedItem.icon}
                                </div>
                                <div>
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#87949d]">Archived Website</p>
                                    <h2 className="mt-2 text-3xl font-normal text-[#294a61]">{selectedItem.name}</h2>
                                    <p className="mt-4 max-w-xl text-xs leading-6 text-[#68757d]">{selectedItem.description}</p>
                                </div>
                            </div>

                            <div className="mt-10 rounded border border-[#d5dde2] bg-[#f7f9fa] p-5">
                                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7c8a93]">
                                    <Globe2 size={11} /> Memory Fragment
                                </div>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#53636d]">"{selectedItem.memory}"</p>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-[9px] text-[#789080]">
                                <ShieldCheck size={11} /> Archive preserved
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * 2012 — EARLY CHROME (light, skeuomorphic tab, minimal)
     * ============================================================
     */

    if (is2012) {
        return (
            <div className="min-h-[55vh] overflow-hidden bg-[#dee1e6] font-sans text-[#1c2228]">

                {/* Tab strip */}
                <div className="flex items-end gap-0.5 bg-[#dee1e6] px-2 pt-2">
                    <div className="flex h-8 min-w-[180px] items-center gap-2 rounded-t-lg bg-white px-3 text-[11px] text-[#3c4043] shadow-[0_-1px_2px_rgba(0,0,0,0.08)]">
                        <Globe2 size={12} className="text-[#5a9fd4]" />
                        <span className="truncate">{selectedItem ? selectedItem.name : "Time Archive"}</span>
                        <X size={11} className="ml-auto text-[#80868b] hover:text-[#3c4043]" />
                    </div>
                    <button className="mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[#5f6368] hover:bg-black/10">
                        <Plus size={13} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                    <button
                        onClick={goBack}
                        disabled={!selectedItem}
                        className={`rounded-full p-1.5 ${selectedItem ? "text-[#5f6368] hover:bg-black/5" : "text-[#c0c3c7]"}`}
                        aria-label="Back"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button disabled className="rounded-full p-1.5 text-[#c0c3c7]">
                        <ArrowRight size={16} />
                    </button>
                    <button className="rounded-full p-1.5 text-[#5f6368] hover:bg-black/5">
                        <RotateCw size={14} />
                    </button>

                    <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#dfe1e5] bg-[#f1f3f4] px-3">
                        <Lock size={11} className="shrink-0 text-[#5f9c5a]" />
                        <span className="min-w-0 flex-1 truncate text-[11px] text-[#3c4043]">{currentUrl}</span>
                        <Star size={12} className="shrink-0 text-[#c4c7ca]" />
                    </div>

                    <button className="rounded-full p-1.5 text-[#5f6368] hover:bg-black/5">
                        <MoreVertical size={15} />
                    </button>
                </div>

                {/* Search row */}
                <div className="flex items-center gap-2 border-b border-black/5 bg-[#f5f6f7] px-4 py-2">
                    <Search size={12} className="text-black/35" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search this archive..."
                        className="h-6 max-w-xs flex-1 rounded-full bg-white px-3 text-[10px] text-black/60 outline-none"
                    />
                </div>

                <div className="min-h-[48vh] bg-[#f5f6f7]">
                    {!selectedItem ? (
                        <div>
                            <div className="border-b border-black/10 px-6 py-12 md:px-12">
                                <p className="font-mono text-[9px] tracking-[0.35em] text-black/35">THE INTERNET — {yearData?.year}</p>
                                <h2 className="mt-4 max-w-2xl text-4xl font-light tracking-tight text-[#20252a] md:text-6xl">
                                    Everything was<br />still becoming.
                                </h2>
                                <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/45">
                                    Before feeds became infinite, before everything became an app, the internet still felt like a collection of places you chose to visit.
                                </p>
                            </div>

                            <div className="px-6 py-8 md:px-12">
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="font-mono text-[9px] tracking-[0.3em] text-black/35">PLACES YOU MIGHT REMEMBER</p>
                                    <span className="font-mono text-[9px] text-black/25">{yearData?.year}</span>
                                </div>

                                <div className="grid gap-2 md:grid-cols-2">
                                    {filteredItems.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className="group flex items-center gap-5 rounded-lg border border-black/5 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-black/15 hover:shadow-lg"
                                        >
                                            <img className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-black text-sm font-medium text-white" src={item.icon} alt={item.name} />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <span className="font-mono text-[9px] text-black/20">0{index + 1}</span>
                                                </div>
                                                <p className="mt-1 text-[11px] leading-relaxed text-black/40">{item.description}</p>
                                            </div>
                                            <span className="text-black/20 transition group-hover:translate-x-1 group-hover:text-black/50">→</span>
                                        </button>
                                    ))}
                                </div>

                                {!filteredItems.length && (
                                    <div className="py-12 text-center text-xs text-black/35">No results found in this archive.</div>
                                )}
                            </div>

                            <div className="border-t border-black/10 px-6 py-5 md:px-12">
                                <p className="font-mono text-[9px] text-black/25">CONNECTION: 56K / {yearData?.year}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="px-6 py-12 md:px-12">
                            <div className="flex flex-col gap-8 md:flex-row">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-black text-4xl text-white shadow-xl">
                                    <img src={selectedItem.icon} alt={selectedItem.name} />
                                </div>
                                <div>
                                    <p className="font-mono text-[9px] tracking-[0.3em] text-black/30">ARCHIVED WEBSITE</p>
                                    <h2 className="mt-3 text-4xl font-light">{selectedItem.name}</h2>
                                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/50">{selectedItem.description}</p>
                                </div>
                            </div>

                            <div className="mt-12 max-w-2xl border-l-2 border-black/10 pl-5">
                                <p className="font-mono text-[9px] tracking-[0.3em] text-black/30">MEMORY FRAGMENT</p>
                                <p className="mt-4 text-lg font-light leading-relaxed text-black/65">"{selectedItem.memory}"</p>
                            </div>

                            <div className="mt-12">
                                <p className="font-mono text-[9px] text-black/25">ARCHIVE STATUS: PRESERVED</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /*
     * ============================================================
     * 2019 — MODERN CHROME (flat, rounded pill address bar, dark chrome)
     * ============================================================
     */

    return (
        <div className="min-h-[55vh] overflow-hidden bg-[#202124] font-sans text-white">

            {/* Tab strip — flatter, rounded top corners, dark */}
            <div className="flex items-end gap-1 bg-[#202124] px-3 pt-2">
                <div className="flex h-9 min-w-[190px] items-center gap-2 rounded-t-xl bg-[#35363a] px-3 text-[11px] text-white/85">
                    <Globe2 size={12} className="text-[#8ab4f8]" />
                    <span className="truncate">{selectedItem ? selectedItem.name : "Time Archive"}</span>
                    <X size={11} className="ml-auto text-white/40 hover:text-white/80" />
                </div>
                <button className="mb-1 flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:bg-white/10">
                    <Plus size={14} />
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 bg-[#35363a] px-3 py-2.5">
                <button
                    onClick={goBack}
                    disabled={!selectedItem}
                    className={`rounded-full p-1.5 ${selectedItem ? "text-white/80 hover:bg-white/10" : "text-white/25"}`}
                    aria-label="Back"
                >
                    <ArrowLeft size={16} />
                </button>
                <button disabled className="rounded-full p-1.5 text-white/25">
                    <ArrowRight size={16} />
                </button>
                <button className="rounded-full p-1.5 text-white/80 hover:bg-white/10">
                    <RotateCw size={14} />
                </button>

                <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#202124] px-4">
                    <Lock size={11} className="shrink-0 text-[#8ab4f8]" />
                    <span className="min-w-0 flex-1 truncate text-[11px] text-white/70">{currentUrl}</span>
                    <Star size={12} className="shrink-0 text-white/30" />
                </div>

                <button className="rounded-full p-1.5 text-white/80 hover:bg-white/10">
                    <MoreVertical size={15} />
                </button>
            </div>

            {/* Search row */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-[#28292c] px-4 py-2.5">
                <Search size={12} className="text-white/35" />
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search this archive..."
                    className="h-7 max-w-xs flex-1 rounded-full bg-white/10 px-3 text-[10px] text-white/80 outline-none placeholder:text-white/30"
                />
            </div>

            <div className="min-h-[48vh] bg-[#131314]">
                {!selectedItem ? (
                    <div>
                        <div className="border-b border-white/5 px-6 py-12 md:px-12">
                            <p className="text-[9px] font-semibold tracking-[0.3em] text-white/30">THE INTERNET — {yearData?.year}</p>
                            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                                Always open.
                                <br />
                                Always in your pocket.
                            </h2>
                            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/45">
                                The internet stopped being somewhere you went — it just followed you everywhere, one notification at a time.
                            </p>
                        </div>

                        <div className="px-6 py-8 md:px-12">
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30">Frequently visited</p>
                                <span className="text-[9px] text-white/20">{yearData?.year}</span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {filteredItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
                                    >
                                        <div className="flex h-11 w-11 overflow-hidden object-cover shrink-0 items-center justify-center rounded-full bg-white/10 text-xl">
                                            <img src={item.icon} alt={item.name} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-white/90">{item.name}</p>
                                            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/40">{item.description}</p>
                                        </div>
                                        <ExternalLink size={13} className="shrink-0 text-white/20 group-hover:text-white/60" />
                                    </button>
                                ))}
                            </div>

                            {!filteredItems.length && (
                                <div className="py-12 text-center text-xs text-white/30">No results found in this archive.</div>
                            )}
                        </div>

                        <div className="border-t border-white/5 px-6 py-4 md:px-12">
                            <p className="text-[9px] text-white/20">5G · ALWAYS CONNECTED · {yearData?.year}</p>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-12 md:px-12">
                        <div className="flex flex-col gap-7 md:flex-row md:items-start">
                            <div className="flex h-24 w-24 overflow-hidden object-cover shrink-0 items-center justify-center rounded-3xl bg-white/10 text-4xl">
                                <img src={selectedItem.icon} alt={selectedItem.name} />
                            </div>
                            <div>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30">Archived App</p>
                                <h2 className="mt-2 text-4xl font-bold text-white">{selectedItem.name}</h2>
                                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">{selectedItem.description}</p>
                            </div>
                        </div>

                        <div className="mt-10 max-w-2xl rounded-2xl border border-white/8 bg-white/[0.04] p-5">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30">Memory Fragment</p>
                            <p className="mt-3 text-sm leading-relaxed text-white/65">"{selectedItem.memory}"</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InternetWindow;