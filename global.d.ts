import { StaticParamList } from '@react-navigation/native';
import type { RootStack } from './App';

declare global {
  type RootStackParamList = StaticParamList<typeof RootStack>;
}
