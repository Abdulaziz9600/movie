let elCinemaList = $(".js-cinema-list");
let elFormSerach = $(".js-form-search");
let elFlimSerach = $(".js-films-search");
let elFilmCategories = $(".js-select-categories");
let elFilmRating = $(".js-select-rating");
let elFilmSort = $(".js-select-sort")
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

  $(".card-title", movieElement).textContent = movie.title.toString();
  $(".card-img-top", movieElement).src = movie.poster;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-cast", movieElement).textContent = movie.fulltitle;
  $(".card-genres", movieElement).textContent = movie.Categories;
  $(".card-year", movieElement).textContent = movie.summary;
  $(".play", movieElement).href = movie.trailer;

  return movieElement;
}

let renderMovies = (movies) => {
  elCinemaList.innerHTML = "";
  let elResultFragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    elResultFragment.appendChild(createMovieElement(movie));
  })

  elCinemaList.appendChild(elResultFragment);
}

renderMovies(normalizedMovies);

elFlimSerach.addEventListener("change", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp(elFlimSerach.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })
  renderMovies(searchResult);
})


let numberCategories = [];

normalizedMovies.forEach((film) => {
  film.categories.split(", ").forEach((categori) => {
    if(!numberCategories.includes(categori)){
      numberCategories.push(categori);
    }
  })
})

numberCategories.forEach((movi)=>{

  let newOption = createElement("option","","");
  newOption.textContent = movi;
  newOption.option = movi;
  elFilmCategories.append(newOption);

  
})
  
elFilmCategories.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elCinemaList.innerHTML = "";

  let categoryMovies = normalizedMovies.filter(function(movie) {
    if (movie.categories.includes(elFilmCategories.value)){
      return movie.categories.includes(elFilmCategories.value)
    }
  })

  renderMovies(categoryMovies)
})

elFilmRating.addEventListener("change", (evt) => {
  evt.preventDefault();
  let newRating = [];

  normalizedMovies.forEach((kino) =>{

if(kino.imdbRating >= elFilmRating.value){
   newRating.push(kino);
}
  })
  renderMovies(newRating);
})

let newOptionArry = ["A-Z","Z-A","Reating=>","Reating<="];


newOptionArry.forEach((grow)=>{
  
  let newOption = createElement("option","",grow);
  newOption.textContent = grow;
  newOption.value = grow;
  
  elFilmSort.append(newOption);
}) 

let sortMovies = []
if (elFilmSort.value == newOptionArry[0]){
  sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
}

elFilmSort.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elCinemaList.innerHTML = "";
  let sortMovies = [];
    if (elFilmSort.value == newOptionArry[0]){
      sortMovies = normalizedMovies.sort((a,b)=> a.title.localeCompare(b.title))
    }
    if (elFilmSort.value == newOptionArry[1]){
      sortMovies = normalizedMovies.sort((a,b)=> b.title.localeCompare(a.title))
    }
    if (elFilmSort.value == newOptionArry[2]){
      sortMovies = normalizedMovies.sort((a,b)=> b.raiting - a.raiting)
    }
    if (elFilmSort.value == newOptionArry[3]){
      sortMovies = normalizedMovies.sort((a,b)=> a.raiting - b.raiting)
    }
   
  renderMovies(sortMovies)
})