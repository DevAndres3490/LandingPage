document.addEventListener('DOMContentLoaded', function () {
    const botonEnviar = document.getElementById('botonEnviar');
    const formulario = document.getElementById('reservaForm');
    const inputs = formulario.querySelectorAll('.controls[required]');
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function validateInput(input) {
        if (input.type === "email" && !isValidEmail(input.value)) {
            input.classList.add('is-invalid');
            return false;
        } else if (!input.value) {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
            return true;
        }
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) isValid = false;

            let feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.style.display = input.classList.contains('is-invalid') ? 'inline' : 'none';
            }
        });
        botonEnviar.disabled = !isValid;
        const mensajeError = document.getElementById('mensajeError');
        if (!isValid) {
            mensajeError.style.display = 'block'; // Muestra el mensaje si el formulario no es válido.
        } else {
            mensajeError.style.display = 'none'; // Oculta el mensaje si el formulario es válido.
        }
        return isValid; // Retorna el estado de validez del formulario.
    }

    botonEnviar.addEventListener('click', function(e) {
        e.preventDefault(); 
        const formIsValid = validateForm(); // Valida el formulario y guarda el estado.
        
        if (formIsValid) { // Solo oculta y reinicia el formulario si es válido.
            formulario.classList.add('form__hidden');
            formulario.classList.remove('form__show');
            formulario.reset();
        }
    });

    inputs.forEach(input => {
        // Añade un evento de 'focus' para iniciar la validación una vez que el usuario se enfoca en el input por primera vez.
        input.addEventListener('focus', function() {
            // Agrega un manejador de eventos 'input' y 'change' después del primer 'focus'.
            input.addEventListener('input', validateForm);
            input.addEventListener('change', validateForm);
        }, { once: true }); // Esto asegura que el evento de 'focus' solo añada los manejadores una vez.
    
        // Verifica si ya existe un elemento de feedback de error. Si no, lo crea y lo añade.
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
            const span = document.createElement('span');
            span.classList.add('invalid-feedback');
            span.textContent = '*'; // El asterisco se muestra siempre, pero podrías controlar su visibilidad con CSS y clases basadas en la validación.
            input.parentNode.insertBefore(span, input.nextSibling);
        }
    });
    // Llamada inicial para establecer el estado del botón basado en los valores iniciales.
    //validateForm();
});
