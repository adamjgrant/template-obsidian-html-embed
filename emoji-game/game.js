const TIME_TO_CELEBRATE = 2000;
const MAX_NUMBER_OF_TRIES = 5;
const ANIMATION_CLASSES = ["animate__animated", "animate__jackInTheBox"]

export class Game {
  constructor(game) {
    this.game = game;
    this.clue = game.clue;
    this.date = game.date;
    this.active_round = 0;
    this.number_of_tries_in_round = 0;
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
    let answer = this.game_emojis[this.active_round - 1][3];
    answer = answer.replace(/\s/g, ""); // For now removing spaces but would be fun to do a version with them.
    return answer;
  }

  set_up_round() {
    this.increment_round();
    if (this.active_round > this.game_emojis.length) {
      return this.show_curtain();
    }
    document.getElementById("clue-first").innerText = this.first;
    document.getElementById("clue-second").innerText = this.second;
    this.set_up_round_spacers();
    this.blinking_cursor = 0;
    this.number_of_tries_in_round = 0;
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
    this.reset_clue_equals();
  }

  set_up_round_spacers() {
    this.reset_clue_equals();
    const entry_zone = document.getElementById("entry-zone");
    entry_zone.innerHTML = "";
    const spacer_template = document.getElementById("game-entry-spacer");
    Array.from({ length: this.word_answer.length }, () => {
      const spacer = document.importNode(spacer_template.content, true);
      entry_zone.appendChild(spacer);
    });
    const entry_zone_holder = document.getElementById("entry-zone-holder");
    entry_zone_holder.innerHTML = "";
  }

  set blinking_cursor(index = 0) {
    if (index > this.spacers.length - 1) return this.spacers[this.spacers.length - 1].classList.remove("blink");
    this.spacers.forEach(spacer => spacer.classList.remove("blink"));
    this.spacers[index].classList.add("blink");
  }

  score_guess(guess) {
    const word_answer_as_array = this.word_answer.split("").map(letter => {
      return { letter: letter, score: "disabled" };
    });
    const guess_as_array = guess.split("");
    let scored_guess = [];
    guess_as_array.forEach((letter, index) => {
      let scored_letter = {
        letter: letter,
        score: "disabled"
      };
      if (letter === word_answer_as_array[index].letter) {
        word_answer_as_array[index].score = "green";
        scored_letter.score = "green";
      } else if (word_answer_as_array.map(obj => obj.letter).includes(letter)) {
        // Count the number of occurences of this letter in the word answer
        // Only mark this as yellow if there are fewer either green or yellow marked instances of this letter
        const appearances_of_this_letter = word_answer_as_array.filter(item => item.letter === letter).length;
        const green_or_yellow_appearances = word_answer_as_array.filter(item => item.letter === letter && (item.score === "green" || item.score === "yellow")).length;
        if (appearances_of_this_letter > green_or_yellow_appearances) {
          const index_of_first_non_yellow_or_green_instance_of_letter_in_word_answer_as_array = word_answer_as_array.findIndex(item => item.letter === letter && item.score === "disabled");
          word_answer_as_array[index_of_first_non_yellow_or_green_instance_of_letter_in_word_answer_as_array].score = "yellow";
          scored_letter.score = "yellow";
        }
      }
      scored_guess.push(scored_letter);
    });

    return scored_guess;
  }

  get clue_equals_element() {
    return document.getElementById("clue-equals")
  }

  reset_clue_equals() {
    this.clue_equals_element.innerText = "?";
    this.clue_equals_element.classList.remove(...ANIMATION_CLASSES);
    Array.from(document.querySelectorAll(".entry-zone")).forEach(entry_zone => {
      entry_zone.classList.remove("hide");
    });
  }

  copy_clues_to_history() {
    const history_zone = document.getElementById("history-zone");
    const equation = document.getElementById("equation");
    // Copy equation and insert it into the history zone.
    const equation_copy = equation.cloneNode(true);
    history_zone.appendChild(equation_copy);
  }

  show_answer() {
    this.clue_equals_element.innerText = this.emoji_answer;
    Array.from(document.querySelectorAll(".entry-zone")).forEach(entry_zone => {
      entry_zone.classList.add("hide");
    });
    this.animate_clue_equals();
  }

  animate_clue_equals() {
    // Create a copy of the #clue-equals element
    const clue_equals_copy = this.clue_equals_element.cloneNode(true);

    // Find out the x and y position of the original #clue-equals element
    let rect = this.clue_equals_element.getBoundingClientRect();
    let [x, y] = [rect.left, rect.top];

    // Create a new element with the same text content as the original #clue-equals element with the .floating_clue class
    clue_equals_copy.classList.add("floating_clue");
    clue_equals_copy.removeAttribute("id");
    document.body.appendChild(clue_equals_copy);
    console.log(document.querySelector(".floating_clue"));
    clue_equals_copy.style.left = `${x}px`;
    clue_equals_copy.style.top = `${y}px`;

    setTimeout(() => {
      clue_equals_copy.classList.add(...ANIMATION_CLASSES);
    }, TIME_TO_CELEBRATE/2);
    setTimeout(() => {
      clue_equals_copy.parentNode.removeChild(clue_equals_copy);
    }, TIME_TO_CELEBRATE);

  }

  submit_guess(guess) {
    const scored_guess = this.score_guess(guess);
    this.number_of_tries_in_round += 1;

    if (guess === this.word_answer) {
      setTimeout(() => {
        this.copy_clues_to_history();
        this.set_up_round();
      }, TIME_TO_CELEBRATE);
      this.show_answer();
      return false;
    }
    if (this.number_of_tries_in_round === MAX_NUMBER_OF_TRIES) {
      setTimeout(() => {
        this.copy_clues_to_history();
        this.set_up_round();
      }, TIME_TO_CELEBRATE);
      this.show_answer();
      return false;
    }
    else {
      // Make a copy of the entry zone above the current one with green and yellow markers
      const entry_zone = document.getElementById("entry-zone");
      const entry_zone_copy = entry_zone.cloneNode(true);
      const entry_zone_holder = document.getElementById("entry-zone-holder");
      entry_zone_holder.appendChild(entry_zone_copy);
      
      // Find the entry zone we just added
      const last_added_entry_zone = Array.from(entry_zone_holder.querySelectorAll(".entry-zone")).reverse()[0];
      last_added_entry_zone.querySelectorAll(".spacer").forEach((spacer, index) => {
        spacer.classList.add(`score-${scored_guess[index].score}`);
        spacer.classList.remove("blink");
        spacer.innerText = scored_guess[index].letter;
      });
      last_added_entry_zone.removeAttribute("id");
      last_added_entry_zone.classList.remove("main");
    }
    return scored_guess;
  }

  show_curtain() {
    const curtain = document.getElementById("curtain");
    // Copy the contents of #history-zone into #curtain
    curtain.querySelector("#history-copy").innerHTML = document.getElementById("history-zone").innerHTML;

    // Show curtain
    curtain.classList.add("show");
  }
}