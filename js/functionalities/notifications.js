// Display notifications on products container
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

// Display fixed notification - left bottom
function displayFloatingNotification(msg = "Notificación", type = "info") {
    // Notification ID
    notificationId = `noti-${new Date()}`;

    // Float notification container
    const notificationFloating = document.getElementById(
        "notification-container"
    );
    notificationFloating.innerHTML = `<div class="notification floating-notification ${type}" id="${notificationId}">
        <h3 style="text-align: center">${msg}</h3>
    </div>`;

    // Hid notification
    const notification = document.getElementById(notificationId);
    setTimeout(() => {
        notification.classList.add("hid-notification");
    }, 4000);
}