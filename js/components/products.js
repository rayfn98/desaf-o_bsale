/* PRODUCTOS */

/* Límite de productos a mostrar */
let displayProductsLimit = 12;

// Show Products, called after getting products from backend
function showProducts(add = false) {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const categories = JSON.parse(
        window.sessionStorage.getItem("categoriesStore")
    );
    // If user press button "Ver más"
    if (add) {
        displayProductsLimit = displayProductsLimit + 12;
    } else {
        displayProductsLimit = 12;
        // Total displayed products
    }
    const totalDisplayed = document.getElementsByClassName(
        "total-products-displayed"
    )[0];
    totalDisplayed.innerHTML = `Mostrando ${displayProductsLimit} productos de ${products.length}`;

    // View More Button
    const btnViewMore = document.getElementsByClassName("btn-view-more")[0];
    if (displayProductsLimit >= products.length) {
        btnViewMore.style.display = "none";
        totalDisplayed.innerHTML = `Mostrando ${products.length} productos de ${products.length}`;
    } else {
        btnViewMore.style.display = "block";
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
                product.url_image = "./img/no-image.svg";
            }

            product.category_name = "Sin categoría";
            // Set categroy name
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
        <span class="product-price">$ ${product.price.toFixed(2)}</span>
        <div class="btn-container">
            <input type="number" min="1" max="100" id="request-quantity-${
              product.id
            }" name="request-quantity-${
        product.id
      }"  class="request-quantity" value="1">
            <button onclick="addProductsToCart(${
              product.id
            })" class="btn btn-request-product"
            ><i class="fa fa-cart-plus"></i></button>
        </div>
    </div>
    </div>
    </div>`;
        });
    // Display products
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

// Request products from server
function getProducts(reset = false) {
    startProductsLoading();
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
            if (reset) {
                const filterResults = document.getElementsByClassName(
                    "filter-reset-container"
                )[0];
                const resultsText = document.getElementById("filter-results");
                filterResults.classList.add("hidden");
                resultsText.innerHTML = "";
                resetSorter();
                resetCategories()
            }
        })
        .catch((e) => {
            console.error(e);
            displayContainerNotification(
                "Error al obtener productos",
                (btnAction = "getProducts(true)")
            );
        })
        .finally(() => {
            endProductsLoading();
        });
}

// Init Products first getting categories
function initProducts() {
    getCategories(true);
}

// End Loading
function endProductsLoading() {
    let container = document.getElementsByClassName("products-container")[0];
    container.style.filter = "opacity(1)";
    container.style.transform = "scale(1)";
}

// Show Loading while getting products
function startProductsLoading() {
    // Ocultar Texto de Resultados
    const filterResults = document.getElementsByClassName(
        "filter-reset-container"
    )[0];
    filterResults.classList.add("hidden");
    // Mostrar Loader
    const productsContainer =
        document.getElementsByClassName("products-container")[0];
    productsContainer.innerHTML = `
        <div class="loader-container" style="background-color: transparent; position: relative">
            <div class="loader" data-aos="zoom-in" style="transition: all ease-in-out 0.4s 0.12s"></div>
        </div>
        
    `;
}

// Request an offer to display it on banner
function getOfferLoop() {
    setInterval(() => {
        axios
            .get(`${BACKEND_URL}/offer`, {
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                const bannerInfo = document.getElementsByClassName("banner-content")[0];
                const offer = res.data;
                // Validate Image URL
                if (!offer.url_image) {
                    offer.url_image = "/img/logo-prueba.jpg";
                }

                bannerInfo.innerHTML = ` <div class="banner-description">
                 <h4>${offer.name} con <span class="banner-discount">${offer.discount}%</span> de descuento</h4>
             </div>
             <div class="img">
                 <img src="${offer.url_image}" alt="" srcset="" />
             </div> `;
            })
            .catch((e) => {
                console.error(e);
                displayFloatingNotification("Reconectando...", "success");
            })
            .finally(() => {});
    }, 7000);
}