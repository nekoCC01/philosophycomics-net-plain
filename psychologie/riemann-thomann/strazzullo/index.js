import questions from './questions.js'

import inputView from './view/input.js';
import questionsView from './view/questions.js';
import registry from './registry.js'

registry.add('input', inputView)
registry.add('questions', questionsView)

const state = {
    questions: questions,
    persons: 'Daniel'
}

window.requestAnimationFrame(() => {
  const main = document.querySelector('#test')
  const newMain = registry.renderRoot(main, state)
  main.replaceWith(newMain)
})