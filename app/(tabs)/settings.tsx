/**
 * Settings Screen
 * App settings, total stats, and about section
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, IslamicColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();
    const colors = Colors[colorScheme ?? 'light'];
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const saved = await AsyncStorage.getItem('tasbeeh-data');
            if (saved) {
                const data = JSON.parse(saved);
                setTotalCount(data.totalCount || 0);
            }
        } catch (e) {
            console.log('Error loading stats:', e);
        }
    };

    const resetAllData = () => {
        Alert.alert(
            'Reset All Data',
            'Are you sure you want to reset all your counter data? This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('tasbeeh-data');
                        setTotalCount(0);
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <LinearGradient
                colors={
                    isDark
                        ? ['#2D1F4E', '#0F1419']
                        : ['#6B46C1', '#9F7AEA', colors.background]
                }
                style={[styles.header, { paddingTop: insets.top + 12 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={styles.headerArabic}>⚙️</Text>
                <Text style={styles.headerTitle}>Settings</Text>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Stats Card */}
                <View style={[styles.statsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                    <LinearGradient
                        colors={[IslamicColors.emerald, IslamicColors.emeraldDark]}
                        style={styles.statsGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.statsLabel}>Total Dhikr Count</Text>
                        <Text style={styles.statsNumber}>{totalCount.toLocaleString()}</Text>
                        <Text style={styles.statsSubtext}>Keep going! Every dhikr counts 🤲</Text>
                    </LinearGradient>
                </View>

                {/* Settings Sections */}
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APP</Text>

                <View style={[styles.settingsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                    <SettingItem
                        icon="🌙"
                        title="Theme"
                        subtitle={`Currently: ${isDark ? 'Dark' : 'Light'} (follows system)`}
                        colors={colors}
                        isDark={isDark}
                    />
                    <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
                    <SettingItem
                        icon="📳"
                        title="Vibration"
                        subtitle="Haptic feedback on tap"
                        colors={colors}
                        isDark={isDark}
                        trailing={
                            <View style={[styles.badge, { backgroundColor: IslamicColors.emerald + '20' }]}>
                                <Text style={[styles.badgeText, { color: IslamicColors.emerald }]}>On</Text>
                            </View>
                        }
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>DATA</Text>

                <View style={[styles.settingsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                    <TouchableOpacity onPress={resetAllData} activeOpacity={0.7}>
                        <SettingItem
                            icon="🗑️"
                            title="Reset All Data"
                            subtitle="Clear counter and statistics"
                            colors={colors}
                            isDark={isDark}
                            isDestructive
                        />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ABOUT</Text>

                <View style={[styles.settingsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                    <SettingItem
                        icon="📱"
                        title="Daily Dhikr"
                        subtitle="Version 1.0.0"
                        colors={colors}
                        isDark={isDark}
                    />
                    <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
                    <SettingItem
                        icon="💚"
                        title="Developed by"
                        subtitle="CaNNi"
                        colors={colors}
                        isDark={isDark}
                    />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={[styles.footerArabic, { color: IslamicColors.gold }]}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</Text>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        In the name of Allah, the Most Gracious, the Most Merciful
                    </Text>
                    <Text style={[styles.footerNote, { color: colors.textSecondary }]}>
                        May Allah accept all our dhikr and ibadah 🤲
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

function SettingItem({
    icon,
    title,
    subtitle,
    colors,
    isDark,
    isDestructive,
    trailing,
}: {
    icon: string;
    title: string;
    subtitle: string;
    colors: typeof Colors.light;
    isDark: boolean;
    isDestructive?: boolean;
    trailing?: React.ReactNode;
}) {
    return (
        <View style={styles.settingItem}>
            <Text style={styles.settingIcon}>{icon}</Text>
            <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: isDestructive ? '#EF4444' : colors.text }]}>
                    {title}
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
            </View>
            {trailing && <View style={styles.settingTrailing}>{trailing}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerArabic: {
        fontSize: 32,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 4,
    },
    statsCard: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        marginBottom: 24,
        elevation: 3,
        shadowColor: IslamicColors.emeraldDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    statsGradient: {
        padding: 28,
        alignItems: 'center',
    },
    statsLabel: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    statsNumber: {
        fontSize: 56,
        fontWeight: '200',
        color: '#FFFFFF',
        lineHeight: 64,
        marginBottom: 8,
    },
    statsSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 4,
        marginTop: 4,
    },
    settingsCard: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 14,
    },
    settingIcon: {
        fontSize: 22,
        width: 32,
        textAlign: 'center',
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 13,
    },
    settingTrailing: {
        marginLeft: 8,
    },
    settingDivider: {
        height: 1,
        marginLeft: 62,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
    },
    footerArabic: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: '300',
    },
    footerText: {
        fontSize: 13,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 12,
    },
    footerNote: {
        fontSize: 13,
        textAlign: 'center',
    },
});
