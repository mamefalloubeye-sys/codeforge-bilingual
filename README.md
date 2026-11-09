# CodeTrainer Pro Ultimate

**CodeTrainer Pro Ultimate** is a bilingual (French/English) interactive programming learning platform built with React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui and Monaco Editor.

It provides interactive programming exercises, code editor integration, learning progress tracking, tutorials and challenges — entirely in the browser.

## 🎯 About the project

CodeTrainer Pro Ultimate helps learners master programming and object-oriented programming through interactive exercises, tutorials and challenges.

The application is currently **frontend-only** (no backend): user progress is persisted in `localStorage`.

## ✨ Features

- 🧠 Interactive exercises across multiple languages: Python, C, Rust, LaTeX, Scilab, Robotics & AI
- 💻 In-browser Monaco editor with console output and feedback
- 🌐 Fully bilingual (French / English) user interface
- 📈 Progress tracking: XP, streaks, badges, history (persisted in `localStorage`)
- 🧭 Tutorials and daily challenges

## 🛠️ Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Monaco Editor (@monaco-editor/react)
- Framer Motion
- React Router
- Sonner (toasts)

## 📋 Prerequisites

- Node.js 18 or later
- npm 9 or later

## 🚀 Getting started

```bash
# Clone the repository
git clone <repository-url>
cd codeforge-bilingual

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run tests
npm test

# Lint
npm run lint
```

## 📁 Project structure

```
src/
├── components/
│   ├── editor/       # Code editor component
│   ├── layout/       # App layout (sidebar, header, main)
│   └── ui/           # shadcn/ui components
├── contexts/         # React contexts (language)
├── data/             # Exercises & data
├── hooks/            # Custom hooks (progress, toast)
├── lib/              # Utilities
├── pages/            # Route pages
├── types/            # TypeScript types & language data
└── ...
```

## 📸 Screenshots

- Dashboard: `docs/screenshots/dashboard.png`
- Exercises: `docs/screenshots/exercises.png`
- Code editor: `docs/screenshots/editor.png`
- Progress: `docs/screenshots/progress.png`

## ✅ Verification

- `npx tsc -b` — TypeScript check: **OK**
- `npm test` — Vitest: **OK**
- `npm run build` — Vite production build: **OK**

## 📌 Release v1.0

See the release checklist associated with v1.0.
