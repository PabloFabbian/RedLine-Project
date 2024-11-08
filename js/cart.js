let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Añadir productos al carrito
const productos = document.getElementsByClassName('product');

for (let i = 0; i < productos.length; i++) {
    productos[i].addEventListener('click', function () {
        const id = productos[i].id;
        const nombre = productos[i].name;
        const precio = productos[i].price;
        const imageSrc = productos[i].imageSrc;  // Asegúrate de que esta propiedad esté definida correctamente en tu HTML

        const nuevoProducto = {
            id: id,
            nombre: nombre,
            precio: precio,
            imageSrc: imageSrc,
            cantidad: 1  // Empieza con 1 ya que es un clic de "Añadir al carrito"
        };

        const productoExistente = carrito.find(p => p.id === nuevoProducto.id);
        if (productoExistente) {
            productoExistente.cantidad += 1;  // Si ya existe, se aumenta la cantidad
        } else {
            carrito.push(nuevoProducto);  // Si no, se agrega el nuevo producto
        }

        actualizarCarritoVisualizer();
    });
}

// Actualizar carrito y calcular el Total
function actualizarCarritoVisualizer() {
    const listado = document.getElementById('product-list');
    let total = 0;
    const productosEnCarrito = {};

    for (let producto of carrito) {
        if (!productosEnCarrito[producto.id]) {
            productosEnCarrito[producto.id] = {
                producto: producto,
                cantidad: 0,
            };
        }
        productosEnCarrito[producto.id].cantidad++;
    }

    let cartItems = '';
    for (let productoEnCarrito of Object.values(productosEnCarrito)) {
        const precioTotal = productoEnCarrito.producto.precio * productoEnCarrito.cantidad;
        cartItems += `<li>${productoEnCarrito.cantidad} x ${productoEnCarrito.producto.nombre} - $${productoEnCarrito.producto.precio}</li>`;
        total += precioTotal;
    }

    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = total.toFixed(2);

    listado.innerHTML = cartItems;

    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = carrito.length;

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Oferta en carrito
const botonesAplicar = document.querySelectorAll('.oferta button');
const ofertasSpan = document.getElementById('ofertas');
const ofertaDescrip = document.getElementById('descripcion-oferta');

botonesAplicar.forEach(boton => {
    boton.addEventListener('click', () => {
        const oferta = boton.closest('.oferta');
        const id = oferta.dataset.id;

        const carritoOfertas = carrito.filter(item => item.tipo === 'oferta');

        carrito = carritoOfertas.some(item => item.id === id)
            ? carrito.filter(item => item.id !== id)
            : carrito.filter(item => item.tipo !== 'oferta').concat({
                tipo: 'oferta',
                id: id,
                nombre: oferta.textContent.trim()
            });

        const ofertasSeleccionadas = carrito.filter(item => item.tipo === 'oferta');
        ofertasSpan.textContent = ofertasSeleccionadas.length > 0
            ? ofertasSeleccionadas.map(oferta => oferta.nombre).join(', ')
            : 'Ninguna';
    });
});

// Check Out Button
const checkOutBtn = document.getElementById('CheckOutBtn');

checkOutBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¡Muchas gracias por elegir Red-Line Project!',
        text: 'Realicemos el check-out y completemos la compra',
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Volver',
        confirmButtonText: 'Perfecto!',
        confirmButtonColor: '#7b2cbf',
    });
});

// Guardar carrito cuando se cierra la ventana
window.addEventListener('beforeunload', function () {
    localStorage.setItem('carrito', JSON.stringify(carrito));
});

actualizarCarritoVisualizer();