import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import 'expo-dev-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import Toast from 'react-native-toast-message';

import { ThemeToggle } from '~/components/nativewindui/ThemeToggle';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
          style={isDarkColorScheme ? 'light' : 'dark'}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ActionSheetProvider>
              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                <Stack screenOptions={SCREEN_OPTIONS}>
                  <Stack.Screen name="index" options={INDEX_OPTIONS} />
                </Stack>
              </NavThemeProvider>
            </ActionSheetProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} position="bottom" />
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'Rick And Morty APP',
  headerRight: () => <ThemeToggle />,
  headerShown: true,
} as const;
