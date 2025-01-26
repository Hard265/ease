import { Text, TouchableOpacity, View } from "react-native";
import type { metadata, Track } from "../state/store";
import playback from "../state/store";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import store from "../state/store";

interface SongsListItemProps {
  item: Track;
  index: number;
}

export default function SongsListItem({ item, index }: SongsListItemProps) {
  const navigation = useNavigation<RootStackParamList>();
  const [meta, setMeta] = useState<metadata>({});

  useEffect(() => {
    (async () => store.getMetadata(item.uri))();
  }, [item.uri]);

  const metadata = store.getMetadata(item.uri);

  return (
    <TouchableOpacity
      className="p-4 px-2 mb-3"
      onPress={() => {
        playback.setTrack(item);
        navigation.navigate("Player");
      }}
    >
      <View className="flex-row gap-4 items-center">
        <Text className="dark:text-white">{index + 1}</Text>
        <View className="flex-1 flex-col">
          <Text className="font-semibold">{meta.title}</Text>
          <Text>{meta.artists}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
