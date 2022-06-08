const productsContainer =
    document.getElementsByClassName("products-container")[0];

export function showProducts(products, categories) {
    const showProductsList = products.map((product, i) => {
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
        <button onClick="addToCart(${product.id})" class="btn btn-request-product"
            ><i class="fa fa-cart-plus"></i></button>
        </div>
    </div>
    </div>
    </div>`;
    });
    productsContainer.innerHTML = showProductsList.join("");
}