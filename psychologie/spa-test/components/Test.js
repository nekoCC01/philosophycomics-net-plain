import { testImport } from '../storage.js';

class Test extends HTMLElement {
    async connectedCallback() {
        // Templates
        let templateTest = document.querySelector('template#test');
        let templateDimension = document.querySelector('template#dimension');
        let templateQuestion = document.querySelector('template#question');

        // this.appendChild(templateTest.content.cloneNode(true));

        let fragmentTest = templateTest.content.cloneNode(true);
        let rootDimensions = fragmentTest.getElementById("dimensions");


        // Jetzt ist das Template im DOM des Elements!
        // Beispiel: Daten laden
        const res = await fetch('questions.json');
        const questions = await res.json();

        questions.forEach(dimQ => {
            // h2 mit dimQ.dimension -> templateDimension
            let fragmentDimension = templateDimension.content.cloneNode(true);
            fragmentDimension.querySelector('h2').textContent = dimQ.dimension;
            let rootQuestions = fragmentDimension.querySelector('.questions');

            rootDimensions.appendChild(fragmentDimension);

            // Questions
            dimQ.questions.forEach(question => {
                let fragmentQuestion = templateQuestion.content.cloneNode(true);
                fragmentQuestion.querySelector('p').textContent = question.text;
                fragmentQuestion.querySelectorAll('input').forEach(input => {
                    input.name = question.id;
                })
                rootQuestions.appendChild(fragmentQuestion);
            })
        })


        fragmentTest.querySelectorAll('input').forEach(radio => {
            radio.addEventListener('change', e => {
                console.log("Ausgewählt", e.target, e.target.value, e.target.name);
            })
        })


        this.appendChild(fragmentTest);

        /*
        // Ziel-Container im Template finden
        const listContainer = this.querySelector('#meine-liste');
        daten.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            listContainer.appendChild(li);
        });

        //Test
        console.log(testImport());
        */

    }
}

export const registerTest = () => {
    customElements.define('x-test', Test);
}



