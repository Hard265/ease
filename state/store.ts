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

export interface Playlist {
    id: string;
    name: string;
    tracks: Track[];
}

class PlaybackStore {
    loading: boolean = true;
    songs: Track[] = [];
    focusedTrack: Track | null = null;
    isPlaying: boolean = false;
    currentDuration: number = 0;
    playlists: Map<string, Playlist> = new Map();
    currentPlaylist: Playlist | null = null;
    loopTrack: boolean = false;
    loopPlaylist: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            focusedTrack: observable,
            isPlaying: observable,
            songs: observable,
            loading: observable,
            currentDuration: observable,
            nowPlaying: computed,
            playlists: observable,
            currentPlaylist: observable,
            loopTrack: observable,
            loopPlaylist: observable,
            init: action,
            skipBack: action,
            skipForward: action,
            toggleLoopPlaylist: action,
            toggleLoopTrack: action,
        });
        this.init();

        audioManager.on("playbackUpdate", this.handlePlaybackUpdate);
    }

    get nowPlaying() {
        return this.focusedTrack;
    }

    async init() {
        const localSongs = await getLocalSongs();
        const defaultPlaylist: Playlist = {
            id: "default",
            name: "Default Playlist",
            tracks: localSongs,
        };
        runInAction(() => {
            this.songs = localSongs;
            this.playlists.set(defaultPlaylist.id, defaultPlaylist);
            this.currentPlaylist = defaultPlaylist;
            this.loading = false;
        });
    }

    setTrack(track: Track) {
        this.focusedTrack = track;
    }

    setPlaylist(playlistId: string) {
        const playlist = this.playlists.get(playlistId);
        if (playlist) {
            this.currentPlaylist = playlist;
            this.songs = playlist.tracks;
        }
    }

    async play() {
        if (this.focusedTrack) {
            await audioManager.play(this.focusedTrack.uri);
            audioManager.on("playbackUpdate", this.handlePlaybackUpdate);
        }
    }

    handlePlaybackUpdate = ({
        isPlaying,
        currentDuration,
    }: {
        isPlaying: boolean;
        currentDuration: number;
    }) => {
        runInAction(() => {
            this.isPlaying = isPlaying;
            this.currentDuration = currentDuration ?? this.currentDuration;
        });

        if (!isPlaying && this.loopTrack && this.focusedTrack) {
            this.play();
        } else if (!isPlaying && this.loopPlaylist && this.currentPlaylist) {
            const currentIndex = this.currentPlaylist.tracks.findIndex(
                (track) => track.id === this.focusedTrack?.id,
            );
            const nextIndex =
                (currentIndex + 1) % this.currentPlaylist.tracks.length;
            this.setTrack(this.currentPlaylist.tracks[nextIndex]);
            this.play();
        }
    };

    skipBack() {
        if (this.currentPlaylist && this.focusedTrack) {
            const currentIndex = this.currentPlaylist.tracks.findIndex(
                (track) => track.id === this.focusedTrack?.id,
            );
            const prevIndex =
                (currentIndex - 1 + this.currentPlaylist.tracks.length) %
                this.currentPlaylist.tracks.length;
            this.setTrack(this.currentPlaylist.tracks[prevIndex]);
            this.play();
        }
    }

    skipForward() {
        if (this.currentPlaylist && this.focusedTrack) {
            const currentIndex = this.currentPlaylist.tracks.findIndex(
                (track) => track.id === this.focusedTrack?.id,
            );
            const nextIndex =
                (currentIndex + 1) % this.currentPlaylist.tracks.length;
            this.setTrack(this.currentPlaylist.tracks[nextIndex]);
            this.play();
        }
    }

    toggleLoopTrack() {
        this.loopTrack = !this.loopTrack;
    }

    toggleLoopPlaylist() {
        this.loopPlaylist = !this.loopPlaylist;
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
