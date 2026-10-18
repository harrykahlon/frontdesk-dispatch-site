// js/phone-format.js

function formatPhoneNumber(input) {
  if (!input) return;
  let digits = input.value.replace(/\D/g, '');

  if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }

  if (digits.length === 0) {
    input.value = '';
  } else if (digits.length <= 3) {
    input.value = `(${digits}`;
  } else if (digits.length <= 6) {
    input.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    input.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => formatPhoneNumber(e.target));
  }
});
