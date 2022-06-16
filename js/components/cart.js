/* CARRITO */
/* Getiona el flujo de datos del carrito como la tabl
 de pedidos cálculo de precio total} */

// Items en carrito
let cartItems = [];
//Costo total
let totalCost = 0;
// Dinero total ahorrado
let totalSavedMoney = 0;

// Recuperar datos guardados en Local Storage
function initCart() {
    const cartItemsSaved = window.localStorage.getItem("cartItems");
    if (cartItemsSaved) {
        cartItems = JSON.parse(cartItemsSaved);
    }
    updateCartInfo();
}

// UPDATE Info and table - Actualiza la información de la tabla en el modal
function updateCartInfo() {
    // UPDATE total cart items
    Array.from(totalCartDisplayers).forEach((displayer) => {
        displayer.innerHTML = cartItems.length;
        displayer.classList.add("animate");
        setTimeout(() => {
            displayer.classList.remove("animate");
        }, 600);
    });
    // UPDATE Cart Table
    const showCartItemsList = cartItems.map((item, i) => {
        // Validate Discount
        if (parseFloat(item.discount, 10) > 0) {
            item.renderDiscount = `<span class="discount">- %${item.discount}</span>`;
        } else {
            item.renderDiscount = "";
        }
        // Add Category Name
        const categories = JSON.parse(
            window.sessionStorage.getItem("categoriesStore")
        );
        item.categoryName = "Sin categoría";
        if (categories) {
            categories.map((category) => {
                if (category.id == item.category) {
                    item.categoryName = category.name;
                }
            });
        }
        // Validate Img
        if (!item.url_image) {
            item.url_image = "./img/no-image.svg";
        }
        // Set Subtotal
        updateItemSubtotal(i);

        // Join Items on HTML
        return `<tr>
      <td class="product-delete"><button class="btn" onclick="deleteCartItem(${i})"><i class="fas fa-trash"></i></button></td>
      <td class="product-name">
          ${item.name} </br> &nbsp;<span class="category">${
      item.categoryName
    }</span> ${item.renderDiscount}
      </td>
      <td><img src="${item.url_image}" alt="" /></td>
      <td class="product-quantity">
          <input min="1" max="100" type="number" name="${
            item.id
          }" onfocus="() => {
            setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
          }"
          class="cart-item-quantity" value="${item.quantity}" id="quantity-${
      item.id
    }" />
      </td>
      <td>$ ${item.price.toFixed(2)}</td>
      <td class="product-subtotal" name="${item.id}">$ ${item.subtotal.toFixed(
      2
    )}</td>
  </tr>`;
    });
    const cartTableItems = document.getElementsByClassName(
        "cart-items-container"
    )[0];
    if (showCartItemsList.length) {
        cartTableItems.innerHTML = `${showCartItemsList.join("")}`;
    } else {
        cartTableItems.innerHTML = `<p style="text-align: center; width: 100%">Sin productos</p>`;
    }
    // Display Totals
    updateTotals();
    //Listen quantity changes
    listenCartItems();
    // Save on Storage
    saveCartData();
}

// Add to Cart - Añade producto(s) al carrito
function addToCart(productId, quantity = 1, productCategory) {
    axios
        .get(`${BACKEND_URL}/products/${productId}`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            const productCart = res.data;
            productCart.quantity = parseFloat(quantity);
            isAdded = isProductAdded(productId);
            if (isAdded >= 0) {
                // Si ya estaba agregado sumar la cantidad al mismo item
                productCart.quantity =
                    parseFloat(quantity, 20) + parseFloat(cartItems[isAdded].quantity);
                cartItems[isAdded] = productCart;
            } else {
                cartItems.push(productCart);
            }
            displayFloatingNotification("¡Producto agregado!", "success");
            updateCartInfo();
        })
        .catch((e) => {
            displayFloatingNotification(
                "Error al agregar producto al carrito",
                "error"
            );
        });
}

// Añade más de 1 producto al carrito
const addProductsToCart = (productId) => {
    const q = document.getElementById(`request-quantity-${productId}`);
    addToCart(productId, q.value);
};

/* Valida si el producto está en el carrito para no 
duplicarlo y en su lugar aumentar la cantidad */
const isProductAdded = (productId) => {
    let index = -1;
    cartItems.map((item, i) => {
        if (item.id == productId) {
            index = i;
        }
    });
    return index;
};

