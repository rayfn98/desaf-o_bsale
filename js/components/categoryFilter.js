function filterByCategory(id) {
    startProductsLoading()
    axios
        .get(`${BACKEND_URL}/products/category/${id}`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            const categories = document.getElementsByClassName("category-name");
            let categorySelected;
            for (let category of categories) {
                if (category.classList.contains(`category-${id}`)) {
                    categorySelected = category.innerHTML.toUpperCase();
                }
            }

            // Guardar Productos en Store
            const productsStore = JSON.stringify(res.data);
            window.sessionStorage.setItem("productsStore", productsStore);
            //Mostrar Resultados
            showProducts();
            const filterResults = document.getElementsByClassName(
                "filter-reset-container"
            )[0];
            const resultsText = document.getElementById("filter-results");
            filterResults.classList.remove("hidden");
            resultsText.innerHTML = `Productos de ${categorySelected}: <br> <span style="font-size: 1rem">${res.data.length} productos encontrados</span>`;
        }).catch(e => {
            console.error(e);
        }).then(() => {
            endProductsLoading()
        });
}