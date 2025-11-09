let template;

const getInputTemplate = () => {
    if (!template) {
        template = document.getElementById('inputTemplate');
    }
    return template
        .content
        .cloneNode(true)
}

export default (targetElement, { persons }) => {
    const newInput = targetElement.cloneNode(true)

    let inputTemplate = getInputTemplate();
    inputTemplate.querySelector('h3').textContent = persons;
    newInput.appendChild(inputTemplate);
    return newInput
}