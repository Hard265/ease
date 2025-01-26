import { useTheme } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { View, TouchableOpacity, Pressable } from "react-native";
import { Iconify } from "react-native-iconify";
import playState from "state/store";

export default observer(() => {
    const { colors } = useTheme();
    const {
        isPlaying,
        pause,
        resume,
        skipBack,
        skipForward,
        loopTrack,
        toggleLoopTrack,
    } = playState;
    return (
        <View className="flex flex-row items-center justify-center gap-x-8">
            <TouchableOpacity>
                <Iconify
                    icon="hugeicons:shuffle"
                    size={28}
                    color={colors.text}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipBack}>
                <Iconify
                    icon="hugeicons:previous"
                    size={28}
                    color={colors.text}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (isPlaying ? pause() : resume())}>
                {playState.isPlaying ? (
                    <Iconify
                        icon="hugeicons:pause"
                        size={58}
                        color={colors.text}
                    />
                ) : (
                    <Iconify
                        icon="hugeicons:play"
                        size={58}
                        color={colors.text}
                    />
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={skipForward}>
                <Iconify icon="hugeicons:next" size={28} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleLoopTrack()}>
                {playState.loopTrack ? (
                    <Iconify
                        icon="hugeicons:repeat-one-01"
                        size={28}
                        color={colors.text}
                    />
                ) : (
                    <Iconify
                        icon="hugeicons:repeat"
                        size={28}
                        color={colors.text}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
});
