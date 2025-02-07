import { StaticParamList } from "@react-navigation/native";
import type { RootStack } from "./App";

declare global {
    type RootStackParamList = StaticParamList<typeof RootStack>;
    type Track = {
        title: string;
        artist: string[];
        duration: number;
    };
}
