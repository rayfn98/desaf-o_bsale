const categoriesContainer =
    document.getElementsByClassName("list-categories")[0];

export function showCategories(categories) {
    const showCategoriesList = categories.map((category, i) => {
        return `<li>
            <a href="#" class="active"> ${category.name}</a>
            </li>`;
    });
    categoriesContainer.innerHTML = showCategoriesList.join("");
}