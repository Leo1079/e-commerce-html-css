// Obteniendo los productos de la api
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// llamando los productos y recortandolos
const storeProducts = async () => {
  const productsArray = await fetchProducts();
  let newProductsArray = productsArray.slice(0, 40);
  return newProductsArray;
};

// Dibujando los productos

const displayProducts = async () => {
  const productsArray = await fetchProducts();
  const productsContainer = document.getElementById("container-products");

  productsArray.forEach((product) => {
    productsContainer.innerHTML += `
      <div class="product-card">
          <img
            class='image-product'
            src="${product.image}"
            alt=""
          />
          <p class="product-name">${product.title}</p>
          <p class="product-price">$${product.price}</p>
         <button class="button-buy" id="button-buy">Buy Now</button>
           
    `;
  });

  // Agregando productos al carro
  const addCartButtons = document.querySelectorAll(".button-buy");
  addCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(productsArray[index]);
    });
  });

  const addToCart = (product) => {
    // Desestructurando producto
    const productAgregged = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    // Obtener carrito de localStorage o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Agregar producto al carrito
    cart.push(productAgregged);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("producto agregado");
  };
};

displayProducts();
