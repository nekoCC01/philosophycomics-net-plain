export function renderQuestions(data, answers, onAnswerClicked, persons = ['person1'], handlers = {}) {
    const container = document.createElement('div');

    // Reset-Button oben einfügen
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-btn';
    resetBtn.textContent = 'Alle Antworten zurücksetzen';
    resetBtn.style.marginBottom = '1rem';
    container.appendChild(resetBtn);

    // Button für weitere Person
    if (persons.length < 2) {
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Weitere Person hinzufügen';
        addBtn.style.marginLeft = '1rem';
        addBtn.onclick = handlers.onAddPerson;
        container.appendChild(addBtn);
    } else {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Zweite Person entfernen';
        removeBtn.style.marginLeft = '1rem';
        removeBtn.onclick = handlers.onRemovePerson;
        container.appendChild(removeBtn);
    }

    persons.forEach((personKey, idx) => {
        const personLabel = document.createElement('h2');
        personLabel.textContent = idx === 0 ? 'Person 1' : 'Person 2';
        personLabel.style.marginTop = '2rem';
        container.appendChild(personLabel);
        data.forEach(group => {
            const section = document.createElement('section');
            const heading = document.createElement('h3');
            heading.textContent = group.dimension;
            section.appendChild(heading);
            group.questions.forEach(q => {
                const div = document.createElement('div');
                const text = document.createElement('p');
                text.textContent = q.text;
                div.appendChild(text);
                const btns = [];
                ['1', '0.5', '0'].forEach(val => {
                    const btn = document.createElement('button');
                    btn.textContent = val === '1' ? 'Stimmt' : val === '0.5' ? 'Stimmt etwas' : 'Stimmt nicht';
                    if (answers[personKey] && answers[personKey][q.id] === val) {
                        btn.classList.add('selected');
                    }
                    btn.onclick = () => {
                        btns.forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        onAnswerClicked(personKey, q.id, val);
                    };
                    btns.push(btn);
                    div.appendChild(btn);
                });
                section.appendChild(div);
            });
            container.appendChild(section);
        });
    });
    document.body.innerHTML = '';
    document.body.appendChild(container);

    // Event-Listener für Reset-Button
    resetBtn.onclick = () => {
        if (typeof window.resetAnswers === 'function') {
            window.resetAnswers();
        } else if (window.resetAnswersModule) {
            window.resetAnswersModule();
        } else {
            // Fallback: LocalStorage direkt löschen
            localStorage.removeItem('riemann_test');
        }
        location.reload();
    };
}
