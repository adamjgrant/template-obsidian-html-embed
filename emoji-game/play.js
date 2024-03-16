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

const get_round_property = (game_emojis, round) => {
  const game_emoji_row = game_emojis[(round ? round : active_round) - 1];
  return {
    first: game_emoji_row[0],
    second: game_emoji_row[1],
    emoji_answer: game_emoji_row[2],
    word_answer: game_emoji_row[3]
  }
}

// Start showing the game
let active_round = 1;
spots.round_1_1.innerText = get_round_property(game_emojis).first;
spots.round_1_2.innerText = get_round_property(game_emojis).second;
const hint_element = document.getElementById("hint");
const hint = todaysGame.clue;
hint_element.innerText = `Today's hint: ${hint}`;

const guesses = Array.from(document.querySelectorAll(".guess input"))
guesses[0].focus();
guesses.forEach((guess_element, index) => {
  const width_unit = guess_element.getBoundingClientRect().width - 5;
  guess_element.addEventListener("keyup", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      submit_guess(e.target.value)
    }
    else {
      const length = e.target.value.length;
      const new_width = width_unit * length + 5;
      e.target.style.width = `${new_width}px`;
    }
  })

  const blank_holder = document.createElement("div");
  blank_holder.classList.add("blank-holder");
  guess_element.parentElement.appendChild(blank_holder);
  let number_of_blanks = get_round_property(game_emojis, index + 1).word_answer.length
  for (let x = 0; x < number_of_blanks; x++) {
    // Create word space character
    const blank = document.createElement("div")
    blank.classList.add("blank");
    blank_holder.appendChild(blank);
  }
})

const submit_guess = (guess) => {
  let formatted_guess = guess.toUpperCase().trim().replace(/\s/g, "");
  let answer = get_round_property(game_emojis).word_answer.replace(/\s/g, "");
  if (formatted_guess === answer) {
    console.log("Correct (todo)")
  }
}