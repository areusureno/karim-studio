import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import type { MediaItem } from '../data/content';

type CaseMediaProps = {
  item: MediaItem;
  alt: string;
  showBadge?: boolean;
  priority?: boolean;
};

/**
 * Renders a case image or visibility-aware muted looping MP4 preview.
 * Pauses videos automatically when scrolled out of viewport to save battery in TMA.
 */
export function CaseMedia({
  item,
  alt,
  showBadge = true,
  priority = false,
}: CaseMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || item.type !== 'video') return;

    if (typeof IntersectionObserver === 'undefined') {
      el.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type, item.src]);

  const fitClass = item.fit === 'contain' ? 'media-contain' : 'media-cover';

  return (
    <div
      className="case-media-frame"
      style={item.bg ? { backgroundColor: item.bg } : undefined}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            className={`case-media-el ${fitClass}`}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload={priority ? 'auto' : 'metadata'}
            aria-label={alt}
          />
          {showBadge && (
            <span className="media-vfx-badge" aria-hidden="true">
              <Play size={9} fill="currentColor" />
              VFX
            </span>
          )}
        </>
      ) : (
        <img
          className={`case-media-el ${fitClass}`}
          src={item.src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
}

export default CaseMedia;
