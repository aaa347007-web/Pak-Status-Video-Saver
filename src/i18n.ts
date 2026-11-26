import { Language, PoetryCategory, TabId } from './types';

export interface Translations {
  appName: string;
  appTagline: string;
  tabs: Record<TabId, string>;
  langToggleLabel: string;
  video: {
    heading: string;
    subheading: string;
    heroBadge: string;
    heroTitle: string;
    supportedTitle: string;
    placeholder: string;
    pasteBtn: string;
    fetchBtn: string;
    fetching: string;
    downloadMp4: string;
    clearBtn: string;
    noWatermarkTag: string;
    emptyUrlError: string;
    invalidUrlError: string;
    fetchErrorPrefix: string;
    clipboardDenied: string;
    pastedSuccess: string;
    downloadStarted: string;
    tryDemoBtn: string;
    loadDemoFallbackBtn: string;
    demoLoadedToast: string;
    features: {
      hdTitle: string;
      hdSub: string;
      cleanTitle: string;
      cleanSub: string;
      fastTitle: string;
      fastSub: string;
    };
    howItWorksTitle: string;
    stepTitles: [string, string, string];
    steps: [string, string, string];
  };
  poetry: {
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    copyBtn: string;
    copied: string;
    customizeBtn: string;
    downloadBtn: string;
    categories: Record<PoetryCategory, string>;
    studioTitle: string;
    backgroundLabel: string;
    photoBgs: string;
    gradientBgs: string;
    fontSizeLabel: string;
    textColorLabel: string;
    alignmentLabel: string;
    showPoetLabel: string;
    editTextLabel: string;
    exportPng: string;
    close: string;
    noResults: string;
  };
  dp: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    taglineLabel: string;
    taglinePlaceholder: string;
    framesLabel: string;
    fontStyleLabel: string;
    fontStyles: {
      auto: string;
      nastaliq: string;
      display: string;
      serif: string;
    };
    fontSizeLabel: string;
    textColorLabel: string;
    circleGuideLabel: string;
    downloadBtn: string;
    savedToast: string;
    emptyNameError: string;
  };
  downloads: {
    heading: string;
    subheading: string;
    filterAll: string;
    filterVideo: string;
    filterPoetry: string;
    filterDp: string;
    redownload: string;
    deleteItem: string;
    clearAll: string;
    confirmClear: string;
    cancel: string;
    emptyTitle: string;
    emptySubtitle: string;
    goVideo: string;
    goPoetry: string;
    goDp: string;
    typeLabels: {
      video: string;
      poetry: string;
      dp: string;
    };
    deletedToast: string;
    clearedToast: string;
  };
  adModal: {
    sponsoredLabel: string;
    advertisementLabel: string;
    cancel: string;
    readyLabel: string;
    secondsSuffix: string;
    startingDownload: string;
    downloadStarted: string;
    loadingVideoAd: string;
    loadingVideoAdSub: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Pak Status & Video Saver',
    appTagline: 'HD Videos, Urdu Shayari & Name DPs',
    tabs: {
      video: 'Video Saver',
      poetry: 'Urdu Poetry',
      dp: 'Name DP',
      downloads: 'My Downloads',
    },
    langToggleLabel: 'اردو',
    video: {
      heading: 'Video Saver',
      subheading: 'Paste any video link to preview and save crystal-clear HD MP4 without watermarks.',
      heroBadge: 'HD NO WATERMARK • 100% FREE',
      heroTitle: 'Save Any Social Video in Ultra HD',
      supportedTitle: 'Supported Platforms',
      placeholder: 'Paste TikTok, Instagram, Facebook, or YouTube link...',
      pasteBtn: 'Paste Link',
      fetchBtn: 'Download HD Video',
      fetching: 'Fetching HD Video...',
      downloadMp4: 'Download MP4 (No Watermark)',
      clearBtn: 'Clear',
      noWatermarkTag: 'HD MP4 · No Watermark',
      emptyUrlError: 'Please paste a video URL first.',
      invalidUrlError: 'Please enter a valid http:// or https:// video link.',
      fetchErrorPrefix: 'Could not fetch video info:',
      clipboardDenied: 'Clipboard access blocked. Please paste manually into the input box.',
      pastedSuccess: 'Link pasted from clipboard.',
      downloadStarted: 'HD MP4 download started & saved to My Downloads.',
      tryDemoBtn: 'Try Demo Video',
      loadDemoFallbackBtn: 'Load Demo Test Video',
      demoLoadedToast: 'Demo HD test video loaded. Tap Download MP4 to test saving.',
      features: {
        hdTitle: 'Ultra HD MP4',
        hdSub: 'Original 1080p clarity',
        cleanTitle: 'No Watermark',
        cleanSub: 'Clean logo-free clips',
        fastTitle: 'Fast Gallery Save',
        fastSub: 'Direct 1-tap export',
      },
      howItWorksTitle: 'How to Save in 3 Easy Steps',
      stepTitles: ['1. Copy Link', '2. Paste & Fetch', '3. Save to Gallery'],
      steps: [
        'Copy any video link from TikTok, Reels, Facebook, or YouTube.',
        'Tap Paste Link and hit Download HD Video to load the preview.',
        'Confirm Download MP4 to save directly into your phone gallery.',
      ],
    },
    poetry: {
      heading: 'Urdu Poetry & Status',
      subheading: 'Luxury Nastaliq shayari and Islamic status cards ready to copy, style, or save as HD PNG.',
      searchPlaceholder: 'Search poetry or poet...',
      copyBtn: 'Copy Text',
      copied: 'Copied',
      customizeBtn: 'Customize Card',
      downloadBtn: 'Download PNG',
      categories: {
        all: 'All',
        sad: 'Sad',
        romantic: 'Romantic',
        islamic: 'Islamic',
        jumma: 'Jumma Mubarak',
        attitude: 'Attitude',
        motivation: 'Motivation',
      },
      studioTitle: 'Poetry Card Studio',
      backgroundLabel: 'Backdrop',
      photoBgs: 'Scenic Photos',
      gradientBgs: 'Luxury Gradients',
      fontSizeLabel: 'Text Size',
      textColorLabel: 'Ink Color',
      alignmentLabel: 'Alignment',
      showPoetLabel: 'Show Poet Credit',
      editTextLabel: 'Edit Couplet',
      exportPng: 'Download Image (PNG)',
      close: 'Close',
      noResults: 'No poetry matches your search.',
    },
    dp: {
      heading: 'Name DP Studio',
      subheading: 'Design glowing 1080×1080 circular-friendly Name DPs in Urdu or English.',
      nameLabel: 'Your Name (Urdu or English)',
      namePlaceholder: 'e.g. حمزہ خان or Ayesha',
      taglineLabel: 'Optional Subtitle / Crest',
      taglinePlaceholder: 'e.g. ماشاءاللہ or Est. 2026',
      framesLabel: 'Glowing Studio Frames (12 Styles)',
      fontStyleLabel: 'Font Style',
      fontStyles: {
        auto: 'Auto Script',
        nastaliq: 'Nastaliq',
        display: 'Modern Sans',
        serif: 'Classic Serif',
      },
      fontSizeLabel: 'Name Size',
      textColorLabel: 'Color & Swatches',
      circleGuideLabel: 'Circle Guide',
      downloadBtn: 'Download 1080×1080 PNG',
      savedToast: '1080×1080 Name DP saved to gallery & My Downloads.',
      emptyNameError: 'Please enter a name first.',
    },
    downloads: {
      heading: 'My Downloads',
      subheading: 'Locally saved history of your videos, poetry cards, and Name DPs.',
      filterAll: 'All',
      filterVideo: 'Videos',
      filterPoetry: 'Poetry',
      filterDp: 'Name DPs',
      redownload: 'Download Again',
      deleteItem: 'Delete',
      clearAll: 'Clear All',
      confirmClear: 'Confirm Clear',
      cancel: 'Cancel',
      emptyTitle: 'No downloads yet',
      emptySubtitle: 'Videos, poetry PNGs, and Name DPs you save will appear here automatically.',
      goVideo: 'Save a Video',
      goPoetry: 'Browse Poetry',
      goDp: 'Create Name DP',
      typeLabels: {
        video: 'MP4 Video',
        poetry: 'Poetry PNG',
        dp: 'Name DP',
      },
      deletedToast: 'Removed from history.',
      clearedToast: 'Download history cleared.',
    },
    adModal: {
      sponsoredLabel: 'Sponsored',
      advertisementLabel: 'Advertisement',
      cancel: 'Cancel',
      readyLabel: 'Starting download...',
      secondsSuffix: 's',
      startingDownload: 'Saving to your device...',
      downloadStarted: 'Download Started!',
      loadingVideoAd: 'Loading Video Ad...',
      loadingVideoAdSub: 'Watch the short rewarded video ad to unlock your HD download.',
    },
  },
  ur: {
    appName: 'پاک اسٹیٹس اور ویڈیو سیور',
    appTagline: 'ایچ ڈی ویڈیوز، اردو شاعری اور نام والی ڈی پی',
    tabs: {
      video: 'ویڈیو ڈاؤن لوڈر',
      poetry: 'اردو شاعری',
      dp: 'نام والی ڈی پی',
      downloads: 'میری گیلری',
    },
    langToggleLabel: 'EN',
    video: {
      heading: 'ویڈیو ڈاؤن لوڈر',
      subheading: 'بغیر واٹر مارک الٹرا ایچ ڈی ویڈیو محفوظ کرنے کے لیے لنک پیسٹ کریں۔',
      heroBadge: 'ایچ ڈی بغیر واٹر مارک • 100% مفت',
      heroTitle: 'کوئی بھی سوشل ویڈیو الٹرا ایچ ڈی میں محفوظ کریں',
      supportedTitle: 'معاون پلیٹ فارمز',
      placeholder: 'ٹک ٹاک، انسٹاگرام، فیس بک یا یوٹیوب لنک پیسٹ کریں...',
      pasteBtn: 'لنک پیسٹ کریں',
      fetchBtn: 'ایچ ڈی ویڈیو ڈاؤن لوڈ',
      fetching: 'ویڈیو تلاش کی جا رہی ہے...',
      downloadMp4: 'ایچ ڈی MP4 ڈاؤن لوڈ کریں',
      clearBtn: 'صاف کریں',
      noWatermarkTag: 'ایچ ڈی MP4 · بغیر واٹر مارک',
      emptyUrlError: 'براہ کرم پہلے ویڈیو کا لنک درج کریں۔',
      invalidUrlError: 'براہ کرم درست ویڈیو لنک درج کریں۔',
      fetchErrorPrefix: 'ویڈیو حاصل کرنے میں دشواری:',
      clipboardDenied: 'کلپ بورڈ تک رسائی ممکن نہیں، براہ کرم لنک خود پیسٹ کریں۔',
      pastedSuccess: 'لنک پیسٹ ہو گیا۔',
      downloadStarted: 'ویڈیو ڈاؤن لوڈ شروع ہو گئی اور میری گیلری میں محفوظ ہو گئی۔',
      tryDemoBtn: 'ڈیمو ویڈیو آزمائیں',
      loadDemoFallbackBtn: 'ڈیمو ٹیسٹ ویڈیو لوڈ کریں',
      demoLoadedToast: 'ڈیمو ایچ ڈی ٹیسٹ ویڈیو لوڈ ہو گئی۔ محفوظ کرنے کے لیے ڈاؤن لوڈ دبائیں۔',
      features: {
        hdTitle: 'الٹرا ایچ ڈی MP4',
        hdSub: 'اصل 1080p کوالٹی',
        cleanTitle: 'بغیر واٹر مارک',
        cleanSub: 'صاف اور لوگو فری ویڈیو',
        fastTitle: 'فوری گیلری سیو',
        fastSub: 'ایک کلک میں محفوظ کریں',
      },
      howItWorksTitle: '3 آسان مراحل میں ویڈیو محفوظ کریں',
      stepTitles: ['1. لنک کاپی کریں', '2. پیسٹ اور فیچ کریں', '3. گیلری میں محفوظ کریں'],
      steps: [
        'ٹک ٹاک، ریلز، فیس بک یا یوٹیوب سے ویڈیو کا لنک کاپی کریں۔',
        'لنک پیسٹ کریں اور ایچ ڈی ویڈیو ڈاؤن لوڈ بٹن دبائیں۔',
        'ایچ ڈی MP4 ڈاؤن لوڈ پر کلک کر کے اپنے فون میں محفوظ کریں۔',
      ],
    },
    poetry: {
      heading: 'اردو شاعری اور اسٹیٹس',
      subheading: 'شاہی نستعلیق شاعری کاپی کریں، اسٹوڈیو میں سجائیں یا ایچ ڈی تصویر ڈاؤن لوڈ کریں۔',
      searchPlaceholder: 'شاعری یا شاعر تلاش کریں...',
      copyBtn: 'کاپی کریں',
      copied: 'کاپی ہو گیا',
      customizeBtn: 'کارڈ ڈیزائن',
      downloadBtn: 'تصویر ڈاؤن لوڈ',
      categories: {
        all: 'تمام',
        sad: 'اداس',
        romantic: 'محبت',
        islamic: 'اسلامی',
        jumma: 'جمعہ مبارک',
        attitude: 'ایٹیٹیوڈ',
        motivation: 'حوصلہ',
      },
      studioTitle: 'شاعری کارڈ اسٹوڈیو',
      backgroundLabel: 'بیک گراؤنڈ',
      photoBgs: 'قدرتی تصاویر',
      gradientBgs: 'شاہی گریڈینٹس',
      fontSizeLabel: 'تحریر کا سائز',
      textColorLabel: 'تحریر کا رنگ',
      alignmentLabel: 'ترتیب',
      showPoetLabel: 'شاعر کا نام دکھائیں',
      editTextLabel: 'شعر میں ترمیم کریں',
      exportPng: 'تصویر ڈاؤن لوڈ کریں (PNG)',
      close: 'بند کریں',
      noResults: 'تلاش کے مطابق کوئی شاعری نہیں ملی۔',
    },
    dp: {
      heading: 'نام والی ڈی پی اسٹوڈیو',
      subheading: 'اردو یا انگلش میں چمکتے ہوئے 1080×1080 نام والی ڈی پی فریمز بنائیں۔',
      nameLabel: 'اپنا نام لکھیں (اردو یا انگلش)',
      namePlaceholder: 'مثلاً حمزہ خان یا Ayesha',
      taglineLabel: 'اضافی جملہ (اختیاری)',
      taglinePlaceholder: 'مثلاً ماشاءاللہ یا پاکستان',
      framesLabel: 'اسٹوڈیو فریمز (12 ڈیزائن)',
      fontStyleLabel: 'لکھائی کا انداز',
      fontStyles: {
        auto: 'خودکار',
        nastaliq: 'نستعلیق',
        display: 'ماڈرن',
        serif: 'کلاسک',
      },
      fontSizeLabel: 'نام کا سائز',
      textColorLabel: 'رنگ منتخب کریں',
      circleGuideLabel: 'گول ڈی پی گائیڈ',
      downloadBtn: '1080×1080 ڈی پی ڈاؤن لوڈ',
      savedToast: 'نام والی ڈی پی محفوظ ہو گئی اور میری گیلری میں شامل ہو گئی۔',
      emptyNameError: 'براہ کرم پہلے اپنا نام لکھیں۔',
    },
    downloads: {
      heading: 'میری گیلری',
      subheading: 'ڈاؤن لوڈ شدہ ویڈیوز، شاعری کارڈز اور نام والی ڈی پیز کا ریکارڈ۔',
      filterAll: 'تمام',
      filterVideo: 'ویڈیوز',
      filterPoetry: 'شاعری',
      filterDp: 'نام ڈی پی',
      redownload: 'دوبارہ ڈاؤن لوڈ',
      deleteItem: 'حذف کریں',
      clearAll: 'سب صاف کریں',
      confirmClear: 'تصدیق کریں',
      cancel: 'منسوخ',
      emptyTitle: 'ابھی کوئی فائل محفوظ نہیں',
      emptySubtitle: 'آپ جو ویڈیوز، شاعری کارڈز یا ڈی پی ڈاؤن لوڈ کریں گے وہ یہاں نظر آئیں گی۔',
      goVideo: 'ویڈیو ڈاؤن لوڈ',
      goPoetry: 'اردو شاعری',
      goDp: 'نام والی ڈی پی',
      typeLabels: {
        video: 'MP4 ویڈیو',
        poetry: 'شاعری کارڈ',
        dp: 'نام ڈی پی',
      },
      deletedToast: 'ریکارڈ حذف کر دیا گیا۔',
      clearedToast: 'تمام ریکارڈ صاف کر دیا گیا۔',
    },
    adModal: {
      sponsoredLabel: 'اشتہار',
      advertisementLabel: 'Advertisement',
      cancel: 'منسوخ کریں',
      readyLabel: 'ڈاؤن لوڈ شروع ہو رہا ہے...',
      secondsSuffix: ' سیکنڈ',
      startingDownload: 'فائل محفوظ کی جا رہی ہے...',
      downloadStarted: 'ڈاؤن لوڈ شروع ہو گیا!',
      loadingVideoAd: 'ویڈیو اشتہار لوڈ ہو رہا ہے...',
      loadingVideoAdSub: 'اپنا ایچ ڈی ڈاؤن لوڈ شروع کرنے کے لیے مختصر ویڈیو اشتہار دیکھیں۔',
    },
  },
};
