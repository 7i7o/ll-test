import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({
            include: ['buffer'],
            globals: {
                Buffer: true,
            },
        }),
    ],
});

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PHI2_PROCESS_ID: string;
    readonly VITE_PHI3_PROCESS_ID: string;
    readonly VITE_GPT2XL_PROCESS_ID: string;
    readonly VITE_CU_URL_LOCALHOST: string;
    readonly VITE_CU_URL_LLAMA: string;
    readonly VITE_CU_URL_DEFAULT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
