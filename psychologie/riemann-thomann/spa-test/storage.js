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

export function addPerson() {
    const answers = loadAnswers();
    if (!answers.person2) answers.person2 = {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function getPersonKeys() {
    const answers = loadAnswers();
    return Object.keys(answers);
}