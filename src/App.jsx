import { Refine } from '@refinedev/core'
import { dataProvider } from '@refinedev/supabase'

import Routes from './Routes'

import { authProvider } from './utility/authProvider'
import { supabaseClient } from './utility/supabaseClient'

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      dataProvider={dataProvider(supabaseClient)}
    >
      <Routes />
    </Refine>
  )
}

export default App
