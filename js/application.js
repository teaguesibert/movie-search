var httpRequest = new XMLHttpRequest();
            
httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      var movies = JSON.parse(httpRequest.responseText);
      movies.Search.forEach((item) => {
        $("<div></div>", {
          class: "movieContainer col-12 col-md-5 col-lg-3 text-center"
        }).appendTo('#results');
        var lastContainer = $("div.movieContainer:last");
        $("<img></img>", {
          class: "imgPoster img-fluid rounded p-3",
          src: item.Poster
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo",
          html: "Title: " + item.Title
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo",
          html: "Year: " + item.Year
        }).appendTo(lastContainer);
        $("<p></p>", {
          class: "imgInfo",
          html: "Type: " + item.Type
        }).appendTo(lastContainer);
        $("<a></a>", {
          class: "imgInfo",
          html: "https://www.imdb.com/title/" + item.imdbID,
          href: "https://www.imdb.com/title/" + item.imdbID
        }).appendTo(lastContainer);
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
    var randNum = Math.random() * 8 | 2;
    getWord('https://random-word-api.herokuapp.com/word?length=' + randNum);


});