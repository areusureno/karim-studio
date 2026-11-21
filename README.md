# Karim Studio — website + Telegram Mini App

Responsive Russian/English design-studio storefront built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons. It runs as a regular web app and safely detects Telegram WebApp APIs when embedded as a Mini App.

## Start locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

To add the requested UI libraries to an existing React project, use:

```bash
npm install framer-motion lucide-react
```

## Telegram Mini App

Deploy the Vite app to an HTTPS host, then set its URL as the Mini App URL for your Telegram bot. The app calls `ready()`, `expand()`, `disableVerticalSwipes()` and `setHeaderColor('#070911')` only when the Telegram WebApp API is present; browser mode remains supported. Contacts: designer `@karim_the_drea4`, channel `t.me/karimdsg`, SOURCE `t.me/karim_the_drea4` (all in `src/data/content.ts`).

## Project structure

```text
src/
  components/ArtPlaceholder.tsx  # procedural, external-image-free portfolio art
  data/content.ts                # all bilingual text, pricing, rates, contacts, portfolio
  assets/                        # K logo (transparent PNG) and background
  utils/telegram.ts              # safe Telegram WebApp helpers
  App.tsx                        # tabs, cart, filters, modals and app state
  main.tsx                       # React entry point
  styles.css                     # dark responsive UI, floating dock and motion details
index.html
vite.config.ts
tailwind.config.js
postcss.config.js
tsconfig.json
```

## Owner configuration

Edit `src/data/content.ts` to change the designer handle and Telegram URLs, rates/rounding, service prices, bilingual content, portfolio entries, discount tiers and contact cards. Numeric service prices are stored in USD; currency conversion is applied by the UI.
