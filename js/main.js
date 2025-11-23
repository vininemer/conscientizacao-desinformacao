// Interações para quiz, checklist e formulário
const quizData = [
  {
    question: 'Uma mensagem chega em um grupo dizendo que "pesquisa inédita mostra que beber água com limão cura gripe". Qual versão é mais confiável?',
    options: [
      {
        text: 'Print de WhatsApp sem fonte, cheio de emojis e sem data.',
        correct: false,
      },
      {
        text: 'Artigo com link para estudo científico, data de publicação e autoria clara.',
        correct: true,
      },
      {
        text: 'Vídeo curto no TikTok com depoimento de um influenciador famoso.',
        correct: false,
      },
    ],
  },
  {
    question: 'Você vê uma manchete: "URGENTE: Nova lei proíbe memes no Brasil". O que fazer primeiro?',
    options: [
      {
        text: 'Compartilhar rápido para avisar amigos.',
        correct: false,
      },
      {
        text: 'Checar em portais oficiais ou sites de fact-checking se a lei existe.',
        correct: true,
      },
      {
        text: 'Acreditar porque veio de um amigo próximo.',
        correct: false,
      },
    ],
  },
  {
    question: 'Uma foto viral mostra um evento polêmico. Como validar a imagem?',
    options: [
      {
        text: 'Usar busca reversa de imagens para ver a origem e data.',
        correct: true,
      },
      {
        text: 'Confiar porque muitas pessoas compartilharam.',
        correct: false,
      },
      {
        text: 'Se basear no número de curtidas.',
        correct: false,
      },
    ],
  },
];

function renderQuestion(index) {
  const question = quizData[index];
  const container = document.getElementById('quiz-container');
  const stepEl = document.getElementById('quiz-step');
  const scoreEl = document.getElementById('quiz-score');

  stepEl.textContent = `Pergunta ${index + 1} de ${quizData.length}`;
  scoreEl.textContent = `Pontuação: ${score}/${quizData.length}`;

  container.innerHTML = `
    <h3>${question.question}</h3>
    ${question.options
      .map(
        (opt, optIndex) =>
          `<button class="quiz-option" data-index="${optIndex}">${opt.text}</button>`
      )
      .join('')}
  `;
}

let currentQuestion = 0;
let score = 0;

function handleOptionClick(event) {
  const target = event.target;
  if (!target.classList.contains('quiz-option')) return;

  const optionIndex = Number(target.getAttribute('data-index'));
  const isCorrect = quizData[currentQuestion].options[optionIndex].correct;
  const feedback = document.getElementById('quiz-feedback');

  if (isCorrect) {
    feedback.textContent = '✔️ Excelente! Você escolheu a opção mais confiável.';
    feedback.style.color = '#16a34a';
    score += 1;
  } else {
    feedback.textContent = '❗ Cuidado! Esta opção apresenta sinais de alerta — verifique a fonte.';
    feedback.style.color = '#dc2626';
  }

  document.getElementById('quiz-score').textContent = `Pontuação: ${score}/${quizData.length}`;

  const buttons = document.querySelectorAll('.quiz-option');
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    btn.style.opacity = '0.9';
    btn.style.cursor = 'not-allowed';
    const correct = quizData[currentQuestion].options[index].correct;
    btn.style.borderColor = correct ? '#22c55e' : '#e2e8f0';
  });
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion += 1;
    renderQuestion(currentQuestion);
    document.getElementById('quiz-feedback').textContent = '';
  } else {
    document.getElementById('quiz-container').innerHTML =
      '<p><strong>Parabéns!</strong> Você completou o treino rápido de verificação.</p>';
    document.getElementById('next-question').disabled = true;
  }
}

function initQuiz() {
  renderQuestion(currentQuestion);
  document.getElementById('quiz-container').addEventListener('click', handleOptionClick);
  document.getElementById('next-question').addEventListener('click', nextQuestion);
}

function initChecklist() {
  const items = document.querySelectorAll('#checklist-items input[type="checkbox"]');
  const progress = document.getElementById('checklist-progress');
  const feedback = document.getElementById('checklist-feedback');

  function updateProgress() {
    const total = items.length;
    const checked = Array.from(items).filter((item) => item.checked).length;
    const percent = Math.round((checked / total) * 100);
    progress.style.width = `${percent}%`;

    if (checked === 0) {
      feedback.textContent = 'Nada marcado ainda. Comece pela fonte!';
    } else if (checked < total) {
      feedback.textContent = `Você concluiu ${checked} de ${total} pontos. Continue!`;
    } else {
      feedback.textContent = 'Checklist completo! Compartilhe de forma responsável.';
    }
  }

  items.forEach((item) => {
    item.addEventListener('change', updateProgress);
  });

  updateProgress();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const thanks = document.getElementById('contact-thanks');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    thanks.style.display = 'block';
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initChecklist();
  initContactForm();
  initSmoothScroll();
});
