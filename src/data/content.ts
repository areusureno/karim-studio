/**
 * ЕДИНАЯ точка настройки проекта: меняйте здесь тексты, цены и ссылки.
 * Все цены услуг задаются в USD. Для RUB/KZT используйте курсы ниже.
 */
export type Language = 'ru' | 'en';
export type Currency = 'USD' | 'RUB' | 'KZT';
export type Service = { id: string; icon: string; title: Record<Language,string>; description: Record<Language,string>; price: number | null; priceLabel: Record<Language,string>; badge?: Record<Language,string>; category: string };
export type Artwork = { id: string; title: string; category: 'avatar'|'banner'|'art'; size: string; tags: string[]; style: number };

export const config = {
  designer: { handle: '@karim_the_drea4', telegramUrl: 'https://t.me/karim_the_drea4', timezone: 'Asia/Almaty', utcLabel: 'GMT+5' },
  links: { channel: 'https://t.me/karimdsg', channelHandle: '@karimdsg', source: 'https://t.me/karim_the_drea4', portfolio: '#portfolio' },
  currency: { rates: { USD: 1, RUB: 90, KZT: 470 } as Record<Currency,number>, symbols: { USD: '$', RUB: '₽', KZT: '₸' } as Record<Currency,string>, rounding: { USD: 1, RUB: 50, KZT: 100 } as Record<Currency,number> },
  discount: [{ count: 5, percent: 20 }, { count: 10, percent: 35 }],
  rushPercent: 50,
  services: [
    { id:'avatar', icon:'◉', title:{ru:'Аватарка',en:'Avatar'}, description:{ru:'Для канала, профиля или проекта.',en:'For a channel, profile or project.'}, price:22, priceLabel:{ru:'по сложности',en:'based on complexity'}, badge:{ru:'Хит',en:'Popular'}, category:'avatar' },
    { id:'banner', icon:'▰', title:{ru:'Баннер',en:'Banner'}, description:{ru:'Шапки и обложки для каналов и рекламы.',en:'Headers and covers for channels and campaigns.'}, price:25, priceLabel:{ru:'по ТЗ',en:'brief dependent'}, category:'banner' },
    { id:'art', icon:'✳', title:{ru:'Рисованный арт',en:'Illustrated art'}, description:{ru:'Авторская иллюстрация под вашу идею.',en:'Original illustration made for your idea.'}, price:50, priceLabel:{ru:'по сложности',en:'based on complexity'}, category:'art' },
    { id:'miniapp', icon:'⌘', title:{ru:'Telegram Mini App',en:'Telegram Mini App'}, description:{ru:'Страница внутри Telegram, сделанная под вас.',en:'A custom page that lives inside Telegram.'}, price:35, priceLabel:{ru:'по задаче',en:'scope dependent'}, category:'miniapp' },
    { id:'studio', icon:'▦', title:{ru:'Оформление студии',en:'Studio identity'}, description:{ru:'Единый стиль: аватарки, баннеры, арты.',en:'A cohesive set of avatars, banners and art.'}, price:null, priceLabel:{ru:'скидка до 35%',en:'up to 35% off'}, badge:{ru:'Выгодно',en:'Bundle'}, category:'studio' },
    { id:'motion', icon:'✧', title:{ru:'Стикеры, эмодзи, анимации',en:'Stickers, emoji & motion'}, description:{ru:'Наборы стикеров и эмодзи, анимации.',en:'Sticker and emoji packs, plus animation.'}, price:null, priceLabel:{ru:'по задаче',en:'scope dependent'}, category:'motion' },
  ] as Service[],
  portfolio: [
    {id:'1',title:'#1',category:'avatar',size:'600×600',tags:['identity','dark'],style:1},
    {id:'2',title:'#2',category:'art',size:'750×1600',tags:['illustration','editorial'],style:2},
    {id:'3',title:'#3',category:'banner',size:'1920×640',tags:['branding','studio'],style:3},
  ] as Artwork[],
  contacts: [
    {number:'01',key:'channel',title:{ru:'Telegram-канал',en:'Telegram channel'},description:{ru:'Работы, процесс и новости',en:'Work, process and updates'},username:'@karimdsg',url:'https://t.me/karimdsg',icon:'◉'},
    {number:'02',key:'designer',title:{ru:'Написать в ЛС',en:'Message me'},description:{ru:'Обсудить заказ, цену и сроки',en:'Discuss your brief, budget and timeline'},username:'@karim_the_drea4',url:'https://t.me/karim_the_drea4',icon:'↗'},
    {number:'03',key:'source',title:{ru:'SOURCE',en:'SOURCE'},description:{ru:'Перейти в SOURCE',en:'Go to SOURCE'},username:'@karim_the_drea4',url:'https://t.me/karim_the_drea4',icon:'✳'},
  ],
  steps: [
    {title:{ru:'Выбор',en:'Choose'},body:{ru:'Отметьте нужные услуги',en:'Select the services you need'}},
    {title:{ru:'Диалог',en:'Discuss'},body:{ru:'Уточняем задачу, цену и срок',en:'Confirm scope, price and timing'}},
    {title:{ru:'Оплата',en:'Payment'},body:{ru:'Работа стартует после оплаты',en:'Work begins after payment'}},
    {title:{ru:'Результат',en:'Delivery'},body:{ru:'Правки по заданию, затем файлы',en:'Revisions, then final files'}},
  ],
  interface: {
    ru:{nav:['Главная','Услуги','Работы','Связь'],open:'Открыт для заказов',designer:'ДИЗАЙНЕР',hero:'Оформление для каналов, студий и проектов',heroSub:'Аватарки, баннеры, арты и анимации. Цену и срок называю до начала работы.',choose:'Выбрать услуги',works:'Работы',message:'Написать в ЛС',latest:'Последние работы',allWorks:'Все работы',benefits:'Почему со мной',experience:'Больше 3-х лет опыта',orders:'Более тысячи закрытых заказов',formats:'Работаю в любом формате',time:'Сроки',timeSub:'Называю до начала работы',volume:'Скидка за объём',volumeSub:'до −35% от 10 работ',myTime:'Моё время',steps:'Как проходит заказ',openSource:'Открыть SOURCE',prices:'Услуги и цены',pricesSub:'Цены средние, итог зависит от ТЗ. Согласуем до начала работы.',discountLabel:'Скидка за объём',from:'от',items:'работ',rush:'Вне очереди +50%',rushSub:'Сроки обсуждаем в ЛС.',portfolio:'Работы',portfolioSub:'Нажмите на работу, чтобы открыть её.',all:'Все',avatars:'Аватарки',banners:'Баннеры',arts:'Арты',favorites:'Избранное',search:'Поиск по названию',contact:'Связь',soon:'Скоро здесь',developing:'В РАЗРАБОТКЕ',cart:'Заказ',empty:'Пока пусто',emptySub:'Добавьте услуги — расчёт появится здесь.',subtotal:'Сумма без скидки',discount:'Скидка',surcharge:'Срочность',total:'Итого',custom:'+ позиции по договорённости в ЛС',comment:'Комментарий или ссылка на канал',commentPlaceholder:'Например: нужен баннер для канала…',order:'Оформить заказ в ЛС',added:'Добавлено в избранное',removed:'Удалено из избранного',similar:'Заказать похожее',addFavorite:'В избранное',close:'Закрыть',perItem:'за позицию',onBrief:'по ТЗ',serviceAdd:'В заказ',copied:'Юзернейм скопирован',opened:'Ссылка открыта',work:'РАБОТА',selection:'ИЗБРАННОЕ',process:'Бриф',draft:'Черновик',revisions:'Правки',final:'Финал',slots:'Свободно мест',slotsValue:'2 из 5',featured:'Избранная работа',studioTag:'[ SOURCE ]',allCount:'Все',list:'Список',grid:'Сетка',large:'Крупно',shuffle:'Перемешать',soonPlatforms:['TikTok','Instagram','YouTube'],noResults:'Ничего не найдено',quote:'Цена в ЛС'},
    en:{nav:['Home','Services','Work','Contact'],open:'Available for projects',designer:'DESIGNER',hero:'Design for channels, studios & projects',heroSub:'Avatars, banners, art and motion. Price and timeline are agreed before we start.',choose:'Explore services',works:'Selected work',message:'Message me',latest:'Latest work',allWorks:'View all work',benefits:'Why work with me',experience:'3+ years of experience',orders:'1,000+ completed orders',formats:'Flexible formats, one partner',time:'Timeline',timeSub:'Confirmed before we start',volume:'Volume discount',volumeSub:'up to −35% from 10 items',myTime:'My time',steps:'How it works',openSource:'Explore SOURCE',prices:'Services & pricing',pricesSub:'Prices are indicative and depend on the brief. We agree before work begins.',discountLabel:'Volume discount',from:'from',items:'items',rush:'Rush order +50%',rushSub:'Timeline agreed in DMs.',portfolio:'Selected work',portfolioSub:'Select a project to view details.',all:'All',avatars:'Avatars',banners:'Banners',arts:'Art',favorites:'Favorites',search:'Search by title',contact:'Contact',soon:'Coming soon',developing:'IN DEVELOPMENT',cart:'Order',empty:'Your order is empty',emptySub:'Add a service to see your estimate.',subtotal:'Subtotal',discount:'Discount',surcharge:'Rush fee',total:'Total',custom:'+ custom items to be quoted in DMs',comment:'Note or channel link',commentPlaceholder:'For example: a banner for my channel…',order:'Place order in DMs',added:'Added to favorites',removed:'Removed from favorites',similar:'Order something similar',addFavorite:'Save to favorites',close:'Close',perItem:'per item',onBrief:'brief dependent',serviceAdd:'Add to order',copied:'Username copied',opened:'Link opened',work:'PROJECT',selection:'FEATURED',process:'Brief',draft:'Draft',revisions:'Revisions',final:'Final',slots:'Slots available',slotsValue:'2 of 5',featured:'Featured work',studioTag:'[ SOURCE ]',allCount:'All',list:'List',grid:'Grid',large:'Large',shuffle:'Shuffle',soonPlatforms:['TikTok','Instagram','YouTube'],noResults:'No results found',quote:'Quote in DMs'}
  } as Record<Language,Record<string,any>>
};
