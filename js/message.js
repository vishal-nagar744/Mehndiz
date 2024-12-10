document.addEventListener('DOMContentLoaded', function () {
    const msgLogo = document.getElementById('msgLogo');
    const icons = document.getElementById('msg-icons');
    let iconsVisible = false;

    msgLogo.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from bubbling up

        if (iconsVisible) {
            icons.style.display = 'none';
            iconsVisible = false;
        } else {
            icons.style.display = 'block';
            iconsVisible = true;
        }
    });

    document.addEventListener('click', function () {
        if (iconsVisible) {
            icons.style.display = 'none';
            iconsVisible = false;
        }
    });
});