const socket = io();

// Manejar la solicitud POST del formulario
document.getElementById('panelForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
    if (response.ok) {
        // Limpiar el formulario después de agregar el producto
        event.target.reset();
    }
});

// Manejar actualizaciones en tiempo real de la lista de productos
socket.on('products', (products) => {
    // Actualizar la lista de productos del usuario
    const productList = document.getElementById('userProductsList');
    productList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos productos
    products.forEach(product => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <form class="deleteForm" data-product-id="${product._id}">
                <button type="button" class="deleteButton">Eliminar</button>
            </form>
        `;
        productList.appendChild(newItem);
    });
});

// Manejar la eliminación de productos
document.getElementById('userProductsList').addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const productId = event.target.parentElement.dataset.productId;
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Eliminar el producto de la lista después de eliminarlo del servidor
            event.target.parentElement.parentElement.remove();
        }
    }
});