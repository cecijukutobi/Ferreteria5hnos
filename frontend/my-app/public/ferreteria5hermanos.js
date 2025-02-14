document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const orderForm = document.getElementById('order-form');
    const productsInput = document.getElementById('products-input');

    // Base de datos de productos
    const products = [
        { id: 1, name: 'Martillo', price: 100 },
        { id: 2, name: 'Mosquitero', price: 150 },
        { id: 3, name: 'Destornillador', price: 2080 },
        { id: 4, name: 'Lijas', price: 100 },
        { id: 5, name: 'Llaves', price: 150 },
        { id: 6, name: 'Lamparas', price: 2080 },
    ];

    // Mostrar productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Precio: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
        `;
        productList.appendChild(productDiv);
    });

    // Placeholder para el pedido
    const order = [];

    // Funcionalidad de agregar al carrito
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.dataset.id;
            const product = products.find(p => p.id === parseInt(productId));
            order.push(product);
            cartCount.innerText = order.length;
            alert(`${product.name} agregado al carrito.`);
        }
    });


    // Enviar pedido
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (order.length > 0) {
            // Recopilar detalles del pedido y enviar al backend
            const formData = new FormData(orderForm);
            const orderDetails = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('direccion'),
                products: JSON.stringify(order)
            };

            fetch('http://localhost:3001/api/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            })
            .then(response => response.text())
            .then(message => alert(message))
            .catch(error => console.error('Error sending order:', error));
        } else {
            alert('El carrito está vacío.');
        }
    });
});
