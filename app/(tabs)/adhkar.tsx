/**
 * Adhkar Collection Screen
 * Browse morning, evening, after-salah, and anytime adhkar
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { categories, dhikrData, DhikrItem } from '@/constants/dhikr-data';
import { Colors, IslamicColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AdhkarScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();
    const colors = Colors[colorScheme ?? 'light'];
    const [selectedCategory, setSelectedCategory] = useState<string>('morning');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredDhikr = dhikrData.filter((d) => d.category === selectedCategory);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <LinearGradient
                colors={
                    isDark
                        ? [IslamicColors.deepBlue, '#0F1419']
                        : [IslamicColors.deepBlue, IslamicColors.skyBlue, colors.background]
                }
                style={[styles.header, { paddingTop: insets.top + 12 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={styles.headerArabic}>أَذْكَار</Text>
                <Text style={styles.headerTitle}>Daily Adhkar</Text>
                <Text style={styles.headerSubtitle}>Remembrance of Allah ﷻ</Text>
            </LinearGradient>

            {/* Category Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
                style={styles.categoryScroll}
            >
                {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => {
                                setSelectedCategory(cat.id);
                                setExpandedId(null);
                            }}
                            style={[
                                styles.categoryTab,
                                {
                                    backgroundColor: isActive
                                        ? isDark
                                            ? cat.color + '30'
                                            : cat.color + '18'
                                        : isDark
                                            ? colors.surface
                                            : '#F1F5F3',
                                    borderColor: isActive ? cat.color : 'transparent',
                                },
                            ]}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.categoryIcon}>{cat.icon}</Text>
                            <Text
                                style={[
                                    styles.categoryLabel,
                                    {
                                        color: isActive ? cat.color : colors.textSecondary,
                                        fontWeight: isActive ? '700' : '500',
                                    },
                                ]}
                            >
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Dhikr List */}
            <ScrollView
                style={styles.listContainer}
                contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
                showsVerticalScrollIndicator={false}
            >
                {filteredDhikr.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyIcon]}>📿</Text>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            No adhkar in this category yet
                        </Text>
                    </View>
                ) : (
                    filteredDhikr.map((dhikr, index) => (
                        <DhikrCard
                            key={dhikr.id}
                            dhikr={dhikr}
                            index={index}
                            isExpanded={expandedId === dhikr.id}
                            onToggle={() => toggleExpand(dhikr.id)}
                            isDark={isDark}
                            colors={colors}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

function DhikrCard({
    dhikr,
    index,
    isExpanded,
    onToggle,
    isDark,
    colors,
}: {
    dhikr: DhikrItem;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    isDark: boolean;
    colors: typeof Colors.light;
}) {
    const categoryColor = categories.find((c) => c.id === dhikr.category)?.color || IslamicColors.emerald;

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            style={[
                styles.card,
                {
                    backgroundColor: colors.cardBg,
                    borderColor: isExpanded ? categoryColor + '40' : colors.border,
                    borderLeftColor: categoryColor,
                },
            ]}
        >
            {/* Card number badge */}
            <View style={[styles.numberBadge, { backgroundColor: categoryColor + '15' }]}>
                <Text style={[styles.numberText, { color: categoryColor }]}>{index + 1}</Text>
            </View>

            {/* Arabic text */}
            <Text style={[styles.cardArabic, { color: colors.text }]}>{dhikr.arabic}</Text>

            {/* Always show transliteration */}
            <Text style={[styles.cardTranslit, { color: IslamicColors.emerald }]}>
                {dhikr.transliteration}
            </Text>

            {/* Expanded content */}
            {isExpanded && (
                <View style={styles.expandedContent}>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Translation */}
                    <Text style={[styles.cardTranslation, { color: colors.textSecondary }]}>
                        {dhikr.translation}
                    </Text>

                    {/* Meta info */}
                    <View style={styles.metaRow}>
                        <View style={[styles.metaTag, { backgroundColor: categoryColor + '15' }]}>
                            <Text style={[styles.metaText, { color: categoryColor }]}>×{dhikr.count} times</Text>
                        </View>
                        {dhikr.source && (
                            <View style={[styles.metaTag, { backgroundColor: isDark ? '#243447' : '#F1F5F9' }]}>
                                <Text style={[styles.metaText, { color: colors.textSecondary }]}>📖 {dhikr.source}</Text>
                            </View>
                        )}
                    </View>
                </View>
            )}

            {/* Expand hint */}
            <Text style={[styles.expandHint, { color: colors.textSecondary }]}>
                {isExpanded ? '▲ Less' : '▼ Tap for translation'}
            </Text>
        </TouchableOpacity>
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
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: '300',
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '700',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500',
    },
    categoryScroll: {
        flexGrow: 0,
        marginTop: 4,
    },
    categoryContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    categoryTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        gap: 6,
    },
    categoryIcon: {
        fontSize: 16,
    },
    categoryLabel: {
        fontSize: 14,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 4,
        gap: 12,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderLeftWidth: 4,
        padding: 18,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        marginBottom: 2,
    },
    numberBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 12,
        fontWeight: '700',
    },
    cardArabic: {
        fontSize: 22,
        lineHeight: 36,
        textAlign: 'right',
        marginBottom: 10,
        marginRight: 36,
    },
    cardTranslit: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    expandedContent: {
        marginTop: 4,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    cardTranslation: {
        fontSize: 14,
        lineHeight: 22,
        fontStyle: 'italic',
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    metaTag: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    metaText: {
        fontSize: 12,
        fontWeight: '600',
    },
    expandHint: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 8,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 15,
    },
});
