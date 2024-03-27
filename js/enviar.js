document.addEventListener('DOMContentLoaded', function () {

    const botonEnviar = document.getElementById('botonEnviar')
    const formulario = document.getElementById('reservaForm');
    


    botonEnviar.addEventListener('click', function(e) {
       // Aquí podrías agregar lógica para validar y enviar los datos del formulario.
    // Por ahora, solo ocultaremos el formulario.
    e.preventDefault(); 
    
    formulario.classList.add('form__hidden'); // Asegúrate de que esta clase oculta el formulario.
    formulario.classList.remove('form__show'); // Remueve la clase que muestra el formulario.

    // Opcional: reinicia el formulario después de ocultarlo
    formulario.reset();
    })
  });
