// @@iconify-code-gen

import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useTheme,
  DarkTheme,
} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import PlayerScreen from "./screens/PlayerScreen";

const RootStack = createNativeStackNavigator<{
  Home: undefined;
  Player: { track: { id: string; title: string; artist: string } };
}>();

function Router() {
  const theme = useTheme();
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Player" component={PlayerScreen} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Router />
    </NavigationContainer>
  );
}
