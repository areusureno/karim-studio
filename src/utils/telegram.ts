/** Безопасные helpers: приложение работает и в обычном браузере, и в Telegram. */
type TelegramWebApp = { ready?:()=>void; expand?:()=>void; disableVerticalSwipes?:()=>void; setHeaderColor?:(color:string)=>void; HapticFeedback?:{impactOccurred?:(style:'light'|'medium'|'heavy')=>void}; openTelegramLink?:(url:string)=>void };
declare global { interface Window { Telegram?: { WebApp?: TelegramWebApp } } }
const webApp = () => typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;
export function initializeTelegram() { const app = webApp(); try { app?.ready?.(); app?.expand?.(); app?.disableVerticalSwipes?.(); app?.setHeaderColor?.('#070911'); } catch { /* Telegram APIs are optional */ } }
export function haptic() { try { webApp()?.HapticFeedback?.impactOccurred?.('light'); } catch { /* no-op outside Telegram */ } }
export function openTelegramLink(url:string) { try { const app=webApp(); if (app?.openTelegramLink) app.openTelegramLink(url); else window.open(url,'_blank','noopener,noreferrer'); } catch { if (typeof window !== 'undefined') window.open(url,'_blank','noopener,noreferrer'); } }
