import './app.scss'
import fetchData from './plugins/ods-context.js'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`)
      })
      .catch(err => {
        console.log(`Service Worker registration failed: ${err}`)
      })
  })
}

fetchData()
