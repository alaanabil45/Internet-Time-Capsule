import { useCallback, useEffect, useRef, useState } from "react";

function useAudioPlayer(playlist = []) {
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);

    const currentSong = playlist[currentIndex];

    useEffect(() => {
        const audio = new Audio();

        audio.preload = "metadata";
        audio.volume = 0.8;

        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (!currentSong || !currentSong.audio) {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();

            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            return;
        }

        audio.pause();
        audio.src = currentSong.audio;
        audio.load();

        setCurrentTime(0);
        setDuration(0);

        if (isPlaying) {
            audio.play().catch(() => {
                setIsPlaying(false);
            });
        }
    }, [currentIndex, currentSong && currentSong.audio]);

    useEffect(() => {
        if (!playlist.length) {
            setCurrentIndex(0);
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            return;
        }

        setCurrentIndex((index) =>
            Math.min(index, playlist.length - 1)
        );
    }, [playlist]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return undefined;
        }

        const handleLoadedMetadata = () => {
            setDuration(
                Number.isFinite(audio.duration)
                    ? audio.duration
                    : 0
            );
        };

        const handleTimeUpdate = () => {
            setCurrentTime(
                Number.isFinite(audio.currentTime)
                    ? audio.currentTime
                    : 0
            );
        };

        const handleEnded = () => {
            if (!playlist.length) {
                setIsPlaying(false);
                return;
            }

            setCurrentIndex((previous) =>
                (previous + 1) % playlist.length
            );
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleError = () => {
            setIsPlaying(false);
        };

        audio.addEventListener(
            "loadedmetadata",
            handleLoadedMetadata
        );

        audio.addEventListener(
            "timeupdate",
            handleTimeUpdate
        );

        audio.addEventListener(
            "ended",
            handleEnded
        );

        audio.addEventListener(
            "play",
            handlePlay
        );

        audio.addEventListener(
            "pause",
            handlePause
        );

        audio.addEventListener(
            "error",
            handleError
        );

        return () => {
            audio.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );

            audio.removeEventListener(
                "timeupdate",
                handleTimeUpdate
            );

            audio.removeEventListener(
                "ended",
                handleEnded
            );

            audio.removeEventListener(
                "play",
                handlePlay
            );

            audio.removeEventListener(
                "pause",
                handlePause
            );

            audio.removeEventListener(
                "error",
                handleError
            );
        };
    }, [playlist]);

    const play = useCallback(async () => {
        const audio = audioRef.current;

        if (!audio || !currentSong || !currentSong.audio) {
            return;
        }

        try {
            await audio.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
        }
    }, [currentSong]);

    const pause = useCallback(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.pause();
        setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    const next = useCallback(() => {
        if (!playlist.length) {
            return;
        }

        setCurrentIndex((previous) =>
            (previous + 1) % playlist.length
        );

        setIsPlaying(true);
    }, [playlist.length]);

    const previous = useCallback(() => {
        const audio = audioRef.current;

        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
        }

        if (!playlist.length) {
            return;
        }

        setCurrentIndex((previous) =>
            (previous - 1 + playlist.length) % playlist.length
        );

        setIsPlaying(true);
    }, [playlist.length]);

    const seek = useCallback((value) => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const nextTime = Number(value);

        if (!Number.isFinite(nextTime)) {
            return;
        }

        const maxTime = Number.isFinite(audio.duration)
            ? audio.duration
            : nextTime;

        const safeTime = Math.max(
            0,
            Math.min(nextTime, maxTime)
        );

        audio.currentTime = safeTime;
        setCurrentTime(safeTime);
    }, []);

    const changeVolume = useCallback((value) => {
        const nextVolume = Number(value);

        if (!Number.isFinite(nextVolume)) {
            return;
        }

        const safeVolume = Math.max(
            0,
            Math.min(1, nextVolume)
        );

        setVolume(safeVolume);

        if (audioRef.current) {
            audioRef.current.volume = safeVolume;
        }
    }, []);

    const selectSong = useCallback(
        (index) => {
            if (
                !Number.isInteger(index) ||
                index < 0 ||
                index >= playlist.length
            ) {
                return;
            }

            setCurrentIndex(index);
            setIsPlaying(true);
        },
        [playlist.length]
    );

    const formatTime = useCallback((seconds) => {
        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }, []);

    return {
        audio: audioRef.current,

        currentSong,
        currentIndex,

        isPlaying,

        currentTime,
        duration,

        volume,

        play,
        pause,
        togglePlay,

        next,
        previous,

        seek,
        changeVolume,
        selectSong,

        formatTime,
    };
}

export default useAudioPlayer;
