/* global localStorage */
import './toasts.scss'

const displaySaveMsg = () => {
  const toast = document.getElementById('online')
  const lastUpdated = localStorage.getItem('lastUpdated')
  toast.innerText = `Sauvegarde réussie à ${lastUpdated} !`
  toast.classList.toggle('show')
  setTimeout(() => toast.classList.toggle('show'), 1200)
}

const displayOfflineMsg = () => {
  const toast = document.getElementById('offline')
  const lastUpdated = localStorage.getItem('lastUpdated')
  toast.innerText = `Mode hors-ligne ! Dernière donnée téléchargées le ${lastUpdated}`
  toast.classList.toggle('show')
}

export default (status) => {
  status === 'online' ? displaySaveMsg() : displayOfflineMsg()
}
