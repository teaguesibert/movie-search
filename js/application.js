const httpRequest = new XMLHttpRequest();

const movieGenres = [
  "action",
  "adventure",
  "animation",
  "biography",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "film-noir",
  "history",
  "horror",
  "music",
  "musical",
  "mystery",
  "romance",
  "sci-fi",
  "short",
  "sport",
  "superhero",
  "thriller",
  "war",
  "western",
];

httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      const movies = JSON.parse(httpRequest.responseText);

      // Enable or disable buttons
      document.getElementById("prevButton").disabled = currentPage === 1;
      document.getElementById("nextButton").disabled =
        currentPage * 10 >= parseInt(movies.totalResults, 10);

      displayMovies(movies);
    } else {
      console.log(httpRequest.statusText);
    }
  }
};

httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}

const displayMovies = (movies) => {
  $("<p></p>", {
    class: "col-11 col-md-10 p-1 mb-0 text-dark",
    html: `Showing ${Object.keys(movies.Search).length} of ${movies.totalResults}`,
  }).appendTo("#results");
  movies.Search.forEach(displayMovie);
}

const displayMovie = (item) => {
  $("<div></div>", {
    class: "movieContainer col-11 col-md-5 mx-3 p-2 mb-4",
  }).appendTo("#results");
  const lastContainer = $("div.movieContainer:last");
  $("<img></img>", {
    class: "imgPoster float-left p-2",
    src: item.Poster,
    onerror: "if (this.src = 'N/A') this.src = 'https://via.placeholder.com/300x400?text=Poster+Unavailable'",
  }).appendTo(lastContainer);
  $("<a></a>", {
    class: "imgInfo movieTitle",
    html: item.Title,
    href: `https://www.imdb.com/title/${item.imdbID}`,
  }).appendTo(lastContainer);
  $("<p></p>", {
    class: "imgInfo mt-1",
    html: `Year: ${item.Year}`,
  }).appendTo(lastContainer);
  $("<p></p>", {
    class: "imgInfo text-capitalize my-0",
    html: `Type: <span class='movieType'>${item.Type}</span>`,
  }).appendTo(lastContainer);
  $.getJSON(
    "https://www.omdbapi.com/?",
    { apikey: "17dc75f2", i: item.imdbID },
    function (movieData) {
      if (movieData) {
        $("<p></p>", {
          class: "imgInfo text-left mb-2 mt-0",
          html: `Rating: <span class='movieScore'>${movieData.imdbRating}</span> /10`,
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo text-left m-3 m-md-2",
          html: movieData.Plot,
        }).appendTo(lastContainer);
        const scoreColor = document.getElementsByClassName("movieScore");
        for (const score of scoreColor) {
          if (score.innerHTML > 5) {
            score.style.color = "#6AFAAF";
          } else {
            score.style.color = "#DAA397";
          }
        }
      }
    }
  );
  $("</br></br>", {}).appendTo(lastContainer);
};

const searchMovie = (page = 1) => {
  const container = document.getElementById("results");
  const input = document.querySelector('input').value;

  if (container.children.length > 0) {
    container.replaceChildren("");
  }

  if (input) {
    httpRequest.open("GET", `https://www.omdbapi.com/?s=${input}&plot=full&apikey=17dc75f2&page=${page}`);
    httpRequest.send(null);
  }
}

const userInput = document.getElementById("userInput");

userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submitBtn").click();
  }
});

const random = document.getElementById("random");

random.addEventListener("click", (event) => {
  event.preventDefault();
  const randomGenre = movieGenres[Math.floor(Math.random() * movieGenres.length)];
  document.getElementById("userInput").value = randomGenre;
  searchMovie(currentPage);
});

const prevButton = document.createElement("button");
prevButton.textContent = "< Previous";
prevButton.id = "prevButton";
prevButton.disabled = true;
document.getElementById("page-nav").appendChild(prevButton);

const nextButton = document.createElement("button");
nextButton.textContent = "Next >";
nextButton.id = "nextButton";
nextButton.disabled = true;
document.getElementById("page-nav").appendChild(nextButton);

// Add event listeners for the buttons
let currentPage = 1;

document.getElementById("prevButton").addEventListener("click", () => {
  currentPage--;
  searchMovie(currentPage);
});

document.getElementById("nextButton").addEventListener("click", () => {
  currentPage++;
  searchMovie(currentPage);
});