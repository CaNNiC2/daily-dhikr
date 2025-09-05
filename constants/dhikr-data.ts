/**
 * Daily Dhikr Data
 * Collection of morning/evening adhkar and common dhikr
 */

export interface DhikrItem {
    id: string;
    arabic: string;
    transliteration: string;
    translation: string;
    count: number; // recommended repetitions
    category: 'morning' | 'evening' | 'after-salah' | 'anytime';
    source?: string;
}

export const dhikrData: DhikrItem[] = [
    // === ANYTIME DHIKR (for Tasbeeh counter) ===
    {
        id: 'subhanallah',
        arabic: 'سُبْحَانَ اللهِ',
        transliteration: 'SubhanAllah',
        translation: 'Glory be to Allah',
        count: 33,
        category: 'anytime',
        source: 'Sahih Muslim',
    },
    {
        id: 'alhamdulillah',
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdulillah',
        translation: 'All praise is due to Allah',
        count: 33,
        category: 'anytime',
        source: 'Sahih Muslim',
    },
    {
        id: 'allahuakbar',
        arabic: 'اللهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        count: 34,
        category: 'anytime',
        source: 'Sahih Muslim',
    },
    {
        id: 'lailahaillallah',
        arabic: 'لَا إِلٰهَ إِلَّا اللهُ',
        transliteration: 'La ilaha illAllah',
        translation: 'There is no god but Allah',
        count: 100,
        category: 'anytime',
        source: 'Sahih Bukhari & Muslim',
    },
    {
        id: 'istighfar',
        arabic: 'أَسْتَغْفِرُ اللهَ',
        transliteration: 'Astaghfirullah',
        translation: 'I seek forgiveness from Allah',
        count: 100,
        category: 'anytime',
        source: 'Sahih Muslim',
    },
    {
        id: 'salawat',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
        transliteration: 'Allahumma salli ala Muhammad',
        translation: 'O Allah, send blessings upon Muhammad ﷺ',
        count: 10,
        category: 'anytime',
        source: 'Sahih Muslim',
    },
    {
        id: 'hawqala',
        arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
        transliteration: 'La hawla wa la quwwata illa billah',
        translation: 'There is no power nor strength except with Allah',
        count: 100,
        category: 'anytime',
        source: 'Sahih Bukhari & Muslim',
    },
    {
        id: 'subhanallahi-wa-bihamdihi',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        transliteration: 'SubhanAllahi wa bihamdihi',
        translation: 'Glory be to Allah and praise Him',
        count: 100,
        category: 'anytime',
        source: 'Sahih Bukhari & Muslim',
    },

    // === MORNING ADHKAR ===
    {
        id: 'morning-master-dua',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilayka-n-nushur",
        translation: 'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
        count: 1,
        category: 'morning',
        source: 'At-Tirmidhi',
    },
    {
        id: 'morning-sayyid',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu",
        translation: 'O Allah, You are my Lord. There is no god but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can.',
        count: 1,
        category: 'morning',
        source: 'Sahih Bukhari - Sayyid al-Istighfar',
    },
    {
        id: 'morning-protection',
        arabic: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa Huwas-Sami'ul-'Alim",
        translation: 'In the Name of Allah, with Whose Name nothing on earth or in heaven can harm, and He is the All-Hearing, All-Knowing.',
        count: 3,
        category: 'morning',
        source: 'Abu Dawud & At-Tirmidhi',
    },

    // === EVENING ADHKAR ===
    {
        id: 'evening-master-dua',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        transliteration: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir",
        translation: 'O Allah, by You we enter the evening, by You we enter the morning, by You we live, by You we die, and to You is the final return.',
        count: 1,
        category: 'evening',
        source: 'At-Tirmidhi',
    },
    {
        id: 'evening-protection',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: "A'udhu bi kalimatil-lahit-tammati min sharri ma khalaq",
        translation: "I seek refuge in Allah's perfect words from the evil of what He created.",
        count: 3,
        category: 'evening',
        source: 'Sahih Muslim',
    },
    {
        id: 'evening-tawakkul',
        arabic: 'حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        transliteration: "Hasbiyal-lahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azim",
        translation: 'Sufficient for me is Allah; there is no god except Him. On Him I have relied, and He is the Lord of the Great Throne.',
        count: 7,
        category: 'evening',
        source: 'Abu Dawud',
    },

    // === AFTER SALAH ===
    {
        id: 'after-salah-ayatul-kursi',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifdhuhuma. Wa Huwal-'Aliyyul-'Adhim.",
        translation: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what is after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        count: 1,
        category: 'after-salah',
        source: 'Al-Baqarah 2:255',
    },
    {
        id: 'after-salah-tasbih',
        arabic: 'سُبْحَانَ اللهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللهُ أَكْبَرُ (٣٤)',
        transliteration: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (34)',
        translation: 'Glory be to Allah (33), All praise is due to Allah (33), Allah is the Greatest (34) = 100 total',
        count: 1,
        category: 'after-salah',
        source: 'Sahih Muslim',
    },
];

export const categories = [
    { id: 'anytime', label: 'Anytime', icon: '🤲', color: '#0D9F6E' },
    { id: 'morning', label: 'Morning', icon: '🌅', color: '#D4A843' },
    { id: 'evening', label: 'Evening', icon: '🌙', color: '#4A90D9' },
    { id: 'after-salah', label: 'After Salah', icon: '🕌', color: '#8B5CF6' },
] as const;
