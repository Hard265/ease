import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import clsx from "clsx";
import { Text, View, StatusBar, Animated } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";

export default function HomeAppbar({
  state,
  descriptors,
  position,
}: MaterialTopTabBarProps) {
  const theme = useTheme();
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
          const isFocused = state.index === index;
          const inputRange = state.routes.map((_, i) => i);
          const labelStyle = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1.5 : 1)),
          });

          return (
            <Animated.Text
              key={route.key}
              style={{ transform: [{ scale: labelStyle }] }}
              className={clsx(
                isFocused
                  ? "font-black text-black dark:text-white"
                  : "font-medium lowercase text-black/80 dark:text-white/50",
              )}
            >
              {label}
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
}
