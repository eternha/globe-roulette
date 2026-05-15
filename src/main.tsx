import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { initPostHog } from './lib/posthog'

initPostHog()

// Reload silently when an *updated* SW takes over (autoUpdate flow).
// Guard: if controller was null at page-load, this is the initial SW
// activation — not an update — so skip the reload to avoid interrupting
// a first-visit spin.
if ('serviceWorker' in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) window.location.reload();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
