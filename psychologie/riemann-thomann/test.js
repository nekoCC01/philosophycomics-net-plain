import { loadAnswers, saveAnswer, isComplete, getResultScores, resetAnswers, addPerson, removePerson, getPersonKeys } from './storage.js';
import { renderQuestions } from './ui.js';
import { renderResult } from './result.js';

fetch('./questions.json')
    .then(res => res.json())
    .then(data => {
        let persons = getPersonKeys();

        const updateAndRender = () => {
            persons = getPersonKeys();
            renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
        };

        const onAnswerClicked = (personKey, questionId, value) => {
            saveAnswer(personKey, questionId, value);
            persons = getPersonKeys();
            if (isComplete(data, persons)) {
                document.body.innerHTML = '';
                renderResult(getResultScores(data, persons));
            }
        };

        const handlers = {
            onAddPerson: () => {
                addPerson();
                updateAndRender();
            },
            onRemovePerson: () => {
                removePerson();
                updateAndRender();
            }
        };

        renderQuestions(data, loadAnswers(), onAnswerClicked, persons, handlers);
    });

