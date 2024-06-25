import App from './App.tsx'
import { NotificationProvider } from './notifications/NotificationContext.tsx'

import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </StrictMode>
)
