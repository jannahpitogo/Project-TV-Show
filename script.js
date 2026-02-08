//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

// Create State
let state = {searchTerm: ""}
state["films"] = allEpisodes

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
  // Display films
  console.log("search", state.searchTerm)
  const filterFilms = state.films.filter((film) => film.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || film.summary.toLowerCase().includes(state.searchTerm.toLowerCase()) || film.id.toString().includes(state.searchTerm)) 
  console.log("filter films,", filterFilms)
  if (state.searchTerm) {
    match.innerHTML = ""
    match.innerHTML = `Displaying ${filterFilms.length}/${state.films.length} episodes`
    document.getElementById("search-div").append(match)
  }
  document.getElementById("root").replaceChildren(...createCard(filterFilms));
}

render()

// Search box
const searchBox = document.getElementById("search")
const handleInput = (event) => {
  state.searchTerm = event.target.value 
  render()
}
searchBox.addEventListener("input", handleInput)

// Displaying search results
let match = document.querySelector("span")
match.innerHTML = `Displaying ${state.films.length}/${state.films.length} episodes`

// Episode selector
const selector = document.getElementById("episode-selector")
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


