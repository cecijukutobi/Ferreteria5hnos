document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const orderForm = document.getElementById('order-form');
    const productsInput = document.getElementById('products-input');

    // base de datos de productos
    const products = [
        { id: 1, name: 'Martillo', price: 100 },
        { id: 2, name: 'Llave inglesa', price: 150 },
        { id: 3, name: 'Destornillador', price: 2080 }
       
    ];

    // Display products
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

    // Placeholder for order
    const order = [];

    // Add to cart functionality
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.dataset.id;
            const product = products.find(p => p.id === parseInt(productId));
            order.push(product);
            alert(`${product.name} agregado al carrito.`);
        }
    });

    // enviar pedido
    sendOrderButton.addEventListener('click', function() {
        if (order.length > 0) {
            // enviar pedido backend
            console.log('Orden enviada:', order);
            alert('Orden enviada al dueño de la ferretería.');
        } else {
            alert('El carrito está vacío.');
        }
    });
});
