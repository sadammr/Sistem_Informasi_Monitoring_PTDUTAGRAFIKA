import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { RefineThemes } from '@refinedev/antd'
import { App as AntdApp, ConfigProvider } from 'antd'

import App from './App.jsx'

import 'antd/dist/reset.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AntdApp>
        <ConfigProvider
          theme={{
            ...RefineThemes.Orange,
          }}
        >
          <App />
        </ConfigProvider>
      </AntdApp>
    </BrowserRouter>
  </StrictMode>
)
