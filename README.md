# Todo App

A mobile-first React application built with Vite.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Digital Ocean

### Using Digital Ocean App Platform

1. Build the app:
```bash
npm run build
```

2. The `dist` folder contains static files ready to deploy

3. In Digital Ocean App Platform:
   - Select "Static Site"
   - Connect your repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Using Digital Ocean Droplet

1. Build the app locally or via CI/CD
2. Upload the `dist` folder to your droplet
3. Serve using nginx or any static file server

## Mobile-First Design

This app is designed with a mobile-first approach:
- Max width of 480px for mobile-like appearance
- Responsive design
- Touch-friendly interactions
- Dark mode support
