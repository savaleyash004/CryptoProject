# Crypto Dashboard

A premium, real-time crypto analytics dashboard built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. This dashboard provides live market stats, trending tokens, TVL, and the Fear & Greed Index using real-world APIs (CoinGecko, DefiLlama, Alternative.me).

## Features

- **Live Global Market Stats** (market cap, BTC price, trading volume)
- **Trending Tokens** (real-time from CoinGecko)
- **Recently Added Projects** (real-time from CoinGecko)
- **Total Value Locked (TVL)** (real-time from DefiLlama)
- **Fear & Greed Index** (real-time from Alternative.me)
- **Modern, Responsive UI** (Tailwind CSS, shadcn/ui, animated cards, gradients)
- **Theme Switching, Authentication, Notifications** (scaffolded)
- **Error Handling & Loading Skeletons**

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# or
bun install
```

### Running the Development Server

```sh
npm run dev
# or
bun run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Project Structure

- `src/components/` – UI components (StatsCard, GaugeChart, FearGreedIndex, etc.)
- `src/pages/` – Main dashboard and subpages
- `src/lib/` – API utilities and helpers
- `src/context/` – Context providers (theme, auth, notifications)
- `src/hooks/` – Custom React hooks

## Deployment

You can deploy this project to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

### Example (Netlify)
1. Push your code to GitHub.
2. Connect your repository to Netlify.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Deploy!

## Customization
- Update theme, branding, or add new API integrations as needed.
- Extend the dashboard with new analytics, charts, or DeFi/social features.

## License

MIT
