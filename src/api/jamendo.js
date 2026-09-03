const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

const API_URL = "https://api.jamendo.com/v3.0/tracks/";

export async function getJamendoTracks({
    year,
    limit = 5,
    tags = "",
}) {
    if (!CLIENT_ID) {
        throw new Error(
            "Missing VITE_JAMENDO_CLIENT_ID in .env"
        );
    }

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        format: "json",
        limit: String(limit),

        datebetween: `${year}-01-01_${year}-12-31`,

        audioformat: "mp32",
        imagesize: "500",

        order: "popularity_total_desc",
    });

    if (tags) {
        params.set("fuzzytags", tags);
    }

    const response = await fetch(
        `${API_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Jamendo API error: ${response.status}`
        );
    }

    const data = await response.json();

    if (data.headers?.status !== "success") {
        throw new Error(
            data.headers?.error_message ||
            "Jamendo request failed"
        );
    }

    return data.results || [];
}