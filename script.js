function scrollTrending(direction) {
    const row = document.getElementById('trendingRow');
    const scrollAmount = 600; // ek click me kitna scroll ho

    row.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

const popup = document.getElementById('bottomPopup');

window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    // Page ke end ke paas popup show karo
    if (scrollPosition >= pageHeight - 150) {
        popup.classList.add('show');
    } else {
        popup.classList.remove('show');
    }
});