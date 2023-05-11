import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
