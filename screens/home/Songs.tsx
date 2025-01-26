import React from "react";
import { View, Text, FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SongsListItem from "components/SongsListItem";
import playback from "state/store";
import { TextInput } from "react-native-gesture-handler";

export default observer(() => {
    const { songs, focusedTrack } = playback;

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <SongsListItem item={item} index={index} />
                )}
                ListHeaderComponent={<View>
                    <TextInput placeholder="Search songs" className="p-4 bg-gray-100 dark:bg-gray-800" />
                </View>}
                ListEmptyComponent={
                    <Text className="mt-6 text-center text-gray-500">
                        No songs found in your library.
                    </Text>
                }
                style={{ marginBottom: focusedTrack && 70 }}
            />
        </View>
    );
});
