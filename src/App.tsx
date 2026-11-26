import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import {
  config,
  type Language,
  type PortfolioCase,
  type Service,
} from './data/content';
import CaseLightbox from './components/CaseLightbox';
import CaseMedia from './components/CaseMedia';
import CaseRow from './components/CaseRow';
import LiveClock from './components/LiveClock';
import ServiceIcon from './components/ServiceIcon';
import SurfaceCard, { applySpotlight, springTransition } from './components/SurfaceCard';
import logo from './assets/k-logo.png';
import {
  haptic,
  initializeTelegram,
  openTelegramLink,
  syncTelegramBackButton,
} from './utils/telegram';

type Tab = 'home' | 'services' | 'portfolio' | 'contact';
type LightboxState = { itemCase: PortfolioCase; index: number } | null;

const TABS: Tab[] = ['home', 'services', 'portfolio', 'contact'];
const NAV_ICONS = ['⌂', '✳', '▧', '↗'];

function parseTabFromHash(): Tab {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#/, '') as Tab;
  return TABS.includes(raw) ? raw : 'home';
}

function loadSavedLang(): Language {
  try {
    const saved = localStorage.getItem('karim-lang');
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* ignore storage errors */
  }
  return 'ru';
}

function formatWorkCount(n: number, lang: Language): string {
  if (lang === 'en') return n === 1 ? '1 item' : `${n} items`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} работа`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} работы`;
  return `${n} работ`;
}

type HeaderProps = {
  lang: Language;
  tab: Tab;
  navLabels: string[];
  onGo: (tab: Tab) => void;
  onLangChange: (lang: Language) => void;
};

