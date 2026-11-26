/**
 * Safe Telegram Mini App helpers.
 * Works seamlessly both inside Telegram WebApp and in a regular browser.
 */
type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

type TelegramBackButton = {
  isVisible?: boolean;
  show?: () => void;
  hide?: () => void;
  onClick?: (cb: () => void) => void;
  offClick?: (cb: () => void) => void;
};

type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  disableVerticalSwipes?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  HapticFeedback?: {
    impactOccurred?: (style: ImpactStyle) => void;
    selectionChanged?: () => void;
  };
  BackButton?: TelegramBackButton;
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string) => void;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const getWebApp = (): TelegramWebApp | undefined =>
  typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

export function initializeTelegram() {
  const app = getWebApp();
  if (!app) return;
  try {
    app.ready?.();
    app.expand?.();
    app.disableVerticalSwipes?.();
    app.setHeaderColor?.('#070911');
    app.setBackgroundColor?.('#070911');
  } catch {
    /* Telegram APIs are optional */
  }
}

export function haptic(style: ImpactStyle = 'light') {
  try {
    getWebApp()?.HapticFeedback?.impactOccurred?.(style);
  } catch {
    /* no-op outside Telegram */
  }
}

export function openTelegramLink(url: string) {
  try {
    const app = getWebApp();
    if (url.startsWith('https://t.me/') && app?.openTelegramLink) {
      app.openTelegramLink(url);
      return;
    }
    if (app?.openLink) {
      app.openLink(url);
      return;
    }
  } catch {
    /* fall back to browser open */
  }
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export function syncTelegramBackButton(visible: boolean, onBack: () => void): () => void {
  const backButton = getWebApp()?.BackButton;
  if (!backButton) return () => {};
  try {
    if (visible) {
      backButton.show?.();
      backButton.onClick?.(onBack);
    } else {
      backButton.hide?.();
    }
  } catch {
    /* no-op outside Telegram */
  }
  return () => {
    try {
      backButton.offClick?.(onBack);
      backButton.hide?.();
    } catch {
      /* no-op */
    }
  };
}
