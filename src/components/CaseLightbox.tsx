import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Send,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { Language, PortfolioCase } from '../data/content';
import { springTransition } from './SurfaceCard';
import { haptic } from '../utils/telegram';

type CaseLightboxProps = {
  itemCase: PortfolioCase;
  index: number;
  lang: Language;
  similarLabel: string;
  closeLabel: string;
  onChangeIndex: (nextIndex: number) => void;
  onClose: () => void;
  onConsult: (itemCase: PortfolioCase, itemIndex: number) => void;
};

export function CaseLightbox({
  itemCase,
  index,
  lang,
  similarLabel,
  closeLabel,
  onChangeIndex,
  onClose,
  onConsult,
}: CaseLightboxProps) {
  const [muted, setMuted] = useState(true);
  const total = itemCase.items.length;
  const active = itemCase.items[index] ?? itemCase.items[0];

  const step = (delta: -1 | 1) => {
    haptic();
    onChangeIndex((index + delta + total) % total);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && total > 1) {
        onChangeIndex((index - 1 + total) % total);
      } else if (e.key === 'ArrowRight' && total > 1) {
        onChangeIndex((index + 1) % total);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, total, onChangeIndex, onClose]);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      onClick={onClose}
    >
      <motion.div
        className="sheet detail-sheet lightbox-sheet"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={springTransition}
        role="dialog"
        aria-modal="true"
        aria-label={`${itemCase.title} — ${active.title[lang]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <button
          type="button"
          className="detail-close icon-button"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <X size={18} />
        </button>

        <div className="lightbox-stage">
          <div
            className="lightbox-media-box"
            style={active.bg ? { backgroundColor: active.bg } : undefined}
          >
            {active.type === 'video' ? (
              <>
                <video
                  key={active.id}
                  className="lightbox-media"
                  src={active.src}
                  poster={active.poster}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  controls
                />
                <button
                  type="button"
                  className="lightbox-sound icon-button"
                  onClick={() => {
                    haptic();
                    setMuted((m) => !m);
                  }}
                  aria-label={
                    muted
                      ? lang === 'ru'
                        ? 'Включить звук'
                        : 'Unmute'
                      : lang === 'ru'
                        ? 'Выключить звук'
                        : 'Mute'
                  }
                >
                  {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </>
            ) : (
              <img
                key={active.id}
                className="lightbox-media"
                src={active.src}
                alt={`${itemCase.title} — ${active.title[lang]}`}
              />
            )}

            {total > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav lightbox-prev icon-button"
                  onClick={() => step(-1)}
                  aria-label={lang === 'ru' ? 'Предыдущая работа' : 'Previous item'}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="lightbox-nav lightbox-next icon-button"
                  onClick={() => step(1)}
                  aria-label={lang === 'ru' ? 'Следующая работа' : 'Next item'}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="lightbox-thumbs" role="tablist">
              {itemCase.items.map((media, idx) => (
                <button
                  type="button"
                  key={media.id}
                  role="tab"
                  aria-selected={idx === index}
                  className={`lightbox-thumb ${idx === index ? 'active' : ''}`}
                  onClick={() => {
                    haptic();
                    onChangeIndex(idx);
                  }}
                >
                  {media.type === 'video' ? (
                    <span className="thumb-video">
                      {media.poster ? (
                        <img src={media.poster} alt={media.title[lang]} loading="lazy" />
                      ) : (
                        <video src={media.src} muted playsInline preload="none" />
                      )}
                      <i aria-hidden="true">
                        <Play size={10} fill="currentColor" />
                      </i>
                    </span>
                  ) : (
                    <img src={media.src} alt={media.title[lang]} loading="lazy" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <span className="eyebrow">
            {itemCase.title} · {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
          <h2>{active.title[lang]}</h2>
          <p className="lightbox-sub">{itemCase.subtitle[lang]}</p>
          <div className="detail-tags">
            <span>{active.tag[lang]}</span>
            <span>{active.type === 'video' ? 'MP4 / VFX' : 'GFX'}</span>
            <span>{itemCase.year}</span>
          </div>
          <div className="detail-actions">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => onConsult(itemCase, index)}
            >
              {similarLabel}
              <Send size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CaseLightbox;
