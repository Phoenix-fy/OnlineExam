  import {
    LockOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProConfigProvider,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Tabs, message, theme,Form, Input } from 'antd'
  import { useState, useEffect, type CSSProperties } from 'react'
  import { getLoginApi,captchaApi } from '../../services/index'
  import type { LoginParams } from '../../type'
  import { useNavigate } from 'react-router-dom'
  import { useDispatch } from'react-redux'
  import { getUserInfo } from '../../store/model/user';
  import { AppDispatch } from '../../store';

  type LoginType = 'account'
  const codeStyle: CSSProperties = {
    display: 'flex'
  }
  const codeImgStyle: CSSProperties = {
    width: 100,
    flexShrink: 0,
    background: '#fff',
    marginLeft: 15,
    borderRadius: 10
  }
  
  const Page = () => {
    const dispatch: AppDispatch = useDispatch()
    const [loginType, setLoginType] = useState<LoginType>('account')
    const { token } = theme.useToken()
    const [ codeImg, setCode ] = useState('')
    const navigate = useNavigate()
    const onFinish = async(values:LoginParams) => {
      console.log(values)
      const res = await getLoginApi(values)
      console.log(res)
      if(res.data.code === 200) {
        message.success('登录成功')
        navigate('/')
        localStorage.setItem('token',res.data.data.token)
        dispatch(getUserInfo())
      }else if(res.data.code === 1005) {
        message.error('验证码错误')
        getCaptach()
      }else{
        message.error('登录失败')
      }
    }
    const getCaptach = async() => {
      const res = await captchaApi()
      setCode(res.data.data.code)
    }
    useEffect(()=>{
      getCaptach()
    },[])
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
            </div>
          }
          onFinish={onFinish}
        >
          <Tabs centered>
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
                <Form.Item
                    name="code"  
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码!',
                      },
                    ]}
                  >
                    <div style={codeStyle}>
                      <Input size="large" placeholder='输入验证码'/>
                      <img src={ codeImg } onClick={getCaptach} alt="" style={ codeImgStyle }/>
                    </div>
                </Form.Item>
            </>
          )}
        </LoginFormPage>
      </div>
    );
  };
  
  export default () => {
    return (
      <ProConfigProvider dark>
        <Page />
      </ProConfigProvider>
    );
  };