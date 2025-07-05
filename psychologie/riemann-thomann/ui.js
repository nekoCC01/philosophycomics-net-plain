export function renderQuestions(data, answers, onAnswerClicked) {
    const container = document.createElement('div');

    // Reset-Button oben einfügen
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-btn';
    resetBtn.textContent = 'Alle Antworten zurücksetzen';
    resetBtn.style.marginBottom = '2rem';
    container.appendChild(resetBtn);

    data.forEach(group => {
        const section = document.createElement('section');
        const heading = document.createElement('h2');
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
                if (answers[q.id] === val) {
                    btn.classList.add('selected');
                }
                btn.onclick = () => {
                    // Alle Buttons dieser Frage deselektieren
                    btns.forEach(b => b.classList.remove('selected'));
                    // Diesen Button selektieren
                    btn.classList.add('selected');
                    onAnswerClicked(q.id, val);
                };
                btns.push(btn);
                div.appendChild(btn);
            });
            section.appendChild(div);
        });
        container.appendChild(section);
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
