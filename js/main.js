// ENV
const BACKEND_URL = "https://desafiobsale.herokuapp.com";
// const BACKEND_URL = "http://localhost:3000";

window.onload = function() {
    initApp();
    initProducts();
};

function initApp() {
    initInteractionFilters();
    initCart();
    connectToBackend();
    endLoading();
}

function connectToBackend() {
    axios
        .get(`${BACKEND_URL}/`, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((res) => {
            displayFloatingNotification("Conexión establecida", "success");
            // Testing Keep Alive - Get Offer Banner
            getOfferLoop();
        })
        .catch((e) => {
            console.error(e);
            // En caso de que falle, reiniciar conexión en 10 s
            displayFloatingNotification(
                "Reintentando Iniciar applicación...",
                "success"
            );
            connectToBackend();
        })
        .finally(() => {});
}

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