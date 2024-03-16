const enter_key = '⮐';
const delete_key = '🆇';

document.addEventListener('DOMContentLoaded', () => {
  // Define the rows of keys for a standard QWERTY keyboard
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [enter_key, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', delete_key]
  ];

  // Get the template element
  const template = document.getElementById('keyboard-key-template');

  // Loop through each row
  rows.forEach((row, index) => {
    // Select the current keyboard row by constructing its ID
    const keyboardRow = document.getElementById(`keyboard-row-${index + 1}`);

    // Loop through each key in the row
    row.forEach(key => {
      // Clone the template
      const clone = document.importNode(template.content, true);
      
      // Set the button text to the current key
      clone.querySelector('button').textContent = key;
      const key_element = clone.querySelector('button')

      if (key === enter_key) {
        key_element.classList.add('enter');
        key_element.id = 'enter';
      }
      if (key === delete_key) {
        key_element.classList.add('backspace');
        key_element.id = 'backspace';
      }

      // Append the cloned template to the current keyboard row
      keyboardRow.appendChild(clone);
    });
  });
});

export class Keyboard {
  constructor() {
    this.keyboard = document.getElementById('keyboard');
    this.enter_key = document.getElementById('enter');
    this.delete_key = document.getElementById('backspace');
    this.entry = "";
    this.last_entry = "";
  }

  type(e, limit) {
    const key = e.target.textContent;
    // Update the entry string with the key that was pressed
    if (key === enter_key) {
      this.last_entry = this.entry;
      this.entry = "";
      return true;
    }
    if (key === delete_key) this.entry = this.entry.slice(0, -1);
    if (key !== enter_key && key !== delete_key) {
      if (this.entry.length < limit) this.entry = this.entry + key;
    }
  }

  get keys() {
    return Array.from(document.querySelectorAll('#keyboard button'));
  }

  score_keys(scored_guess) {
    if (scored_guess.every(item => item.score === "green")) return this.reset_key_scores();

    this.keys.forEach(key => {
      // Find the scored_guess item whose letter property matches the key's text content
      let score = scored_guess.find(item => item.letter === key.textContent);
      let score_color = score ? score.score : "black";
      key.classList.add(`score-${score_color}`);
    });
  }

  reset_key_scores() {
    this.keys.forEach(key => {
      key.classList.remove("score-black", "score-green", "score-yellow", "score-disabled"); 
    });
  }
}
