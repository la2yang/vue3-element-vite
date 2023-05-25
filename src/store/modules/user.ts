// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import { loginForm, loginResponseData } from '@/api/user/type'
import { userState } from './types/types'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由(常量)
import { constantRoute } from '@/router/routes'

// 创建用户小仓库
let useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): userState => {
    return {
      token: GET_TOKEN(), // 用户的唯一标识
      menuRoute: constantRoute,
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑方法
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // 登录请求:成功200->token
      // 登录请求:失败201->登陆失败
      if (result.code === 200) {
        // pinia仓库存储token
        // pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string
        // 本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        // 保证当前async函数返回一个成功的promise
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息的方法
    async getUserInfo() {
      let result = await reqUserInfo()

      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'OK'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    async userLogout() {
      // 目前没有mock接口: 退出登录接口(通知服务器本地用户唯一标识失效)
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

// 暴露获取小仓库的方法
export default useUserStore
