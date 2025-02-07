import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

dayjs.extend(duration)

interface SongsListItemProps {
    item: Track;
    index: number;
}

export default function SongsListItem({ item, index }: SongsListItemProps) {
    const duration = dayjs.duration(item.duration).format("mm:ss");
    return (
        <RectButton
            style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                padding: 8,
            }}
            onPress={()=>null}
        >
            <View>
                <Text className="text-white">{index + 1}</Text>
            </View>
            <View className="size-12 bg-gray-300"></View>
            <View className="flex-1">
                <Text className="text-lg font-semibold text-white">
                    {item.title}
                </Text>
                <Text className="text-white">{item.artist}</Text>
            </View>
            <View>
                <Text className="text-white font-medium">{duration}</Text>
            </View>
        </RectButton>
    );
}
