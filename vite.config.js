import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import path from 'path'

// plg
import handlebars from 'vite-plugin-handlebars'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
    root: path.resolve(__dirname, 'src'),

    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            reloadOnPartialChange: true,
        }),

        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        }),

        splitVendorChunkPlugin(),
    ],

    build: {
        base: './',
        emptyOutDir: path.resolve(__dirname, 'dist'),
        outDir: path.resolve(__dirname, 'dist'),

        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name].js',

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpeg|jpg|png|svg)$/.test(name ?? '')) {
                        return 'assets/images/[name][extname]'
                    }

                    if (/\.(ttf)$/.test(name ?? '')) {
                        return 'assets/fonts/[name][extname]'
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/main[extname]'
                    }

                    return 'assets/[name]-[hash][extname]'
                },
            },

            input: {
                index: path.resolve(__dirname, 'src/index.html'),
                about: path.resolve(__dirname, 'src/about.html'),
            },
        },
    },

    server: {
        port: 3000,
        host: '0.0.0.0',
        open: true,
        hmr: true,
    },
})
