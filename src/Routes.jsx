import { Typography } from 'antd'
import { Authenticated } from '@refinedev/core'
import { Route, Outlet, Routes as BaseRoutes } from 'react-router'
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router'
import {
  AuthPage,
  ThemedSiderV2,
  ThemedTitleV2,
  ThemedHeaderV2,
  ThemedLayoutV2,
  ErrorComponent,
} from '@refinedev/antd'

import {
  SupplierEdit,
  SupplierList,
  SupplierShow,
  SupplierCreate,
} from './pages/Supplier'

import {
  BahanBakuList,
  BahanBakuEdit,
  BahanBakuShow,
  BahanBakuCreate,
} from './pages/Bahan-Baku'

import {
  BahanMasukShow,
  BahanMasukEdit,
  BahanMasukList,
  BahanMasukCreate,
} from './pages/Bahan-Masuk'

import {
  BahanKeluarShow,
  BahanKeluarEdit,
  BahanKeluarList,
  BahanKeluarCreate,
} from './pages/Bahan-Keluar'

import {
  PenggunaEdit,
  PenggunaList,
  PenggunaShow,
  PenggunaCreate,
} from './pages/Pengguna'

import { StokEdit, StokList, StokShow, StokCreate } from './pages/Stok'

const Routes = () => {
  return (
    <BaseRoutes>
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
      </Route>

      <Route
        element={
          <Authenticated
            key='authenticated-inner'
            fallback={<CatchAllNavigate to='/login' />}
          >
            <ThemedLayoutV2
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
              Header={(props) => <ThemedHeaderV2 {...props} sticky />}
              Title={(props) => (
                <ThemedTitleV2 {...props} text='PT Duta Grafika' />
              )}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource='supplier' />} />

        {/* Supplier */}
        <Route path='/supplier'>
          <Route index element={<SupplierList />} />
          <Route path='create' element={<SupplierCreate />} />
          <Route path='edit/:id_supplier' element={<SupplierEdit />} />
          <Route path='show/:id_supplier' element={<SupplierShow />} />
        </Route>

        {/* Bahan Baku */}
        <Route path='/bahan-baku'>
          <Route index element={<BahanBakuList />} />
          <Route path='create' element={<BahanBakuCreate />} />
          <Route path='edit/:id_bahan' element={<BahanBakuEdit />} />
          <Route path='show/:id_bahan' element={<BahanBakuShow />} />
        </Route>

        {/* Stok */}
        <Route path='/stok'>
          <Route index element={<StokList />} />
          <Route path='create' element={<StokCreate />} />
          <Route path='edit/:id_stok' element={<StokEdit />} />
          <Route path='show/:id_stok' element={<StokShow />} />
        </Route>

        {/* Bahan Masuk */}
        <Route path='/bahan-masuk'>
          <Route index element={<BahanMasukList />} />
          <Route path='create' element={<BahanMasukCreate />} />
          <Route path='edit/:id_bm' element={<BahanMasukEdit />} />
          <Route path='show/:id_bm' element={<BahanMasukShow />} />
        </Route>

        {/* Bahan Keluar */}
        <Route path='/bahan-keluar'>
          <Route index element={<BahanKeluarList />} />
          <Route path='create' element={<BahanKeluarCreate />} />
          <Route path='edit/:id_bk' element={<BahanKeluarEdit />} />
          <Route path='show/:id_bk' element={<BahanKeluarShow />} />
        </Route>

        {/* Pengguna */}
        <Route path='/pengguna'>
          <Route index element={<PenggunaList />} />
          <Route path='create' element={<PenggunaCreate />} />
          <Route path='edit/:user_id' element={<PenggunaEdit />} />
          <Route path='show/:user_id' element={<PenggunaShow />} />
        </Route>

        <Route path='*' element={<ErrorComponent />} />
      </Route>
    </BaseRoutes>
  )
}

export default Routes
