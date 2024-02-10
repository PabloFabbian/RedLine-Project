// Redline - Logo -------------------------------------------------------------------------------------
const logo = document.querySelector('.navbar-brand');
const hiddenText = document.querySelector('.hidden');

logo.addEventListener('mouseover', function() {
  hiddenText.style.opacity = 1;
});

logo.addEventListener('mouseout', function() {
  hiddenText.style.opacity = 0;
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

// Ocultar - Mostrar Cards -----------------------------------------------------------------------------
document.getElementById("show-cards").addEventListener("click", function() {
  let cardStructure = document.getElementById("card-structure");
  cardStructure.classList.toggle("fade-in");
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

// Mostrar-Ocultar Carrito ------------------------------------------------------------------------------
document.getElementById("cart-visualizer").style.display = "none"

document.getElementById("cart-button").addEventListener("click", function() {
    let cart = document.getElementById("cart-visualizer");
    if (cart.style.display === "none") {
        cart.style.display = "block";
    } else {
        cart.style.display = "none";
    }
})

const floatCarrito = document.querySelector('.float-carrito');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const triggerPosition = 1525;

  if (scrollPosition > triggerPosition) {
    floatCarrito.style.opacity = '1';
  } else {
    floatCarrito.style.opacity = '0';
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
