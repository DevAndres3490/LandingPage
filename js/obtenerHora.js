 // Obtener la hora actual en el formato HH:MM
 const today = new Date();
 let hour = today.getHours();
 let minutes = today.getMinutes();

 // Asegurarse de que la hora y los minutos tengan dos dígitos
 hour = (hour < 10) ? '0' + hour : hour;
 minutes = (minutes < 10) ? '0' + minutes : minutes;

 // Formatear la hora como HH:MM
 const currentTime = hour + ':' + minutes;

 // Seleccionar el elemento input de hora y establecer su atributo min y max
 const horaInput = document.getElementById('hora');
 horaInput.min = '08:00'; // Establecer la hora mínima
 horaInput.max = '18:00'; // Establecer la hora máxima

 // Si la hora actual es menor que la hora mínima, establecer la hora mínima como la hora actual
 if (currentTime < horaInput.min) {
     horaInput.value = horaInput.min;
 }
 // Si la hora actual es mayor que la hora máxima, establecer la hora máxima como la hora actual
 else if (currentTime > horaInput.max) {
     horaInput.value = horaInput.max;
 }
 // De lo contrario, establecer la hora actual como el valor predeterminado
 else {
     horaInput.value = currentTime;
 }