import React, { useState } from 'react';
import { useSelector } from'react-redux'
import { 
  Breadcrumb, 
  Layout, 
  Menu, 
  theme,
  Avatar,
  Button,
} from 'antd'
import { RootState } from '../../store'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd';
import type { MenuItem } from '../type'

const { Header, Content, Sider } = Layout;

const layout: React.FC= (props) => {
  // 菜单栏收起状态
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  //接口数据
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const menuList = useSelector((state: RootState) => state.user.menuList)
  console.log(userInfo)
  console.log(menuList)

  // 处理菜单数据
  const format = (list: MenuItem[]): MenuProps['items'] => {
    if (!list || list.length === 0) return[]
    return list.map((item: MenuItem) => {
      const other = item.children? { children: format(item.children)} : {}
      return {
        key: item.path,
        label: item.children? item.name : <Link to={item.path}>{item.name}</Link>,
        ...other
      }
    })
  }
  const baseItem: MenuProps['items']  = [{ label: <Link to="/">首页</Link>, key: '/' }]

  return (
    <Layout style={{ height: '100vh' }}>
      {/* 头 */}
      <Header style={{ display: 'flex', alignItems: 'center' ,justifyContent:'flex-end'}}>
        <div className="demo-logo" />
        <Avatar size={64} icon={<UserOutlined />} src={userInfo?.avator}/>
        <p style={{color: '#fff',fontSize: '18px'}}>{userInfo?.username}</p>
      </Header>
      <Layout>
        {/* 左侧导航 */}
        <Sider width={200} style={{ background: colorBgContainer }}
        trigger={null} collapsible collapsed={collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={(baseItem.concat(format(menuList)))}
          >
          </Menu>
           <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '10px',
              width: 64,
              height: 64,
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* 面包屑 */}
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          {/* 内容 */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default layout
