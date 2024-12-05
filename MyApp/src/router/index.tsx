import Home from '../pages/home/home'
import Login from '../pages/login/login'
import NotFound from '../pages/404/404'
import UserList from '../pages/userlist/userList'
import Layout from '../pages/layout/layout'

export default [
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/',
        element:(
         <Layout>
            <Home />
         </Layout>   
        )
    },
    {
        path:'/userManage/manage-page',
        element:(
            <Layout>
              <UserList />
            </Layout>
          )
    },
    {
        path:'*',
        element:<NotFound/>
    }
]
// router