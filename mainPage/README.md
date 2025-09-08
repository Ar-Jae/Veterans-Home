# mainPage (Standalone Frontend)

This is a standalone React frontend scaffolded with Vite.

Quick start

1. Install dependencies:

   npm install

2. Start dev server (default http://localhost:5173):

   npm run dev

3. Build for production:

   npm run build

4. Preview the production build locally:

   npm run preview

Notes
- The dev server runs on port 5173 by default. Use `--host` in the `dev` command or set a Vite config to expose the server to the network.
- This project is intentionally standalone. To integrate with your existing server API, point fetch/XHR requests to your server's base URL.

Files of interest
- `index.html` — HTML entry point
- `src/main.jsx` — React entry
- `src/App.jsx` — Example app component

If you want, I can add routing, Tailwind, or copy over components from the `client` folder.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
