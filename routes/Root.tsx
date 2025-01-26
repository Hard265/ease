import React from "react";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlayerScreen from "../screens/PlayerScreen";
import HomeTabsRouter from "./Home";
import { StatusBar } from "expo-status-bar";

const RootStack = createNativeStackNavigator<{
  Home: undefined;
  _PlayerVirtual: undefined;
}>();

export default function RootRouter() {
  const theme = useTheme();
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <RootStack.Group>
          <RootStack.Screen
            name="Home"
            component={HomeTabsRouter}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="_PlayerVirtual"
            component={() => null}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
      <StatusBar style={theme.dark ? "light" : "dark"} translucent />
    </>
  );
}
