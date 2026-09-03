export function normalizeJamendoTrack(track, year) {
    return {
        id: String(track.id),

        title: track.name || "Unknown Track",

        artist:
            track.artist_name ||
            "Unknown Artist",

        album:
            track.album_name ||
            "Single",

        year:
            track.releasedate
                ? Number(
                    track.releasedate.slice(0, 4)
                )
                : year,

        duration: Number(track.duration) || 0,

        cover:
            track.album_image ||
            track.image ||
            "",

        audio: track.audio || "",

        source: "Jamendo",

        sourceUrl:
            track.shareurl ||
            `https://www.jamendo.com/track/${track.id}`,

        license:
            track.license_ccurl || "",

        memory:
            `A sound from ${year}. A small piece of music that takes us back to the way the internet felt at the time.`,
    };
}