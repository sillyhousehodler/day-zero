document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hover-text');
    const images = document.querySelectorAll('.menu-image');

    images.forEach(image => {
        image.addEventListener('mouseenter', (event) => {
            hoverText.textContent = event.target.getAttribute('alt');
            hoverText.style.display = 'block';
        });

        image.addEventListener('mousemove', (event) => {
            hoverText.style.left = `${event.pageX + 10}px`;
            hoverText.style.top = `${event.pageY + 10}px`;
        });

        image.addEventListener('mouseleave', () => {
            hoverText.style.display = 'none';
        });
    });
});