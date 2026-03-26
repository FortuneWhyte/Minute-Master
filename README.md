# Minute Master

> **Architectural Editor for Professional Board Governance**

Minute Master is a modern web application that streamlines the process of creating, editing, and managing meeting minutes for condominium board meetings and professional governance sessions. Upload raw Zoom transcripts, let AI extract key data, edit in a rich interface, and export polished PDFs.

---

## Features

- **Upload & Process** — Drag-and-drop Zoom transcripts (.txt/.vtt) and optional AI summaries for instant processing
- **Extracted Data Preview** — Bento-grid dashboard showing metadata, attendance, action items, and key motions
- **Rich Text Editor** — Edit meeting minutes with formatting controls and auto-save
- **Meeting History** — Searchable, filterable table of all processed meetings with status badges
- **Insights Dashboard** — SVG charts (line chart, donut chart), efficiency progress bars, and performance metrics
- **Settings** — Profile management, appearance customization (dark mode), password management
- **PDF Export** — Finalize and export professionally formatted minutes with association branding

---

## Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| **Framework** | React 19 + TypeScript                            |
| **Bundler**   | Vite 8                                           |
| **Styling**   | Tailwind CSS v4 with Material Design 3 tokens    |
| **Routing**   | React Router v7                                  |
| **Icons**     | Google Material Symbols Outlined                 |
| **Fonts**     | Manrope (headings) · Inter (body)                |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation

```bash
git clone https://github.com/FortuneWhyte/minute_master.git
cd minute_master
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   └── navigation/
│       ├── TopNavBar.tsx           # Fixed top navigation bar
│       ├── SideNavBar.tsx          # Desktop left sidebar
│       └── MobileBottomNav.tsx     # Mobile bottom navigation
├── pages/
│   ├── Dashboard/Dashboard.tsx     # Main editor workspace
│   ├── History/History.tsx         # Meeting history table
│   ├── Insights/Insights.tsx       # Analytics & charts
│   └── Settings/Settings.tsx       # Profile & preferences
├── router.tsx                      # Route configuration
├── App.tsx                         # Layout wrapper
├── main.tsx                        # Entry point
└── index.css                       # Tailwind + M3 design tokens
```

---

## Design System

The application uses a custom **Material Design 3** color palette with 40+ semantic tokens:

- **Primary**: `#005db5` — Main actions, active states
- **Secondary**: `#5d5f65` — Supporting elements
- **Tertiary**: `#5d5c78` — Accent information
- **Error**: `#9f403d` — Destructive actions, warnings
- **Surface variants** — Layered container backgrounds

---

## License

MIT © FortuneWhyte
