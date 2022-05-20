let elCinemaList = $(".js-cinema-list");
let elFormSerach = $(".js-form-search");
let elFlimSerach = $(".js-films-search");
let elMovieTemplate = $("#movies-template").content;

movies.splice(100);

let normalizedMovies = movies.map((movie) => {
  return {
    title: movie.Title.toString(),
    fulltitle: movie.fulltitle,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    imdbRating: movie.imdb_rating,
    language: movie.language,
    trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
    poster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
  }
})

let createMovieElement = (movie) => {
  elCinemaList.innerHTML = "";

  let movieElement = elMovieTemplate.cloneNode(true);

  $(".card-title", movieElement).textContent = movie.title.to;
  $(".card-img-top", movieElement).src = movie.poster;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-cast", movieElement).textContent = movie.fulltitle;
  $(".card-genres", movieElement).textContent = movie.Categories;
  $(".card-year", movieElement).textContent = movie.summary;
  $(".play", movieElement).href = movie.trailer;

  return movieElement;
}

let renderMovies = (movies) => {
  let elResultFragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    elResultFragment.appendChild(createMovieElement(movie));
  })

  elCinemaList.appendChild(elResultFragment);
}

renderMovies(normalizedMovies);

elFormSerach.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp(elFlimSerach.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })
  renderMovies(searchResult);
})