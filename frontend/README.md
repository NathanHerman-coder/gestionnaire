# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

## How to run (frontend)

1. Copy environment template and set API base URL (optional):

	cp .env.example .env

	In `.env` set e.g.

	VITE_API_BASE=http://127.0.0.1:8000/api/

2. Install dependencies and run dev server:

```bash
npm install
npm run dev
```

3. Build for production:

```bash
npm run build
```

Notes:
- The frontend centralizes API calls in `src/api/api.js`. It attaches the access token automatically and will try to refresh it with the refresh token on 401 responses.
- Authentication tokens are stored in localStorage (`access`, `refresh`).
- If you prefer another API base URL, set `VITE_API_BASE` in the `.env` file before starting.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
