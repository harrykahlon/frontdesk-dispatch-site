// js/phone-format.js

document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Strip all non-numeric characters
      let digits = e.target.value.replace(/\D/g, '');

      // Restrict length to maximum 10 digits
      if (digits.length > 10) {
        digits = digits.slice(0, 10);
      }

      // Apply (XXX) XXX-XXXX formatting
      if (digits.length === 0) {
        e.target.value = '';
      } else if (digits.length <= 3) {
        e.target.value = `(${digits}`;
      } else if (digits.length <= 6) {
        e.target.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        e.target.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    });
  }
});

/**
 * Utility function to extract clean 10-digit string
 * @returns {string} Digits only
 */
function getRawPhoneDigits() {
  const phoneInput = document.getElementById('phone');
  return phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
}
