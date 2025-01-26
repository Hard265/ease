import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { Audio } from "expo-av";
import { getLocalSongs } from "../utils/getLocalSongs";
import _ from "lodash";
import { extractID3v1 } from "../utils/metadata";

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
  currentTrack: Track | null = null;
  isPlaying: boolean = false;
  soundObj: Audio.Sound | null = null;

  cachedMetadata = new Map<string, metadata>();

  constructor() {
    makeAutoObservable(this, {
      currentTrack: observable,
      isPlaying: observable,
      songs: observable,
      loading: observable,
      cachedMetadata: observable,
      init: action,
      setTrack: action,
      playPause: action,
      getMetadata: action,
    });
    this.init();
  }

  async init() {
    const localSongs = await getLocalSongs();
    runInAction(() => {
      this.songs = localSongs;
      this.loading = false;
    });
  }

  setTrack(track: Track) {
    this.currentTrack = track;
  }

  async playPause() {
    try {
      if (this.soundObj) {
        if (this.isPlaying) {
          await this.soundObj.pauseAsync();
          runInAction(() => (this.isPlaying = false));
        } else {
          await this.soundObj.playAsync();
          runInAction(() => (this.isPlaying = true));
        }
      } else if (this.currentTrack) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: this.currentTrack.uri });
        await sound.playAsync();
        runInAction(() => {
          this.soundObj = sound;
          this.isPlaying = true;
        });
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  }

  async getMetadata(uri: string) {
    return {}
    // if (this.cachedMetadata.has(uri)) {
    //   return this.cachedMetadata.get(uri);
    // } else {
    //   const a: any = await extractID3v1(uri, );

    //   const metadata = _.pick(a, [
    //     "artists",
    //     "title",
    //     "album",
    //     "genre",
    //     "year",
    //     "track",
    //     "duration",
    //   ]);
    //   runInAction(() => {
    //     this.cachedMetadata.set(uri, a);
    //   });
    //   return metadata;
    // }

  }
}

export default new PlaybackStore();
