// script.js - behavior for the template (no targeting of real private numbers)
(() => {
  const phoneDisplay = document.getElementById('phoneDisplay');
  const phoneInput = document.getElementById('phoneInput');
  const setPhoneBtn = document.getElementById('setPhoneBtn');
  const maskToggleBtn = document.getElementById('maskToggleBtn');

  let currentPhone = '+62 ••• •••• ••••';
  let masked = true;

  function maskNumber(num) {
    // naive mask: show country code and mask middle digits
    const cleaned = num.replace(/\s+/g,'');
    if (!cleaned) return '+62 ••• •••• ••••';
    if (cleaned.length <= 4) return cleaned;
    const start = cleaned.slice(0,3);
    const end = cleaned.slice(-3);
    return start + ' ••• •' + end;
  }

  setPhoneBtn.addEventListener('click', () => {
    const val = phoneInput.value.trim();
    if (!val) {
      currentPhone = '+62 ••• •••• ••••';
    } else {
      // Do not persist or validate deeply — user is responsible for what they type.
      currentPhone = val;
    }
    phoneDisplay.textContent = masked ? maskNumber(currentPhone) : currentPhone;
  });

  maskToggleBtn.addEventListener('click', () => {
    masked = !masked;
    phoneDisplay.textContent = masked ? maskNumber(currentPhone) : currentPhone;
  });

  // --- Quiz logic ---
  const statements = [
    'Saya bisa terbang tanpa alat bantu.',
    'Saya pernah memenangkan lomba menyanyi.',
    'Saya tidur 2 jam sehari.',
    'Saya makan 10 porsi nasi dalam sehari.',
    'Saya lahir di bulan Februari.'
  ];
  let idx = 0;

  const statementEl = document.getElementById('statement');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextStatement');
  const addBtn = document.getElementById('addStatementBtn');
  const addForm = document.getElementById('addForm');
  const newStatement = document.getElementById('newStatement');
  const saveStatement = document.getElementById('saveStatement');

  function showStatement(i){
    statementEl.textContent = statements[i % statements.length];
    feedbackEl.textContent = '';
  }

  document.querySelector('.truth-btn').addEventListener('click', () => {
    feedbackEl.textContent = 'Kamu memilih: BENAR — ini hanya permainan, bukan bukti nyata.';
  });
  document.querySelector('.lie-btn').addEventListener('click', () => {
    feedbackEl.textContent = 'Kamu memilih: BOHONG — ingat etika sebelum menuduh nyata.';
  });

  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % statements.length;
    showStatement(idx);
  });

  addBtn.addEventListener('click', () => {
    addForm.classList.toggle('hidden');
  });
  saveStatement.addEventListener('click', () => {
    const txt = newStatement.value.trim();
    if (txt) {
      statements.push(txt);
      newStatement.value = '';
      addForm.classList.add('hidden');
      idx = statements.length - 1;
      showStatement(idx);
    }
  });

  // init
  phoneDisplay.textContent = '+62 ••• •••• ••••';
  showStatement(0);
})();
