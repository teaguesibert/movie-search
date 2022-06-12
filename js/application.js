var httpRequest = new XMLHttpRequest();

httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      var movies = JSON.parse(httpRequest.responseText);
      $("<p></p>", {
        class: "col-11 col-md-10 p-1 mb-0 text-dark",
        html: "Showing " + Object.keys(movies.Search).length + " of " + movies.totalResults
      }).appendTo('#results');
      movies.Search.forEach((item) => {
        $("<div></div>", {
          class: "movieContainer col-11 col-md-5 mx-3 p-2 mb-4",
        }).appendTo('#results');
        var lastContainer = $("div.movieContainer:last");
        $("<img></img>", {
          class: "imgPoster float-left p-2",
          src: item.Poster,
          onerror:"if (this.src = 'N/A') this.src = 'https://via.placeholder.com/300x400?text=Poster+Unavailable'"
        }).appendTo(lastContainer);
        $("<a></a>", {
          class: "imgInfo movieTitle",
          html: item.Title,
          href: "https://www.imdb.com/title/" + item.imdbID
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo mt-1",
          html: "Year: " + item.Year
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo text-capitalize my-0",
          html: "Type: " + "<span class='movieType'>" + item.Type + "</span>"
        }).appendTo(lastContainer);
        $.getJSON("https://www.omdbapi.com/?", { apikey: "17dc75f2", i: item.imdbID}, function(movieData) {
          if (movieData){
            $("<p></p>", {
              class: "imgInfo text-left mb-2 mt-0",
              html: "Rating: " + "<span class='movieScore'>" + movieData.imdbRating + "</span>" +" /10"
            }).appendTo(lastContainer);
            $("<p></p>", {
              class: "imgInfo text-left m-3 m-md-2",
              html: movieData.Plot
            }).appendTo(lastContainer);
            const scoreColor = document.getElementsByClassName('movieScore');
            for (const score of scoreColor){
              if (score.innerHTML > 5){
                score.style.color = '#6AFAAF';
              } else {
                score.style.color ='#DAA397';
              }
            }
          }
        })
        $("</br></br>", {
        }).appendTo(lastContainer);
      });
    } else {
      console.log(httpRequest.statusText);
    }
  }
}

httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}


var searchMovie = function () {
  var container = document.getElementById("results");
  var input = document.querySelector('input').value;
  var count = document.getElementById("results").children.length;
  if (count > 0) {
    container.replaceChildren("");
  }
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=full&apikey=17dc75f2');
    httpRequest.send(null);
  }
}
var userInput = document.getElementById("userInput");

// Execute a function when the user presses a key on the keyboard
userInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed;
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submitBtn").click();
  }
});

var random = document.getElementById("random");
random.addEventListener("click", function(event) {
  // If the user clicks
  event.preventDefault();
  async function getWord(url){
    const response = await fetch(url);
    var data = await response.json();
    document.getElementById("userInput").value = data.toString();
    console.log(data.toString());
    }
    var randNum = Math.random() * 8 | 3;
    getWord('https://random-word-api.herokuapp.com/word?length=' + randNum);


});

