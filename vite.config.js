import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,           // bind to 0.0.0.0 so LAN devices can reach it
        port: 5173,
        strictPort: true,
        // improves HMR for phones (optional)
        hmr: {
            host: '192.168.1.241', // e.g. 192.168.1.23
            protocol: 'ws',
            port: 5173
        }
    },
    preview: { host: true, port: 4173 }
})
