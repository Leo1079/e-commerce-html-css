const cartContainer = document.getElementById("container-cart");
// Obteniendo los productos
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const drawItems = () => {
  cartContainer.innerHTML = ""; // Limpiar el contenedor del carrito
  let totalPrice = 0; // Cambiar a let para permitir la mutabilidad

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <h1 class="alert-cart-empty">NO PRODUCTS YET</h1>
    `;
    updateTotalPrice(0);
  } else {
    // Dibujar cada producto en el carrito
    cart.forEach((product) => {
      cartContainer.innerHTML += `
        <div class="container-cart-product" id="container-cart-products">
          <div class="product-agreged-cart">
            <img src="${product.image}" alt="${product.title}" width="70" />
            <p class="product-name-cart">${product.title}</p>
            <p class="product-price-cart">$${product.price}</p>
            <button class="remove-button" data-id="${product.id}">
              <i class="fa-solid fa-trash" style="color: #ff2f34"></i>
            </button>
          </div>     
        </div>  
      `;
      // Sumar el precio del producto al total
      totalPrice += product.price;
    });

    // Actualizar el total de precio y configurar botones de eliminación
    updateTotalPrice(totalPrice);
    attachRemoveListeners();
  }
};

const updateTotalPrice = (total) => {
  const totalPriceElement = document.querySelector(".total-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total $${total.toFixed(2)}`;
  } else {
    console.error(
      "El elemento con la clase 'total-price' no se encontró en el DOM."
    );
  }
};

const attachRemoveListeners = () => {
  const buttonRemove = document.querySelectorAll(".remove-button");
  buttonRemove.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = btn.dataset.id;
      removeFromCarts(productId);
    });
  });
};

const removeFromCarts = (productId) => {
  const productToRemove = cart.find(
    (product) => product.id === Number(productId)
  );

  if (productToRemove) {
    cart = cart.filter((product) => product.id !== Number(productId));
    localStorage.setItem("cart", JSON.stringify(cart));
    drawItems();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  drawItems();
});
