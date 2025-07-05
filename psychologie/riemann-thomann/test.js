import { loadAnswers, saveAnswer, isComplete, getResultScores, resetAnswers, addPerson, removePerson, getPersonKeys } from './storage.js';
import { renderQuestions } from './ui.js';
import { renderResult } from './result.js';

fetch('./questions.json')
    .then(res => res.json())
    .then(data => {
        let persons = getPersonKeys();
        renderQuestions(data, loadAnswers(), (personKey, questionId, value) => {
            saveAnswer(personKey, questionId, value);
            persons = getPersonKeys();
            if (isComplete(data, persons)) {
                document.body.innerHTML = '';
                renderResult(getResultScores(data, persons));
            }
        }, persons, {
            onAddPerson: () => {
                addPerson();
                persons = getPersonKeys();
                renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
            },
            onRemovePerson: () => {
                removePerson();
                persons = getPersonKeys();
                renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
            }
        });

        function onAnswerClicked(personKey, questionId, value) {
            saveAnswer(personKey, questionId, value);
            persons = getPersonKeys();
            if (isComplete(data, persons)) {
                document.body.innerHTML = '';
                renderResult(getResultScores(data, persons));
            }
        }
        const handlers = {
            onAddPerson: () => {
                addPerson();
                persons = getPersonKeys();
                renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
            },
            onRemovePerson: () => {
                removePerson();
                persons = getPersonKeys();
                renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
            }
        };
    });

// Reset-Button bleibt wie gehabt
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.onclick = () => {
        resetAnswers();
        location.reload();
    };
}
