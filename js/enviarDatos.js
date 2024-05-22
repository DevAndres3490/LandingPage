document.getElementById('reservaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (!fecha || !hora) {
        alert('Por favor, introduce una fecha y hora válidas.');
        return;
    }

    const fechaHoraLocal = new Date(`${fecha}T${hora}:00`);
    
    if (isNaN(fechaHoraLocal.getTime())) {
        alert('Por favor, introduce una fecha y hora válidas.');
        return;
    }

    const fechaHoraUTC = new Date(fechaHoraLocal.getTime() - (fechaHoraLocal.getTimezoneOffset() * 60000)).toISOString();

    
    const servicioSelect = document.getElementById('servicioSelect');
    let servicioSeleccionado = '';

    if (servicioSelect && servicioSelect.selectedIndex !== -1) {
        servicioSeleccionado = servicioSelect.options[servicioSelect.selectedIndex].value;
    }

    const formData = {
        name: document.getElementById('name').value,
        last_name: document.getElementById('apellido').value,
        phone_number: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        service_type: servicioSeleccionado,
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
});

