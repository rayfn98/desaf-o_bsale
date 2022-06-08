import { showProducts } from "./products.js";
import { showCategories } from "./categories.js";

const BACKEND_URL = "http://localhost:3000";

const getProducts = (categories = []) => {
    axios
        .get(`${BACKEND_URL}/products`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            showProducts(res.data, categories);
        });
};

export function getCategories() {
    axios
        .get(`${BACKEND_URL}/categories`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            getProducts(res.data);
            showCategories(res.data)
        });
}

window.onload = function() {
    getCategories();
};