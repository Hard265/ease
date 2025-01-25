import React, {  } from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import playback from "../state/store";
import MiniPlayer from "../components/MiniPlayer";
import SongsListItem from "../components/SongsListItem";

export default observer(() => {
  const { songs, currentTrack } = playback;

  return (
    <View className="flex-1 bg-white dark:bg-black p-4">
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongsListItem item={item} index={index} />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-6">
            No songs found in your library.
          </Text>
        }
      />
      {currentTrack && <MiniPlayer />}
    </View>
  );
});
