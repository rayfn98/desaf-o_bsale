// OBTENER PRODUCTOS Y CATEGORÍAS
const getProducts = () => {
    startLoading();
    axios
        .get(`${BACKEND_URL}/products`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            const productsStore = JSON.stringify(res.data);
            window.sessionStorage.setItem("productsStore", productsStore);
            showProducts();
        })
        .catch((e) => {
            console.error(e);
        })
        .finally(() => {
            endLoading();
        });
};

let displayProductsLimit = 12;

function showProducts(add = false) {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const categories = JSON.parse(
        window.sessionStorage.getItem("categoriesStore")
    );
    if (add) {
        displayProductsLimit = displayProductsLimit + 12;

    }
    const btnViewMore = document.getElementsByClassName("btn-view-more")[0];
    if (displayProductsLimit >= products.length) {
        btnViewMore.style.visibility = "hidden";
    } else {
        btnViewMore.style.visibility = "visible";
    }
    const showProductsList = products
        .slice(0, displayProductsLimit)
        .map((product, i) => {
            if (product.discount > 0) {
                product.on_sale = true;
                product.display_discount = `
      <div class="discount">
        <p class="percentage">% ${product.discount}</p>
        <span class="">De descuento</span>
      </div>
      `;
            } else {
                product.display_discount = "";
            }

            if (!product.url_image) {
                product.url_image = "/img/no-image.svg";
            }

            product.category_name = "Sin categoría";
            // Obtener nombre de categoría
            categories.forEach((category) => {
                if (product.category == category.id) {
                    product.category_name = category.name;
                }
            });
            return `
    <div class="card card-product">
    ${product.display_discount}
    <div class="product-img-container">
    <img src="${product.url_image}" alt="${product.name}" />
    </div>
    <div class="product-description-container">
    <div class="product-title">
        <h3>${product.name}</h3>
        <span class="product-label product-label-category"
        >${product.category_name}</span
        >
    </div>

    <div class="product-price-container">
        <span class="product-price">$ ${product.price}</span>
        <div class="btn-container">
            <input type="number" min="1" max="100" id="request-quantity-${product.id}" name="request-quantity-${product.id}"  class="request-quantity" value="1">
            <button onClick="addToCart(${product.id})" class="btn btn-request-product"
            ><i class="fa fa-cart-plus"></i></button>
        </div>
    </div>
    </div>
    </div>`;
        });
    const productsContainer =
        document.getElementsByClassName("products-container")[0];
    if (products.length) {
        productsContainer.innerHTML = `${showProductsList.join("")}`;
    } else {
        const inputFilter = document.getElementById("input-products-filter");
        if (!inputFilter.value.length) {
            productsContainer.innerHTML = "No existen productos";
        } else {
            productsContainer.innerHTML = "";
        }
    }
}

function updateProducts() {
    showProducts();
}

function initProducts() {
    getCategories(true);
    const filterResults = document.getElementsByClassName(
        "filter-reset-container"
    )[0];
    const resultsText = document.getElementById("filter-results");
    filterResults.classList.add("hidden");
    resultsText.innerHTML = "";
}

function endLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = "0";
}

function startLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "visible";
    contenedor.style.opacity = "1";
}