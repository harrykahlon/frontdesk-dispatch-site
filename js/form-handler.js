// js/form-handler.js
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/9yribpas3tfml2rp3upg992rhp6tem89'; // <--- PASTE YOUR MAKE WEBHOOK URL HERE

function showFormStatus(message, isSuccess = true) {
  const statusDiv = document.getElementById('form-status');
  if (!statusDiv) return;

  // Configure status banner styling
  statusDiv.className = `rounded-lg p-4 mb-4 text-sm font-medium transition-all duration-200 ${
    isSuccess 
      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
      : 'bg-red-500/10 border border-red-500/30 text-red-400'
  }`;
  
  statusDiv.textContent = message;
  statusDiv.classList.remove('hidden');

  // Smooth scroll to notification if needed
  statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide error messages after 6 seconds (keep success messages visible)
  if (!isSuccess) {
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 6000);
  }
}

function hideFormStatus() {
  const statusDiv = document.getElementById('form-status');
  if (statusDiv) {
    statusDiv.classList.add('hidden');
  }
}

async function handleFormSubmit(event) {
  if (event) event.preventDefault();

  hideFormStatus();

  const form = event ? event.target : (document.getElementById('dispatch-intake-form') || document.querySelector('form'));
  const phoneInput = document.getElementById('phone');
  const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

  // Validate exact 10-digit phone requirement
  if (phoneDigits.length !== 10) {
    showFormStatus('Please enter a valid 10-digit phone number.', false);
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
      if (form) form.reset();
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = originalButtonText;
      }

      showFormStatus('Thank you! Your request has been received. We will be in touch shortly.', true);
    } else {
      showFormStatus('Submission failed. Please try again or check your configuration.', false);
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = originalButtonText;
      }
    }
  } catch (error) {
    console.error('Submission Error:', error);
    showFormStatus('An error occurred during submission. Please try again.', false);
    
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerText = originalButtonText;
    }
  }

  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dispatch-intake-form') || document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
