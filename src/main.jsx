import React from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {Toaster} from 'sonner'
import App from './App'
import './index.css'
const client=new QueryClient({defaultOptions:{queries:{retry:1}}})
createRoot(document.getElementById('root')).render(<React.StrictMode><QueryClientProvider client={client}><App/><Toaster richColors position="top-right"/></QueryClientProvider></React.StrictMode>)