import { paraglide } from "@inlang/paraglide-sveltekit/vite";
import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';
import daisyui from "daisyui"


export default defineConfig({
    plugins: [sveltekit(), paraglide({
        project: "./project.inlang",
        outdir: "./src/lib/paraglide"
    })],

    server: {
        host: "0.0.0.0",
        port: 5000
    },

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
