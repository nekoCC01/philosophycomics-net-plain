// script.js (ES Module)
const DOSHA_BY_LETTER = {
  A: "Vata",
  B: "Pitta",
  C: "Kapha",
};

const LETTERS = ["A", "B", "C"];
const MAX_SELECTIONS_PER_QUESTION = 2;

/**
 * Zentraler State:
 * - questions: geladene Fragen
 * - answers: Map questionId -> Set(['A','B'] ...)
 * - totals: kumulierte Punkte pro Dosha
 */
const state = {
  questions: [],
  answers: new Map(),
  totals: { Vata: 0, Pitta: 0, Kapha: 0 },
};

const els = {
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  progressText: document.getElementById("progressText"),
  progressBarFill: document.getElementById("progressBarFill"),
  resetBtn: document.getElementById("resetBtn"),
  questionTemplate: document.getElementById("questionTemplate"),
  choiceTemplate: document.getElementById("choiceTemplate"),
  resultTemplate: document.getElementById("resultTemplate"),
};

init().catch((err) => {
  console.error(err);
  const details = err instanceof Error ? err.message : String(err);
  els.quiz.innerHTML = `<div class="card" style="padding:14px">
    <p>Fehler beim Laden der Fragen.</p>
    <p class="fineprint">${details}</p>
    <p class="fineprint">Falls du die Datei per Doppelklick geoeffnet hast, starte sie ueber einen lokalen Server.</p>
  </div>`;
});

async function init() {
  els.resetBtn.addEventListener("click", resetAll);

  const data = await loadQuestions("./questions.json");
  state.questions = data.questions ?? [];
  // Initial State für Antworten anlegen
  for (const q of state.questions) state.answers.set(q.id, new Set());

  renderAllQuestions();
  recalcTotalsAndUI();
}

