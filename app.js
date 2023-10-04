console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

function addGif(response) {
  let numResults = response.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newColumn = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: response.data[randomIdx].images.original.url,
      class: "w-100",
    });
    $newColumn.append($newGif);
    $gifArea.append($newColumn);
  }
}

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

$("#remove").on("click", function () {
  $gifArea.empty();
});

$("#trending").on("click", async function () {
  const response = await axios.get("https://api.giphy.com/v1/gifs/trending", {
    params: {
      api_key: "7DtJp0twiyCRpsgSRHlmbWs0P8Q9fya7",
    },
  });
  addGif(response.data);
});

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
