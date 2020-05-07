/* global document */
import './kpi-card.scss'

const cardTemplate = (title, kpi, color) => {
  return `
    <div class="card card-${color}">
      <h2>${title}</h2>
      <h1><strong>${kpi}</strong></h1>
    </div>
  `
}

export default (data) => {
  const cardPage = document.getElementById('kpi')
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('Titre', '12000', 'primary'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('Titre', '12000', 'danger'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('Titre', '12000', 'success'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('Titre', '12000', 'warning'))
}
