# 🕌 Daily Dhikr

A beautiful Islamic mobile app built with **React Native + Expo** for daily remembrance of Allah ﷻ.

## Features

- **📿 Tasbeeh Counter** — Tap to count any dhikr with vibration feedback, progress tracking, and persistent storage
- **🌙 Dark & Light Mode** — Follows system theme with an Islamic-inspired color palette
- **💾 Persistent Data** — Your counter is saved between sessions

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 54)
- [Expo Router](https://docs.expo.dev/router/introduction/) — file-based navigation
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — local data persistence

## Getting Started

### Prerequisites
- Node.js 18+
- [Expo Go](https://expo.dev/go) app on your phone

### Installation

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

Then scan the QR code with **Expo Go** on Android or the Camera app on iOS.

## Project Structure

```
app/
  (tabs)/
    index.tsx       # Tasbeeh counter screen
  _layout.tsx       # Root layout & navigation theme
constants/
  theme.ts          # Islamic color palette & theme tokens
components/         # Reusable UI components
hooks/              # Custom React hooks
```

---

> *"Remember Me, and I will remember you."* — Al-Baqarah 2:152
