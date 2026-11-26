import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language, PortfolioCase } from '../data/content';
import CaseMedia from './CaseMedia';
import { springTransition } from './SurfaceCard';
import { haptic } from '../utils/telegram';

type CaseRowProps = {
  itemCase: PortfolioCase;
  lang: Language;
  countLabel: string;
  discussLabel: string;
  onOpenItem: (itemCase: PortfolioCase, itemIndex: number) => void;
  onDiscussCase: (itemCase: PortfolioCase) => void;
};

export function CaseRow({
  itemCase,
  lang,
  countLabel,
  discussLabel,
  onOpenItem,
  onDiscussCase,
}: CaseRowProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const isScrollableDesktop = itemCase.items.length > 4;
  const gridVariant =
    itemCase.items.length === 3
      ? 'case-strip-3'
      : itemCase.items.length === 4
        ? 'case-strip-4'
        : 'case-strip-scroll';

  const updateScrollButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollTrack = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    haptic();
    const step = Math.max(el.clientWidth * 0.72, 260);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className="case-row" id={`case-${itemCase.id}`}>
      <div className="case-row-head">
        <div className="case-row-title">
          <div className="case-row-meta">
            <span className="case-no">[ {itemCase.number} ]</span>
            <span className="case-count">{countLabel}</span>
            <span className="case-year">{itemCase.year}</span>
          </div>
          <h2>{itemCase.title}</h2>
          <p>{itemCase.subtitle[lang]}</p>
        </div>

        <div className="case-row-tools">
          {isScrollableDesktop && (
            <div className="case-scroll-controls">
              <button
                type="button"
                className="icon-button"
                disabled={!canPrev}
                onClick={() => scrollTrack(-1)}
                aria-label={lang === 'ru' ? 'Листать назад' : 'Scroll previous'}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                className="icon-button"
                disabled={!canNext}
                onClick={() => scrollTrack(1)}
                aria-label={lang === 'ru' ? 'Листать вперёд' : 'Scroll next'}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          )}

          <button
            type="button"
            className="text-link case-discuss-link"
            onClick={() => onDiscussCase(itemCase)}
          >
            {discussLabel}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <div ref={trackRef} className={`case-strip ${gridVariant}`}>
        {itemCase.items.map((media, idx) => (
          <motion.button
            type="button"
            key={media.id}
            whileHover={{ y: -4 }}
            transition={springTransition}
            className="case-card"
            onClick={() => onOpenItem(itemCase, idx)}
          >
            <div className="case-card-visual">
              <CaseMedia
                item={media}
                alt={`${itemCase.title} — ${media.title[lang]}`}
                priority={itemCase.featured && idx < 2}
              />
              <span className="art-open" aria-hidden="true">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="case-card-caption">
              <b>{media.title[lang]}</b>
              <span>{media.tag[lang]}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default CaseRow;
