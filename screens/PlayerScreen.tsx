import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import playState from "../state/store";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

dayjs.extend(duration);

export default observer(() => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const navigation = useNavigation<RootStackParamList>();
  const { isPlaying, nowPlaying, currentDuration, resume, pause } = playState;
  const formattedDuration = dayjs.duration(currentDuration).format("m:ss");
  const progress = (currentDuration / 1000 / (nowPlaying?.duration || 0)) * 100;
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
          snapPoints={["100%"]}
          ref={bottomSheetRef}
          backgroundStyle={{
            backgroundColor: theme.colors.card,
            borderRadius: 0,
          }}
          handleComponent={() => <></>}
          onChange={handleSheetChanges}
        
        >
          <BottomSheetView >
            <Pressable
              className="relative h-20 flex flex-col"
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
            >
              <View className="absolute h-80 w-full">
                <View
                  className="h-full bg-black/10 dark:bg-white/10"
                  style={{ width: `${progress}%` }}
                ></View>
              </View>
              <View className="flex flex-row items-center gap-x-4 px-4 pb-8 pt-2">
                <View className="flex-1">
                  <Text
                    className="dark:text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {nowPlaying?.filename}
                  </Text>
                  <Text className="dark:text-white">{formattedDuration}</Text>
                </View>
                <Pressable onPress={() => (isPlaying ? pause() : resume())}>
                  {isPlaying ? (
                    <Feather name="pause" color={theme.colors.text} size={24} />
                  ) : (
                    <Feather name="play" color={theme.colors.text} size={24} />
                  )}
                </Pressable>
              </View>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
});
