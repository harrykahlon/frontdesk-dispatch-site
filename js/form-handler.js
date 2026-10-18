// js/form-handler.js
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/9yribpas3tfml2rp3upg992rhp6tem89'; // <--- PASTE YOUR MAKE WEBHOOK URL HERE

async function handleFormSubmit(event) {
  if (event) event.preventDefault();

  const form = event ? event.target : (document.getElementById('dispatch-form') || document.querySelector('form'));
  const phoneInput = document.getElementById('phone');
  const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

  // Validate exact 10-digit phone requirement
  if (phoneDigits.length !== 10) {
    alert('Please enter a valid 10-digit phone number.');
    if (phoneInput) phoneInput.focus();
    return false;
  }

  const submitButton = form ? form.querySelector('button[type="submit"]') : null;
  const originalButtonText = submitButton ? submitButton.innerText : 'Submit';

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerText = 'Submitting...';
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.phone = phoneInput ? phoneInput.value : '';
    payload.raw_phone = phoneDigits;

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      if (form) form.reset();
    } else {
      alert('Submission failed. Please check webhook configuration.');
    }
  } catch (error) {
    console.error('Submission Error:', error);
    alert('An error occurred during submission. Please try again.');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerText = originalButtonText;
    }
  }

  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dispatch-form') || document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
