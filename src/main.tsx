import { createRoot } from 'react-dom/client'
import './app/styles/index.scss'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router";
import StoreProvider from "./app/providers/store/ui/StoreProvider.tsx";
import {AuthProvider} from "app/providers/auth/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StoreProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </StoreProvider>
    </BrowserRouter>
)
