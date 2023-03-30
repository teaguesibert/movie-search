# Movie Search Website

A simple movie search website that allows users to search for movies and TV series using the OMDB API. The website displays search results with posters, titles, years, types, ratings, and plot summaries. It also supports pagination for easy navigation through the search results.

## Features

- Search for movies and TV series by title
- Displays movie and TV series details
- Pagination support
- Random genre search
- Responsive design

## Getting Started

1. Clone the repository or download the source code.
2. Open `index.html` in your preferred web browser.

## Usage

- Enter a movie or TV series title in the search input field and press Enter or click the search button.
- Browse through the results using the Previous and Next buttons.
- Click on a title to visit its IMDb page for more information.
- Click the random button to generate a random title and perform a search.

## Dependencies

- [jQuery](https://jquery.com/)
- [OMDB API](https://www.omdbapi.com/)

## API Key

An API key is required to access the OMDB API. Replace `[yourkey]` in the JavaScript code with your own API key:

```javascript
httpRequest.open("GET", `https://www.omdbapi.com/?s=${input}&plot=full&apikey=[yourkey]&page=${page}`);
