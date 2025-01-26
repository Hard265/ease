import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import Albums from "screens/home/Albums";
import Playlists from "screens/home/Playlists";
import Songs from "screens/home/Songs";
import HomeAppbar from "./layouts/HomeAppbar";
import { Animated, KeyboardAvoidingView, StatusBar, View } from "react-native";
import playState from "state/store";
import BottomSheet from "@gorhom/bottom-sheet";
import PlayerScreen from "screens/PlayerScreen";
import { useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import clsx from "clsx";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabsRouter() {
  // useEffect(() => {

  // }, [])

  return (
    <View className="relative flex-1 bg-white dark:bg-black">
      <Tab.Navigator
        initialRouteName="Songs"
        tabBar={({
          state,
          descriptors,
          position,
          navigation,
        }: MaterialTopTabBarProps) => {
          const statusBarHeight = StatusBar.currentHeight || 0;
          return (
            <View
              style={{ paddingTop: statusBarHeight }}
              className={`w-full bg-black/10 pb-2 dark:bg-black`}
            >
              <View className="flex flex-row items-end justify-start gap-x-2 px-4 pb-2 pt-6">
                {state.routes.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel.toString()
                      : options.title !== undefined
                        ? options.title
                        : route.name;
                  const inputRange = state.routes.map((_, i) => i);
                  const scale = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) => (i === index ? 1.9 : 1)),
                  });
                  const isFocused = state.index === index;
                  const onPress = () => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name, route.params);
                    }
                  };

                  return (
                    <Animated.Text
                      key={route.key}
                      onPress={onPress}
                      style={{
                        transform: [{ scale: scale }],
                        opacity: scale.interpolate({
                          inputRange: [1, 1.5],
                          outputRange: [0.6, 1],
                        }),
                        marginHorizontal: 10,
                      }}
                      className={clsx("font-black text-white")}
                    >
                      {label}
                    </Animated.Text>
                  );
                })}
              </View>
            </View>
          );
        }}
      >
        <Tab.Screen name="Songs" component={Songs} />
        <Tab.Screen name="Albums" component={Albums} />
        <Tab.Screen name="Artists" component={Albums} />
        <Tab.Screen name="Playlists" component={Playlists} />
      </Tab.Navigator>
      <PlayerScreen />
    </View>
  );
}
