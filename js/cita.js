document.addEventListener('DOMContentLoaded', function () {
    const botonReservas = document.querySelector('.boton__reservas');
    const formulario = document.getElementById('reservaForm');
   

    botonReservas.addEventListener('click', function (e) {
      e.preventDefault(); // Previene la navegación al enlace
      formulario.classList.toggle('form__hidden');
      formulario.classList.toggle('form__show');
      // Opcional: reinicia el formulario después de ocultarlo
    formulario.reset();
    });

  });
