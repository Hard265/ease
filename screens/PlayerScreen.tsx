import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import playbackState from "../state/store";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const route = useRoute();

  const { currentTrack, isPlaying, soundObj } = playbackState;

  const playPauseTrack = async () => {
    try {
      playbackState.playPause();
    } catch (error) {
      Alert.alert("Error", "Unable to play the audio.");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-6">
        {currentTrack?.filename || "No Track Selected"}
      </Text>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={playPauseTrack}
      >
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={60}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
});
