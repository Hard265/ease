// @@iconify-code-gen

import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import PlayerScreen from "./screens/PlayerScreen";

const RootStack = createNativeStackNavigator<{
  Home: undefined;
  Player: { track: { id: string; title: string; artist: string } };
}>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Player" component={PlayerScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
