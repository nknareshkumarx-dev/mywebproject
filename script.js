const nameInput = document.getElementById('siblingName');
const heroName = document.getElementById('heroName');
const bondMessage = document.getElementById('bondMessage');
const showMessageButton = document.getElementById('showMessage');
const surpriseButton = document.getElementById('surpriseButton');
const updateNamesButton = document.getElementById('updateNames');
const themeButtons = document.querySelectorAll('.theme-btn');

const messages = [
  "Your laugh is the best part of every sibling adventure.",
  "Together you turn ordinary days into unforgettable stories.",
  "When you stand side by side, nothing feels impossible.",
  "A brother and sister team, always caring and always cheering each other on."
];

const surprises = [
  "A big sister hug is waiting after school!",
  "He saved your favorite snack just for you.",
  "A little note of love was left on your desk.",
  "The next movie night is all about your favorite film."
];

const themeConfig = {
  pastel: {
    bg1: '#c7eafc',
    bg2: '#f8d0f7',
    accent: '#ff7eb9',
    accent2: '#6c72ff',
    text: '#1b2130',
    border: 'rgba(27, 33, 48, 0.12)'
  },
  blossom: {
    bg1: '#ffe4f2',
    bg2: '#ffd6b6',
    accent: '#ff6eb4',
    accent2: '#ffa94d',
    text: '#2f111b',
    border: 'rgba(47, 17, 27, 0.12)'
  },
  ocean: {
    bg1: '#d8f3dc',
    bg2: '#bee3f8',
    accent: '#40916c',
    accent2: '#3b5bdb',
    text: '#102a43',
    border: 'rgba(16, 42, 67, 0.12)'
  }
};

function setTheme(themeName) {
  const root = document.documentElement;
  const theme = themeConfig[themeName] || themeConfig.pastel;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  localStorage.setItem('nareshSiblingTheme', themeName);
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showBondMessage() {
  const message = randomItem(messages);
  bondMessage.textContent = `Hi Naresh! ${message}`;
}

function showSurprise() {
  const sibling = nameInput.value.trim() || 'your sister';
  const surprise = randomItem(surprises);
  bondMessage.textContent = `Surprise for ${sibling}: ${surprise}`;
}

function updateNames() {
  const sibling = nameInput.value.trim() || 'your sister';
  heroName.textContent = 'Naresh';
  bondMessage.textContent = `Naresh and ${sibling} share a strong, caring bond. Keep making memories together!`;
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('nareshSiblingTheme') || 'pastel';
  setTheme(savedTheme);

  if (showMessageButton) showMessageButton.addEventListener('click', showBondMessage);
  if (surpriseButton) surpriseButton.addEventListener('click', showSurprise);
  if (updateNamesButton) updateNamesButton.addEventListener('click', updateNames);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });

  // Sister Love Quiz: initialize if present on the page
  const quizForm = document.getElementById('sisterQuiz');
  if (quizForm) {
    const resultBox = document.getElementById('quizResult');
    const percentEl = document.getElementById('resultPercent');
    const textEl = document.getElementById('resultText');
    const resetBtn = document.getElementById('quizReset');

    function calculateQuizPercent(form) {
      const data = new FormData(form);
      const q2 = parseInt(data.get('q2') || '0', 10);
      const q3 = parseInt(data.get('q3') || '0', 10);
      const total = q2 + q3;
      // Max score for q2 + q3 is 10 -> convert to percentage
      return Math.round((total / 10) * 100);
    }

    function resultEmoji(percent) {
      if (percent >= 70) return '😊';
      if (percent >= 45) return '🙂';
      return '😠';
    }

    function secretResult(form) {
      const data = new FormData(form);
      const secretText = (data.get('q1') || '').trim();
      return secretText ? `Your secret message: "${secretText}"` : 'Your secret is hidden, but the love is real.';
    }

    function resultMessage(percent) {
      if (percent >= 90) return 'Naresh, your sister love is like a forever hug — warm, playful, and always there.';
      if (percent >= 70) return 'Naresh, your bond is bright and cozy, full of inside jokes and caring.';
      if (percent >= 45) return 'Naresh, your love is sweet and growing — add a few more fun surprises.';
      return 'Naresh, a little more kindness and silly moments will make this bond stronger.';
    }

    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pct = calculateQuizPercent(quizForm);
      percentEl.textContent = `Naresh, your Sister Love is ${pct}% ${resultEmoji(pct)}`;
      textEl.textContent = `${resultMessage(pct)} ${secretResult(quizForm)}`;
      resultBox.style.display = 'block';
      // Save last result
      localStorage.setItem('sisterLoveLast', JSON.stringify({percent: pct, time: Date.now()}));
    });

    resetBtn.addEventListener('click', () => {
      quizForm.reset();
      resultBox.style.display = 'none';
      localStorage.removeItem('sisterLoveLast');
    });

    // If previous result exists, show it
    const prev = localStorage.getItem('sisterLoveLast');
    if (prev) {
      try {
        const p = JSON.parse(prev);
        percentEl.textContent = p.percent + '% Sister Love';
        textEl.textContent = resultMessage(p.percent);
        resultBox.style.display = 'block';
      } catch (err) {}
    }
  }
});