function TopHeader({ lang, tab, navLabels, onGo, onLangChange }: HeaderProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="brand"
        onClick={() => onGo('home')}
        aria-label="Karim Studio home"
      >
        <span className="brand-symbol">
          <img src={logo} alt="" />
        </span>
        <span className="brand-word">
          KARIM<span>STUDIO</span>
        </span>
      </button>

      <nav
        className="desktop-nav"
        aria-label={lang === 'ru' ? 'Основная навигация' : 'Main navigation'}
      >
        {TABS.map((name, i) => (
          <button
            type="button"
            key={name}
            className={`nav-item ${tab === name ? 'active' : ''}`}
            onClick={() => onGo(name)}
          >
            <span className="nav-glyph">{NAV_ICONS[i]}</span>
            <span>{navLabels[i]}</span>
          </button>
        ))}
      </nav>

      <div className="top-controls">
        <div className="segmented lang-switch">
          <button
            type="button"
            className={lang === 'ru' ? 'selected' : ''}
            onClick={() => onLangChange('ru')}
          >
            RU
          </button>
          <i>/</i>
          <button
            type="button"
            className={lang === 'en' ? 'selected' : ''}
            onClick={() => onLangChange('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

type MobileDockProps = {
  lang: Language;
  tab: Tab;
  navLabels: string[];
  onGo: (tab: Tab) => void;
};

function MobileDock({ lang, tab, navLabels, onGo }: MobileDockProps) {
  return (
    <nav
      className="dock"
      aria-label={lang === 'ru' ? 'Мобильная навигация' : 'Mobile navigation'}
    >
      {TABS.map((name, i) => (
        <button
          type="button"
          key={name}
          className={`nav-item ${tab === name ? 'active' : ''}`}
          onClick={() => onGo(name)}
        >
          <span className="nav-glyph">{NAV_ICONS[i]}</span>
          <span>{navLabels[i]}</span>
        </button>
      ))}
    </nav>
  );
}

function PageHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

function FooterLinks({
  onConsult,
  onOpenLink,
  lang,
}: {
  onConsult: () => void;
  onOpenLink: (url: string, copyText?: string) => void;
  lang: Language;
}) {
  return (
    <div className="footer-links">
      <button type="button" onClick={onConsult}>
        {config.manager.handle}
        <ArrowUpRight size={13} />
      </button>
      <button
        type="button"
        onClick={() => onOpenLink(config.links.channel, config.links.channelHandle)}
      >
        {lang === 'ru' ? 'КАНАЛ' : 'CHANNEL'}
        <ArrowUpRight size={13} />
      </button>
      <button type="button" onClick={() => onOpenLink(config.links.community)}>
        KARIM COMMUNITY
        <ArrowUpRight size={13} />
      </button>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState<Language>(loadSavedLang);
  const [tab, setTab] = useState<Tab>(parseTabFromHash);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [toast, setToast] = useState('');

  const t = config.interface[lang];
  const micro =
    lang === 'ru'
      ? {
          practice: 'ДИЗАЙН-ПРАКТИКА',
          latest: 'ПОРТФОЛИО KARIM STUDIO',
          services: 'УСЛУГИ / 05',
          projects: 'ИЗБРАННЫЕ КЕЙСЫ / KARIM STUDIO',
          contact: 'ПРЯМАЯ СВЯЗЬ / 03',
        }
      : {
          practice: 'INDEPENDENT DESIGN PRACTICE',
          latest: 'KARIM STUDIO PORTFOLIO',
          services: 'SERVICES / 05',
          projects: 'SELECTED CASES / KARIM STUDIO',
          contact: 'DIRECT CHANNELS / 03',
        };

  const services = config.services;
  const cases = config.cases;
  const featuredCase = cases.find((c) => c.featured) ?? cases[0];
  const featuredHeroMedia = featuredCase.items[0];

  useEffect(() => {
    initializeTelegram();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('karim-lang', lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.title =
      lang === 'ru'
        ? 'Karim Studio — фирменный стиль и дизайн проектов'
        : 'Karim Studio — brand identity & design for projects';
  }, [lang]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Keep browser hash in sync with active tab
  useEffect(() => {
    const onHashChange = () => setTab(parseTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Lock page scroll while case lightbox is open
  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const go = useCallback((destination: Tab) => {
    haptic();
    setTab(destination);
    setLightbox(null);
    if (typeof window !== 'undefined') {
      const targetHash = destination === 'home' ? '' : `#${destination}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(
          null,
          '',
          targetHash || window.location.pathname + window.location.search
        );
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Native Telegram Mini App BackButton integration
  useEffect(() => {
    const showBack = lightbox !== null || tab !== 'home';
    return syncTelegramBackButton(showBack, () => {
      haptic();
      if (lightbox) setLightbox(null);
      else go('home');
    });
  }, [lightbox, tab, go]);

  const openDirectTelegram = (url: string, copyText?: string) => {
    haptic();
    if (copyText) {
      try {
        const copied = navigator.clipboard?.writeText(copyText);
        if (copied) {
          copied.then(() => setToast(t.copied)).catch(() => setToast(t.opened));
        } else {
          setToast(t.opened);
        }
      } catch {
        setToast(t.opened);
      }
    } else {
      setToast(t.opened);
    }
    openTelegramLink(url);
  };

  const openTelegramWithPrompt = (baseUrl: string, prompt: string) => {
    haptic('medium');
    try {
      const copied = navigator.clipboard?.writeText(prompt);
      if (copied) {
        copied.then(() => setToast(t.promptCopied)).catch(() => setToast(t.opened));
      } else {
        setToast(t.opened);
      }
    } catch {
      setToast(t.opened);
    }
    openTelegramLink(`${baseUrl}?text=${encodeURIComponent(prompt)}`);
  };

  const openServiceConsult = (service: Service) => {
    openTelegramWithPrompt(config.manager.telegramUrl, service.consultPrompt[lang]);
  };

  const openCaseConsult = (itemCase: PortfolioCase, itemIndex?: number) => {
    const item =
      typeof itemIndex === 'number' ? itemCase.items[itemIndex] : undefined;
    const prompt =
      lang === 'ru'
        ? item
          ? `Здравствуйте! Понравился кейс «${itemCase.title}» (${item.title.ru}). Хочу обсудить похожий проект и получить консультацию.`
          : `Здравствуйте! Понравился кейс «${itemCase.title}». Хочу обсудить похожий проект и получить консультацию.`
        : item
          ? `Hello! I liked the "${itemCase.title}" case (${item.title.en}). I would like to discuss a similar project and get a consultation.`
          : `Hello! I liked the "${itemCase.title}" case. I would like to discuss a similar project and get a consultation.`;
    setLightbox(null);
    openTelegramWithPrompt(config.manager.telegramUrl, prompt);
  };

  const openLightbox = (itemCase: PortfolioCase, index = 0) => {
    haptic();
    setLightbox({ itemCase, index });
  };

  const renderHome = () => (
    <>
      <section className="hero-bento">
        <SurfaceCard className="hero-card">
          <div className="hero-top">
            <span className="designer-pill">
              <span className="designer-avatar">
                <img src={logo} alt="" />
              </span>
              <span>{config.designer.handle}</span>
              <b>{t.designer}</b>
            </span>
          </div>

          <div className="hero-copy">
            <div className="eyebrow">{micro.practice}</div>
            <h1>{t.hero}</h1>
            <p>{t.heroSub}</p>
            <div className="hero-actions">
              <button type="button" className="btn btn-light" onClick={() => go('services')}>
                {t.choose}
                <ArrowRight size={17} />
              </button>
              <button type="button" className="btn btn-glass" onClick={() => go('portfolio')}>
                {t.works}
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={() =>
                  openTelegramWithPrompt(config.manager.telegramUrl, t.generalConsultPrompt)
                }
              >
                {t.message}
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="feature-card">
          <div className="card-label">
            <span>{t.featured}</span>
            <button
              type="button"
              className="icon-button"
              aria-label={t.featured}
              onClick={() => openLightbox(featuredCase, 0)}
            >
              <ArrowUpRight size={17} />
            </button>
          </div>
          <button
            type="button"
            className="feature-art"
            onClick={() => openLightbox(featuredCase, 0)}
          >
            <CaseMedia
              item={featuredHeroMedia}
              alt={`${featuredCase.title} — ${featuredHeroMedia.title[lang]}`}
              priority
            />
            <span className="feature-open" aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
          </button>
          <div className="feature-meta">
            <b>{featuredCase.title}</b>
            <span>{t.featuredMeta}</span>
          </div>
        </SurfaceCard>

        <SurfaceCard className="clock-card">
          <span className="card-label">
            {t.myTime} <span>{config.designer.utcLabel}</span>
          </span>
          <LiveClock lang={lang} timezone={config.designer.timezone} />
        </SurfaceCard>
      </section>

      <section className="section-block latest-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">{micro.latest}</span>
            <h2>{t.latest}</h2>
          </div>
          <div className="section-tools">
            <button type="button" className="text-link" onClick={() => go('portfolio')}>
              {t.seeAll}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="home-cases-grid">
          {cases.map((itemCase) => {
            const coverIdx = itemCase.homeCoverIndex ?? 0;
            const cover = itemCase.items[coverIdx] ?? itemCase.items[0];
            return (
              <motion.button
                type="button"
                key={itemCase.id}
                whileHover={{ y: -4 }}
                transition={springTransition}
                className="home-case-card"
                onClick={() => openLightbox(itemCase, 0)}
              >
                <div className="home-case-visual">
                  <CaseMedia
                    item={cover}
                    alt={`${itemCase.title} — ${cover.title[lang]}`}
                    showBadge={cover.type === 'video'}
                  />
                  <span className="home-case-count">
                    {formatWorkCount(itemCase.items.length, lang)}
                  </span>
                  <span className="art-open" aria-hidden="true">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
                <div className="project-meta">
                  <b>{itemCase.title}</b>
                  <span>
                    {itemCase.number} <i>·</i> {itemCase.year}
                  </span>
                </div>
                <p className="home-case-sub">{itemCase.subtitle[lang]}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="see-all-wrap">
          <button
            type="button"
            className="btn btn-glass see-all-btn"
            onClick={() => go('portfolio')}
          >
            <span>{t.seeAll}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="source-promo">
        <div className="source-orbit">
          <img className="source-logo" src={logo} alt="" />
          <i />
        </div>
        <div className="source-copy">
          <h2>KARIM COMMUNITY</h2>
          <button
            type="button"
            className="text-link"
            onClick={() => openDirectTelegram(config.links.community)}
          >
            {t.joinCommunity}
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <FooterLinks
        onConsult={() =>
          openTelegramWithPrompt(config.manager.telegramUrl, t.generalConsultPrompt)
        }
        onOpenLink={openDirectTelegram}
        lang={lang}
      />
    </>
  );

  const renderServices = () => (
    <>
      <PageHeading eyebrow={micro.services} title={t.prices} subtitle={t.pricesSub} />
      <div className="service-grid">
        {services.map((s, i) => (
          <SurfaceCard className="service-card" key={s.id}>
            <div className="service-card-top">
              <span className="service-icon">
                <ServiceIcon name={s.icon} />
              </span>
              <span className="service-index">0{i + 1}</span>
            </div>
            <h3>{s.title[lang]}</h3>
            <p>{s.description[lang]}</p>
            <div className="service-actions">
              <button
                type="button"
                className="btn btn-glass full consult-btn"
                onClick={() => openServiceConsult(s)}
              >
                <span>{t.consultation}</span>
                <Send size={14} />
              </button>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </>
  );

  const renderPortfolio = () => (
    <>
      <PageHeading eyebrow={micro.projects} title={t.portfolio} subtitle={t.portfolioSub} />
      <div className="cases-stack">
        {cases.map((itemCase) => (
          <CaseRow
            key={itemCase.id}
            itemCase={itemCase}
            lang={lang}
            countLabel={formatWorkCount(itemCase.items.length, lang)}
            discussLabel={t.discussCase}
            onOpenItem={(c, idx) => openLightbox(c, idx)}
            onDiscussCase={(c) => openCaseConsult(c)}
          />
        ))}
      </div>
    </>
  );

  const renderContact = () => (
    <>
      <PageHeading eyebrow={micro.contact} title={t.contact} subtitle={t.contactSub} />
      <div className="contact-list">
        {config.contacts.map((item) => (
          <motion.button
            type="button"
            whileHover={{ x: 5 }}
            transition={springTransition}
            className="contact-card surface spotlight"
            onMouseMove={applySpotlight}
            key={item.key}
            onClick={() => {
              if (item.prompt) {
                openTelegramWithPrompt(item.url, item.prompt[lang]);
              } else {
                openDirectTelegram(item.url, item.copyText);
              }
            }}
          >
            <span className="contact-no">[ {item.number} ]</span>
            <span className="contact-avatar">
              <img src={item.avatar} alt={item.title[lang]} loading="lazy" />
            </span>
            <span className="contact-detail">
              <b>{item.title[lang]}</b>
              <small>{item.description[lang]}</small>
            </span>
            <span className="contact-user">{item.username}</span>
            <ArrowUpRight className="contact-arrow" size={18} />
          </motion.button>
        ))}
      </div>
    </>
  );

  const navTitle = t.nav[TABS.indexOf(tab)];

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <TopHeader
        lang={lang}
        tab={tab}
        navLabels={t.nav}
        onGo={go}
        onLangChange={(nextLang) => {
          haptic();
          setLang(nextLang);
        }}
      />

      <main className="page-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="page-content"
            initial={{ opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {tab === 'home'
              ? renderHome()
              : tab === 'services'
                ? renderServices()
                : tab === 'portfolio'
                  ? renderPortfolio()
                  : renderContact()}
          </motion.div>
        </AnimatePresence>

        <footer className="site-footer">
          <span>© KARIM STUDIO — 2026</span>
          <span>
            {navTitle} / {config.designer.utcLabel}
          </span>
        </footer>
      </main>

      <MobileDock lang={lang} tab={tab} navLabels={t.nav} onGo={go} />

      <AnimatePresence>
        {lightbox && (
          <CaseLightbox
            itemCase={lightbox.itemCase}
            index={lightbox.index}
            lang={lang}
            similarLabel={t.similar}
            closeLabel={t.close}
            onChangeIndex={(nextIndex) =>
              setLightbox((prev) => (prev ? { ...prev, index: nextIndex } : null))
            }
            onClose={() => setLightbox(null)}
            onConsult={(c, idx) => openCaseConsult(c, idx)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <CheckCircle2 size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
