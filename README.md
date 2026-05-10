# V Placement Suite

A unified full-stack placement preparation platform that integrates three specialized modules into a single, cohesive React + Vite application.

## 🚀 Modules

| Module | Route | Description |
|---|---|---|
| **Job Portal** | `/` | Browse and apply to job listings with advanced filtering |
| **Placement Readiness** | `/readiness/*` | Mock tests, aptitude practice, and interview preparation |
| **AI Resume Builder** | `/resume/*` | AI-assisted resume creation with live preview |

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v3
- **State**: Zustand
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx          # Root app component
│   ├── Layout.tsx       # Shared navigation layout
│   └── routes.tsx       # Top-level route definitions
├── modules/
│   ├── job-portal/      # Job Portal module (TypeScript)
│   ├── readiness/       # Placement Readiness module (JavaScript)
│   └── resume-builder/  # AI Resume Builder module (TypeScript)
└── shared/              # Shared components, hooks, and utilities
```

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔗 Source Repositories

- [V-s-Job-Portal](https://github.com/VISHALL089/V-s-Job-Portal)
- [Placement-Readiness-Platform](https://github.com/VISHALL089/Placement-Readiness-Platform)
- [AI-Resume-Builder](https://github.com/VISHALL089/AI-Resume-Builder)

## 📄 License

MIT
