import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [ '~/assets/css/main.css' ],
    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    buildModules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
    ],
    app: {
        head: {
            link: [
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" }
            ]
        }
    },
})
