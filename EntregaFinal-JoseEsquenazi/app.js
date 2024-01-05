
let totalVentas = 0;
let carrito = [];

const productos = [
    { id: 1, nombre: "Camiseta titular", precio: 30000, imagen: "camiseta_titular.jpg" },
    { id: 2, nombre: "Camiseta suplente", precio: 30000, imagen: "camiseta_suplente.jpg" },
    { id: 3, nombre: "Camiseta alternativa", precio: 30000, imagen: "camiseta_alternativa.jpg" },
    { id: 4, nombre: "Bufanda", precio: 5000, imagen: "bufanda.jpg" },
    { id: 5, nombre: "Gorra", precio: 15000, imagen: "gorra.jpg" },
    { id: 6, nombre: "Campera", precio: 50000, imagen: "campera.jpg" },
];

document.addEventListener('DOMContentLoaded', function () {
    const realizarPagoBtn = document.getElementById('realizarPagoBtn');
    const cargarDatosBtn = document.getElementById('cargarDatosBtn');

    if (realizarPagoBtn) {

        realizarPagoBtn.addEventListener('click', function (event) {

            event.preventDefault();
            console.log('Haciendo clic en realizarPagoBtn en index.html');
            redirigirAFormularioPago();
        });
    } else if (cargarDatosBtn) {

        cargarDatosBtn.addEventListener('click', function () {
            cargarDatos();
            mostrarFormularioPago();
        });

        const realizarPagoFormBtn = document.getElementById('realizarPagoFormBtn');
        realizarPagoFormBtn.addEventListener('click', function (event) {

            event.preventDefault();
            console.log('Haciendo clic en realizarPagoFormBtn en formularioPago.html');
            procesarPago().then(() => {

                limpiarFormulario();

                alert('¡Gracias por su compra!');
                console.log('Redirigiendo a index.html');

                window.location.href = 'index.html';
            });
        });
    }

    mostrarCatalogo();
    configurarBotones();
});

    function mostrarCatalogo() {
        const filaSuperior = document.getElementById('fila-superior');
        const filaInferior = document.getElementById('fila-inferior');
    
        for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const productoHTML = document.createElement('div');
        productoHTML.innerHTML = `
            <p>ID: ${producto.id} - ${producto.nombre}, Precio: $${producto.precio}</p>
            <img src="./img/${producto.imagen}" alt="${producto.nombre}">
            <button class="agregarBtn" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
        `;
    

        if (i < 3) {
            filaSuperior.appendChild(productoHTML);
        } else {
            filaInferior.appendChild(productoHTML);
        }
        }
    }
    

function configurarBotones() {
    const agregarBtns = document.querySelectorAll('.agregarBtn');

    agregarBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            const precio = parseFloat(this.getAttribute('data-precio'));

            mostrarOpcionesCompra(id, nombre, precio);

            document.getElementById('opcionesCompra').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function mostrarOpcionesCompra(id, nombre, precio) {
    const opcionesCompraElement = document.createElement('div');
    opcionesCompraElement.innerHTML = `
        <p>Selecciona la cantidad que desea comprar de ${nombre}:</p>
        <button class="cantidadBtn" data-cantidad="1">1</button>
        <button class="cantidadBtn" data-cantidad="2">2</button>
        <button class="cantidadBtn" data-cantidad="3">3</button>
        <br>
        <p>Selecciona el talle para ${nombre}:</p>
        <button class="talleBtn" data-talle="S">S</button>
        <button class="talleBtn" data-talle="M">M</button>
        <button class="talleBtn" data-talle="L">L</button>
    `;

    document.getElementById('carrito').appendChild(opcionesCompraElement);

    const cantidadBtns = opcionesCompraElement.querySelectorAll('.cantidadBtn');
    const talleBtns = opcionesCompraElement.querySelectorAll('.talleBtn');

    cantidadBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            cantidadBtns.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    talleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            talleBtns.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            const talle = this.getAttribute('data-talle');
            const cantidadSeleccionada = opcionesCompraElement.querySelector('.cantidadBtn.selected');
            const cantidad = cantidadSeleccionada ? cantidadSeleccionada.getAttribute('data-cantidad') : 1;

            opcionesCompraElement.remove();
            agregarAlCarrito(id, nombre, precio, talle, cantidad);
        });
    });
}

function agregarAlCarrito(id, nombre, precio, talle, cantidad) {
    for (let i = 0; i < parseInt(cantidad); i++) {
        carrito.push({ id: id, nombre: nombre, precio: precio, talle: talle });
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = "";

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const itemHTML = document.createElement('p');
        itemHTML.textContent = `${item.nombre}, Talle: ${item.talle}, Precio: $${item.precio}`;
        carritoElement.appendChild(itemHTML);
    }

    const totalCarrito = calcularTotalCarrito();
    const totalHTML = document.createElement('p');
    totalHTML.textContent = `Total en el carrito: $${totalCarrito}`;
    carritoElement.appendChild(totalHTML);
}

function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + item.precio, 0);
}

function cargarDatos() {

    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {

            console.log('Datos cargados con éxito:', response.data);
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}

function cargarDatos() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}


cargarDatos()
    .then(response => {

        console.log('Datos cargados con éxito:', response.data);
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });

function redirigirAFormularioPago() {
    window.location.href = 'formularioPago.html';
}

function mostrarFormularioPago() {
    alert('Mostrando formulario de pago...');
}

function procesarPago() {
    return new Promise((resolve, reject) => {
        alert('Procesando pago...');
        resolve();
    });
}

function limpiarFormulario() {

    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const otrosCampos = document.querySelectorAll('.otros-campos');

    nombreInput.value = '';
    emailInput.value = '';
    otrosCampos.forEach(campo => campo.value = '');
}
