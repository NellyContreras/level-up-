document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const productos = document.querySelectorAll(".producto");
    const cartBtn = document.getElementById("cartBtn");
    const cartModal = document.getElementById("cartModal");
    const closeModal = document.querySelector("#cartModal .close");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const clearCartBtn = document.getElementById("clearCart");
    let cart = [];

    // Modal de pago
    const paymentModal = document.getElementById("paymentModal");
    const paymentCloseModal = document.querySelector("#paymentModal .close");
    const paymentTitle = document.getElementById("paymentTitle");
    const paymentFields = document.getElementById("paymentFields");

    // Función de búsqueda
    searchBar.addEventListener("keyup", function (event) {
        let searchQuery = event.target.value.toLowerCase();
        productos.forEach(producto => {
            let nombre = producto.dataset.nombre.toLowerCase();
            if (nombre.includes(searchQuery)) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }
        });
    });

    // Agregar productos al carrito
    document.querySelectorAll(".addToCart").forEach(button => {
        button.addEventListener("click", function () {
            let producto = this.parentElement;
            let nombre = producto.dataset.nombre;
            let precio = parseFloat(producto.dataset.precio);

            cart.push({ nombre, precio });
            actualizarCarrito();

            producto.style.boxShadow = "0 0 20px #0ff";
            setTimeout(() => {
                producto.style.boxShadow = "0 0 15px #0ff";
            }, 300);
        });
    });

    // Mostrar modal del carrito
    cartBtn.addEventListener("click", function () {
        cartModal.style.display = "flex";
        actualizarCarrito();
    });

    // Cerrar modal del carrito
    closeModal.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Vaciar carrito
    clearCartBtn.addEventListener("click", function () {
        cart = [];
        actualizarCarrito();
    });

    // Actualizar carrito
    function actualizarCarrito() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.addEventListener("click", function () {
                cart.splice(index, 1);
                actualizarCarrito();
            });
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
            total += item.precio;
        });

        cartTotal.textContent = total.toFixed(2);
        document.getElementById("cartCount").textContent = cart.length;
    }

    // Modal de pago
    document.querySelectorAll('#paymentOptions button').forEach(button => {
        button.addEventListener('click', () => {
            const paymentMethod = button.id;
            let paymentFieldsHTML = '';
            let paymentTitleText = '';

            switch (paymentMethod) {
                case 'paypalBtn':
                    paymentTitleText = 'Pago con PayPal';
                    paymentFieldsHTML = `
                        <label for="paypalEmail">Correo Electrónico de PayPal:</label>
                        <input type="email" id="paypalEmail" required>
                        <label for="paypalPassword">Contraseña de PayPal:</label>
                        <input type="password" id="paypalPassword" required>
                    `;
                    break;
                case 'mercadoPagoBtn':
                    paymentTitleText = 'Pago con Mercado Pago';
                    paymentFieldsHTML = `
                        <label for="mercadoPagoCardNumber">Número de Tarjeta:</label>
                        <input type="text" id="mercadoPagoCardNumber" required>
                        <label for="mercadoPagoExpiry">Fecha de Vencimiento:</label>
                        <input type="text" id="mercadoPagoExpiry" required>
                        <label for="mercadoPagoCVV">CVV:</label>
                        <input type="text" id="mercadoPagoCVV" required>
                    `;
                    break;
                case 'creditCardBtn':
                    paymentTitleText = 'Pago con Tarjeta de Crédito';
                    paymentFieldsHTML = `
                        <label for="creditCardNumber">Número de Tarjeta:</label>
                        <input type="text" id="creditCardNumber" required>
                        <label for="creditCardExpiry">Fecha de Vencimiento:</label>
                        <input type="text" id="creditCardExpiry" required>
                        <label for="creditCardCVV">CVV:</label>
                        <input type="text" id="creditCardCVV" required>
                    `;
                    break;
                case 'debitCardBtn':
                    paymentTitleText = 'Pago con Tarjeta de Débito';
                    paymentFieldsHTML = `
                        <label for="debitCardNumber">Número de Tarjeta:</label>
                        <input type="text" id="debitCardNumber" required>
                        <label for="debitCardExpiry">Fecha de Vencimiento:</label>
                        <input type="text" id="debitCardExpiry" required>
                        <label for="debitCardCVV">CVV:</label>
                        <input type="text" id="debitCardCVV" required>
                    `;
                    break;
                case 'oxxoBtn':
                    paymentTitleText = 'Pago en OXXO';
                    paymentFieldsHTML = `
                        <p>Se generará un código de barras para pagar en tu tienda OXXO más cercana.</p>
                    `;
                    break;
                default:
                    break;
            }

            paymentTitle.textContent = paymentTitleText;
            paymentFields.innerHTML = paymentFieldsHTML;
            paymentModal.style.display = 'block';
        });
    });

    paymentCloseModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });
    document.getElementById('paymentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        paymentModal.style.display = 'none';
    });

    // Formulario de contacto
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensaje").value;

        if (nombre === "" || email === "" || mensaje === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
        document.getElementById("contactForm").reset();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const productos = document.querySelectorAll('.producto');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const clearCart = document.getElementById('clearCart');
    const closeBtn = cartModal.querySelector('.close');
    const paymentModal = document.getElementById('paymentModal');
    const paymentTitle = document.getElementById('paymentTitle');
    const paymentFields = document.getElementById('paymentFields');
    const paymentForm = document.getElementById('paymentForm');
    let cart = [];

    // Función para actualizar el carrito en el modal
    function updateCartModal() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            cartItems.appendChild(li);
            total += item.precio;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    // Función para agregar un producto al carrito
    function addToCart(nombre, precio) {
        cart.push({ nombre, precio });
        updateCartModal();
    }

    // Event listeners para los botones "Agregar al Carrito"
    productos.forEach(producto => {
        producto.querySelector('.addToCart').addEventListener('click', function() {
            const nombre = producto.dataset.nombre;
            const precio = parseFloat(producto.dataset.precio);
            addToCart(nombre, precio);
        });
    });

    // Event listener para el botón "Carrito"
    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'flex';
        updateCartModal();
    });

    // Event listener para el botón "Vaciar Carrito"
    clearCart.addEventListener('click', function() {
        cart = [];
        updateCartModal();
    });

    // Event listener para cerrar el modal del carrito
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Event listeners para los botones de pago
    document.getElementById('paypalBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con PayPal';
        paymentFields.innerHTML = '<p>Redirigiendo a PayPal...</p>';
        paymentModal.style.display = 'flex';
    });

    document.getElementById('mercadoPagoBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Mercado Pago';
        paymentFields.innerHTML = '<p>Redirigiendo a Mercado Pago...</p>';
        paymentModal.style.display = 'flex';
    });

    document.getElementById('creditCardBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Tarjeta de Crédito';
        paymentFields.innerHTML = `
            <input type="text" placeholder="Número de tarjeta">
            <input type="text" placeholder="Fecha de expiración">
            <input type="text" placeholder="CVV">
        `;
        paymentModal.style.display = 'flex';
    });

    document.getElementById('debitCardBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Tarjeta de Débito';
        paymentFields.innerHTML = `
            <input type="text" placeholder="Número de tarjeta">
            <input type="text" placeholder="Fecha de expiración">
            <input type="text" placeholder="CVV">
        `;
        paymentModal.style.display = 'flex';
    });

    document.getElementById('oxxoBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago en OXXO';
        paymentFields.innerHTML = '<p>Generando código de barras...</p>';
        paymentModal.style.display = 'flex';
    });

    // Event listener para el botón "Pagar"
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe realmente
        paymentFields.innerHTML = '<p>Pago realizado exitosamente</p>'; // Muestra el mensaje de éxito
        setTimeout(() => {
            paymentModal.style.display = 'none'; // Cierra el modal después de unos segundos
        }, 3000); // Cierra el modal después de 3 segundos
    });

    // Event listener para cerrar el modal de pago
    paymentModal.querySelector('.close').addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const productos = document.querySelectorAll('.producto');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const clearCart = document.getElementById('clearCart');
    const closeBtn = cartModal.querySelector('.close');
    const paymentModal = document.getElementById('paymentModal');
    const paymentTitle = document.getElementById('paymentTitle');
    const paymentFields = document.getElementById('paymentFields');
    const paymentForm = document.getElementById('paymentForm');
    let cart = [];

    // Función para actualizar el carrito en el modal
    function updateCartModal() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function() {
                cart.splice(index, 1); // Elimina el producto del carrito
                updateCartModal(); // Actualiza el modal del carrito
            });

            li.appendChild(deleteBtn);
            cartItems.appendChild(li);
            total += item.precio;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    // Función para agregar un producto al carrito
    function addToCart(nombre, precio) {
        cart.push({ nombre, precio });
        updateCartModal();
    }

    // Event listeners para los botones "Agregar al Carrito"
    productos.forEach(producto => {
        producto.querySelector('.addToCart').addEventListener('click', function() {
            const nombre = producto.dataset.nombre;
            const precio = parseFloat(producto.dataset.precio);
            addToCart(nombre, precio);
        });
    });

    // Event listener para el botón "Carrito"
    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'flex';
        updateCartModal();
    });

    // Event listener para el botón "Vaciar Carrito"
    clearCart.addEventListener('click', function() {
        cart = [];
        updateCartModal();
    });

    // Event listener para cerrar el modal del carrito
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Event listeners para los botones de pago
    document.getElementById('paypalBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con PayPal';
        paymentFields.innerHTML = '<p>Redirigiendo a PayPal...</p>';
        paymentModal.style.display = 'flex';
    });

    document.getElementById('mercadoPagoBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Mercado Pago';
        paymentFields.innerHTML = '<p>Redirigiendo a Mercado Pago...</p>';
        paymentModal.style.display = 'flex';
    });

    document.getElementById('creditCardBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Tarjeta de Crédito';
        paymentFields.innerHTML = `
            <input type="text" placeholder="Número de tarjeta">
            <input type="text" placeholder="Fecha de expiración">
            <input type="text" placeholder="CVV">
        `;
        paymentModal.style.display = 'flex';
    });

    document.getElementById('debitCardBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago con Tarjeta de Débito';
        paymentFields.innerHTML = `
            <input type="text" placeholder="Número de tarjeta">
            <input type="text" placeholder="Fecha de expiración">
            <input type="text" placeholder="CVV">
        `;
        paymentModal.style.display = 'flex';
    });

    document.getElementById('oxxoBtn').addEventListener('click', function() {
        paymentTitle.textContent = 'Pago en OXXO';
        paymentFields.innerHTML = '<p>Generando código de barras...</p>';
        paymentModal.style.display = 'flex';
    });

    // Event listener para el botón "Pagar"
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe realmente
        paymentFields.innerHTML = '<p>Pago realizado exitosamente</p>'; // Muestra el mensaje de éxito
        setTimeout(() => {
            paymentModal.style.display = 'none'; // Cierra el modal después de unos segundos
        }, 3000); // Cierra el modal después de 3 segundos
    });

    // Event listener para cerrar el modal de pago
    paymentModal.querySelector('.close').addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
});