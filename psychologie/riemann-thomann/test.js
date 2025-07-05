import { loadAnswers, saveAnswer, isComplete, getResultScores, resetAnswers } from './storage.js';
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

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.onclick = () => {
        resetAnswers();
        location.reload();
    };
}
