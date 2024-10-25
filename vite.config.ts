/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        setupFiles: './src/throttle.test.ts',
    }
});