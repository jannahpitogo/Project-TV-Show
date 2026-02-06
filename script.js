//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

//Making the card of films.
for (const item of allEpisodes) {
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

  document.getElementById("root").append(card);
}
