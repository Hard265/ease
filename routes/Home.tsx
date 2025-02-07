import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import Albums from "screens/home/Albums";
import Playlists from "screens/home/Playlists";
import Songs from "screens/home/Songs";
import {
    Animated,
    StatusBar,
    View,
} from "react-native";
import clsx from "clsx";
import Artists from "screens/home/Artists";
import Genre from "screens/home/Genre";

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

                                    const inputRange = state.routes.map(
                                        (_, i) => i,
                                    );
                                    const isFocused = state.index === index;

                                    const onPress = () => {
                                        const event = navigation.emit({
                                            type: "tabPress",
                                            target: route.key,
                                            canPreventDefault: true,
                                        });

                                        if (
                                            !isFocused &&
                                            !event.defaultPrevented
                                        ) {
                                            navigation.navigate(
                                                route.name,
                                                route.params,
                                            );
                                        }
                                    };

                                    return (
                                        <Animated.Text
                                            key={route.key}
                                            onPress={onPress}
                                            style={{
                                                opacity: position.interpolate({
                                                    inputRange,
                                                    outputRange: inputRange.map(
                                                        (i) =>
                                                            i === index
                                                                ? 1
                                                                : 0.6,
                                                    ),
                                                }),
                                            }}
                                            className={clsx(
                                                isFocused
                                                    ? "text-3xl font-bold"
                                                    : "text-lg font-medium",
                                                "dark:text-white",
                                            )}
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
                <Tab.Screen name="Artists" component={Artists} />
                <Tab.Screen name="Albums" component={Albums} />
                <Tab.Screen name="Genre" component={Genre} />
                <Tab.Screen name="Playlists" component={Playlists} />
            </Tab.Navigator>
            {/* <PlayerScreen /> */}
        </View>
    );
}
