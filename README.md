# 🧨 The Destructive Text Editor

**Live Demo:** [https://princemunnelli.github.io/the-predictive-text-editor/]

Normally, software is designed to help you. Predictive text and autocorrect fix your mistakes so you can type faster. **This editor does the exact opposite.** It is an anti-editor built to fight your muscle memory and actively punish correct spelling.

### 📜 The Rules of the Game
1. **The Goal:** Type a full sentence or paragraph.
2. **The Catch:** You are strictly forbidden from using real English words. You must type in complete gibberish.
3. **The Trap:** Every time you accidentally type a real English word (like "the", "and", or "hello") and hit space, the editor instantly detects it and **deletes that word plus the three previous words.**

### 🛠️ The Tech Stack
Built entirely with Vanilla Web Technologies for maximum speed and zero dependencies:
* **HTML5:** `contenteditable` architecture.
* **CSS3:** Custom retro-terminal styling and DOM manipulation.
* **JavaScript (ES6+):** * Custom `Set`-based dictionary for O(1) lookup times.
  * Real-time keystroke interception and array manipulation.
  * Custom `historyStack` to handle State Management and bypass broken native `Ctrl+Z` functions.

### 🧠 The Engineering Challenge
Because this application programmatically destroys DOM `innerText`, the browser's native Undo history is completely broken. To solve this, I engineered a custom State Management array that saves "safe states" whenever nonsense is successfully typed, allowing users to intercept `Ctrl+Z` and restore lost gibberish.
