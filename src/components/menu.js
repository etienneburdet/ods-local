import './menu.scss'

const buttons = Array.from(document.querySelectorAll('#menu button'))
const pages = Array.from(document.querySelectorAll('.page'))

const resetTabs = () => {
  pages.forEach((page) => page.classList.add('hidden'))
  buttons.forEach((button) => button.classList.remove('button-active'))
}

const switchTab = (button) => {
  resetTabs()
  button.classList.add('button-active')
  const tabId = button.dataset.tab
  const tab = document.getElementById(tabId)
  tab.classList.remove('hidden')
}

export default () => {
  buttons.forEach((button) => button.addEventListener('click', event => {
    event.preventDefault()
    switchTab(button)
  })
  )
}
