/* global document */
import './kpi-card.scss'

const cardTemplate = (title, kpi, color) => {
  return `
    <div class="card card-${color}">
      <h3>${title}</h3>
      <h1><strong>${kpi}</strong></h1>
    </div>
  `
}

export default (data) => {
  const cardPage = document.getElementById('kpi')
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('NOMBRE DE PERSONNES HOSPITALISÉES', data.sum_hos, 'primary'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('NOMBRE DE PERSONNES EN SOINS INTENSIFS', data.sum_intcare, 'danger'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('NOMBRE CUMULÉ DE RETOURS À DOMICILE', data.sum_out, 'success'))
  cardPage.insertAdjacentHTML('beforeend', cardTemplate('NOMBRE CUMULÉ DE DÉCÈS', data.sum_death, 'warning'))
}
