/**
 * Tasbeeh Counter Screen
 * Beautiful circular counter with dhikr selection
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { dhikrData, DhikrItem } from '@/constants/dhikr-data';
import { Colors, IslamicColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COUNTER_SIZE = Math.min(SCREEN_WIDTH * 0.65, 280);

export default function TasbeehScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? 'light'];

  const anytimeDhikr = dhikrData.filter((d) => d.category === 'anytime');
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(anytimeDhikr[0]);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showDhikrPicker, setShowDhikrPicker] = useState(false);

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Load saved data
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever count changes
  useEffect(() => {
    saveData();
  }, [count, totalCount, selectedDhikr]);

  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('tasbeeh-data');
      if (saved) {
        const data = JSON.parse(saved);
        setCount(data.count || 0);
        setTotalCount(data.totalCount || 0);
        if (data.selectedDhikrId) {
          const found = anytimeDhikr.find((d) => d.id === data.selectedDhikrId);
          if (found) setSelectedDhikr(found);
        }
      }
    } catch (e) {
      console.log('Error loading data:', e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        'tasbeeh-data',
        JSON.stringify({
          count,
          totalCount,
          selectedDhikrId: selectedDhikr.id,
        })
      );
    } catch (e) {
      console.log('Error saving data:', e);
    }
  };

  const handleTap = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount((prev) => prev + 1);

    // Haptic feedback
    if (Platform.OS !== 'web') {
      Vibration.vibrate(10);
    }

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse when reaching target
    if (newCount >= selectedDhikr.count) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      if (Platform.OS !== 'web') {
        Vibration.vibrate([0, 100, 50, 100]);
      }
    }

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: Math.min(newCount / selectedDhikr.count, 1),
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [count, selectedDhikr]);

  const handleReset = useCallback(() => {
    setCount(0);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const selectDhikr = (dhikr: DhikrItem) => {
    setSelectedDhikr(dhikr);
    setCount(0);
    setShowDhikrPicker(false);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const progress = Math.min(count / selectedDhikr.count, 1);
  const isComplete = count >= selectedDhikr.count;

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header gradient */}
      <LinearGradient
        colors={
          isDark
            ? [IslamicColors.gradientStart, '#0F1419']
            : [IslamicColors.emerald, IslamicColors.emeraldLight, colors.background]
        }
        style={[styles.headerGradient, { paddingTop: insets.top + 12 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.headerTitle}>بِسْمِ اللهِ</Text>
        <Text style={styles.headerSubtitle}>Daily Dhikr</Text>
      </LinearGradient>

      {/* Dhikr selector */}
      <TouchableOpacity
        style={[styles.dhikrSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setShowDhikrPicker(!showDhikrPicker)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dhikrArabic, { color: IslamicColors.emerald }]}>{selectedDhikr.arabic}</Text>
        <Text style={[styles.dhikrTransliteration, { color: colors.text }]}>
          {selectedDhikr.transliteration}
        </Text>
        <Text style={[styles.dhikrTranslation, { color: colors.textSecondary }]}>
          {selectedDhikr.translation}
        </Text>
        <View style={styles.selectorArrow}>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            {showDhikrPicker ? '▲ Close' : '▼ Change Dhikr'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Dhikr picker dropdown */}
      {showDhikrPicker && (
        <View style={[styles.pickerContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
            {anytimeDhikr.map((dhikr) => (
              <TouchableOpacity
                key={dhikr.id}
                style={[
                  styles.pickerItem,
                  { borderBottomColor: colors.border },
                  dhikr.id === selectedDhikr.id && {
                    backgroundColor: isDark ? 'rgba(13,159,110,0.15)' : 'rgba(13,159,110,0.08)',
                  },
                ]}
                onPress={() => selectDhikr(dhikr)}
              >
                <Text style={[styles.pickerArabic, { color: colors.text }]}>{dhikr.arabic}</Text>
                <Text style={[styles.pickerTranslit, { color: colors.textSecondary }]}>
                  {dhikr.transliteration} · ×{dhikr.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Counter Circle */}
      <View style={styles.counterSection}>
        <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
          <TouchableOpacity onPress={handleTap} activeOpacity={0.9} style={styles.counterTouchable}>
            <View
              style={[
                styles.counterOuterRing,
                {
                  borderColor: isComplete
                    ? IslamicColors.gold
                    : isDark
                      ? IslamicColors.emeraldDark
                      : IslamicColors.emerald + '40',
                },
              ]}
            >
              <Animated.View style={[styles.counterCircle, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient
                  colors={
                    isComplete
                      ? [IslamicColors.gold, IslamicColors.goldDark]
                      : isDark
                        ? [IslamicColors.emeraldDark, IslamicColors.gradientStart]
                        : [IslamicColors.emerald, IslamicColors.emeraldDark]
                  }
                  style={styles.counterGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.countNumber}>{count}</Text>
                  <View style={styles.countTargetContainer}>
                    <View style={[styles.countDivider, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                    <Text style={styles.countTarget}>{selectedDhikr.count}</Text>
                  </View>
                  {isComplete && <Text style={styles.completeText}>✓ Completed</Text>}
                </LinearGradient>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Tap instruction */}
        <Text style={[styles.tapHint, { color: colors.textSecondary }]}>
          {isComplete ? 'Tap to keep counting or reset' : 'Tap the circle to count'}
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 80 }]}>
        {/* Progress bar */}
        <View style={[styles.progressBarBg, { backgroundColor: isDark ? '#243447' : '#E2E8F0' }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: isComplete ? IslamicColors.gold : IslamicColors.emerald,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <View style={styles.controlsRow}>
          {/* Reset button */}
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.resetButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
          >
            <Text style={[styles.resetText, { color: colors.text }]}>↺ Reset</Text>
          </TouchableOpacity>

          {/* Total counter */}
          <View style={[styles.totalCounter, { backgroundColor: colors.surfaceElevated }]}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total today</Text>
            <Text style={[styles.totalNumber, { color: IslamicColors.emerald }]}>{totalCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dhikrSelector: {
    marginHorizontal: 20,
    marginTop: -1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  dhikrArabic: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 6,
  },
  dhikrTransliteration: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  dhikrTranslation: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  selectorArrow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    alignItems: 'center',
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 200,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  pickerScroll: {
    flexGrow: 0,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  pickerArabic: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 2,
  },
  pickerTranslit: {
    fontSize: 13,
    textAlign: 'center',
  },
  counterSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  counterTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterOuterRing: {
    width: COUNTER_SIZE + 20,
    height: COUNTER_SIZE + 20,
    borderRadius: (COUNTER_SIZE + 20) / 2,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterCircle: {
    width: COUNTER_SIZE,
    height: COUNTER_SIZE,
    borderRadius: COUNTER_SIZE / 2,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: IslamicColors.emeraldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  counterGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countNumber: {
    fontSize: 72,
    fontWeight: '200',
    color: '#FFFFFF',
    lineHeight: 80,
  },
  countTargetContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  countDivider: {
    width: 40,
    height: 1,
    marginBottom: 6,
  },
  countTarget: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  completeText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  tapHint: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomControls: {
    paddingHorizontal: 20,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalCounter: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
});
