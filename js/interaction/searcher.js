// Display filtered products
function showFilteredProducts(products, query = "", display = false) {
    // Save products on Local Storage
    window.sessionStorage.setItem("productsStore", JSON.stringify(products));
    let filteredList;

    // Create products html
    if (products.length) {
        filteredList = products
            .slice(0, 5)
            .map((product, i) => {
                if (!product.url_image) {
                    product.url_image = "./img/no-image.svg";
                }
                return `<div class="quick-result-item prevent-hidden">
            <div class="item-img prevent-hidden">
            <img src="${product.url_image}" alt="${product.name}" class= q"prevent-hidden" />
            </div>
            <div class="item-info prevent-hidden">
            <h4 class="item-name prevent-hidden">
            ${product.name}
            </h4>
            <span class="item-category prevent-hi dden">Categoría</span>
            </div>
            <div class="item-price prevent-hidden">
            <span class="prevent-hidden">$ ${product.price}</span>
            <button onclick="addToCart(${product.id})" class="btn-add-results prevent-hidden">+</button>
            </div>
            </div>`;
            })
            .join("");
    } else {
        // If no products found
        filteredList = `<span class="prevent-hidden" style="padding: 1rem 0; font-size: .8rem">(No se encontraron resultados)</span>`;
    }
    // Display quick results
    const quickResultsContainer =
        document.getElementsByClassName("quick-results")[0];
    quickResultsContainer.innerHTML = `
             ${filteredList}`;

    // Display on container
    if (display) {
        const quickResultsContainer =
            document.getElementsByClassName("quick-results")[0];
        quickResultsContainer.classList.add("hidden");
        if (query.length) {
            showProducts();
            resetCategories();
            const filterResults = document.getElementsByClassName(
                "filter-reset-container"
            )[0];
            const resultsText = document.getElementById("filter-results");
            filterResults.classList.remove("hidden");
            resultsText.innerHTML = `Resultados de:"${query}" <br> <span style="font-size: 1rem">${products.length} productos encontrados</span>`;
        } else {
            getProducts(true);
        }
    }
}

// Request filtered products by query
const getFilteredProducts = (displayOnContainer = false) => {
    const query = document.getElementById("input-products-filter").value;
    if (displayOnContainer) {
        startProductsLoading();
    }
    axios
        .post(
            `${BACKEND_URL}/products/search?s=${query}`, {}, {
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        )
        .then((res) => {
            if (!displayOnContainer) {
                showFilteredProducts(res.data, query);
            } else {
                showFilteredProducts(res.data, query, true);
            }
        })
        .catch((e) => {
            console.error(e);
            const quickResultsContainer =
                document.getElementsByClassName("quick-results")[0];
            quickResultsContainer.innerHTML = `<span class="prevent-hidden" style="padding: 1rem 0; font-size: .8rem; color: dark-orange">(No se pudo obtener los productos del servidor)</span>`;
        })
        .finally(() => {});
};

// init filers listening input and Validating it
function initInteractionFilters() {
    const inputFilter = document.getElementById("input-products-filter");
    const quickResultsContainer =
        document.getElementsByClassName("quick-results")[0];
    const body = document.getElementsByTagName("body")[0];

    //VALIDATIONS
    body.addEventListener("click", (event) => {
        if (
            event.target.classList.contains("prevent-hidden") &&
            inputFilter.value.length > 1
        ) {
            quickResultsContainer.classList.remove("hidden");
        } else {
            quickResultsContainer.classList.add("hidden");
            quickResultsContainer.innerHTML = "";
        }
    });

    inputFilter.addEventListener("focusin", (event) => {
        if (event.target.value.length > 2) {
            quickResultsContainer.classList.remove("hidden");
            getFilteredProducts();
        } else {
            quickResultsContainer.classList.add("hidden");
        }
    });

    inputFilter.addEventListener("input", (event) => {
        if (
            event.inputType === "deleteContentBackward" &&
            event.target.value == ""
        ) {
            // Validate if there is any active category filter
            if (!categoryActive) {
                getProducts(true);
            }
        }
        if (event.target.value.length > 2) {
            quickResultsContainer.classList.remove("hidden");
            getFilteredProducts();
        } else {
            quickResultsContainer.innerHTML = "";
            quickResultsContainer.classList.add("hidden");
        }
    });

    inputFilter.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            getFilteredProducts(true);
        }
    });
}