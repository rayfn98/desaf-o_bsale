function displayContainerNotification(
    msg = "Error al cargar productos",
    btnAction = "initApp()"
) {
    const productsContainer =
        document.getElementsByClassName("products-container")[0];
    console.log(productsContainer);
    productsContainer.innerHTML = `<div class="notification error"><h3 style="text-align: center">${msg}</h3>
    <div class="btn-container"><button class="btn" onclick="${btnAction}">Reintentar</button></div>
    </div>`;
}

function displayFloatingNotification(msg = "Notificación", type = "info") {
    // Notification ID
    notificationId = `noti-${new Date()}`;

    // Contenedor
    const notificationFloating = document.getElementById(
        "notification-container"
    );
    notificationFloating.innerHTML = `<div class="notification floating-notification ${type}" id="${notificationId}">
        <h3 style="text-align: center">${msg}</h3>
    </div>`;

    const notification = document.getElementById(notificationId);
    setTimeout(() => {
        notification.classList.add("hid-notification");
    }, 4000);
}