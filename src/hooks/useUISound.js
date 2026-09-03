import { useCallback, useRef } from "react";

function useUISound() {
    const audioContextRef = useRef(null);

    const getContext = useCallback(() => {
        if (!audioContextRef.current) {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) {
                return null;
            }

            audioContextRef.current = new AudioContext();
        }

        return audioContextRef.current;
    }, []);

    const playTone = useCallback(
        ({
            frequency = 440,
            duration = 0.05,
            volume = 0.025,
            type = "sine",
            endFrequency,
        }) => {
            try {
                const context = getContext();

                if (!context) return;

                if (context.state === "suspended") {
                    context.resume().catch(() => {
                        return;
                    });
                }

                const oscillator = context.createOscillator();
                const gain = context.createGain();

                oscillator.type = type;

                oscillator.frequency.setValueAtTime(
                    frequency,
                    context.currentTime
                );

                if (endFrequency) {
                    oscillator.frequency.exponentialRampToValueAtTime(
                        endFrequency,
                        context.currentTime + duration
                    );
                }

                gain.gain.setValueAtTime(
                    0.0001,
                    context.currentTime
                );

                gain.gain.exponentialRampToValueAtTime(
                    volume,
                    context.currentTime + 0.008
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    context.currentTime + duration
                );

                oscillator.connect(gain);
                gain.connect(context.destination);

                oscillator.start();

                oscillator.stop(
                    context.currentTime + duration
                );
            } catch {
                // Audio is optional.
            }
        },
        [getContext]
    );

    const hover = useCallback(() => {
        playTone({
            frequency: 900,
            duration: 0.035,
            volume: 0.012,
            type: "sine",
        });
    }, [playTone]);

    const click = useCallback(() => {
        playTone({
            frequency: 620,
            duration: 0.055,
            volume: 0.025,
            type: "square",
        });
    }, [playTone]);

    const open = useCallback(() => {
        playTone({
            frequency: 280,
            endFrequency: 620,
            duration: 0.18,
            volume: 0.02,
            type: "sine",
        });
    }, [playTone]);

    const close = useCallback(() => {
        playTone({
            frequency: 620,
            endFrequency: 260,
            duration: 0.14,
            volume: 0.018,
            type: "sine",
        });
    }, [playTone]);

    return {
        hover,
        click,
        open,
        close,
    };
}

export default useUISound;