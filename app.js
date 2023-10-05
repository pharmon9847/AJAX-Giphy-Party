// console.log("Let's get this party started!");

// Set global variables
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

// function to add gif to the DOM
function addGif(response) {
  let numResults = response.data.length;
  if (numResults) {
    let randomID = Math.floor(Math.random() * numResults);
    let $newColumn = $("<div>", {
      class:
        "col-md-4 col-12 mx-auto border border-dark shadow-lg rounded-lg bg-primary",
    });
    let $newGif = $("<img>", {
      src: response.data[randomID].images.original.url,
      class: "w-100 p-3",
    });
    $newColumn.append($newGif);
    $gifArea.append($newColumn);
  }
}

// function to make axios GET request
// TODO remove hard-coded api key

$("form").on("submit", async function (event) {
  event.preventDefault();

  let searchQuery = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchQuery,
      api_key: "7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7",
    },
  });
  addGif(response.data);
});

// function to remove gifs from DOM
$("#remove").on("click", function () {
  $gifArea.empty();
});

// function to add trending gifs to DOM
$("#trending").on("click", async function () {
  const response = await axios.get("https://api.giphy.com/v1/gifs/trending", {
    params: {
      api_key: "7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7",
    },
  });
  addGif(response.data);
});

// * Initial axios code to check api calls
// async function gifSearch(gif) {
//   //   const search = `search?q=${gif}`;
//   const url = `https://api.giphy.com/v1/gifs/search?q=${gif}api_key=7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7&q=&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
//   const response = await axios.get(url);
//   console.log(response);
// }

// async function gifTrendingSearch() {
//   const response = await axios.get(
//     'https://api.giphy.com/v1/gifs/trending?api_key=7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7&q=&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips'
//   );
//   console.log(response);
// }

// async function gifRandomSearch() {
//   const response = await axios.get(
//     'https://api.giphy.com/v1/gifs/random?api_key=7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7&q=&limit=25&offset=0&lang=en&bundle=messaging_non_clips'
//   );
//   console.log(response);
// }

// gifSearch(dogs);
// gifTrendingSearch();
// gifRandomSearch();
