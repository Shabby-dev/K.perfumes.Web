 const formulario = document.getElementById('formulario-contacto');
const mensajeExito = document.getElementById('mensaje-exito');

  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Muestra el mensaje con animación
    mensajeExito.style.display = 'block';

    // Borra el formulario (opcional)
    formulario.reset();

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      mensajeExito.style.display = 'none';
    }, 5000);
});