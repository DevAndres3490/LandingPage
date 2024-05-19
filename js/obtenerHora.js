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
