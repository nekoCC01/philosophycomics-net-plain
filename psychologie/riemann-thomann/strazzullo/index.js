import questions from './questions.js'
import view from './view.js'

const state = {
    questions: questions
}

const main = document.querySelector('#test')

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})