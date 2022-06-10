window.onload = function() {
    initProducts();

    // Keep Alive
    setInterval(() => {
        getCategories()
    }, 5000);
    initInteractionFilters();
};

// CART
let cartItems = [];

// Displayers of items on cart
let totalCartDisplayers = document.getElementsByClassName(
    "request-quantity-number"
);

// Update total cart items
function updateTotalItemsCart() {
    Array.from(totalCartDisplayers).forEach((displayer) => {
        displayer.innerHTML = cartItems.length;
    });
}

// Add to Cart
const BACKEND_URL = "http://localhost:3000";

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
            productCart.quantity = quantity;
            cartItems.push(productCart);
            console.log(cartItems);
            updateTotalItemsCart();
        });
};

// Show Products