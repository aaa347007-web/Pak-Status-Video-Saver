import { PoetryBackground, PoetryItem } from '../types';

export const POETRY_BACKGROUNDS: PoetryBackground[] = [
  {
    id: 'photo-lahore-dusk',
    nameEn: 'Lahore Twilight',
    nameUr: 'شامِ لاہور',
    type: 'photo',
    imageSrc: '/src/assets/images/poetry_bg_lahore_dusk_1795614052107.jpg',
    colors: ['#0B2420', '#1B3A33', '#2E2318'],
    accentColor: '#E5C07B',
    textColor: '#F9F7F2',
    scrimOpacity: 0.56,
  },
  {
    id: 'photo-northern-mist',
    nameEn: 'Northern Mist',
    nameUr: 'دھندلے پہاڑ',
    type: 'photo',
    imageSrc: '/src/assets/images/poetry_bg_northern_mist_1795614051969.jpg',
    colors: ['#0F1D26', '#1E3442', '#0B141A'],
    accentColor: '#C9D8E0',
    textColor: '#F5F9FB',
    scrimOpacity: 0.58,
  },
  {
    id: 'photo-rose-velvet',
    nameEn: 'Rose Velvet',
    nameUr: 'مخملی گلاب',
    type: 'photo',
    imageSrc: '/src/assets/images/poetry_bg_rose_velvet_1795614054613.jpg',
    colors: ['#240A10', '#16171B', '#0D0E11'],
    accentColor: '#E2A39F',
    textColor: '#FDF6F6',
    scrimOpacity: 0.52,
  },
  {
    id: 'grad-royal-emerald',
    nameEn: 'Dark Emerald Gold',
    nameUr: 'شاہی زمرد و سونا',
    type: 'gradient',
    colors: ['#022C22', '#065F46', '#042F2E'],
    accentColor: '#F5C451',
    textColor: '#FFFFFF',
  },
  {
    id: 'grad-midnight-indigo',
    nameEn: 'Royal Sapphire Blue',
    nameUr: 'شاہی نیلم',
    type: 'gradient',
    colors: ['#0B1736', '#1D3E8A', '#081129'],
    accentColor: '#F2C96B',
    textColor: '#F8FAFF',
  },
  {
    id: 'grad-burgundy-wine',
    nameEn: 'Sunset Rose',
    nameUr: 'شامِ گلاب',
    type: 'gradient',
    colors: ['#4C0D26', '#9D174D', '#2D0919'],
    accentColor: '#FDE68A',
    textColor: '#FFF7F9',
  },
  {
    id: 'grad-obsidian-gold',
    nameEn: 'Golden Calligraphy',
    nameUr: 'سنہری خطاطی',
    type: 'gradient',
    colors: ['#1C1306', '#4D330C', '#120C04'],
    accentColor: '#FBBF24',
    textColor: '#FFFBEB',
  },
  {
    id: 'grad-teal-slate',
    nameEn: 'Teal Velvet',
    nameUr: 'مخملی نیلاہٹ',
    type: 'gradient',
    colors: ['#082F36', '#0F5E68', '#051E24'],
    accentColor: '#F4C96B',
    textColor: '#F4FDFF',
  },
  {
    id: 'grad-sandstone-parchment',
    nameEn: 'Royal Amber Dusk',
    nameUr: 'عنبری شام',
    type: 'gradient',
    colors: ['#3B180E', '#7C2D12', '#260E07'],
    accentColor: '#FCD34D',
    textColor: '#FFF9F0',
  },
];

