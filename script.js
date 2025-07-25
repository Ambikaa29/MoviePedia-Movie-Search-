// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// Details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Load movies from API
async function loadMovies(searchTerm) {
const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
const res = await fetch(`${URL}`);
const data = await res.json();
if (data.Response == "True") displayMovieList(data.Search);
}

//find movie
function findMovies() {
let searchTerm = (movieSearchBox.value).trim();
if (searchTerm.length > 0) {
searchList.classList.remove('hide-search-list');
loadMovies(searchTerm);
} else {
searchList.classList.add('hide-search-list');
}
}

function displayMovieList(movies)
 {
searchList.innerHTML = "";
movies.forEach(movie => {
let movieListItem = document.createElement('div');
movieListItem.dataset.id = movie.imdbID;
movieListItem.classList.add('search-list-item');
let moviePoster = movie.Poster !== "N/A" ? movie.Poster : "image_not_found.png";

movieListItem.innerHTML = `
<div class="search-item-thumbnail">
<img src="${moviePoster}">
</div>
<div class="search-item-info">
<h3>${movie.Title}</h3>
<p>${movie.Year}</p>
</div>
`;
searchList.appendChild(movieListItem);
});
loadMovieDetails();
}


function loadMovieDetails() {
const searchListMovies = searchList.querySelectorAll('.search-list-item');
searchListMovies.forEach(movie => {
movie.addEventListener('click', async () => {
searchList.classList.add('hide-search-list');
movieSearchBox.value = "";
const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
const movieDetails = await result.json();
displayMovieDetails(movieDetails);


});
});
}



function checkAuthentication() 
{
    const userexist = localStorage.getItem("user");
    if (userexist) {
      return true;
    } else {
      return false;
    }
}





function addToFavorites(title, plot) {
   
    const vari = checkAuthentication()
if(vari)
{
    // Check if there are already favorites stored in local storage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if the movie title already exists in the favorites list
    const existingMovie = favorites.find(movie => movie.title === title);
    if (!existingMovie) {
        // Push the new favorite movie details to the favorites array
        favorites.push({ title: title, description: plot });
        
        // Save the updated favorites array back to local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("Added to Fav")
    }
}
else{
    alert("please login")
    window.location.href="/signup.html"
    }
}


function displayMovieDetails(details) {
resultGrid.innerHTML = `

<div class="movie-poster">
<img src="${details.Poster !== "N/A" ? details.Poster : "image_not_found.png"}" alt="movie poster">
</div>
<div class="movie-info">
<h3 class="movie-title">${details.Title}</h3>
<ul class="movie-misc-info">
<li class="year">Year: ${details.Year}</li>
<li class="rated">Ratings: ${details.Rated}</li>
<li class="released">Released: ${details.Released}</li>
</ul>
<p class="genre"><b>Genre:</b> ${details.Genre}</p>
<p class="writer"><b>Writer:</b> ${details.Writer}</p>
<p class="actors"><b>Actors: </b>${details.Actors}</p>
<p class="plot"><b>Plot:</b> ${details.Plot}</p>
<p class="language"><b>Language:</b> ${details.Language}</p>
<p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
</div>

`;
}

window.addEventListener('click', (event) => {
if (event.target.className != "form-control") {
searchList.classList.add('hide-search-list');
}
});

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${details.Poster !== "N/A" ? details.Poster : "image_not_found.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors: </b>${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
            <button class="watch-trailer-btn">Watch Trailer</button>
            <button class="add-to-favorites" >Add to Favorites</button>
        </div>
    `;

    // Add event listener to the "Watch Trailer" button
    const watchTrailerBtn = document.querySelector('.watch-trailer-btn');
    watchTrailerBtn.addEventListener('click', () => {
        // Open trailer link in a new tab or window
        window.open(`https://www.youtube.com/results?search_query=${details.Title}+trailer`, '_blank');
    });

    // Add event listener to the "Add to Favorites" button
    const addToFavoritesBtn = document.querySelector('.add-to-favorites');
    addToFavoritesBtn.addEventListener('click', () => {
        addToFavorites(details.Title, details.Plot);
    });
}

  
  




