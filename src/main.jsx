import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { store } from './store.js';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={2_000}
        hideProgressBar
        newestOnTop
        theme="colored"
      />
      <App />
    </Provider>
  </StrictMode>,
)
