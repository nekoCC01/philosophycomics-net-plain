const STORAGE_KEY = 'riemann_test';

export function loadAnswers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function saveAnswer(id, value) {
    const current = loadAnswers();
    current[id] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function isComplete(data) {
    const answers = loadAnswers();
    return data.every(dim => dim.questions.every(q => answers[q.id] !== undefined));
}

export function getResultScores(data) {
    const answers = loadAnswers();
    const scores = {};
    data.forEach(dim => {
        scores[dim.dimension] = dim.questions.reduce((sum, q) => {
            const val = parseFloat(answers[q.id]);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);
    });
    return scores;
}
