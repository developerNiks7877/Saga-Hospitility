import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      const workerUrl = registration.active?.scriptURL || ''
      if (!/\/(?:drive-media-sw|media-proxy)\.js$/.test(workerUrl)) return
      const controlledByOldWorker = navigator.serviceWorker.controller === registration.active
      registration.unregister().then((removed) => {
        if (removed && controlledByOldWorker) window.location.reload()
      })
    })
  })
}

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
