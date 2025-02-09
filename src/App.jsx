import { dataProvider } from '@refinedev/supabase'
import { CanAccess, Refine } from '@refinedev/core'
import routerBindings from '@refinedev/react-router'
import { useNotificationProvider } from '@refinedev/antd'

import Routes from './Routes'

import { resources } from './utility/resources'
import { authProvider } from './utility/authProvider'
import { supabaseClient } from './utility/supabaseClient'
import { canAccessControlProvider } from './utility/canAccessControlProvider'

const App = () => {
  return (
    <Refine
      resources={resources}
      authProvider={authProvider}
      routerProvider={routerBindings}
      dataProvider={dataProvider(supabaseClient)}
      notificationProvider={useNotificationProvider}
      accessControlProvider={{
        can: canAccessControlProvider,
      }}
    >
      <CanAccess>
        <Routes />
      </CanAccess>
    </Refine>
  )
}

export default App
