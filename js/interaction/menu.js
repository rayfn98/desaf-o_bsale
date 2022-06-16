// SWIPE RESPONSIVE MENU
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

/* Abrir menú */
function openMenu(e) {
    if (e) {
        e.preventDefault();
    }
    if (document.querySelectorAll(".modal-closed")[0]) {
        let menu = document.getElementsByClassName("menu");
        menu[0].style.right = "0";

        return 0;
    }
}

/* Cerrar Menú */
function closeMenu(e) {
    if (e) {
        e.preventDefault();
    }
    let menu = document.getElementsByClassName("menu");
    menu[0].style.right = "-100vw";
    return 0;
}

/* Obtener toques */
function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];

    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

// Acciones de abrir y cerrar menú de acuerdo a la dirección
// para responsive

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // left swipe
            openMenu();
        } else {
            // right swipe
            closeMenu();
        }
    } else {
        if (yDiff > 0) {
            // up swipe
        } else {
            // down swipe
        }
    }
    // reset values
    xDown = null;
    yDown = null;
}