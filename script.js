//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

let state = {searchTerm: ""}
state["films"] = allEpisodes

const searchBox = document.getElementById("search")

const handleInput = (event) => {
  state.searchTerm = event.target.value 
  render()
}

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
  // const title = document.createElement("h2");
  // title.textContent = `${name} - ${seasonNumber}`;
  // const img = document.createElement("img")
  // img.src = medium;
  // const description = document.createElement("p")
  // description.innerHTML = summary;
  // card.appendChild(title, img, summary)
  // console.log(card)


  card.querySelector("h2").textContent = `${name} - ${seasonNumber}`;
  card.querySelector("img").src = medium;
  card.querySelector("p").innerHTML = summary;
  //I used innerhtml since in the allEpisodes the <p> is included in the paragraph. (In the episodes.js)
  cards.push(card)
}
return cards
}

function render() {
  const filterFilms = state.films.filter((film) => film.name.toLowerCase().includes(state.searchTerm.toLowerCase())) 

  document.getElementById("root").replaceChildren(...createCard(filterFilms));
}

render()
searchBox.addEventListener("input", handleInput)


