// Open & Close Modal
let openModalRequestBtn = document.querySelectorAll(".open-modal-request-btn");
let closeModalRequestBtn = document.querySelectorAll(
    ".close-modal-request-btn"
)[0];
let modalRequestContainer = document.querySelectorAll(
    ".modal-request-container"
)[0];
let modalContent = document.querySelectorAll("#modal-request-content")[0];

// Functions 
function openModalRequest() {
    modalContent.classList.toggle("modal-closed");
    modalRequestContainer.classList.toggle("closed");
}

function closeModalRequest() {
    modalContent.classList.toggle("modal-closed");
    setTimeout(function() {
        modalRequestContainer.classList.toggle("closed");
    }, 100);
}

// Listening modal btns 
openModalRequestBtn.forEach((btnOpenModal) => {
    btnOpenModal.addEventListener("click", function(e) {
        e.preventDefault();
        openModalRequest();
    });
});

closeModalRequestBtn.addEventListener("click", function(e) {
    e.preventDefault();
    closeModalRequest();
});

window.addEventListener("click", function(e) {
    if (e.target == modalRequestContainer) {
        closeModalRequest();
    }
});