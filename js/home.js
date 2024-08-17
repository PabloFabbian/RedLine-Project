// Redline - Logo -------------------------------------------------------------------------------------
const logo = document.querySelector('.logo');
const hiddenText = document.querySelector('.hidden');

logo.addEventListener('mouseover', function() {
    hiddenText.style.opacity = 1;
});

logo.addEventListener('mouseout', function() {
    hiddenText.style.opacity = 0;
});

logo.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar behaviour -------------------------------------------------------------------------------------
let lastScrollTop = 0;
let hideTimeout;
let isHovering = false;

const navbar = document.querySelector('.navbar');

function showNavbar() {
    clearTimeout(hideTimeout);
    navbar.classList.remove('navbar-hidden');
    navbar.classList.remove('navbar-transparent');
}

function hideNavbar() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        if (!isHovering && window.pageYOffset > 0) {
            navbar.classList.add('navbar-hidden');
        }
    }, 2000);
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop || scrollTop <= 0) {
        showNavbar();
    } else if (scrollTop > lastScrollTop && scrollTop > 0) {
        hideNavbar();
    }

    if (scrollTop > 0) {
        navbar.classList.add('navbar-transparent');
    } else {
        navbar.classList.remove('navbar-transparent');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

navbar.addEventListener('mouseenter', () => {
    isHovering = true;
    showNavbar();
});

navbar.addEventListener('mouseleave', () => {
    isHovering = false;
    if (window.pageYOffset > 0) {
        hideNavbar();
    }
});

// Fade-in on view para las Cards ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (index < 2) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
                else if (index >= 2 && index < 4) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }, 500);
                }
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});

// Scroll hasta Formu ---------------------------------------------------------------------------------
const formulario = document.querySelector('#formulario');
formulario.addEventListener('click', function(event) {
    event.preventDefault();
    const height = 375;
    window.scrollTo({
        top: height,
        behavior: 'smooth'
    });
});

// Shop Products ---------------------------------------------------------------------------------------
function generateProductHTML(product) {
    const productoHTML = `
        <div class="product" id="articulo">
            <img src="${product.imageSrc}" alt="${product.name}">
            <p class="name">${product.name}</p>
            <p class="price">$${product.price}</p>
            ${product.offerPrice ? `<p class="offer">${product.offerPrice}</p>` : ''}
        </div>
    `;
    return productoHTML;
}

function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    let productHTML = '';
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (i % 4 === 0) {
            productHTML += '<div class="row">';
        }
        productHTML += generateProductHTML(product);
        if (i % 4 === 3 || i === products.length - 1) {
            productHTML += '</div>';
        }
    }
    productContainer.innerHTML = productHTML;
}

renderProducts(products);

// Mostrar-Ocultar Carrito
const cartVisualizer = document.getElementById("cart-visualizer");
const floatCarrito = document.querySelector('.float-carrito');

let isCartVisible = false;

// Mostrar el carrito
function showCart() {
    cartVisualizer.classList.remove('hide');
    cartVisualizer.classList.add('show');
    isCartVisible = true;
}

// Ocultar el carrito
function hideCart() {
    cartVisualizer.classList.add('hide');
    cartVisualizer.classList.remove('show');
    isCartVisible = false;
}

// Controlar clic en el icono del carrito
floatCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isCartVisible) {
        hideCart();
    } else {
        showCart();
    }
});

// Controlar clic fuera del carrito para ocultarlo
document.addEventListener('click', (e) => {
    if (!cartVisualizer.contains(e.target) && !floatCarrito.contains(e.target)) {
        if (isCartVisible) {
            hideCart();
        }
    }
});

cartVisualizer.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Mostrar el carrito cuando se haga scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const triggerPosition = 950;

    if (scrollPosition > triggerPosition) {
        floatCarrito.style.opacity = '1';
        floatCarrito.style.pointerEvents = 'auto';
        floatCarrito.classList.add('cursor-pointer');
    } else {
        floatCarrito.style.opacity = '0';
        floatCarrito.style.pointerEvents = 'none';
        floatCarrito.classList.remove('cursor-pointer');
    }

    if (scrollPosition <= triggerPosition && isCartVisible) {
        hideCart();
    }
});

// Cookies ----------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';

    if (!cookiesAccepted) {
        window.onload = () => {
            setTimeout(() => {
                const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
                if (!cookiesAccepted) {
                    generateCookieBanner();
                }
            }, 5000);
        };
    }

    function generateCookieBanner() {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';

        const cookieBannerContent = document.createElement('div');
        cookieBannerContent.className = 'cookie-banner-content';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Usamos cookies para asegurarnos de brindarte la mejor experiencia en nuestro sitio web. Al hacer clic en "¡Estoy de acuerdo!" aceptas todas las cookies. ';

        const cookieSettingsLink = document.createElement('a');
        cookieSettingsLink.href = '#';
        cookieSettingsLink.textContent = 'Configuración de cookies';
        paragraph.appendChild(cookieSettingsLink);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'cookie-banner-buttons';

        const acceptButton = document.createElement('button');
        acceptButton.id = 'cookie-banner-accept';
        acceptButton.textContent = '¡Estoy de acuerdo!';

        const settingsButton = document.createElement('button');
        settingsButton.id = 'cookie-banner-settings';
        settingsButton.href = '#';
        settingsButton.textContent = 'Configuración de cookies';

        const closeButton = document.createElement('button');
        closeButton.className = 'cookie-banner-close';
        closeButton.setAttribute('aria-label', 'Cerrar');
        closeButton.textContent = '×';

        buttonsContainer.appendChild(acceptButton);
        buttonsContainer.appendChild(settingsButton);

        cookieBannerContent.appendChild(paragraph);
        cookieBannerContent.appendChild(buttonsContainer);
        cookieBannerContent.appendChild(closeButton);
        cookieBanner.appendChild(cookieBannerContent);

        document.body.appendChild(cookieBanner);

        acceptButton.addEventListener('click', () => {
            hideCookieBanner();
            localStorage.setItem('cookiesAccepted', 'true');
        });

        settingsButton.addEventListener('click', () => {
            // Agregar lógica para manejar la configuración de cookies si es necesario
        });

        closeButton.addEventListener('click', () => {
            hideCookieBanner();
        });

        function hideCookieBanner() {
            cookieBanner.style.display = 'none';
        }
    }
});