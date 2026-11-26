import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { MediaItem } from '../data/content';

type CaseMediaProps = {
  item: MediaItem;
  alt: string;
  showBadge?: boolean;
  priority?: boolean;
  autoplayVideo?: boolean;
};

/**
 * Renders an optimized image or lightweight video preview.
 * - By default (grid cards), shows the crisp JPEG poster image and only plays video on hover,
 *   avoiding multiple simultaneous MP4 decoders lagging Telegram WebView.
 * - When `autoplayVideo` is true (single Hero featured card), loops muted when visible in viewport.
 */
export function CaseMedia({
  item,
  alt,
  showBadge = true,
  priority = false,
  autoplayVideo = false,
}: CaseMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hoverPlay, setHoverPlay] = useState(false);

  const shouldMountVideo = item.type === 'video' && (autoplayVideo || hoverPlay || !item.poster);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldMountVideo) return;

    if (hoverPlay) {
      el.play().catch(() => {});
      return;
    }

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMountVideo, hoverPlay, item.src]);

  const fitClass = item.fit === 'contain' ? 'media-contain' : 'media-cover';

  return (
    <div
      className="case-media-frame"
      style={item.bg ? { backgroundColor: item.bg } : undefined}
      onMouseEnter={item.type === 'video' && !autoplayVideo ? () => setHoverPlay(true) : undefined}
      onMouseLeave={item.type === 'video' && !autoplayVideo ? () => setHoverPlay(false) : undefined}
    >
      {item.type === 'video' ? (
        <>
          {shouldMountVideo ? (
            <video
              ref={videoRef}
              className={`case-media-el ${fitClass}`}
              src={item.src}
              poster={item.poster}
              autoPlay
              loop
              muted
              playsInline
              preload={priority ? 'metadata' : 'none'}
              aria-label={alt}
            />
          ) : (
            <img
              className={`case-media-el ${fitClass}`}
              src={item.poster}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          )}
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
