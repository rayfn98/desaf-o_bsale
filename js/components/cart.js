// CART
let cartItems = [];
let totalCost = 0;
let totalSavedMoney = 0;

// Iniciar Carito, en caso de que exista productos añadidos anteriores
function initCart() {
    const cartItemsSaved = window.localStorage.getItem("cartItems");
    if (cartItemsSaved) {
        cartItems = JSON.parse(cartItemsSaved);
    }
    updateCartInfo();
}

// Displayers of items on cart
let totalCartDisplayers = document.getElementsByClassName(
    "request-quantity-number"
);

// Update Info and table
function updateCartInfo() {
    // Update total cart items
    Array.from(totalCartDisplayers).forEach((displayer) => {
        displayer.innerHTML = cartItems.length;
        displayer.classList.add("animate");
        setTimeout(() => {
            displayer.classList.remove("animate");
        }, 600);
    });
    // Update Cart Table
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
        categories.map((category) => {
            if (category.id == item.category) {
                item.categoryName = category.name;
            }
        });
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
          ${item.name} &nbsp;<span class="category">${
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

// Add to Cart
const addToCart = (productId, quantity = 1, productCategory) => {
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

            updateCartInfo();
        });
};

// Add more than 1 product from products grid
const addProductsToCart = (productId) => {
    const q = document.getElementById(`request-quantity-${productId}`);
    addToCart(productId, q.value);
};

// Validate if Product exists in cart
const isProductAdded = (productId) => {
    let index = -1;
    cartItems.map((item, i) => {
        if (item.id == productId) {
            index = i;
        }
    });
    return index;
};

// save Data on LocalStorage
function saveCartData() {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Update quantity on cart table
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

function updateCartItemQuantity(itemId, newQuantity) {
    cartItems.map((item, i) => {
        if (item.id == itemId) {
            if (!newQuantity) {
                newQuantity = item.quantity;
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

// Update Item Subtotal
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
        // Update Totals
        updateTotals();
    }
}

function updateTotals() {
    // Total Cost and Saved Money
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

// DELETE CART ITEM
function deleteCartItem(i) {
    cartItems.splice(i, 1);
    updateCartInfo();
}