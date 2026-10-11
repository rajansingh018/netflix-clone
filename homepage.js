window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    else{
        navbar.classList.remove('scrolled');
    }
});

//Connecting homepage to backend
const API_URL = "http://localhost:5001/api/movies";

const categories = [
    {
        query: "inception",
        container: "popular-movies"
    },
    {
        query: "avengers",
        container: "trending-movies"
    },
    {
        query: "mission impossible",
        container: "action-movies"
    },
    {
        query: "hangover",
        container: "comedy-movies"
    }
];

async function getMovies(query) {
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.response === "False") {
            console.error(data.error);
            return [];
        }
        return data.Search || [];
    } catch (error) {
        console.log("Failed to fetch movies :", error);
        return [];
    }
    
}

function displayMovies(movies, containerId){
    const container = document.getElementById(containerId);
    container.innerHTML ="";
    movies.forEach(movie => {
        if (movie.Poster === "N/A") {
            return;
        }
        const card = document.createElement("div");

        card.classList.add("movie-card");

        card.dataset.imdbId = movie.imdbID;

        card.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}">`;

        container.appendChild(card);
    });
}

async function loadMovies() {

    for (const category of categories) {

        const movies = await getMovies(category.query);

        displayMovies(
            movies,
            category.container
        );
    }
}

loadMovies();


document.addEventListener('click', async (e)=>{
    const card = e.target.closest(".movie-card");
    if (!card) {
        return;
    }
    const imdbId = card.dataset.imdbId;
    try {
        const response = await fetch(`${API_URL}/${imdbId}`);

        const movie = await response.json();

        if (movie.Response === "False") {
            console.error(movie.Error);
            return;
        }

        document.getElementById("modal-poster").src = movie.Poster;
        document.getElementById("modal-title").textContent = movie.Title;
        document.getElementById("modal-year").textContent = movie.Year;
        document.getElementById("modal-runtime").textContent = movie.Runtime;
        document.getElementById("modal-rating").textContent = `IMDb ${movie.imdbRating}`;
        document.getElementById("modal-genre").textContent = movie.Genre;
        document.getElementById("modal-plot").textContent = movie.Plot;
        document.getElementById("modal-actors").textContent = `Cast: ${movie.Actors}`;

        document.getElementById("movie-modal").classList.add("active");
        const trailerBtn = document.getElementById("trailer-btn");

trailerBtn.onclick = async () => {
    try {
        const trailerResponse = await fetch(
            `http://localhost:5001/api/trailer?query=${encodeURIComponent(movie.Title)}`
        );

        const trailer = await trailerResponse.json();

        if (!trailerResponse.ok) {
            console.error(trailer.message);
            return;
        }

        const trailerModal = document.getElementById("trailer-modal");
        const trailerPlayer = document.getElementById("trailer-player");

        trailerPlayer.src =
            `https://www.youtube.com/embed/${trailer.videoId}?autoplay=1`;

        trailerModal.classList.add("active");

    } catch (error) {
        console.error("Failed to load trailer:", error);
    }
};

    } catch (error) {
        console.error("Failed to load movie details:", error);
    }
});

const modal = document.getElementById("movie-modal");
const closeModal = document.getElementById("modal-close");

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("active");
    }
});

const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {

    searchContainer.classList.toggle("active");

    if (searchContainer.classList.contains("active")) {
        searchInput.focus();
    }
});


searchInput.addEventListener("keydown", async (event) => {

    if (event.key !== "Enter") {
        return;
    }

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    const movies = await getMovies(query);

    displayMovies(movies, "search-results");

    document.getElementById("search-results-section").style.display = "block";
});

const trailerModal = document.getElementById("trailer-modal");
const trailerClose = document.getElementById("trailer-close");
const trailerPlayer = document.getElementById("trailer-player");

trailerClose.addEventListener("click", () => {
    trailerModal.classList.remove("active");
    trailerPlayer.src = "";
});

trailerModal.addEventListener("click", (event) => {
    if (event.target === trailerModal) {
        trailerModal.classList.remove("active");
        trailerPlayer.src = "";
    }
});

const heroPlayBtn = document.querySelector(".play-btn");

heroPlayBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(
            `${API_URL.replace("/movies", "")}/trailer?query=Stranger%20Things`
        );

        const trailer = await response.json();

        if (!response.ok) {
            console.error(trailer.message);
            return;
        }

        const trailerModal = document.getElementById("trailer-modal");
        const trailerPlayer = document.getElementById("trailer-player");

        trailerPlayer.src =
            `https://www.youtube.com/embed/${trailer.videoId}?autoplay=1`;

        trailerModal.classList.add("active");

    } catch (error) {
        console.error("Failed to load hero trailer:", error);
    }
});

const heroInfoBtn = document.querySelector(".info-btn");

heroInfoBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(
            `${API_URL}/tt4574334`
        );

        const movie = await response.json();

        if (movie.Response === "False") {
            console.error(movie.Error);
            return;
        }

        document.getElementById("modal-poster").src = movie.Poster;
        document.getElementById("modal-title").textContent = movie.Title;
        document.getElementById("modal-year").textContent = movie.Year;
        document.getElementById("modal-runtime").textContent = movie.Runtime;
        document.getElementById("modal-rating").textContent = `IMDb ${movie.imdbRating}`;
        document.getElementById("modal-genre").textContent = movie.Genre;
        document.getElementById("modal-plot").textContent = movie.Plot;
        document.getElementById("modal-actors").textContent = `Cast: ${movie.Actors}`;

        document.getElementById("movie-modal").classList.add("active");
        const trailerBtn = document.getElementById("trailer-btn");

trailerBtn.onclick = async () => {
    try {
        const trailerResponse = await fetch(
            `http://localhost:5001/api/trailer?query=Stranger%20Things`
        );

        const trailer = await trailerResponse.json();

        if (!trailerResponse.ok) {
            console.error(trailer.message);
            return;
        }

        const trailerModal = document.getElementById("trailer-modal");
        const trailerPlayer = document.getElementById("trailer-player");

        trailerPlayer.src =
            `https://www.youtube.com/embed/${trailer.videoId}?autoplay=1`;

        trailerModal.classList.add("active");

    } catch (error) {
        console.error("Failed to load trailer:", error);
    }
};

    } catch (error) {
        console.error("Failed to load Stranger Things details:", error);
    }
});