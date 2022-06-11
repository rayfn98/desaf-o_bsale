// ENV
// const BACKEND_URL = "https://desafiobsale.herokuapp.com";
const BACKEND_URL = "http://localhost:3000";

// General Functions
function endLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = "0";
}

function startLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "visible";
    contenedor.style.opacity = "1";
}

window.onload = function() {
    initProducts();
    initInteractionFilters();
    initCart();
    endLoading();

    // Keep Alive - Get Offer Banner
    setInterval(() => {
        axios
            .get(`${BACKEND_URL}`, {
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                const bannerInfo = document.getElementById("banner-info");
                bannerInfo.innerHTML = res.data;
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {});
    }, 5000);
};