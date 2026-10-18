// js/form-handler.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dispatch-form') || document.querySelector('form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const phoneInput = document.getElementById('phone');
      const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

      // Validate exact 10-digit phone requirement
      if (phoneDigits.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        if (phoneInput) {
          phoneInput.focus();
          phoneInput.classList.add('border-red-500'); // Optional visual cue
        }
        return; // Halts form submission completely
      }

      // Collect form data payload
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      
      // Ensure formatted and raw phone digits are included
      payload.phone = phoneInput ? phoneInput.value : '';
      payload.raw_phone = phoneDigits;

      try {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerText = 'Submitting...';
        }

        // Replace with your Make.com Webhook URL if applicable
        const response = await fetch(form.action || 'YOUR_MAKE_WEBHOOK_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          form.reset();
        } else {
          alert('Submission failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      } finally {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerText = 'Submit';
        }
      }
    });
  }
});
