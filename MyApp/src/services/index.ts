import request from './request'
import type { LoginParams,CaptchaRes,BaseResponse,LoginRes } from '../type'

// 登录接口
export const getLoginApi = (params: LoginParams) => {
    return request.post<LoginRes>('/login',params)
}
// 验证码接口
export const captchaApi = () => {
    return request.get<CaptchaRes>('login/captcha')
}

// 