import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import generouted from '@generouted/solid-router/plugin'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
        UnoCSS({
            /* options */
        }),
        solid(), 
        generouted()],
})
