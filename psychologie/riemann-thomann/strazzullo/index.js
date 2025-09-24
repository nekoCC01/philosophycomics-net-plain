import loadQuestions from './questions.js'
import view from './view.js'

const state = {
    questions: loadQuestions(),
    answers: {}
}

const main = document.querySelector('#app')

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})