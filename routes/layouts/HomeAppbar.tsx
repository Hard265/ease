import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import clsx from "clsx";
import { Text, View, StatusBar } from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
} from "react-native-reanimated";

export default function HomeAppbar({
    state,
    descriptors,
    position,
    navigation,
}: MaterialTopTabBarProps) {
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
                            style={[
                                { fontWeight: isFocused ? "bold" : "normal" },
                            ]}
                            className={clsx(
                                isFocused
                                    ? "text-3xl font-bold"
                                    : "text-lg font-semibold",
                                "text-white",
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
