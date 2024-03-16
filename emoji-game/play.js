import { games } from "./games.js"

// Function to format date to YYYY-MM-DD
function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const today = formatDate(new Date());
const todaysGame = games.find(game => game.date === today);

let spots = {}

for (let round = 1; round<6; round++) {
  for (let column = 1; column < 4; column++) {
    spots[`round_${round}_${column}`] = document.getElementById(`round-${round}-${column}`);
  }
}

const game_emojis = todaysGame.game
spots.round_1_1.innerText = game_emojis[0][0];
spots.round_1_2.innerText = game_emojis[0][1];
