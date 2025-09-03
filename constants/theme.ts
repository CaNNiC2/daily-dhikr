/**
 * Daily Dhikr App - Theme & Colors
 * Islamic-inspired color palette with dark/light mode support
 */

import { Platform } from 'react-native';

// Islamic-inspired color palette
export const IslamicColors = {
  // Primary greens (Islamic green)
  emerald: '#0D9F6E',
  emeraldLight: '#34D399',
  emeraldDark: '#065F46',

  // Gold accents (Mosque domes, calligraphy)
  gold: '#D4A843',
  goldLight: '#F0D78C',
  goldDark: '#B8860B',

  // Deep blues (night sky, spiritual)
  deepBlue: '#1E3A5F',
  skyBlue: '#4A90D9',

  // Warm neutrals
  cream: '#FDF8F0',
  sand: '#F5E6CC',

  // Gradients
  gradientStart: '#0D4F3C',
  gradientMid: '#0A6E4E',
  gradientEnd: '#0D9F6E',
};

const tintColorLight = IslamicColors.emerald;
const tintColorDark = IslamicColors.emeraldLight;

export const Colors = {
  light: {
    text: '#1A1A2E',
    textSecondary: '#64748B',
    background: '#F8FAF9',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F3',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    border: '#E2E8F0',
    cardBg: '#FFFFFF',
    accent: IslamicColors.gold,
    accentLight: IslamicColors.goldLight,
  },
  dark: {
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    background: '#0F1419',
    surface: '#1A2332',
    surfaceElevated: '#243447',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
    border: '#2D3F52',
    cardBg: '#1A2332',
    accent: IslamicColors.gold,
    accentLight: IslamicColors.goldDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