async function loadQuestions(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load questions.json (${res.status})`);
  return res.json();
}

function renderAllQuestions() {
  els.quiz.innerHTML = "";
  els.result.classList.add("hidden");
  els.result.innerHTML = "";

  state.questions.forEach((q, idx) => {
    const node = renderQuestion(q, idx);
    els.quiz.appendChild(node);
  });
}

function renderQuestion(question, index) {
  const fragment = els.questionTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".question");
  card.dataset.questionId = question.id;

  fragment.querySelector(".q-index").textContent = String(index + 1).padStart(2, "0");
  fragment.querySelector(".q-title").textContent = question.title;

  const choicesWrap = fragment.querySelector(".choices");
  for (const letter of LETTERS) {
    const text = question.choices?.[letter];
    if (!text) continue;

    const choiceFrag = els.choiceTemplate.content.cloneNode(true);
    const label = choiceFrag.querySelector(".choice");
    const input = choiceFrag.querySelector(".choice-input");
    const letterEl = choiceFrag.querySelector(".choice-letter");
    const textEl = choiceFrag.querySelector(".choice-text");

    input.name = question.id;
    input.value = letter;
    input.checked = state.answers.get(question.id)?.has(letter) ?? false;

    letterEl.textContent = letter;
    textEl.textContent = text;

    input.addEventListener("change", (e) => {
      onChoiceToggled(question.id, letter, e.target.checked, card);
    });

    choicesWrap.appendChild(label);
  }

  updateQuestionFooter(card, question.id);
  return fragment;
}

function onChoiceToggled(questionId, letter, checked, card) {
  const selected = state.answers.get(questionId);
  if (!selected) return;

  if (checked) {
    // max 2 erlauben
    if (selected.size >= MAX_SELECTIONS_PER_QUESTION) {
      // revert UI change
      const input = card.querySelector(`input.choice-input[value="${letter}"]`);
      if (input) input.checked = false;
      flashLimitHint(card);
      return;
    }
    selected.add(letter);
  } else {
    selected.delete(letter);
  }

  // Sync checkboxes (falls nötig)
  syncCardInputs(card, selected);
  updateQuestionFooter(card, questionId);
  recalcTotalsAndUI();
}

function syncCardInputs(card, selectedSet) {
  const inputs = card.querySelectorAll("input.choice-input");
  for (const input of inputs) {
    input.checked = selectedSet.has(input.value);
  }
}

function flashLimitHint(card) {
  const badge = card.querySelector(".badge");
  if (!badge) return;
  badge.classList.add("warn");
  badge.textContent = "Maximal 2 Optionen";
  window.setTimeout(() => {
    badge.classList.remove("warn");
    badge.textContent = "Wähle 1 oder 2 Optionen";
  }, 900);
}

function updateQuestionFooter(card, questionId) {
  const selected = state.answers.get(questionId) ?? new Set();
  const qTotals = scoreForSelection(selected);

  const vEl = card.querySelector("[data-qscore-vata]");
  const pEl = card.querySelector("[data-qscore-pitta]");
  const kEl = card.querySelector("[data-qscore-kapha]");
  if (vEl) vEl.textContent = formatPoints(qTotals.Vata);
  if (pEl) pEl.textContent = formatPoints(qTotals.Pitta);
  if (kEl) kEl.textContent = formatPoints(qTotals.Kapha);

  const badge = card.querySelector(".badge");
  if (badge) {
    if (selected.size === 0) {
      badge.textContent = "Wähle 1 oder 2 Optionen";
      badge.classList.remove("warn");
    } else if (selected.size === 1) {
      badge.textContent = "1 Auswahl (1 Punkt)";
      badge.classList.remove("warn");
    } else if (selected.size === 2) {
      badge.textContent = "2 Auswahlen (je 0,5)";
      badge.classList.remove("warn");
    }
  }
}

function scoreForSelection(selectedSet) {
  // Regel:
  // - 1 Auswahl => 1 Punkt an das entsprechende Dosha
  // - 2 Auswahlen => je 0,5 Punkte
  // - 0 Auswahlen => 0
  const totals = { Vata: 0, Pitta: 0, Kapha: 0 };

  const letters = Array.from(selectedSet);
  if (letters.length === 1) {
    const dosha = DOSHA_BY_LETTER[letters[0]];
    totals[dosha] += 1;
  } else if (letters.length === 2) {
    for (const l of letters) {
      const dosha = DOSHA_BY_LETTER[l];
      totals[dosha] += 0.5;
    }
  }
  return totals;
}

function recalcTotalsAndUI() {
  // Totals neu berechnen
  state.totals = { Vata: 0, Pitta: 0, Kapha: 0 };

  for (const [qid, selected] of state.answers.entries()) {
    const qTotals = scoreForSelection(selected);
    state.totals.Vata += qTotals.Vata;
    state.totals.Pitta += qTotals.Pitta;
    state.totals.Kapha += qTotals.Kapha;
  }

  // Progress
  const totalQuestions = state.questions.length;
  const answered = countAnsweredQuestions();
  els.progressText.textContent = `${answered} / ${totalQuestions} beantwortet`;

  const pct = totalQuestions === 0 ? 0 : Math.round((answered / totalQuestions) * 100);
  els.progressBarFill.style.width = `${pct}%`;

  // Ergebnis anzeigen, wenn komplett
  if (answered === totalQuestions && totalQuestions > 0) {
    renderResult();
  } else {
    els.result.classList.add("hidden");
    els.result.innerHTML = "";
  }
}

function countAnsweredQuestions() {
  let count = 0;
  for (const selected of state.answers.values()) {
    if (selected.size === 1 || selected.size === 2) count++;
  }
  return count;
}

function renderResult() {
  els.result.innerHTML = "";
  const frag = els.resultTemplate.content.cloneNode(true);
  const grid = frag.getElementById("resultGrid");

  const entries = [
    { dosha: "Vata", points: roundHalf(state.totals.Vata) },
    { dosha: "Pitta", points: roundHalf(state.totals.Pitta) },
    { dosha: "Kapha", points: roundHalf(state.totals.Kapha) },
  ].sort((a, b) => b.points - a.points);

  const max = Math.max(...entries.map((e) => e.points), 0);
  for (const e of entries) {
    const row = document.createElement("div");
    row.className = "result-row";

    const name = document.createElement("div");
    name.className = "pill";
    name.textContent = e.dosha;

    const points = document.createElement("div");
    points.className = "pill";
    points.textContent = formatPoints(e.points);

    const bar = document.createElement("div");
    bar.className = "bar";
    const fill = document.createElement("div");
    const w = max === 0 ? 0 : (e.points / max) * 100;
    fill.style.width = `${w}%`;
    bar.appendChild(fill);

    row.appendChild(name);
    row.appendChild(points);
    row.appendChild(bar);
    grid.appendChild(row);
  }

  els.result.appendChild(frag);
  els.result.classList.remove("hidden");

  // optional: bei Fertigstellung sanft zum Ergebnis scrollen
  els.result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAll() {
  for (const key of state.answers.keys()) state.answers.set(key, new Set());
  state.totals = { Vata: 0, Pitta: 0, Kapha: 0 };

  // UI zurücksetzen: alle Checkboxen unchecken + Footer updaten
  const cards = els.quiz.querySelectorAll(".question");
  for (const card of cards) {
    const qid = card.dataset.questionId;
    const inputs = card.querySelectorAll("input.choice-input");
    inputs.forEach((i) => (i.checked = false));
    updateQuestionFooter(card, qid);
  }

  recalcTotalsAndUI();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatPoints(n) {
  // 0.5 Schritte, im Deutschen gern mit Komma
  const val = roundHalf(n);
  // 1 -> "1", 0.5 -> "0,5"
  return (Number.isInteger(val) ? String(val) : String(val).replace(".", ","));
}

function roundHalf(n) {
  return Math.round(n * 2) / 2;
}
