const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();

app.use(express.static(__dirname));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes POST

mongoose.connect('mongodb://127.0.0.1:27017/reservas');
const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb connection satisfactoria");
});

const reservaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    email: String,
    fecha: Date,
    hora: String,
    servicio: String,
    otro: String
});

const Reserva = mongoose.model('Reserva', reservaSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto.html'));
});


app.post('/post', async (req, res) => {
    const { nombre, apellido, telefono, email, fecha, hora, servicio, otro } = req.body;

    const reserva = new Reserva({
        nombre,
        apellido,
        telefono,
        email,
        fecha,
        hora,
        servicio,
        otro
    });

    try {
        await reserva.save();
        console.log(reserva);
        console.log(req.body)
        res.send('Formulario completado y enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la reserva');
    }
});

app.listen(port, () => {
    console.log("Servidor iniciado");
});
