// JavaScript básico para quiz e formulário
document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.quiz‑option');
  const feedback = document.getElementById('quiz‑feedback');

  options.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data‑correct') === 'true';
      if (isCorrect) {
        feedback.textContent = '✔️ Excelente! Você escolheu a opção mais confiável.';
        feedback.style.color = 'green';
      } else {
        feedback.textContent = '❗ Cuidado! Esta opção apresenta sinais de alerta — verifique a fonte.';
        feedback.style.color = 'red';
      }
    });
  });

  const form = document.getElementById('contact‑form');
  const thanks = document.getElementById('contact‑thanks');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode enviar via AJAX para servidor, etc.
    form.style.display = 'none';
    thanks.style.display = 'block';
  });
});
