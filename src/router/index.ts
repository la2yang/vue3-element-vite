// 通过router插件实现模板路由配置
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { constantRoute } from './routes'
// 创建路由器
const router = createRouter({
  // hash模式
  history: createWebHistory(),
  routes: constantRoute,
  //滚动行为(回指顶端)
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
