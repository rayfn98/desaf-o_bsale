// CART
let cartItems = [];

// Iniciar Carito, en caso de que exista productos añadidos anteriores
function initCart() {
    const cartItemsSaved = window.localStorage.getItem("cartItems");
    if (cartItemsSaved) {
        cartItems = JSON.parse(cartItemsSaved);
    }
    updateTotalItemsCart();
}

// Displayers of items on cart
let totalCartDisplayers = document.getElementsByClassName(
    "request-quantity-number"
);

// Update total cart items
function updateTotalItemsCart() {
    Array.from(totalCartDisplayers).forEach((displayer) => {
        displayer.innerHTML = cartItems.length;
        displayer.classList.add("animate");
        setTimeout(() => {
            displayer.classList.remove("animate");
        }, 600);
    });
    saveCartData();
}

// Add to Cart
const addToCart = (productId, quantity = 1) => {
    axios
        .get(`${BACKEND_URL}/products/${productId}`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            const productCart = res.data;
            productCart.quantity = parseInt(quantity);
            isAdded = isProductAdded(productId);
            if (isAdded >= 0) {
                // Si ya estaba agregado sumar la cantidad al mismo item
                productCart.quantity =
                    parseInt(quantity, 20) + parseInt(cartItems[isAdded].quantity);
                cartItems[isAdded] = productCart;
            } else {
                cartItems.push(productCart);
            }

            updateTotalItemsCart();
        });
};

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

function saveCartData() {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
}