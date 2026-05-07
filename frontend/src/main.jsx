import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "remixicon/fonts/remixicon.css"
import "./assets/styles/variable.css"
import App from './App.jsx'
import { Authprovider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authprovider>
    <App />
  </Authprovider>
  </BrowserRouter>
)

