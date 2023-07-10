import { createApp }  from 'vue'
import App            from './App.vue'
import router         from './router'
import store          from './store/index'
import ElementPlus    from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './styles/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
