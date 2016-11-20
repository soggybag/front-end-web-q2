// An array of colors
var colorArray = ["red", "green", "blue", "yellow", "orange", "cyan", "magenta", "violet"];
// A reference to a game object
var game = getId("game");
// Call this function to make the "game board"
makeBoard();

// Make Game Board
function makeBoard() {
    // Make an array of containing 2 of each color
    var allColors = colorArray.slice().concat(colorArray.slice());
    // Make an array with colors in random order
    var randomColors = randomizeArray(allColors)
        // Loop through each item in the array
    for (var i in randomColors) {
        // Make an HTML element for each color
        game.innerHTML = game.innerHTML + makeBox(randomColors[i]);
    }
}

// This function returns an HTML element with a background color
// *** See the box test example file. ***
function makeBox(color) {
    return "<div class='box'><div class='inner-box'><div class='front'></div><div class='back' style='background-color:" + color + "'></div></div></div>"
}

// Some helper methods

// Returns a reference to an element for an id 
function getId(id) {
    return document.getElementById(id);
}

// Random int in range 
function randomInt(range) {
    return Math.round(Math.random() * range);
}

// Returns a copy of any array in random order
function randomizeArray(array) {
    var copyArray = array.slice();
    var newArray = [];

    while (copyArray.length > 0) {
        var index = randomInt(copyArray.length - 1);
        newArray.push(copyArray.splice(index, 1)[0]);
    }

    return newArray;
}