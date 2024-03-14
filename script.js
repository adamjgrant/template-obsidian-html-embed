let ticket_queue = 0;
let currently_playing = false;

function getRandomInteger(min, max) {
  // Ensuring the min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const play_a_lottery_ticket = () => {
  if (ticket_queue == 0) return 
  const winning_numbers = (new Array(5).fill()).map(x => getRandomInteger(1,69))
  console.log(winning_numbers)
  const playing_numbers = (new Array(5).fill()).map(x => getRandomInteger(1,69))
  console.log(playing_numbers)
  console.log("Played a lottery ticket")
  ticket_queue -= 1;
}

const begin_playing = () => {
  if (currently_playing) return;
  currently_playing = true;
  while(ticket_queue > 0) {
    play_a_lottery_ticket();
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
