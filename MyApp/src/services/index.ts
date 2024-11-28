import request from './request'
import type { LoginParams,CaptchaRes,BaseResponse,LoginRes,UserInfo, MenuItem} from '../type'

// 登录接口
export const getLoginApi = (params: LoginParams) => {
    return request.post<LoginRes>('/login',params)
}
// 验证码接口
export const captchaApi = () => {
    return request.get<CaptchaRes>('login/captcha')
}

// 个人信息
export const userInfoApi = () => {
    return request.get<BaseResponse<UserInfo>>('/user/info')
  }
// 菜单每一项
export const menuListApi = () => {
return request.get<BaseResponse<{ list: MenuItem[] }>>('/user/menulist')
}