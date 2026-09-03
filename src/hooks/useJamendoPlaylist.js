import { useEffect, useState } from "react";
import { getJamendoTracks } from "../api/jamendo";
import { normalizeJamendoTrack } from "../api/normalizeMusic";

function useJamendoPlaylist(year) {
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadMusic() {
            setLoading(true);
            setError(null);

            try {
                const tracks =
                    await getJamendoTracks({
                        year,
                        limit: 5,
                    });

                if (cancelled) {
                    return;
                }

                const normalizedTracks =
                    tracks
                        .map((track) =>
                            normalizeJamendoTrack(
                                track,
                                year
                            )
                        )
                        .filter(
                            (track) =>
                                track.audio
                        );

                setPlaylist(
                    normalizedTracks
                );
            } catch (err) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load Jamendo playlist:",
                    err
                );

                setError(err);
                setPlaylist([]);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        if (year) {
            loadMusic();
        }

        return () => {
            cancelled = true;
        };
    }, [year]);

    return {
        playlist,
        loading,
        error,
    };
}

export default useJamendoPlaylist;