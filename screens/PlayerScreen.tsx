import React, { useCallback } from "react";
import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import BottomSheet, {
    BottomSheetView,
    useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import playState from "../state/store";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import ProgressBar from "components/ProgressBar";
import Iconify from "react-native-iconify";
import PlaybackControls from "components/PlaybackControls";
import PlaybackProgress from "components/PlaybackProgress";

dayjs.extend(duration);

export default observer(() => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const theme = useTheme();
    const navigation = useNavigation<RootStackParamList>();

    const { focusedTrack } = playState;

    const handleSheetChanges = useCallback(
        (index: number) => {
            if (index === 1) {
                // navigation.push("_PlayerVirtual");
            } else {
                // if (navigation.canGoBack()) {
                //   navigation.goBack();
                // }
            }
        },
        [navigation],
    );

    return (
        <>
            {focusedTrack && (
                <BottomSheet
                    index={0}
                    snapPoints={[100, "100%"]}
                    ref={bottomSheetRef}
                    backgroundStyle={{
                        backgroundColor: theme.colors.card,
                        borderRadius: 0,
                    }}
                    handleComponent={() => <></>}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView>
                        <Player />
                    </BottomSheetView>
                </BottomSheet>
            )}
        </>
    );
});

const Player = observer(() => {
    const { colors } = useTheme();
    const { animatedPosition, expand } = useBottomSheet();
    const {
        isPlaying,
        nowPlaying,
        currentDuration,
        resume,
        pause,
        currentPlaylist,
    } = playState;
    const progress =
        (currentDuration / 1000 / (nowPlaying?.duration || 0)) * 100;

    const animatedArtStyle = useAnimatedStyle(() => {
        const size = interpolate(
            animatedPosition.value,
            [0, 700],
            [320, 48],
            Extrapolation.CLAMP,
        );
        const pad = interpolate(animatedPosition.value, [0, 700], [24, 16]);
        return {
            width: size,
            height: size,
            marginLeft: pad,
            marginTop: pad - 5,
            borderRadius: interpolate(
                animatedPosition.value,
                [0, 700],
                [16, 8],
            ),
            opacity: interpolate(animatedPosition.value, [0, 700], [1, 0.6]),
        };
    });

    const animatedMiniPlayerStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animatedPosition.value,
                [650, 800],
                [0, 1],
                Extrapolation.CLAMP,
            ),
        };
    });

    return (
        <View className="relative h-full" collapsable>
            <Animated.View
                className="absolute top-0 bg-white"
                style={animatedArtStyle}
            ></Animated.View>
            <View className="absolute bottom-0 flex w-full flex-col gap-y-4 p-4">
                <View className="flex flex-col items-center gap-y-2 mb-8">
                    <Text
                        className="text-2xl dark:text-white"
                        numberOfLines={1}
                        ellipsizeMode="middle"
                    >
                        {nowPlaying?.filename}
                    </Text>
                    <Text
                        className="text-4xl font-black dark:text-white"
                        numberOfLines={1}
                        ellipsizeMode="middle"
                    >
                        {nowPlaying?.filename}
                    </Text>
                </View>
                <PlaybackProgress />
                <PlaybackControls />
                <View className="mt-8 flex flex-row justify-end gap-x-4 pb-4">
                    <Pressable className="mr-auto p-2">
                        <Iconify
                            icon="hugeicons:add-circle"
                            color={colors.text}
                            size={24}
                        />
                    </Pressable>
                    <Pressable className="p-2">
                        <Iconify
                            icon="hugeicons:notebook-02"
                            color={colors.text}
                            size={24}
                        />
                    </Pressable>
                    <Pressable className="p-2">
                        <Iconify
                            icon="heroicons:queue-list"
                            color={colors.text}
                            size={24}
                        />
                    </Pressable>
                </View>
            </View>
            <Animated.View style={animatedMiniPlayerStyle}>
                <Pressable
                    className="relative flex h-20 flex-col"
                    onPress={() => expand()}
                >
                    <View className="absolute h-80 w-full">
                        <View
                            className="h-full bg-black/10 dark:bg-white/10"
                            style={{ width: `${progress}%` }}
                        ></View>
                    </View>
                    <View className="ml-16 flex flex-row items-center gap-x-4 px-4 pb-6 pt-4">
                        <View className="flex-1">
                            <Text
                                className="font-semibold dark:text-white"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {nowPlaying?.filename}
                            </Text>
                            <Text
                                className="dark:text-white"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {currentPlaylist?.name}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => (isPlaying ? pause() : resume())}
                        >
                            {isPlaying ? (
                                <Feather
                                    name="pause"
                                    color={colors.text}
                                    size={24}
                                />
                            ) : (
                                <Feather
                                    name="play"
                                    color={colors.text}
                                    size={24}
                                />
                            )}
                        </Pressable>
                    </View>
                </Pressable>
            </Animated.View>
        </View>
    );
});
