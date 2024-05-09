// Obtener la fecha actual en el formato YYYY-MM-DD
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

// Asegurarse de que el mes y el día tengan dos dígitos
month = (month < 10) ? '0' + month : month;
day = (day < 10) ? '0' + day : day;

// Formatear la fecha como YYYY-MM-DD
const currentDate = year + '-' + month + '-' + day;

// Seleccionar el elemento input de fecha y establecer su atributo min
document.getElementById('fecha').min = currentDate;
