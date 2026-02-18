let allEpisodes = [];
// getAllEpisodes();

// Create State
let state = {
  searchTerm: "",
  isLoading: true,
  error: null
}
state["films"] = [];
state["shows"] = [];
state["showID"] = "1";

let match = document.querySelector("span")

//Making the card of films.
function createCard(filterFilms) {
  let cards = []

  for (const item of filterFilms) {
  const {
    name,
    season,
    number,
    image: { medium },
    summary,
  } = item;
  const card = document.querySelector("template").content.cloneNode(true);
  const seasonNumber =
    `S${season.toString().padStart(2, "0")}` +
    `E${number.toString().padStart(2, "0")}`;
  //Line 8 just make an output like "S05E06", I just combined 2 template literals to make and combined the season and episode.

  card.querySelector("h2").textContent = `${name} - ${seasonNumber}`;
  card.querySelector("img").src = medium;
  card.querySelector("p").innerHTML = summary;
  //I used innerhtml since in the allEpisodes the <p> is included in the paragraph. (In the episodes.js)
  cards.push(card)
}
return cards
}

function render() {
  const root = document.getElementById("root");
  // Display films

  if (state.isLoading) {
    document.getElementById("loading").hidden = false
    document.getElementById("main").hidden = true;
    document.getElementById("error").hidden = true;
    return;
  }

  if(state.error) {
    document.getElementById("error").hidden = false;
    document.getElementById("main").hidden = true;
    document.getElementById("loading").hidden = true;
    return;
  }

  document.getElementById("main").hidden = false;
  document.getElementById("error").hidden = true;
  document.getElementById("loading").hidden = true;

  const filterFilms = state.films.filter((film) => film.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || film.summary.toLowerCase().includes(state.searchTerm.toLowerCase()) || film.id.toString() === state.searchTerm) 

    match.innerHTML = ""
    match.textContent = `Displaying ${filterFilms.length}/${state.films.length} episodes`
    document.getElementById("search-div").append(match)
    root.replaceChildren(...createCard(filterFilms));
}

// render()

function searchFilter(){
  const searchBox = document.getElementById("search")
  
  const handleInput = (event) => {
    state.searchTerm = event.target.value 
    render()
  }
  searchBox.addEventListener("input", handleInput)

}

function displaySearch(){
  // Displaying search results
match.innerHTML = `Displaying ${state.films.length}/${state.films.length} episodes`
render();
}

function episodeSelector(){
  const selector = document.getElementById("episode-selector")
  selector.innerHTML = ""
  let episodes = []
  
  // Option to display all episodes from selector
  const allEpisodesOption = document.createElement("option")
  allEpisodesOption.value = ""
  allEpisodesOption.innerHTML = "All Episodes"
  episodes.push(allEpisodesOption)

  // An option for each movie
  state.films.forEach((film) => {
    const option = document.createElement("option")
    option.value = film.id
    option.innerHTML = `S${film.season.toString().padStart(2, "0")}` +
    `E${film.number.toString().padStart(2, "0")} - ${film.name}`
    episodes.push(option)
})
    selector.append(...episodes)

    // Re-render based on option selector
  selector.addEventListener("change", () => {
    state.searchTerm = selector.value
    render()
})
}

async function showSelector(){
  const selector = document.getElementById("show-selector")
  let shows = []

  // An option for each show
  state.shows.forEach((show) => {
    const option = document.createElement("option")
    option.value = show.id
    option.innerHTML = show.name
    shows.push(option)
})
    selector.append(...shows)

    // Re-render based on option selector
  selector.addEventListener("change", () => {
    state.showID = selector.value
    render()
    fetchFilms(state.showID)
})
}

function mainCall(){
  showSelector()
  episodeSelector();
  displaySearch();
  searchFilter();
  render();
}

render();     //make sure that render is called first.

// To get info of all shows ans store in state.shows
async function fetchShows() {
  fetch('https://api.tvmaze.com/shows')
    .then(response => {
      if (!response.ok) throw new Error("Request Failed")
      return response.json();
    })
    .then(data => {
      state.shows = data;
      state.isLoading = false;          
      mainCall();                       
    })
    .catch(() => {
      state.isLoading = false;
      state.error = true;
      render();
  })}

async function fetchFilms(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
  .then(response => {
    if (!response.ok) throw new Error("Request Failed")
    return response.json();     //storing the data into a json file.
  })
    
  .then(data => {             //Handling the data after fetching
    allEpisodes = data;           //In here if all data is fetched and assigned state of loading will be set to false
    state.films = data;
    state.isLoading = false;          
    mainCall();                       //kind of work like an setup(). 
  })
  .catch(() => {
    state.isLoading = false;
    state.error = true;
    render();
  })
}

fetchShows()
fetchFilms(state.showID)

