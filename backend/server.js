const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ferreteria'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    /*service: 'outlook',*/
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'clientes.ferreteria5hnos@outlook.com.ar',
        pass: '15/06/1977'
    }
});

// Crear productos
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    const sql = 'INSERT INTO productos (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, result) => {
        if (err) throw err;
        res.send('Producto agregado');
    });
});

// Leer productos
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Actualizar productos
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const sql = 'UPDATE productos SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [name, price, id], (err, result) => {
        if (err) throw err;
        res.send('Producto actualizado');
    });
});

// Eliminar productos
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Producto eliminado');
    });
});

// Enviar pedido por correo
app.post('/api/send-order', (req, res) => {
    const { name, email, phone, address, products } = req.body;

    const mailOptions = {
        from: email,
        to: 'clientes.ferreteria5hnos@outlook.com.ar', // El correo del local
        subject: 'Nuevo Pedido de Ferretería',
        html: `
            <h2>Nuevo Pedido</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo Electrónico:</strong> ${email}</p>
            <p><strong>Dirección:</strong> ${address}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Productos:</strong></p>
            <pre>${products}</pre>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo.');
        } else {
            res.send('Pedido enviado con éxito.');
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
