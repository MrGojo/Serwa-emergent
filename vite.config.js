import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Vite configuration for SERWA Professional website
export default defineConfig({
    plugins: [react()],
    // Path alias @/ for src/ - see tsconfig.app.json
    server: {
        port: 3000,
    },
});
