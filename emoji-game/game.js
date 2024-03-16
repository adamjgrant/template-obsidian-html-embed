export class Game {
  constructor(game) {
    this.game = game;
    this.clue = game.clue;
    this.date = game.date;
    this.active_round = 0;
  }

  increment_round() {
    this.active_round += 1;
  }

  get game_emojis () {
    return this.game.game;
  }

  get first () {
    return this.game_emojis[this.active_round - 1][0];
  }

  get second () {
    return this.game_emojis[this.active_round - 1][1];
  }

  get emoji_answer () {
    return this.game_emojis[this.active_round - 1][2];
  }

  get word_answer () {
    return this.game_emojis[this.active_round - 1][3];
  }

  set_up_round() {
    this.increment_round();
    document.getElementById("clue-first").innerText = this.first;
    document.getElementById("clue-second").innerText = this.second;
    this.set_up_round_spacers();
    this.blinking_cursor = 0;
  }

  get spacers() {
    return Array.from(document.querySelectorAll(".entry-zone.main .spacer"));
  }

  set entry(entry) {
    if (entry.length > this.spacers.length) return;
    const entry_as_array = entry.split("");
    this.spacers.forEach((spacer, index) => {
      if (index < entry.length) {
        spacer.innerText = entry_as_array[index];
      } else {
        spacer.innerText = "";
      }
    });

    this.blinking_cursor = entry.length;
  }

  set_up_round_spacers() {
    const entry_zone = document.getElementById("entry-zone");
    const spacer_template = document.getElementById("game-entry-spacer");
    Array.from({ length: this.word_answer.length }, () => {
      const spacer = document.importNode(spacer_template.content, true);
      entry_zone.appendChild(spacer);
    });
  }

  set blinking_cursor(index = 0) {
    if (index > this.spacers.length - 1) return this.spacers[this.spacers.length - 1].classList.remove("blink");
    this.spacers.forEach(spacer => spacer.classList.remove("blink"));
    this.spacers[index].classList.add("blink");
  }

  score_guess(guess) {
    const word_answer_as_array = this.word_answer.split("");
    const guess_as_array = guess.split("");
    let scored_guess = [];
    guess_as_array.forEach((letter, index) => {
      let scored_letter = {
        letter: letter,
        score: "black"
      };
      if (letter === word_answer_as_array[index]) {
        scored_letter.score = "green";
      } else if (word_answer_as_array.includes(letter)) {
        scored_letter.score = "yellow";
      }
      scored_guess.push(scored_letter);
    });

    return scored_guess;
  }

  submit_guess(guess) {
    if (guess === this.word_answer) {
      this.set_up_round();
    }
    else {
      // Make a copy of the entry zone above the current one with green and yellow markers
      const entry_zone = document.getElementById("entry-zone");
      const entry_zone_copy = entry_zone.cloneNode(true);
      const entry_zone_holder = document.getElementById("entry-zone-holder");
      const scored_guess = this.score_guess(guess);
      console.log(scored_guess);
      entry_zone_copy.querySelectorAll(".spacer").forEach((spacer, index) => {
        spacer.classList.add = `score-${scored_guess[index].score}`;
        spacer.classList.remove("blink");
      });
      entry_zone_copy.classList.remove("main");
      entry_zone_holder.prepend(entry_zone_copy);
    }
  }
}