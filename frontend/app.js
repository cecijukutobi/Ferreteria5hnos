// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
    };

    const addProduct = async () => {
        await axios.post('http://localhost:3001/api/products', newProduct);
        fetchProducts();
        setNewProduct({ name: '', price: '' });
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        fetchProducts();
    };

    const addToOrder = (product) => {
        setOrder([...order, product]);
        alert(`${product.name} agregado al carrito.`);
    };

    const sendOrder = async () => {
        if (order.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        await axios.post('http://localhost:3001/api/send-order', {
            ...customer,
            products: order.map(product => `${product.name} - $${product.price}`).join('\n')
        });

        alert('Pedido enviado al dueño de la ferretería.');
        setOrder([]);
        setCustomer({ name: '', email: '', phone: '' });
    };

    return (
        <div>
            <h1>Ferretería</h1>
            <div>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Precio"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <button onClick={addProduct}>Agregar Producto</button>
            </div>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Precio: ${product.price}</p>
                        <button onClick={() => addToOrder(product)}>Agregar al carrito</button>
                        <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Datos del Cliente</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
                <button onClick={sendOrder}>Enviar Pedido</button>
            </div>
        </div>
    );
};

export default App;