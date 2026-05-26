// 1. The High-Capacity Dictionary
// Using a Set for instant lookup. Packed with the most common trap words.
const dictionary = new Set([
    "the", "of", "and", "a","hi", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as", "with", "his", "they", "i", 
    "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", 
    "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these", "so", 
    "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people", 
    "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part", 
    "over", "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live", "me", "back", "give", "most", "very", "after", "thing", "our", "just", 
    "name", "good", "sentence", "man", "think", "say", "great", "where", "help", "through", "much", "before", "line", "right", "too", "mean", "old", "any", "same", "tell", 
    "boy", "follow", "came", "want", "show", "also", "around", "form", "three", "small", "set", "put", "end", "does", "another", "well", "large", "must", "big", "even", 
    "such", "because", "turn", "here", "why", "ask", "went", "men", "read", "need", "land", "different", "home", "us", "move", "try", "kind", "hand", "picture", "again", 
    "change", "off", "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother", "answer", "found", "study", "still", "learn", "should", "america", "world", 
    "hello", "test", "apple", "cat", "dog", "computer", "hackathon", "code", "java", "python", "html", "css", "javascript", "program", "software", "developer", "bug", "error", "keyboard", "mouse",
    "screen", "monitor", "data", "file", "folder", "internet", "web", "website", "app", "application", "server", "database", "network", "system", "user", "login", "password", "security", "hacker",
    "science", "math", "physics", "chemistry", "biology", "history", "geography", "english", "literature", "art", "music", "sport", "game", "book", "movie", "song", "food", "drink", "car", "bus"
]);

// 2. Grab the DOM elements
const editor = document.getElementById('editor');
const statusText = document.querySelector('.status');

// 3. The Undo Stack Memory
let historyStack = [];

// Save the initial blank state
historyStack.push(""); 

// 4. The Silent Observer: Listen for typing and undo commands
editor.addEventListener('keydown', (event) => {
    // Check for Ctrl+Z (Windows) or Cmd+Z (Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault(); // Stop the browser's default undo
        performUndo();
    }
});

editor.addEventListener('keyup', (event) => {
    // Evaluate when the user completes a word
    if (event.code === 'Space' || event.code === 'Enter') {
        checkText();
    }
});

function checkText() {
    let text = editor.innerText;
    let words = text.trim().split(/\s+/);

    if (words.length === 0 || words[0] === "") return;

    let lastWordRaw = words[words.length - 1];
    let lastWordClean = lastWordRaw.replace(/[^a-zA-Z]/g, "").toLowerCase();

    // 5. The Verdict
    if (dictionary.has(lastWordClean)) {
        
        // TRAP ACTIVATED
        statusText.innerText = `Status: Real word detected ("${lastWordClean}"). Deleting...`;
        statusText.style.color = "#ff003c"; 

        // Delete the last 4 words (the one typed + 3 previous)
        words.splice(-4);

        editor.innerText = words.length > 0 ? words.join(" ") + " " : "";
        placeCaretAtEnd(editor);
        
    } else {
        // Nonsense accepted: Save this safe state to our Undo Stack!
        statusText.innerText = "Status: Nonsense accepted. State saved.";
        statusText.style.color = "#555";
        
        // Only save to history if it's different from the last saved state
        if (historyStack[historyStack.length - 1] !== editor.innerText) {
            historyStack.push(editor.innerText);
        }
    }
}

// 6. The Undo Execution
function performUndo() {
    if (historyStack.length > 1) {
        historyStack.pop(); // Remove current state
        let previousState = historyStack[historyStack.length - 1]; // Grab the last safe state
        
        editor.innerText = previousState;
        placeCaretAtEnd(editor);
        
        statusText.innerText = "Status: Ctrl+Z activated. Reverted to previous safe state.";
        statusText.style.color = "#00ff41";
    } else {
        statusText.innerText = "Status: Nothing left to undo.";
    }
}

// Helper: Keep cursor at the end
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}