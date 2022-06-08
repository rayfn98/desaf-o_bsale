// Open & Close Modal
let openModalRequestBtn = document.querySelectorAll(".open-modal-request-btn");
let closeModalRequestBtn = document.querySelectorAll(
    ".close-modal-request-btn"
)[0];
let modalRequestContainer = document.querySelectorAll(
    ".modal-request-container"
)[0];
let modalContent = document.querySelectorAll("#modal-request-content")[0];

function openModalRequest() {
    modalContent.classList.toggle("modal-closed");
    modalRequestContainer.classList.toggle("closed");
    // pageContent.style.transform = 'scale(.95) translateY(-2%)'
}

function closeModalRequest() {
    modalContent.classList.toggle("modal-closed");
    setTimeout(function() {
        modalRequestContainer.classList.toggle("closed");
        pageContent.style.transform = "scale(1)";
    }, 100);
}

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