// Displayers of total items on cart
/* Actualiza y muestra el total de items en el carrito */
let totalCartDisplayers = document.getElementsByClassName(
    "request-quantity-number"
);

// Save Data on LocalStorage
/* Guarda la información en Local Storage */
function saveCartData() {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Para calcular los datos del Carrito

/* Actualiza la cantidad de cada item del carrito, en el caso de que se cambie,
llama a los demás métodos para actualizar los totales */
function listenCartItems() {
    const itemQuantities = document.getElementsByClassName("cart-item-quantity");
    if (itemQuantities.length) {
        for (let itemQuantity of itemQuantities) {
            itemQuantity.addEventListener("input", (e) => {
                const newQuantity = e.target.value;
                const itemId = e.target.name;
                updateCartItemQuantity(itemId, newQuantity);
            });
        }
    }
}

/* Actualiza la cantidad de un producto */
function updateCartItemQuantity(itemId, newQuantity) {
    cartItems.map((item, i) => {
        if (item.id == itemId) {
            if (!newQuantity) {
                newQuantity = 0;
                const input = document.getElementById(`quantity-${itemId}`);
                input.value = newQuantity;
                input.focus();
            }
            item.quantity = parseInt(newQuantity, 10);
            updateItemSubtotal(i);
            saveCartData();
        }
    });
}

/* Calcula y Actualiza el subtotal de un item */
function updateItemSubtotal(i) {
    let item = cartItems[i];
    if (item) {
        item.savedMoney =
            parseFloat(item.price, 10) *
            (parseFloat(item.discount, 10) / 100) *
            parseInt(item.quantity, 10);
        item.subtotal =
            parseFloat(item.price, 10) * parseFloat(item.quantity, 10) -
            item.savedMoney;
        // Render Item Updated
        const subtotals = document.getElementsByClassName("product-subtotal");
        Array.from(subtotals).forEach((subtotal) => {
            if (subtotal.attributes.name.value == item.id) {
                subtotal.innerHTML = `$ ${item.subtotal.toFixed(2)}`;
            }
        });
        // UPDATE Totals
        updateTotals();
    }
}

// /* Calcula el Costo total y el dinero ahorrado */
function updateTotals() {
    totalCost = 0;
    totalSavedMoney = 0;
    cartItems.map((item) => {
        if (item.subtotal > 0) {
            totalCost = totalCost + item.subtotal;
        }
        if (item.savedMoney > 0) {
            totalSavedMoney = totalSavedMoney + item.savedMoney;
        }
    });
    // Render Total Cost and Saved Money
    const totalCostContainer = document.getElementsByClassName("total-cost")[0];
    totalCostContainer.innerHTML = totalCost.toFixed(2);
    const savedMoneyContainer = document.getElementsByClassName("saved-money")[0];
    savedMoneyContainer.innerHTML = totalSavedMoney.toFixed(2);
}

/* Elimina item del carrito y actualiza la información */
function deleteCartItem(i) {
    cartItems.splice(i, 1);
    updateCartInfo();
}

/* Método para emular pago */
function pay() {
    const lottieContainer =
        document.getElementsByClassName("cart-notification")[0];

    // Cart containers
    cartTableContainer = document.getElementsByClassName("cart-products")[0];
    cartActionsContainer = document.getElementsByClassName("cart-actions")[0];
    if (cartItems.length > 0) {
        lottieContainer.innerHTML = `<lottie-player src="/img/lf30_editor_3nidetka.json" background="transparent" speed="0.7" style="width: 400px; max-width: 80vw; margin: auto" 1 autoplay></lottie-player>
        <div class="notification"><h3 style="text-align: center">!Compra realizada exitosamente!</h3></div>
        `;
        cartItems = [];
        updateCartInfo();
        cartTableContainer.style.display = "none";
        cartActionsContainer.style.display = "none";
    } else {
        lottieContainer.innerHTML =
            '<div class="notification"><h3 style="text-align: center">Añada productos para realizar su compra</h3></div>';
    }
    setTimeout(() => {
        lottieContainer.innerHTML = "";
        cartTableContainer.style.display = "block";
        cartActionsContainer.style.display = "flex";
        // Close Modal and go back home
        closeModalRequest();
        anchorLink();
    }, 4200);
}