/**
 * ЕДИНАЯ точка настройки проекта: меняйте здесь тексты, услуги, промпты, ссылки и кейсы.
 */
import type { ServiceIconName } from '../components/ServiceIcon';
import avatarChannelImg from '../assets/avatar-channel.jpg';
import avatarDmImg from '../assets/avatar-dm.jpg';
import avatarCommunityImg from '../assets/avatar-community.jpg';

// Case 01 — JESS (Featured)
import jessSupportVideo from '../assets/cases/jess/support-motion.mp4';
import jessSupportPoster from '../assets/cases/jess/support-poster.jpg';
import jessMascotImg from '../assets/cases/jess/mascot-pattern.jpg';
import jessEmblemsImg from '../assets/cases/jess/emblems.jpg';
import jessBannersImg from '../assets/cases/jess/banners-pack.jpg';
import jessWinVideo from '../assets/cases/jess/win-motion.mp4';
import jessWinPoster from '../assets/cases/jess/win-poster.jpg';
import jessDrawVideo from '../assets/cases/jess/draw-motion.mp4';
import jessDrawPoster from '../assets/cases/jess/draw-poster.jpg';
import jessLoseVideo from '../assets/cases/jess/lose-motion.mp4';
import jessLosePoster from '../assets/cases/jess/lose-poster.jpg';

// Case 02 — BULL
import bullFlameImg from '../assets/cases/bull/logo-flame.jpg';
import bullMarkImg from '../assets/cases/bull/logo-mark.jpg';
import bullMerchImg from '../assets/cases/bull/merch.jpg';
import bullWoodImg from '../assets/cases/bull/wood-sign.jpg';

// Case 03 — ALMAT BRAT
import almatDarkImg from '../assets/cases/almat-brat/logo-dark.jpg';
import almatLightImg from '../assets/cases/almat-brat/logo-light.jpg';
import almatPaletteImg from '../assets/cases/almat-brat/palette.jpg';

export type Language = 'ru' | 'en';

export type Service = {
  id: string;
  icon: ServiceIconName;
  title: Record<Language, string>;
  description: Record<Language, string>;
  consultPrompt: Record<Language, string>;
};

export type MediaItem = {
  id: string;
  title: Record<Language, string>;
  tag: Record<Language, string>;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  fit?: 'cover' | 'contain';
  bg?: string;
};

export type PortfolioCase = {
  id: string;
  number: string;
  title: string;
  subtitle: Record<Language, string>;
  year: string;
  featured?: boolean;
  homeCoverIndex?: number;
  items: MediaItem[];
};

export type ContactItem = {
  number: string;
  key: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  username: string;
  url: string;
  avatar: string;
  copyText?: string;
  prompt?: Record<Language, string>;
};

