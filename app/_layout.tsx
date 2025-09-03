import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { IslamicColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Custom navigation themes
const IslamicLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: IslamicColors.emerald,
    background: '#F8FAF9',
    card: '#FFFFFF',
    text: '#1A1A2E',
    border: '#E2E8F0',
  },
};

const IslamicDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: IslamicColors.emeraldLight,
    background: '#0F1419',
    card: '#1A2332',
    text: '#F1F5F9',
    border: '#2D3F52',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? IslamicDarkTheme : IslamicLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
