function scrollTrending(direction) {
    const row = document.getElementById('trendingRow');
    const scrollAmount = 600; // ek click me kitna scroll ho

    row.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}