export const POETRY_COLLECTION: PoetryItem[] = [
  // SAD (اداس)
  {
    id: 'sad-1',
    category: 'sad',
    lines: [
      'چپکے چپکے رات دن آنسو بہانا یاد ہے',
      'ہم کو اب تک عاشقی کا وہ زمانہ یاد ہے',
    ],
    poetUr: 'حسرت موہانی',
    poetEn: 'Hasrat Mohani',
    defaultBgId: 'photo-northern-mist',
  },
  {
    id: 'sad-2',
    category: 'sad',
    lines: [
      'اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں',
      'جس طرح سوکھے ہوئے پھول کتابوں میں ملیں',
    ],
    poetUr: 'احمد فراز',
    poetEn: 'Ahmad Faraz',
    defaultBgId: 'grad-midnight-indigo',
  },
  {
    id: 'sad-3',
    category: 'sad',
    lines: [
      'کچھ تو مجبوریاں رہی ہوں گی',
      'یوں کوئی بے وفا نہیں ہوتا',
    ],
    poetUr: 'بشیر بدر',
    poetEn: 'Bashir Badr',
    defaultBgId: 'grad-teal-slate',
  },
  {
    id: 'sad-4',
    category: 'sad',
    lines: [
      'شہرِ دل میں اداسیاں ٹھہریں',
      'لوگ ملتے رہے، جدا ٹھہرے',
    ],
    poetUr: 'منتخب کلام',
    poetEn: 'Selected Verse',
    defaultBgId: 'grad-obsidian-gold',
  },

  // ROMANTIC (محبت)
  {
    id: 'rom-1',
    category: 'romantic',
    lines: [
      'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا',
      'مسئلہ پھول کا ہے پھول کدھر جائے گا',
    ],
    poetUr: 'پروین شاکر',
    poetEn: 'Parveen Shakir',
    defaultBgId: 'photo-rose-velvet',
  },
  {
    id: 'rom-2',
    category: 'romantic',
    lines: [
      'تم مرے پاس ہوتے ہو گویا',
      'جب کوئی دوسرا نہیں ہوتا',
    ],
    poetUr: 'مومن خان مومن',
    poetEn: 'Momin Khan Momin',
    defaultBgId: 'grad-burgundy-wine',
  },
  {
    id: 'rom-3',
    category: 'romantic',
    lines: [
      'محبت کرنے والے کم نہ ہوں گے',
      'تری محفل میں لیکن ہم نہ ہوں گے',
    ],
    poetUr: 'حفیظ ہوشیارپوری',
    poetEn: 'Hafeez Hoshiarpuri',
    defaultBgId: 'photo-rose-velvet',
  },
  {
    id: 'rom-4',
    category: 'romantic',
    lines: [
      'تیری صورت کو جب سے دیکھا ہے',
      'میری آنکھوں میں روشنی سی ہے',
    ],
    poetUr: 'منتخب کلام',
    poetEn: 'Selected Verse',
    defaultBgId: 'grad-sandstone-parchment',
  },

  // ISLAMIC (اسلامی)
  {
    id: 'isl-1',
    category: 'islamic',
    lines: [
      'دلوں کو سکون صرف اللہ کے ذکر سے ملتا ہے',
      'ہر مشکل کے بعد بے شک آسانی ہے',
    ],
    poetUr: 'قرآنی پیغام',
    poetEn: 'Islamic Reflection',
    defaultBgId: 'grad-royal-emerald',
  },
  {
    id: 'isl-2',
    category: 'islamic',
    lines: [
      'توکل وہ طاقت ہے جو ناممکن کو ممکن بنا دیتی ہے',
      'بس اپنے رب پر پختہ یقین رکھو',
    ],
    poetUr: 'اقوالِ زریں',
    poetEn: 'Spiritual Wisdom',
    defaultBgId: 'photo-lahore-dusk',
  },
  {
    id: 'isl-3',
    category: 'islamic',
    lines: [
      'صبر کا پھل ہمیشہ میٹھا ہوتا ہے',
      'اللہ صبر کرنے والوں کے ساتھ ہے',
    ],
    poetUr: 'اسلامی اسٹیٹس',
    poetEn: 'Islamic Status',
    defaultBgId: 'grad-royal-emerald',
  },
  {
    id: 'isl-4',
    category: 'islamic',
    lines: [
      'کی محمدؐ سے وفا تو نے تو ہم تیرے ہیں',
      'یہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں',
    ],
    poetUr: 'علامہ اقبال',
    poetEn: 'Allama Iqbal',
    defaultBgId: 'photo-lahore-dusk',
  },

  // JUMMA MUBARAK (جمعہ مبارک)
  {
    id: 'jum-1',
    category: 'jumma',
    lines: [
      'جمعہ مبارک',
      'اللہ آپ کی زندگی میں برکت، سکون اور خوشیاں عطا فرمائے',
    ],
    poetUr: 'دعائے خیر',
    poetEn: 'Jumma Blessing',
    defaultBgId: 'photo-lahore-dusk',
  },
  {
    id: 'jum-2',
    category: 'jumma',
    lines: [
      'جمعہ کی اس بابرکت ساعت میں',
      'یا اللہ سب کی جائز دعائیں قبول فرما',
    ],
    poetUr: 'جمعہ مبارک',
    poetEn: 'Jumma Mubarak',
    defaultBgId: 'grad-royal-emerald',
  },
  {
    id: 'jum-3',
    category: 'jumma',
    lines: [
      'درودِ پاک کی کثرت کیجیے',
      'جمعہ کا دن رحمتوں اور مغفرت کا دن ہے',
    ],
    poetUr: 'پیغامِ جمعہ',
    poetEn: 'Friday Reminder',
    defaultBgId: 'grad-sandstone-parchment',
  },
  {
    id: 'jum-4',
    category: 'jumma',
    lines: [
      'آپ اور آپ کے اہلِ خانہ کو دل کی گہرائیوں سے',
      'جمعہ مبارک — اللہ نگہبان',
    ],
    poetUr: 'جمعہ مبارک',
    poetEn: 'Jumma Mubarak',
    defaultBgId: 'grad-royal-emerald',
  },

  // ATTITUDE (ایٹیٹیوڈ)
  {
    id: 'att-1',
    category: 'attitude',
    lines: [
      'ہم اپنا معیار وقت کے ساتھ نہیں بدلتے',
      'لوگ بدل جائیں تو ہمیں فرق نہیں پڑتا',
    ],
    poetUr: 'خودی و وقار',
    poetEn: 'Self-Respect',
    defaultBgId: 'grad-obsidian-gold',
  },
  {
    id: 'att-2',
    category: 'attitude',
    lines: [
      'خاموشی ہماری کمزوری نہیں',
      'بلکہ ہمارے ظرف کی پہچان ہے',
    ],
    poetUr: 'منتخب اسٹیٹس',
    poetEn: 'Attitude Status',
    defaultBgId: 'grad-teal-slate',
  },
  {
    id: 'att-3',
    category: 'attitude',
    lines: [
      'ہم وہ نہیں جو بھیڑ کا حصہ بن جائیں',
      'ہماری پہچان ہمارا منفرد انداز ہے',
    ],
    poetUr: 'شاہین مزاج',
    poetEn: 'Original Spirit',
    defaultBgId: 'grad-obsidian-gold',
  },
  {
    id: 'att-4',
    category: 'attitude',
    lines: [
      'عزت دو گے تو عزت پاؤ گے',
      'ورنہ ہماری فہرست میں جگہ محدود ہے',
    ],
    poetUr: 'منتخب کلام',
    poetEn: 'Selected Status',
    defaultBgId: 'grad-midnight-indigo',
  },

  // MOTIVATION (حوصلہ)
  {
    id: 'mot-1',
    category: 'motivation',
    lines: [
      'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے',
      'خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے',
    ],
    poetUr: 'علامہ اقبال',
    poetEn: 'Allama Iqbal',
    defaultBgId: 'photo-northern-mist',
  },
  {
    id: 'mot-2',
    category: 'motivation',
    lines: [
      'ستاروں سے آگے جہاں اور بھی ہیں',
      'ابھی عشق کے امتحاں اور بھی ہیں',
    ],
    poetUr: 'علامہ اقبال',
    poetEn: 'Allama Iqbal',
    defaultBgId: 'grad-royal-emerald',
  },
  {
    id: 'mot-3',
    category: 'motivation',
    lines: [
      'تندیِ بادِ مخالف سے نہ گھبرا اے عقاب',
      'یہ تو چلتی ہے تجھے اونچا اڑانے کے لیے',
    ],
    poetUr: 'سید صادق حسین شاکر',
    poetEn: 'Syed Sadiq Hussain',
    defaultBgId: 'grad-obsidian-gold',
  },
  {
    id: 'mot-4',
    category: 'motivation',
    lines: [
      'منزل انہیں کو ملتی ہے جن کے خوابوں میں جان ہوتی ہے',
      'پروں سے کچھ نہیں ہوتا حوصلوں سے اڑان ہوتی ہے',
    ],
    poetUr: 'حوصلہ افزا کلام',
    poetEn: 'Motivation',
    defaultBgId: 'grad-sandstone-parchment',
  },
];
