import { Audio } from 'expo-av';

export const useAudioPlayer = () => {
  const sound = React.useRef<Audio.Sound | null>(null);

  const playTrack = async (uri: string) => {
    if (sound.current) {
      await sound.current.unloadAsync();
    }
    sound.current = new Audio.Sound();
    await sound.current.loadAsync({ uri });
    await sound.current.playAsync();
  };

  return { playTrack };
};
