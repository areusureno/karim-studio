import { useEffect, useState } from 'react';
import type { Language } from '../data/content';

type LiveClockProps = {
  lang: Language;
  timezone: string;
  className?: string;
};

function formatTime(lang: Language, timezone: string): string {
  try {
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '00:00:00';
  }
}

export function LiveClock({ lang, timezone, className = 'clock-time' }: LiveClockProps) {
  const [time, setTime] = useState(() => formatTime(lang, timezone));

  useEffect(() => {
    const tick = () => setTime(formatTime(lang, timezone));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [lang, timezone]);

  return <strong className={className}>{time}</strong>;
}

export default LiveClock;
