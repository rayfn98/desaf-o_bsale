/* APLICACIÓN FRONTEND - DESAFÍO BSALE */
/* GIT / DOCUMENTACIÓN
https://github.com/rayfn98/desaf-o_bsale#desaf%C3%ADo-bsale---frontend
*/

/* La aplicación está dividida en funciones que son validadas para que puedan ejecutarse
correctamente
ARCHIVOS JS:
- JS/Components --> Funcionalidades para gestionar secciones principales como Productos, Categorías, Filtros y Carrito
- JS/Interaction --> Funcionalidades de la App para la experiencia del usuario
  como Ordenar por y Notificaciones, Gestionar el CArrito y Modal y más.
- Main.js Inicia los scripts de la aplicación 
*/

// ENV
const BACKEND_URL = "https://desafiobsale.herokuapp.com"; // Url de producción
// const BACKEND_URL = "http://localhost:3000";

// Al terminar de cargar, inicia con las peticiones y carga de productos y categorías
window.onload = function() {
    initApp();
    displayFloatingNotification("Iniciando peticiones", "success")
    initProducts();
};

// Función que inicia las funcionalidades de la aplicación
function initApp() {
    initInteractionFilters();
    initCart();
    connectToBackend();
    endLoading();
}

// Comprueba la conexión al backend y empieza a obtener las ofertas
// para mostrarlas en el banenr
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

// Funciones Generales para mostrar la animación de carga
function endLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = "0";
}

// oculta la animación de carga
function startLoading() {
    let contenedor = document.getElementById("loader-container");
    contenedor.style.visibility = "visible";
    contenedor.style.opacity = "1";
}