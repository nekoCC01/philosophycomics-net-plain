import { loadAnswers, saveAnswer, isComplete, getResultScores } from './storage.js';
import { renderQuestions } from './ui.js';
import { renderResult } from './result.js';

fetch('./questions.json')
    .then(res => res.json())
    .then(data => {
        const storedAnswers = loadAnswers();
        renderQuestions(data, storedAnswers, (questionId, value) => {
            saveAnswer(questionId, value);
            if (isComplete(data)) {
                document.body.innerHTML = '';
                renderResult(getResultScores(data));
            }
        });
    });
