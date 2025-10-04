import inputView from './input.js'
import questionsView from './questions.js'

export default (targetElement, state) => {
  const element = targetElement.cloneNode(true)

  const input = element
    .querySelector('#input')
  const dimensions = element
    .querySelector('#dimensions')

  input.replaceWith(inputView(input, state))
  dimensions.replaceWith(questionsView(dimensions, state))

  return element
}
