import getQuestions from './getQuestions.js'
import view from './view.js'

const state = {
    todos: getQuestions,
    currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})