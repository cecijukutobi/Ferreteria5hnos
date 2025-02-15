const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

// Middleware y CORS
app.use(cors());
app.use(express.json());

// Conexión a MySQL
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

// Crear productos
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO productos (name, price) VALUES (?, ?)', [name, price], (err) => {
        res.send(err ? 'Error al agregar producto.' : 'Producto agregado');
    });
});

// Leer productos
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        res.json(err ? [] : results);
    });
});

// Actualizar productos
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    db.query('UPDATE productos SET name = ?, price = ? WHERE id = ?', [name, price, id], (err) => {
        res.send(err ? 'Error al actualizar producto.' : 'Producto actualizado');
    });
});

// Eliminar productos
app.delete('/api/products/:id', (req, res) => {
    db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
        res.send(err ? 'Error al eliminar producto.' : 'Producto eliminado');
    });
});

// Guardar pedidos
app.post('/api/orders', (req, res) => {
    const { name, email, phone, address, products } = req.body;
    db.query('INSERT INTO pedidos (name, email, phone, address, products) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, address, products], (err) => {
        res.send(err ? 'Error al guardar pedido.' : 'Pedido guardado con éxito.');
    });
});

// Obtener pedidos
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        res.json(err ? [] : results);
    });
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});

// config correo
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'clientes.ferreteria5hnos@outlook.com.ar',
        pass: '15/06/1977'
    }
});


/*

*/