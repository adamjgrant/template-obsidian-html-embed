let ticket_queue = 0;
let currently_playing = false;
let ledger = 1000000;
let last_winning_numbers = [0, 0, 0, 0, 0, 0];
let last_played_numbers = [0, 0, 0, 0, 0, 0];
let result_as_number = -1;
let total_wins = 0;
let total_losses = 0;

function getRandomInteger(min, max) {
  // Ensuring the min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate_numbers = () => {
  let numbers = (new Array(5).fill()).map(x => getRandomInteger(1,69));
  numbers.push(getRandomInteger(1,26));
  return numbers;
}

const score_tickets = (winning_numbers, playing_numbers) => {
  let matchCount = 0;
  let powerballMatch = false;
  let prize = -1; // Each ticket costs $1, so the base case is a $1 loss.

  // Check for matching numbers excluding the Powerball
  for (let i = 0; i < 5; i++) {
    if (playing_numbers.includes(winning_numbers[i])) {
      matchCount++;
    }
  }

  // Check if the Powerball matches
  if (playing_numbers[5] === winning_numbers[5]) {
    powerballMatch = true;
  }

  // Determine the prize based on matches
  if (powerballMatch) {
    if (matchCount === 5) {
      // Grand Prize
      prize = 100000000;
    } else if (matchCount === 4) {
      // Third Prize
      prize = 50000;
    } else if (matchCount === 3) {
      // Fifth Prize
      prize = 100;
    } else if (matchCount === 2) {
      // Seventh Prize
      prize = 7;
    } else if (matchCount === 1) {
      // Eighth Prize
      prize = 4;
    } else if (matchCount === 0) {
      // Ninth Prize
      prize = 4;
    }
  } else {
    if (matchCount === 5) {
      // Second Prize
      prize = 1000000;
    } else if (matchCount === 4) {
      // Fourth Prize
      prize = 100;
    } else if (matchCount === 3) {
      // Sixth Prize
      prize = 7;
    }
  }

  return prize;
};

const play_a_lottery_ticket = async (delay = 0) => {
  if (ticket_queue == 0) return 
  [last_winning_numbers, last_played_numbers] = [generate_numbers(), generate_numbers()];
  let prize = score_tickets(last_winning_numbers, last_played_numbers);
  ledger += prize;
  result_as_number = prize;
  total_wins += prize + 1;
  total_losses -= 1;
  ticket_queue -= 1;
  await new Promise(resolve => setTimeout(resolve, delay));
}

const update_interface = async () => {
  let ledger_formatted = ledger.toLocaleString('en-US');
  ledgerBalance.innerText = `$${ledger_formatted}`
  last_winning_numbers.forEach((number, index) => {
    document.getElementById(`win-${index+1}`).innerText = number;
  })
  last_played_numbers.forEach((number, index) => {
    document.getElementById(`pick-${index+1}`).innerText = number;
  })
  let result_as_word = {
    "-1": "LOSE", "0": "DRAW", "1": "WIN"
  }[result_as_number/Math.abs(result_as_number)];
  result.innerText = `${result_as_word}: $${result_as_number}`
  wins.innerText = total_wins;
  losses.innerText = total_losses;
}

const begin_playing = async () => {
  if (currently_playing) return;
  currently_playing = true;
  let delay = 0;
  while(ticket_queue > 0) {
    if (delay === 0) {
      await play_a_lottery_ticket();
      delay = 1200;
    }
    else {
      delay = delay * (delay > 400 ? .7 : .95);
      delay = Math.max(delay, 25);
      await play_a_lottery_ticket(delay);
    }
    await update_interface();
  }
  return currently_playing = false;
}

const play_amount = (amount) => {
  console.log(`Playing ${amount} lottery tickets`)
  ticket_queue += amount;
  begin_playing();
}

let buttons = {}

const button_names = [
  "play_1",
  "play_5",
  "play_10",
  "play_25",
  "play_100",
  "play_1000"
]

button_names.forEach(id => {
  buttons[id] = document.getElementById(id.replace("_","-"));
  const button = buttons[id];
  const amount = parseInt(id.replace(/\w+_/,""))
  button.addEventListener("click", () => {play_amount(amount)})
});

const ledgerBalance = document.getElementById("ledger-balance");
const result = document.getElementById("result");
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");