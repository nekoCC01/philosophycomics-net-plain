import { loadAnswers, addPerson, saveAnswer, getPersonKeys } from '../storage.js';

class Test extends HTMLElement {
    async connectedCallback() {
        // Templates
        let templateTest = document.querySelector('template#test');
        let templateDimension = document.querySelector('template#dimension');
        let templateQuestion = document.querySelector('template#question');

        let fragmentTest = templateTest.content.cloneNode(true);
        let rootDimensions = fragmentTest.getElementById("dimensions");

        const res = await fetch('questions.json');
        const questions = await res.json();

        questions.forEach(dimQ => {
            let fragmentDimension = templateDimension.content.cloneNode(true);
            fragmentDimension.querySelector('h2').textContent = dimQ.dimension;
            let rootQuestions = fragmentDimension.querySelector('.questions');

            // Questions
            dimQ.questions.forEach(question => {
                let fragmentQuestion = templateQuestion.content.cloneNode(true);
                fragmentQuestion.querySelector('p').textContent = question.text;
                fragmentQuestion.querySelectorAll('input').forEach(input => {
                    // erstmal hard-coded 
                    input.name = 'person1-' + question.id;
                })
                rootQuestions.appendChild(fragmentQuestion);
            })

            rootDimensions.appendChild(fragmentDimension);

        })


        // Personen Input
        fragmentTest.querySelectorAll('input.persons-input').forEach(radio => {
            radio.addEventListener('change', e => {
                console.log("Ausgewählt P", e.target, e.target.value, e.target.name);
                if (e.target.value == 2) {
                    this.querySelectorAll('.name-input').forEach(input => {
                        input.style.display = "block";
                    })
                } else {
                    this.querySelector('#name-input').style.display = "block";
                }
                this.querySelector('#persons').style.display = "none";
            })
        })

        // Namen Input
        let nameInput = fragmentTest.getElementById('name-input');
        nameInput.addEventListener("submit", (event) => {
            event.preventDefault(); // verhindert das automatische Neuladen
            const inputValue = nameInput.elements["username"].value;
            console.log("Finaler Wert:", inputValue);
            // an Storage
            addPerson();
            this.querySelectorAll('.name-input').forEach(input => {
                input.style.display = "none";
            })
            this.querySelector('#dimensions').style.display = "block";

        });

        // Antworten Input
        fragmentTest.querySelectorAll('input.answer-input').forEach(radio => {
            radio.addEventListener('change', e => {
                console.log("Ausgewählt", e.target, e.target.value, e.target.name);
                let [personKey, questionId] = e.target.name.split("-");
                saveAnswer(personKey, questionId, e.target.value);
            })
        })

        this.appendChild(fragmentTest);

    }
}

export const registerTest = () => {
    customElements.define('x-test', Test);
}



