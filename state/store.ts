import {
    action,
    computed,
    makeAutoObservable,
    observable,
    runInAction,
} from "mobx";
import { Audio } from "expo-av";
import { getLocalSongs } from "../utils/getLocalSongs";
import _ from "lodash";
import { extractID3v1 } from "../utils/metadata";
import { audioManager } from "../services/AudioManager";

export interface Track {
    id: string;
    uri: string;
    filename: string;
    duration: number;
}

export type metadata = Partial<{
    artists: string[];
    title: string;
    album: string;
    genre: string[];
    year: number;
    track: {
        no: number | null;
        of: number | null;
    };
    duration: number;
}>;

class PlaybackStore {
    loading: boolean = true;
    songs: Track[] = [];
    focusedTrack: Track | null = null;
    isPlaying: boolean = false;
    currentDuration: number = 0;

    constructor() {
        makeAutoObservable(this, {
            focusedTrack: observable,
            isPlaying: observable,
            songs: observable,
            loading: observable,
            currentDuration: observable,
            nowPlaying: computed,
            init: action,
        });
        this.init();

        audioManager.on(
            "playbackUpdate",
            ({
                isPlaying,
                currentDuration,
            }: {
                isPlaying: boolean;
                currentDuration: number;
            }) => {
                runInAction(() => {
                    this.isPlaying = isPlaying;
                    this.currentDuration =
                        currentDuration ?? this.currentDuration;
                });
            },
        );
    }

    get nowPlaying() {
        return this.focusedTrack;
    }

    async init() {
        const localSongs = await getLocalSongs();
        runInAction(() => {
            this.songs = localSongs;
            this.loading = false;
        });
    }

    setTrack(track: Track) {
        this.focusedTrack = track;
    }

    async play() {
        if (this.focusedTrack) {
            await audioManager.play(this.focusedTrack.uri);
        }
    }

    async pause() {
        await audioManager.pause();
    }

    async resume() {
        await audioManager.resume();
    }

    async stop() {
        await audioManager.stop();
        runInAction(() => {
            this.focusedTrack = null;
        });
    }
}

const playState = new PlaybackStore();
export default playState;
