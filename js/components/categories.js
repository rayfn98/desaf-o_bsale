// CATEGORÍAS

// Muestra las categorías en el contenedor arriba del buscador
function showCategories(categories) {
    const showCategoriesList = categories.map((category, i) => {
        return `<li class="category">
            <a href="#" class="category-name category-${category.id}" onclick="filterByCategory(${category.id})"> ${category.name}</a>
            </li>`;
    });
    const categoriesContainer =
        document.getElementsByClassName("list-categories")[0];
    categoriesContainer.innerHTML = showCategoriesList.join("");
}

// Request categories from backend
function getCategories(init = false) {
    axios
        .get(`${BACKEND_URL}/categories`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            if (init) {
                getProducts(true);
            }
            showCategories(res.data);
            const categories = JSON.stringify(res.data);
            window.sessionStorage.setItem("categoriesStore", categories);
        })
        .catch((e) => {
            displayFloatingNotification("Error al obtener categorías", "error");
        });
}

// Init  getting categories and initializing products after that
function initCategories() {
    getCategories(true);
}