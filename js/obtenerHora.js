// Función para actualizar las horas disponibles cuando cambia la fecha
function actualizarHorasDisponibles() {
    const fechaInput = document.getElementById('fecha').value;
    const selectedDate = new Date(fechaInput);
    const currentDay = selectedDate.getDay();
    const currentHour = new Date().getHours();
    let limitHour;

    // Determinar el límite de horas según el día de la semana
    if (currentDay >= 1 && currentDay <= 5) { // De lunes a viernes
        limitHour = 19;
    } else if (currentDay === 6) { // Sábado
        limitHour = 15;
    } else { // Domingo
        limitHour = 0; // No se permiten reservas los domingos
    }

    // Si la fecha es hoy, limitar las horas disponibles a partir de la hora actual
    if (selectedDate.toDateString() === new Date().toDateString()) {
        limitHour = Math.min(limitHour, 19); // Limitar al horario de cierre, independientemente del día
    }

    const horaSelect = document.getElementById('hora');
    horaSelect.innerHTML = ''; // Limpiar opciones anteriores

    // Si es lunes a viernes, el límite es 19, si es sábado, el límite es 15
    for (let i = 9; i <= limitHour && i <= 19; i++) {
        const option = document.createElement('option');
        option.text = `${i}:00`; // Formato de hora HH:00
        horaSelect.add(option);
    }
}

// Agregar un evento change al input de fecha para actualizar las horas disponibles
document.getElementById('fecha').addEventListener('change', actualizarHorasDisponibles);

// Llamar a la función al cargar la página para mostrar las horas disponibles basadas en la fecha inicial
actualizarHorasDisponibles();
