import './app.scss'
import loadDataNetworkFirst from './plugins/ods-context.js'
import generateCards from './components/kpi-card.js'
import generateToast from './components/status-bar.js'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register('/sw.js')
    try {
      console.log(`Service Worker registered! Scope: ${registration.scope}`)
    } catch (err) {
      console.log(`Service Worker registration failed: ${err}`)
    }
  })
}

const getDataAndRenderUi = async () => {
  const res = await loadDataNetworkFirst()
  generateCards(res.data[0])
  generateToast(res.status)
}

getDataAndRenderUi()
