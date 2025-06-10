 const formulario = document.getElementById('formulario-contacto');
const mensajeExito = document.getElementById('mensaje-exito');

  formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío real

    // Aquí podrías enviar los datos a un servidor con fetch()

    // Muestra el mensaje con animación
    mensajeExito.style.display = 'block';

    // Borra el formulario (opcional)
    formulario.reset();

    // Ocultar el mensaje después de 5 segundos (opcional)
    setTimeout(() => {
      mensajeExito.style.display = 'none';
    }, 5000);
});