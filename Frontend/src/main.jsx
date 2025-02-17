
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import AuthProvider from './Context/authProvider.jsx';



const root = createRoot(document.getElementById('root'));
root.render( 
  <BrowserRouter>
  <AuthProvider>
          <App />
  </AuthProvider>
  </BrowserRouter>
 

)