export const config = {
  designer: {
    handle: '@karim_the_drea4',
    telegramUrl: 'https://t.me/karim_the_drea4',
    timezone: 'Asia/Almaty',
    utcLabel: 'GMT+5',
  },
  manager: {
    handle: '@Karim_managerr',
    telegramUrl: 'https://t.me/Karim_managerr',
  },
  links: {
    channel: 'https://t.me/karimdsg',
    channelHandle: '@karimdsg',
    community: 'https://t.me/Karimdsg/3375',
    casesChannel: 'https://t.me/KarimCases',
    casesChannelHandle: '@KarimCases',
    portfolio: '#portfolio',
  },
  services: [
    {
      id: 'gfx',
      icon: 'gfx',
      title: { ru: 'GFX оформление', en: 'GFX Design' },
      description: {
        ru: 'Статичная графика для каналов и проектов: аватарки, баннеры, обложки и посты.',
        en: 'Static visuals for channels and projects: avatars, banners, covers and posts.',
      },
      consultPrompt: {
        ru: 'Здравствуйте! Интересует услуга «GFX оформление». Хочу получить консультацию, обсудить задачу и узнать стоимость.',
        en: 'Hello! I am interested in GFX Design. I would like a consultation to discuss my brief and get an estimate.',
      },
    },
    {
      id: 'vfx',
      icon: 'vfx',
      title: { ru: 'VFX эффекты', en: 'VFX & Motion' },
      description: {
        ru: 'Анимации, динамичные переходы, интро, анимированные стикеры и эмодзи.',
        en: 'Motion graphics, dynamic transitions, intros, animated stickers and emoji.',
      },
      consultPrompt: {
        ru: 'Здравствуйте! Интересует услуга «VFX эффекты». Хочу получить консультацию по анимации, срокам и стоимости.',
        en: 'Hello! I am interested in VFX & Motion. I would like a consultation on animation, timeline and pricing.',
      },
    },
    {
      id: 'turnkey',
      icon: 'turnkey',
      title: { ru: 'Оформление канала под ключ', en: 'Turnkey Channel Design' },
      description: {
        ru: 'Комплексная упаковка Telegram-канала в едином стиле: от аватара до шаблонов постов.',
        en: 'Complete Telegram channel packaging in one cohesive style, from avatar to post templates.',
      },
      consultPrompt: {
        ru: 'Здравствуйте! Интересует «Оформление канала под ключ». Хочу получить консультацию, обсудить формат канала и стоимость.',
        en: 'Hello! I am interested in Turnkey Channel Design. I would like a consultation to discuss my channel and pricing.',
      },
    },
    {
      id: 'branding',
      icon: 'branding',
      title: { ru: 'Фирменный стиль / брендинг', en: 'Brand Identity / Branding' },
      description: {
        ru: 'Цельная визуальная система проекта: палитра, типографика, графика и единый стиль.',
        en: 'Cohesive visual identity system: color palette, typography, graphics and visual rules.',
      },
      consultPrompt: {
        ru: 'Здравствуйте! Интересует «Фирменный стиль / брендинг». Хочу получить консультацию и обсудить детали проекта.',
        en: 'Hello! I am interested in Brand Identity / Branding. I would like a consultation to discuss my project.',
      },
    },
    {
      id: 'logo',
      icon: 'logo',
      title: { ru: 'Разработка фирменного логотипа', en: 'Custom Logo Design' },
      description: {
        ru: 'Уникальный фирменный знак и шрифтовая композиция с адаптацией под любые форматы.',
        en: 'Original brand mark and wordmark adapted across digital and print formats.',
      },
      consultPrompt: {
        ru: 'Здравствуйте! Интересует «Разработка фирменного логотипа». Хочу получить консультацию по концепции, срокам и стоимости.',
        en: 'Hello! I am interested in Custom Logo Design. I would like a consultation on concept, timeline and pricing.',
      },
    },
  ] as Service[],
  cases: [
    {
      id: 'jess',
      number: '01',
      title: 'JESS',
      subtitle: {
        ru: 'Персонаж, фирменная графика, обложки и VFX-анимации',
        en: 'Mascot character, brand graphics, covers & VFX motion',
      },
      year: '2026',
      featured: true,
      homeCoverIndex: 1,
      items: [
        {
          id: 'jess-support',
          title: { ru: 'JESS Support', en: 'JESS Support' },
          tag: { ru: 'VFX / Анимация', en: 'VFX / Motion' },
          type: 'video',
          src: jessSupportVideo,
          poster: jessSupportPoster,
          fit: 'contain',
          bg: '#05060b',
        },
        {
          id: 'jess-mascot',
          title: { ru: 'Персонаж и паттерн', en: 'Mascot & Pattern' },
          tag: { ru: 'Айдентика', en: 'Identity' },
          type: 'image',
          src: jessMascotImg,
          fit: 'cover',
          bg: '#131731',
        },
        {
          id: 'jess-emblems',
          title: { ru: 'Эмблемы и фишка', en: 'Emblems & Chip' },
          tag: { ru: 'Логотипы', en: 'Marks' },
          type: 'image',
          src: jessEmblemsImg,
          fit: 'cover',
          bg: '#11162c',
        },
        {
          id: 'jess-banners',
          title: { ru: 'Пакет обложек и меню', en: 'Covers & UI Pack' },
          tag: { ru: 'Оформление', en: 'GFX Pack' },
          type: 'image',
          src: jessBannersImg,
          fit: 'contain',
          bg: '#11152c',
        },
        {
          id: 'jess-win',
          title: { ru: 'Анимация «Победа»', en: 'Win Motion' },
          tag: { ru: 'VFX / Моушн', en: 'VFX / Motion' },
          type: 'video',
          src: jessWinVideo,
          poster: jessWinPoster,
          fit: 'cover',
          bg: '#06080f',
        },
        {
          id: 'jess-draw',
          title: { ru: 'Анимация «Ничья»', en: 'Draw Motion' },
          tag: { ru: 'VFX / Моушн', en: 'VFX / Motion' },
          type: 'video',
          src: jessDrawVideo,
          poster: jessDrawPoster,
          fit: 'cover',
          bg: '#06080f',
        },
        {
          id: 'jess-lose',
          title: { ru: 'Анимация «Поражение»', en: 'Defeat Motion' },
          tag: { ru: 'VFX / Моушн', en: 'VFX / Motion' },
          type: 'video',
          src: jessLoseVideo,
          poster: jessLosePoster,
          fit: 'cover',
          bg: '#06080f',
        },
      ],
    },
    {
      id: 'bull',
      number: '02',
      title: 'BULL',
      subtitle: {
        ru: 'Фирменный логотип, визуальная айдентика и мерч',
        en: 'Brand logo mark, visual identity & merch',
      },
      year: '2026',
      homeCoverIndex: 0,
      items: [
        {
          id: 'bull-flame',
          title: { ru: 'Основной логотип', en: 'Primary Logo' },
          tag: { ru: 'Брендинг', en: 'Branding' },
          type: 'image',
          src: bullFlameImg,
          fit: 'contain',
          bg: '#161113',
        },
        {
          id: 'bull-mark',
          title: { ru: 'Фирменный знак', en: 'Brand Mark' },
          tag: { ru: 'Логотип', en: 'Logo' },
          type: 'image',
          src: bullMarkImg,
          fit: 'contain',
          bg: '#141414',
        },
        {
          id: 'bull-merch',
          title: { ru: 'Фартук и футболка', en: 'Apron & Tee' },
          tag: { ru: 'Мерч', en: 'Merch' },
          type: 'image',
          src: bullMerchImg,
          fit: 'cover',
          bg: '#17120e',
        },
        {
          id: 'bull-wood',
          title: { ru: 'Носитель на дереве', en: 'Wood Application' },
          tag: { ru: 'Айдентика', en: 'Identity' },
          type: 'image',
          src: bullWoodImg,
          fit: 'cover',
          bg: '#1f160d',
        },
      ],
    },
    {
      id: 'almat-brat',
      number: '03',
      title: 'ALMAT BRAT',
      subtitle: {
        ru: 'Персональный бренд, логотип-портрет и фирменная палитра',
        en: 'Personal brand, mascot portrait logo & color palette',
      },
      year: '2026',
      homeCoverIndex: 0,
      items: [
        {
          id: 'almat-dark',
          title: { ru: 'Тёмная версия', en: 'Dark Version' },
          tag: { ru: 'Логотип', en: 'Logo' },
          type: 'image',
          src: almatDarkImg,
          fit: 'cover',
          bg: '#040a09',
        },
        {
          id: 'almat-light',
          title: { ru: 'Версия на градиенте', en: 'Gradient Version' },
          tag: { ru: 'Айдентика', en: 'Identity' },
          type: 'image',
          src: almatLightImg,
          fit: 'cover',
          bg: '#38f6be',
        },
        {
          id: 'almat-palette',
          title: { ru: 'Фирменная палитра', en: 'Color Palette' },
          tag: { ru: 'Цвета', en: 'Palette' },
          type: 'image',
          src: almatPaletteImg,
          fit: 'cover',
          bg: '#040908',
        },
      ],
    },
  ] as PortfolioCase[],
  contacts: [
    {
      number: '01',
      key: 'channel',
      title: { ru: 'Telegram-канал', en: 'Telegram channel' },
      description: {
        ru: 'Работы, блог, посты и новости',
        en: 'Work, blog, posts and updates',
      },
      username: '@karimdsg',
      copyText: '@karimdsg',
      url: 'https://t.me/karimdsg',
      avatar: avatarChannelImg,
    },
    {
      number: '02',
      key: 'manager',
      title: { ru: 'Написать в ЛС', en: 'Message us' },
      description: {
        ru: 'Получить бесплатную консультацию',
        en: 'Get a free consultation',
      },
      username: '@Karim_managerr',
      url: 'https://t.me/Karim_managerr',
      avatar: avatarDmImg,
      prompt: {
        ru: 'Здравствуйте! Хочу получить бесплатную консультацию по проекту.',
        en: 'Hello! I would like to get a free consultation for my project.',
      },
    },
    {
      number: '03',
      key: 'community',
      title: { ru: 'KARIM COMMUNITY', en: 'KARIM COMMUNITY' },
      description: {
        ru: 'Вступить в KARIM COMMUNITY',
        en: 'Join KARIM COMMUNITY',
      },
      username: 't.me/Karimdsg/3375',
      url: 'https://t.me/Karimdsg/3375',
      avatar: avatarCommunityImg,
    },
  ] as ContactItem[],
  interface: {
    ru: {
      nav: ['Главная', 'Услуги', 'Работы', 'Связь'],
      designer: 'ДИЗАЙНЕР',
      hero: 'Фирменный стиль, канал под ключ, индивидуальный подход к каждому проекту',
      heroSub:
        'Разработка логотипов, брендинг, канал под ключ, статичные оформления, анимации, эмодзи и т.д.',
      choose: 'Выбрать услуги',
      works: 'Работы',
      message: 'Написать в ЛС',
      latest: 'Последние работы',
      seeAll: 'Смотреть всё',
      myTime: 'Моё время',
      joinCommunity: 'Вступить',
      prices: 'Услуги',
      pricesSub: 'Стоимость зависит от объёма задачи.',
      consultation: 'Консультация',
      portfolio: 'Работы',
      portfolioSub:
        'Каждый кейс собран отдельной линией. Нажмите на любую работу, чтобы рассмотреть детали.',
      viewAllCasesChannel: 'Смотреть все',
      discussCase: 'Обсудить кейс',
      contact: 'Связь',
      contactSub:
        'Выберите удобный канал — обсудим задачу, покажем процессы или подключим к комьюнити.',
      similar: 'Заказать похожее',
      close: 'Закрыть',
      copied: 'Юзернейм скопирован',
      opened: 'Открываю Telegram',
      promptCopied: 'Сообщение готово — открываю Telegram',
      generalConsultPrompt:
        'Здравствуйте! Хочу получить бесплатную консультацию по проекту.',
      featured: 'Избранный кейс',
      featuredMeta: 'АЙДЕНТИКА & VFX / 2026',
    },
    en: {
      nav: ['Home', 'Services', 'Work', 'Contact'],
      designer: 'DESIGNER',
      hero: 'Brand identity, turnkey channel design & tailored approach to every project',
      heroSub:
        'Logo design, branding, turnkey channels, static visuals, animations, custom emoji and more.',
      choose: 'Explore services',
      works: 'Selected work',
      message: 'Message us',
      latest: 'Latest work',
      seeAll: 'View all cases',
      myTime: 'My time',
      joinCommunity: 'Join',
      prices: 'Services',
      pricesSub: 'Pricing depends on project scope.',
      consultation: 'Consultation',
      portfolio: 'Selected work',
      portfolioSub:
        'Each case is presented as its own collection line. Tap any piece to view full details.',
      viewAllCasesChannel: 'View all',
      discussCase: 'Discuss case',
      contact: 'Contact',
      contactSub:
        'Pick a channel — discuss your brief, follow our work, or join the community.',
      similar: 'Order something similar',
      close: 'Close',
      copied: 'Username copied',
      opened: 'Opening Telegram',
      promptCopied: 'Message ready — opening Telegram',
      generalConsultPrompt:
        'Hello! I would like to get a free consultation for my project.',
      featured: 'Featured case',
      featuredMeta: 'IDENTITY & VFX / 2026',
    },
  },
};
