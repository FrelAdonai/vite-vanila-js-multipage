import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import path from 'path'

// plg
import handlebars from 'vite-plugin-handlebars'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
    root: path.resolve(__dirname, 'src'),
    base: './',

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
        emptyOutDir: path.resolve(__dirname, 'dist'),
        outDir: path.resolve(__dirname, 'dist'),
        sourcemap: false,
        minify: true,

        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',

                assetFileNames: (assetInfo) => {
                    let info = assetInfo.name.split('.')
                    let extType = info[info.length - 1]

                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images'
                    } else if (/ttf|woff2/.test(extType)) {
                        extType = 'fonts'
                    }
                    return `${extType}/[name][extname]`
                },
            },

            input: {
                index: path.resolve(__dirname, 'src/index.html'),
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
