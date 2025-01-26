// @@iconify-code-gen

import "./global.css";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootRouter from "./routes/Root";
import { StatusBar } from "expo-status-bar";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer theme={DarkTheme}>
                <RootRouter />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
