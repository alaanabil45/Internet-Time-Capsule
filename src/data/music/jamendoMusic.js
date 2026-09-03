const JAMENDO_CLIENT_ID = "b6e67b61";

const JAMENDO_API =
    "https://api.jamendo.com/v3.0/tracks/";

export async function getJamendoMusic({
    year,
    limit = 5,
    tags = "",
}) {
    const params = new URLSearchParams({
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        limit: String(limit),
        imagesize: "300",
        audioformat: "mp32",
        order: "popularity_total",
    });

    if (tags) {
        params.set("fuzzytags", tags);
    }

    const response = await fetch(
        `${JAMENDO_API}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Jamendo request failed: ${response.status}`
        );
    }

    const data = await response.json();

    return (data.results || []).map((track) => ({
        id: String(track.id),

        title: track.name,

        artist: track.artist_name,

        album: track.album_name || "Single",

        year,

        duration: Number(track.duration) || 0,

        audio: track.audio,

        cover:
            track.album_image ||
            track.image ||
            "",

        source: "Jamendo",

        sourceUrl:
            track.shareurl ||
            `https://www.jamendo.com/track/${track.id}`,

        license:
            track.license_ccurl || "",

        licenseUrl:
            track.license_ccurl || "",

        downloadAllowed:
            Boolean(track.audiodownload_allowed),

        memory:
            `A song that brings back the feeling of ${year}.`,
    }));
}