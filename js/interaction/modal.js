/* MODAL / CARRITO */

// Open & Close Modal
let openModalRequestBtn = document.querySelectorAll(".open-modal-request-btn");
let closeModalRequestBtn = document.querySelectorAll(
    ".close-modal-request-btn"
)[0];
/* Contenedor del modal */
let modalRequestContainer = document.querySelectorAll(
    ".modal-request-container"
)[0];
// Cuadro blanco - Contenido del modal
let modalContent = document.querySelectorAll("#modal-request-content")[0];

// Abrir Modal
function openModalRequest() {
    modalContent.classList.remove("modal-closed");
    modalRequestContainer.classList.remove("closed");
}

// Cerrar Modal
function closeModalRequest() {
    modalContent.classList.add("modal-closed");
    setTimeout(function() {
        modalRequestContainer.classList.add("closed");
    }, 100);
}

// Escucha el click en los botones del modal / Carrito
openModalRequestBtn.forEach((btnOpenModal) => {
    btnOpenModal.addEventListener("click", function(e) {
        e.preventDefault();
        openModalRequest();
    });
});

// Cierra el modal en el caso hagan click en el botón x
closeModalRequestBtn.addEventListener("click", function(e) {
    e.preventDefault();
    closeModalRequest();
});

//Cierra el modal en caso haga click fuera del carrito
window.addEventListener("click", function(e) {
    if (e.target == modalRequestContainer) {
        closeModalRequest();
    }
});