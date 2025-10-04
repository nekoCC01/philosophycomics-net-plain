const getQuestion = question => {
    const {
        text
    } = question

    return `
  <div class="row">
        <p>${text}</p>
        <fieldset class="answer-options">
            <div>
                <input class="answer-input" type="radio" name="test2" value="1" />
            </div>
            <div>
                <input class="answer-input" type="radio" name="test2" value="0.5" />
            </div>
            <div>
                <input class="answer-input" type="radio" name="test2" value="0" />
            </div>
        </fieldset>
    </div>
    `

}


export default (targetElement, state) => {
    const {
        questions
    } = state

    const element = targetElement.cloneNode(true)

    const questionsSection = element.querySelector('.questions')

    questionsSection.innerHTML = `
    <div class="row">
                    <div class="legend" style="grid-column-start: 2;">
                        <div>Stimmt</div>
                        <div>Stimmt etwas</div>
                        <div>Stimmt nicht</div>
                    </div>
                </div>
    `;
    questionsSection.innerHTML += questions.map(getQuestion).join('')

    return element
}