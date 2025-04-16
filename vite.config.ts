import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: "./postcss.config.js",
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
    optimizeDeps: {
        include: ["tailwindcss", "autoprefixer"],
    },
});
