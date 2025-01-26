import { Audio } from "expo-av";
import { EventEmitter } from "events";

class AudioManager {
    private static instance: AudioManager;
    private soundObj: Audio.Sound | null = null;
    private eventEmitter = new EventEmitter();
    private isPlaying = false;
    private currentDuration = 0;

    private constructor() {}

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    on(event: string, listener: (...args: any[]) => void) {
        this.eventEmitter.on(event, listener);
    }

    off(event: string, listener: (...args: any[]) => void) {
        this.eventEmitter.off(event, listener);
    }

    async play(uri: string) {
        try {
            if (this.soundObj) {
                await this.soundObj.unloadAsync();
            }

            const sound = new Audio.Sound();
            await sound.loadAsync({ uri });
            await sound.playAsync();

            this.soundObj = sound;
            this.isPlaying = true;
            this.soundObj.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    this.currentDuration = status.positionMillis;
                    this.eventEmitter.emit("playbackUpdate", {
                        isPlaying: this.isPlaying,
                        currentDuration: this.currentDuration,
                    });

                    if (status.didJustFinish) {
                        this.isPlaying = false;
                        this.eventEmitter.emit("playbackUpdate", {
                            isPlaying: this.isPlaying,
                            currentDuration: this.currentDuration,
                        });
                    }
                }
            });
            this.eventEmitter.emit("playbackUpdate", {
                isPlaying: this.isPlaying,
            });
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    }

    async pause() {
        try {
            if (this.soundObj && this.isPlaying) {
                await this.soundObj.pauseAsync();
                this.isPlaying = false;
                this.eventEmitter.emit("playbackUpdate", {
                    isPlaying: this.isPlaying,
                });
            }
        } catch (error) {
            console.error("Error pausing audio:", error);
        }
    }

    async resume() {
        try {
            if (this.soundObj && !this.isPlaying) {
                await this.soundObj.playAsync();
                this.isPlaying = true;
                this.eventEmitter.emit("playbackUpdate", {
                    isPlaying: this.isPlaying,
                });
            }
        } catch (error) {
            console.error("Error resuming audio:", error);
        }
    }

    async stop() {
        try {
            if (this.soundObj) {
                await this.soundObj.stopAsync();
                await this.soundObj.unloadAsync();
                this.soundObj = null;
                this.isPlaying = false;
                this.eventEmitter.emit("playbackUpdate", {
                    isPlaying: this.isPlaying,
                });
            }
        } catch (error) {
            console.error("Error stopping audio:", error);
        }
    }

    getPlaybackState() {
        return { isPlaying: this.isPlaying };
    }
}

export const audioManager = AudioManager.getInstance();
