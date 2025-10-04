import questions from './questions.js'
import appView from './view/app.js'

const state = {
    questions: questions,
    persons: 'Daniel'
}

const main = document.querySelector('#test')

window.requestAnimationFrame(() => {
    const newMain = appView(main, state)
    main.replaceWith(newMain)
})