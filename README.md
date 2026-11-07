# North Tourism Prototype

React + Vite starter structure for the North Tourism hazard-map prototype.

## Requirements
- Node.js 18 or newer
- npm

## Run in VS Code
1. Extract this ZIP file.
2. Open the `north-tourism-prototype` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Build
```bash
npm run build
```

## Project structure
- `src/App.jsx` — main page layout
- `src/components/` — reusable UI components
- `src/components/HazardMap.jsx` — Leaflet map
- `src/components/Sidebar.jsx` — information sidebar
- `src/components/SOSModal.jsx` — emergency confirmation modal
- `src/index.css` — Tailwind and Leaflet styles

Note: `node_modules` is not included. `npm install` creates it on your computer.
