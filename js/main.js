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
    initApp();
    initProducts();
};

function initApp() {
    initInteractionFilters();
    initCart();
    connectToBackend();
    endLoading();
}

function getOfferLoop() {
    setInterval(() => {
        axios
            .get(`${BACKEND_URL}/offer`, {
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                const bannerInfo = document.getElementsByClassName("banner-content")[0];
                const offer = res.data;
                // Validate Image URL
                if (!offer.url_image) {
                    offer.url_image = "/img/logo-prueba.jpg";
                }

                bannerInfo.innerHTML = ` <div class="banner-description">
                 <h4>${offer.name} con <span class="banner-discount">${offer.discount}%</span> de descuento</h4>
             </div>
             <div class="img">
                 <img src="${offer.url_image}" alt="" srcset="" />
             </div> `;
            })
            .catch((e) => {
                console.error(e);
                // En caso de que falle, reiniciar conexión en 10 s
                displayFloatingNotification("Reconectando...", "success");
            })
            .finally(() => {});
    }, 7000);
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