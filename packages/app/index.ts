if (module && module.hot) {
  // TODO: Mark the application as hot module acceptable
  module.hot.accept()
}

import element from './components/example'

document.addEventListener('DOMContentLoaded', () => {
  element(document.querySelector('#app'))
})
