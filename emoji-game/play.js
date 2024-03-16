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
const game_emojis = todaysGame.game

let spots = {}

for (let round = 1; round<6; round++) {
  for (let column = 1; column < 4; column++) {
    spots[`round_${round}_${column}`] = document.getElementById(`round-${round}-${column}`);
  }
  // Double click hints
  const hint_field = spots[`round_${round}_3`];
  hint_field.addEventListener("dblclick", () => {
    hint_field.innerText = game_emojis[round-1][2]
  });
}

// Start showing the game
spots.round_1_1.innerText = game_emojis[0][0];
spots.round_1_2.innerText = game_emojis[0][1];
active_round = 1;

const guesses = Array.from(document.querySelectorAll(".guess input"))
guesses.forEach((guess_element) => {
  const width_unit = guess_element.getBoundingClientRect().width - 5;
  guess_element.addEventListener("keyup", (e) => {
    e.stopPropagation();
    const length = e.target.value.length;
    const new_width = width_unit * length + 5;
    e.target.style.width = `${new_width}px`;
  })
})

