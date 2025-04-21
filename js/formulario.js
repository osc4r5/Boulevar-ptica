document.getElementById('form-contacto').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que se recargue la página

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (nombre && email.includes('@')) {
        alert('¡Gracias! Tu mensaje ha sido enviado.');
      this.reset();  // Limpia el formulario
    } else {
        alert('Por favor, completa los campos correctamente.');
    }
});