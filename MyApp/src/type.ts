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