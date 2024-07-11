import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import App from './App.jsx'
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { ToastProvider } from '@/context/ToastContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <Theme>
            <ToastProvider>
              <App />
            </ToastProvider>
          </Theme>
        </BrowserRouter>
      </React.StrictMode>,
    </PersistGate>
  </Provider>
)
