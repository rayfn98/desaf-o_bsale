function showCategories(categories) {
    const showCategoriesList = categories.map((category, i) => {
        return `<li>
            <a href="#" class="active"> ${category.name}</a>
            </li>`;
    });
    const categoriesContainer =
        document.getElementsByClassName("list-categories")[0];
    categoriesContainer.innerHTML = showCategoriesList.join("");
}

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
                getProducts(res.data);
            }
            showCategories(res.data);
            const categories = JSON.stringify(res.data);
            window.sessionStorage.setItem("categoriesStore", categories);
        });
}

function initCategories() {
    getCategories(true);
}