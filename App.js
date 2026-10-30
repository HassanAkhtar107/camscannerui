import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import C from './src/theme/colors';
import AnimatedScreen from './src/components/AnimatedScreen';
import TabBar from './src/components/TabBar';
import HomeScreen from './src/screens/HomeScreen';
import DocsScreen from './src/screens/DocsScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import MeScreen from './src/screens/MeScreen';

const SCREENS = [HomeScreen, DocsScreen, ToolsScreen, MeScreen];

function Root() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const prev = useRef(0);
  const direction = index >= prev.current ? 1 : -1;

  useEffect(() => {
    prev.current = index;
  }, [index]);

  return (
    <View style={{ flex: 1, backgroundColor: C.black }}>
      <StatusBar barStyle="light-content" backgroundColor={C.black} translucent={false} />
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        {SCREENS.map((Screen, i) => (
          <AnimatedScreen key={i} active={index === i} direction={direction}>
            <Screen insets={insets} isActive={index === i} />
          </AnimatedScreen>
        ))}
      </View>
      <TabBar index={index} onChange={setIndex} bottomInset={insets.bottom} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
