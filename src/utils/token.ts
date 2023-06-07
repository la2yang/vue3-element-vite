// 封装本地存储数据与读取数据方法
// 存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const SET_NAME = (name: string) => {
  localStorage.setItem('NAME', name)
}

//获取本地存储数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export const GET_NAME = () => {
  return localStorage.getItem('NAME')
}
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}

export const REMOVE_NAME = () => {
  localStorage.removeItem('NAME')
}
