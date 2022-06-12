// FIlter by category
function filterByCategory(id) {
    const categories = document.getElementsByClassName("category-name");
    let categorySelected;
    // Loop for getting the name of the category selected
    for (let category of categories) {
        if (category.classList.contains(`category-${id}`)) {
            categorySelected = category.innerHTML.toUpperCase();
        }
    }
    // Request products by category
    startProductsLoading();
    axios
        .get(`${BACKEND_URL}/products/category/${id}`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            // Save products to Store
            const productsStore = JSON.stringify(res.data);
            window.sessionStorage.setItem("productsStore", productsStore);
            // Display Products and Results resume
            showProducts();
            const filterResults = document.getElementsByClassName(
                "filter-reset-container"
            )[0];
            const resultsText = document.getElementById("filter-results");
            filterResults.classList.remove("hidden");
            resultsText.innerHTML = `Productos de ${categorySelected}: <br> <span style="font-size: 1rem">${res.data.length} productos encontrados</span>`;
        })
        .catch((e) => {
            console.error(e);
            // DIsplay error notification
            displayContainerNotification(
                `Error al filtrar por categoría ${categorySelected}`,
                `filterByCategory(${id})`
            );
        })
        .finally(() => {
            endProductsLoading();
        });
}