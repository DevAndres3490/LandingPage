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


//funcion para cuando el cliete no sepa que tipo de servicio elegir


  document.getElementById('servicio').addEventListener('change', function() {
    var servicioSeleccionado = this.value;
    var otroServicio = document.getElementById('otroServicio');
    
    if(servicioSeleccionado === 'servicio11') { // Si se selecciona "Otro"
        otroServicio.classList.remove('other__hidden');
        otroServicio.classList.add('other__show');
    } else {
        otroServicio.classList.remove('other__show');
        // Espera a que la transición termine para ocultar completamente
        setTimeout(() => {
            otroServicio.classList.add('other__hidden');
        }, 500); // Ajusta este tiempo al de la duración de tu transición
    }
});