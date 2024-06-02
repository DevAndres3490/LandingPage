document.addEventListener('DOMContentLoaded', function () {
  const fechaInput = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');

  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);

  fechaInput.addEventListener('input', function () {
      const selectedDate = new Date(fechaInput.value);
      const dayOfWeek = selectedDate.getUTCDay();
      const hours = [];

      horaSelect.innerHTML = '<option value="" selected>Seleccione una hora</option>'; // Reset options

      if (dayOfWeek === 0) {
          alert('Por favor, selecciona un día hábil (lunes a sábado).');
          fechaInput.value = '';
          return;
      }

      if (dayOfWeek === 6) {
          for (let hour = 9; hour < 13; hour++) {
              hours.push(hour);
          }
      } else {
          for (let hour = 9; hour < 18; hour++) {
              hours.push(hour);
          }
      }

      const now = new Date();
      if (selectedDate.toDateString() === now.toDateString()) {
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          const startHour = currentMinute > 0 ? currentHour + 1 : currentHour;

          for (let hour = startHour; hour < 18; hour++) {
              if (dayOfWeek !== 6 || hour < 13) {
                  horaSelect.innerHTML += `<option value="${String(hour).padStart(2, '0')}:00">${String(hour).padStart(2, '0')}:00</option>`;
              }
          }
      } else {
          hours.forEach(hour => {
              horaSelect.innerHTML += `<option value="${String(hour).padStart(2, '0')}:00">${String(hour).padStart(2, '0')}:00</option>`;
          });
      }
  });
});

(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms)
      .forEach(function (form) {
          form.addEventListener('submit', async function (event) {
              if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
                  form.classList.add('was-validated');
                  return;
              }

              event.preventDefault();

              const nombre = document.getElementById('name').value;
              const apellido = document.getElementById('apellido').value;
              const telefono = document.getElementById('telefono').value;
              const email = document.getElementById('email').value;
              const fecha = document.getElementById('fecha').value;
              const hora = document.getElementById('hora').value;
              const servicio = document.getElementById('servicio').value;

              const fechaHoraLocal = new Date(`${fecha}T${hora}:00`);
              const fechaHoraUTC = new Date(fechaHoraLocal.getTime() - (fechaHoraLocal.getTimezoneOffset() * 60000)).toISOString();

              const formData = {
                  name: nombre,
                  last_name: apellido,
                  phone_number: telefono,
                  email: email,
                  service_type: servicio,
                  state: "Pending",
                  appointment_date: fechaHoraUTC
              };

              console.log('Datos enviados:', JSON.stringify(formData));

              try {
                  const response = await fetch('https://localhost:7257/api/appointment', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                  });

                  if (!response.ok) {
                      const errorText = await response.text();
                      throw new Error('Hubo un problema al enviar los datos. Respuesta del servidor: ' + errorText);
                  }

                  const data = await response.json();
                  console.log(data);
                  alert('Datos enviados con éxito');
                  window.location.href = 'index.html';
              } catch (error) {
                  console.error('Error:', error);
                  alert('Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo más tarde.');
              }
          }, false);
      });
})();