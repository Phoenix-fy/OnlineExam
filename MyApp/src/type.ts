// 公共
export interface BaseResponse<T=null> {
  code:number,
  data:T,
  msg:string,
}

export interface LoginParams {
    username: string
    padssword: string
    code: string,
}

export type CaptchaRes = BaseResponse<{ code:string }>

export type LoginRes = BaseResponse<{ code:string,token:string }>

// 用户信息
export type Permission = {
  name: string
  path: string
}
export type UserInfo = {
  age: number
  avator: string
  email: string
  sex: string
  username: string
  _id: string
  permission: Permission[]
  role: string[]
}

// 左侧菜单
export type MenuItem = {
  createTime: number
  disabled: boolean
  isBtn: boolean
  name: string
  path: string
  pid: string
  _id: string
  children?: MenuItem[]
}