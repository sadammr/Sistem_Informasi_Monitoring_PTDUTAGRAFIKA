import { Typography } from 'antd'
import { Authenticated } from '@refinedev/core'
import { Route, Outlet, Routes as BaseRoutes } from 'react-router'
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router'
import {
  AuthPage,
  ThemedSiderV2,
  ThemedLayoutV2,
  ErrorComponent,
} from '@refinedev/antd'

const Routes = () => {
  return (
    <BaseRoutes>
      <Route
        element={
          <Authenticated
            key='authenticated-inner'
            fallback={<CatchAllNavigate to='/login' />}
          >
            <ThemedLayoutV2
              //   Header={Header}
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource='blog_posts' />} />
        {/* <Route path='/blog-posts'>
          <Route index element={<BlogPostList />} />
          <Route path='create' element={<BlogPostCreate />} />
          <Route path='edit/:id' element={<BlogPostEdit />} />
          <Route path='show/:id' element={<BlogPostShow />} />
        </Route>
        <Route path='/categories'>
          <Route index element={<CategoryList />} />
          <Route path='create' element={<CategoryCreate />} />
          <Route path='edit/:id' element={<CategoryEdit />} />
          <Route path='show/:id' element={<CategoryShow />} />
        </Route> */}
        <Route path='*' element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated key='authenticated-outer' fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route
          path='/login'
          element={
            <AuthPage
              type='login'
              rememberMe={false}
              registerLink={false}
              forgotPasswordLink={false}
              title={
                <Typography.Text style={{ fontSize: '24px' }}>
                  <b>Dashboard PT Duta Grafika</b>
                </Typography.Text>
              }
            />
          }
        />
        <Route path='/register' element={<AuthPage type='register' />} />
        <Route
          path='/forgot-password'
          element={<AuthPage type='forgotPassword' />}
        />
      </Route>
    </BaseRoutes>
  )
}

export default Routes
