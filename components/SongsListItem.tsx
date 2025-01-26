import { Text, TouchableOpacity, View } from "react-native";
import type { metadata, Track } from "../state/store";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import playState from "../state/store";

interface SongsListItemProps {
    item: Track;
    index: number;
}

export default function SongsListItem({ item, index }: SongsListItemProps) {
    const navigation = useNavigation<RootStackParamList>();
    const [meta, setMeta] = useState<metadata>({});

    const isPlaying = playState.nowPlaying?.id == item.id;

    const onPress = () => {
        playState.setTrack(item)
        playState.play();
        // navigation.navigate("Player");
    };

    return (
        <TouchableOpacity
            className={clsx(
                "flex flex-row items-center gap-x-6 p-4 hover:bg-gray-50",
                isPlaying && "dark:bg-white/10",
            )}
            onPress={onPress}
        >
            <Text className="dark:text-white">{index + 1}</Text>
            <View className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50">
                <Feather name="music" color="#4b5563" />
            </View>
            <View className="flex-1">
                <Text className="font-semibold dark:text-white" numberOfLines={1} ellipsizeMode="tail">
                    {item.filename}
                </Text>
                <Text className="dark:text-white" numberOfLines={1} ellipsizeMode="tail">{item.filename}</Text>
            </View>
            <View>
                <Text className="font-semibold dark:text-white">
                    {meta.title}
                </Text>
                <Text className="dark:text-white">{meta.artists}</Text>
            </View>
        </TouchableOpacity>
    );
}
