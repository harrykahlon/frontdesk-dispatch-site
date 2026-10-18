async function handleFormSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('dispatch-intake-form');
    const alertBox = document.getElementById('success-alert');
    const submitBtn = document.getElementById('submit-btn');

    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Submitting...';
    submitBtn.disabled = true;

    const formData = {
        full_name: document.getElementById('fullName')?.value || "",
        email: document.getElementById('email')?.value || "",
        phone: (document.getElementById('phone')?.value || "").replace(/\D/g, ''),
        service_type: document.getElementById('serviceNeeded')?.value || "Automated SMS Dispatch",
        message: document.getElementById('message')?.value || "",
        industry: document.getElementById('industry')?.value || "other",
        opt_in_consent: document.getElementById('smsConsent')?.checked || false,
        submitted_at: new Date().toISOString()
    };

    try {
        const response = await fetch("https://hook.us2.make.com/9yribpas3tfml2rp3upg992rhp6tem89", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alertBox.classList.remove('hidden');
            form.reset();
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (err) {
        console.error("Error submitting form:", err);
        alert("An error occurred during submission. Please try again.");
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
}
