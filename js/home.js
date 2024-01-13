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
const cookieBanner = document.querySelector('.cookie-banner');
const cookieBannerAccept = document.querySelector('#cookie-banner-accept');
const cookieBannerSettings = document.querySelector('#cookie-banner-settings');
const cookieBannerClose = document.querySelector('.cookie-banner-close');

const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';

if (!cookiesAccepted) {
  cookieBanner.style.display = 'block';
}

cookieBannerAccept.addEventListener('click', () => {
  hideCookieBanner();
  localStorage.setItem('cookiesAccepted', 'true');
});

cookieBannerSettings.addEventListener('click', () => {
});

cookieBannerClose.addEventListener('click', () => {
  hideCookieBanner();
});

function hideCookieBanner() {
  cookieBanner.style.display = 'none';
}