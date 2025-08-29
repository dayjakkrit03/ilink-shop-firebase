import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // START PROXY CONFIG
    // This tells the Vite dev server to forward any request that starts with /api
    // to the backend server running on port 3001.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true, // Recommended for virtual hosted sites
      },
    },
    // END PROXY CONFIG
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
