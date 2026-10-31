import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

document.documentElement.style.setProperty(
  '--saga-footer-wildlife-image',
  `url("${import.meta.env.BASE_URL}assets/footer/footer-wildlife.png")`
);

const GOOGLE_CLIENT_ID =
  '610364572638-ifhj4l26cdhsg13530ig10dklb0cl643.apps.googleusercontent.com';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
