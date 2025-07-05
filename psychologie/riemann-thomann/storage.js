const STORAGE_KEY = 'riemann_test';
const PERSON_KEYS = ['person1', 'person2'];

export function loadAnswers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { person1: {} };
}

export function saveAnswer(personKey, id, value) {
    const current = loadAnswers();
    if (!current[personKey]) current[personKey] = {};
    current[personKey][id] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function isComplete(data, persons = ['person1']) {
    const answers = loadAnswers();
    return persons.every(personKey =>
        data.every(dim => dim.questions.every(q => answers[personKey] && answers[personKey][q.id] !== undefined))
    );
}

export function getResultScores(data, persons = ['person1']) {
    const answers = loadAnswers();
    const result = {};
    persons.forEach(personKey => {
        const scores = {};
        data.forEach(dim => {
            scores[dim.dimension] = dim.questions.reduce((sum, q) => {
                const val = parseFloat(answers[personKey]?.[q.id]);
                return sum + (isNaN(val) ? 0 : val);
            }, 0);
        });
        result[personKey] = scores;
    });
    return result;
}

export function resetAnswers() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getPersonKeys() {
    const answers = loadAnswers();
    return Object.keys(answers);
}

export function addPerson() {
    const answers = loadAnswers();
    if (!answers.person2) answers.person2 = {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function removePerson() {
    const answers = loadAnswers();
    delete answers.person2;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}
