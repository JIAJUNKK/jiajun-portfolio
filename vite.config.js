import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    server: {
        host: true,
        port: 5173,
        strictPort: true,
        hmr: {
            host: "192.168.1.241",
            protocol: "ws",
            port: 5173,
        },
    },

    preview: { host: true, port: 4173 },

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;

                    // split the biggest libs so iPhone parses less JS upfront
                    if (id.includes("framer-motion")) return "framer";
                    if (id.includes("react-router")) return "router";
                    if (id.includes("react")) return "react-vendor";

                    return "vendor";
                },
            },
        },
    },
});
