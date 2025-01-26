import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import playState from "state/store";
import ProgressBar from "./ProgressBar";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";


dayjs.extend(duration);

export default function PlaybackProgress() {
    const { colors } = useTheme();
    const { currentDuration, nowPlaying } = playState;
    const progress =
        (currentDuration / 1000 / (nowPlaying?.duration || 0)) * 100;

    const formatDuration = (duration: number) =>
        dayjs.duration(duration).format("mm:ss");
    return (
        <View className="flex flex-col gap-y-1">
            <ProgressBar progress={progress} onProgressChange={() => {}} />
            <View className="flex flex-row items-center justify-between">
                <Text className="font-medium text-white">
                    {formatDuration(currentDuration)}
                </Text>
                <Text className="font-medium text-white">
                    {formatDuration((nowPlaying?.duration || 0) * 1000)}
                </Text>
            </View>
        </View>
    );
}
