import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Albums from "screens/home/Albums";
import Playlists from "screens/home/Playlists";
import Songs from "screens/home/Songs";
import HomeAppbar from "./layouts/HomeAppbar";
import { View } from "react-native";
import playState from "state/store";
import BottomSheet from "@gorhom/bottom-sheet";
import PlayerScreen from "screens/PlayerScreen";
import { useEffect } from "react";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabsRouter() {
    // useEffect(() => {

    // }, [])

    return (
        <View className="relative flex-1 bg-white dark:bg-black">
            <Tab.Navigator initialRouteName="Songs" tabBar={HomeAppbar}>
                <Tab.Screen name="Songs" component={Songs} />
                <Tab.Screen name="Albums" component={Albums} />
                <Tab.Screen name="Artists" component={Albums} />
                <Tab.Screen name="Playlists" component={Playlists} />
            </Tab.Navigator>
            <PlayerScreen />
        </View>
    );
}
