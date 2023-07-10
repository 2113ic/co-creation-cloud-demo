import { defineConfig }   from 'vite'
import vue                from '@vitejs/plugin-vue'
import Icons              from 'unplugin-icons/vite'
import IconsResolver      from 'unplugin-icons/resolver'
import AutoImport         from 'unplugin-auto-import/vite'
import Components         from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve }        from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),

        // Auto register icon components
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@resource': resolve(__dirname, './src/views/resource-search/views/')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
})
