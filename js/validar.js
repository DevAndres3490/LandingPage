document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        event.preventDefault(); // Prevent the form from actually submitting

        // Show the modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        // Redirect to the homepage after a delay
        setTimeout(() => {
          window.location.href = 'index.html'; // Change this to your homepage URL
        }, 3000);
      }
    }, false);
  });

  const phoneInput = document.getElementById('telefono');
  const phonePattern = /^\d{6,14}$/;

  phoneInput.addEventListener('input', function () {
    if (phonePattern.test(phoneInput.value)) {
      phoneInput.setCustomValidity('');
    } else {
      phoneInput.setCustomValidity('Por favor ingrese un número de teléfono válido (6 a 14 dígitos).');
    }
  });

  const emailInput = document.getElementById('email');
  const emailMinLength = 10;
  const emailMaxLength = 40;

  emailInput.addEventListener('input', function () {
    const emailValue = emailInput.value;
    if (emailValue.length >= emailMinLength && emailValue.length <= emailMaxLength) {
      emailInput.setCustomValidity('');
    } else {
      emailInput.setCustomValidity(`Por favor ingrese un correo electrónico válido (${emailMinLength} a ${emailMaxLength} caracteres).`);
    }
  });

  const fechaInput = document.getElementById('fecha');
  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);

  fechaInput.addEventListener('input', function () {
    if (new Date(fechaInput.value) < new Date(today)) {
      fechaInput.setCustomValidity('Por favor seleccione una fecha válida.');
    } else {
      fechaInput.setCustomValidity('');
    }
  });

  const nameInput = document.getElementById('name');
  const apellidoInput = document.getElementById('apellido');
  const textPattern = /^[A-Za-z\s]+$/;

  function validateTextInput(input, errorMessage) {
    if (textPattern.test(input.value)) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity(errorMessage);
    }
  }

  nameInput.addEventListener('input', function () {
    validateTextInput(nameInput, 'Por favor ingrese un nombre válido sin números.');
  });

  apellidoInput.addEventListener('input', function () {
    validateTextInput(apellidoInput, 'Por favor ingrese un apellido válido sin números.');
  });

  function actualizarHorasDisponibles() {
    const fechaInput = document.getElementById('fecha').value;
    const selectedDate = new Date(fechaInput);
    const currentDate = new Date();
    const currentDay = selectedDate.getDay();
    const currentHour = currentDate.getHours();
    let limitHour;

    // Determinar el límite de horas según el día de la semana
    if (currentDay >= 1 && currentDay <= 5) { // De lunes a viernes
      limitHour = 19;
    } else if (currentDay === 6) { // Sábado
      limitHour = 15;
    } else { // Domingo
      limitHour = 0; // No se permiten reservas los domingos
    }

    const horaSelect = document.getElementById('hora');
    horaSelect.innerHTML = ''; // Limpiar opciones anteriores

    // Si la fecha es hoy, limitar las horas disponibles a partir de la hora actual
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      for (let i = Math.max(currentHour + 1, 9); i <= limitHour && i <= 19; i++) {
        const option = document.createElement('option');
        option.text = `${i}:00`; // Formato de hora HH:00
        horaSelect.add(option);
      }
    } else {
      // Si no es hoy, mostrar todas las horas disponibles dentro del límite
      for (let i = 9; i <= limitHour && i <= 19; i++) {
        const option = document.createElement('option');
        option.text = `${i}:00`; // Formato de hora HH:00
        horaSelect.add(option);
      }
    }
  }

  // Agregar un evento change al input de fecha para actualizar las horas disponibles
  document.getElementById('fecha').addEventListener('change', actualizarHorasDisponibles);

  // Llamar a la función al cargar la página para mostrar las horas disponibles basadas en la fecha inicial
  actualizarHorasDisponibles();
});
