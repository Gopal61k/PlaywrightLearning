const form = document.getElementById('demo-form');
const message = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') || 'there';
    message.textContent = `Thanks, ${name}! Your demo request has been received.`;
    form.reset();
  });
}
