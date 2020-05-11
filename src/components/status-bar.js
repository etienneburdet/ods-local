/* global localStorage */
import moment from 'moment'
import './status-bar.scss'

const pill = document.getElementById('pill')
const updateInfo = document.getElementById('last-updated')

const displayLastUpdate = () => {
  const lastUpdated = localStorage.getItem('lastUpdated')
  updateInfo.innerText = 'last update on: ' + moment(lastUpdated).format('MMMM, h:mm')
}

const displayOnline = () => {
  pill.innerText = "Online"
  pill.classList.add('pill-success')
  pill.classList.remove('pill-warning')
  displayLastUpdate()
}

const displayOffline = () => {
  const lastUpdated = localStorage.getItem('lastUpdated')
  pill.innerText = "Offline"
  pill.classList.remove('pill-success')
  pill.classList.add('pill-warning')
  displayLastUpdate()
}

export default (status) => {
  status === 'online' ? displayOnline() : displayOffline()
}
