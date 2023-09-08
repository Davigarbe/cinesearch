const API_KEY = "86ed5042";

async function searchMovie() {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  console.log({ searchText });
  const movies = await fetchOmdb(searchText);
  if (!movies) return;

  const moviesSorted = movies.sort((a, b) => {
    if (a.Year > b.Year) return -1;
    if (a.Year < b.Year) return 1;
    return 0;
  });

  console.log({ moviesSorted });
  renderMovies(moviesSorted);
}

function renderMovies(movies) {
  const moviesHTML = document.getElementById("movie-list");

  if (!movies.length) {
    moviesHTML.innerHTML =
      "<p id='placeholder' class='placeholder'>Nenhum filme encontrado</p>";

    return;
  }

  moviesHTML.innerHTML = "";

  for (movie of movies) {
    moviesHTML.innerHTML += `
	<li class='film-item'>
	<p class='film-title'>${movie.Title}</p>
	<p class='film-year'>${movie.Year}</p>

	<img class='film-image' src="${movie.Poster}"/ >
	`;
  }
}

async function fetchOmdb(searchText) {
  try {
    const loading = document.getElementsByClassName("loading");
    loading[0].classList.add("active");

    const response = await fetch(
      "https://www.omdbapi.com/?s=" + searchText + "&apikey=" + API_KEY,
      { method: "GET" }
    );

    const json = await response.json();

    if (!json.Search) {
      return [];
    }

    return json.Search;
  } catch (error) {
    return [];
  } finally {
    loading.classList.remove("active");
  }
}
