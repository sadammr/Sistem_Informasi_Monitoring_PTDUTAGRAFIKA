import { Refine } from '@refinedev/core'
import { dataProvider } from '@refinedev/supabase'
import routerBindings from '@refinedev/react-router'

import Routes from './Routes'

import { resources } from './utility/resources'
import { authProvider } from './utility/authProvider'
import { supabaseClient } from './utility/supabaseClient'

const App = () => {
  return (
    <Refine
      resources={resources}
      authProvider={authProvider}
      routerProvider={routerBindings}
      dataProvider={dataProvider(supabaseClient)}
    >
      <Routes />
    </Refine>
  )
}

export default App
