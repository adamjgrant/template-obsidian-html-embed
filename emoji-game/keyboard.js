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
    this.keys = document.querySelectorAll('#keyboard button');
    this.enter_key = document.getElementById('enter');
    this.delete_key = document.getElementById('backspace');
    this.entry = "";
  }

  type(e, limit) {
    const key = e.target.textContent;
    // Update the entry string with the key that was pressed
    if (key === enter_key) this.entry = "";
    if (key === delete_key) this.entry = this.entry.slice(0, -1);
    else {
      if (this.entry.length < limit) this.entry = this.entry + key;
    }
  }
}
