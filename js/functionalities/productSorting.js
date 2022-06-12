// Sort products by:
function sortProducts(query) {
    switch (query) {
        case "nameAsc":
            orderByNameAsc();
            break;
        case "nameDesc":
            orderByNameDesc();
            break;
        case "priceAsc":
            orderByPriceAsc();
            break;
        case "priceDesc":
            orderByPriceDesc();
            break;
        default:
            getProducts(true);
            break;
    }
}

// Ordenar por nombre de A - Z
function orderByNameAsc() {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const productsSorted = products.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    });
    window.sessionStorage.setItem(
        "productsStore",
        JSON.stringify(productsSorted)
    );
    showProducts();
}

// Ordenar por nombre de Z - A
function orderByNameDesc() {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const productsSorted = products.sort((a, b) => {
        if (a.name > b.name) {
            return -1;
        } else {
            return 1;
        }
    });
    window.sessionStorage.setItem(
        "productsStore",
        JSON.stringify(productsSorted)
    );
    showProducts();
}

// Ordenar por precio ascendente
function orderByPriceAsc() {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const productsSorted = products.sort((a, b) => {
        if (a.price < b.price) {
            return -1;
        } else {
            return 1;
        }
    });
    window.sessionStorage.setItem(
        "productsStore",
        JSON.stringify(productsSorted)
    );
    showProducts();
}

// Ordenar por precio descendente
function orderByPriceDesc() {
    const products = JSON.parse(window.sessionStorage.getItem("productsStore"));
    const productsSorted = products.sort((a, b) => {
        if (a.price > b.price) {
            return -1;
        } else {
            return 1;
        }
    });
    window.sessionStorage.setItem(
        "productsStore",
        JSON.stringify(productsSorted)
    );
    showProducts();
}

// RESET
function resetSorter() {
    const selectProductSorter = document.getElementById("sorter-select");
    selectProductSorter.value = "none";
}