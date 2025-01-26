import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import clsx from "clsx";
import { Text, View, StatusBar } from "react-native";

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
                    return (
                        <Text
                            key={route.key}
                            className={clsx(
                                isFocused
                                    ? "-mb-1 text-4xl font-black text-black dark:text-white"
                                    : "text-xl font-medium lowercase text-black/80 dark:text-white/50",
                            )}
                        >
                            {label}
                        </Text>
                    );
                })}
            </View>
        </View>
    );
}
