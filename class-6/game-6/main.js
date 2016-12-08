/* 

    This is a simple game to illustrate basic JavaScript Concepts:
    
    - Array 
    - For loop
    - Creating objects
    - functions, parameters, returning values 
    - If else
    - Basic jQuery concepts
        - Selecting elements
        - Adding and removing class names from elements
        - Setting attributes

*/


// -----------------------------------------------
// Define some variables 
// -----------------------------------------------

// Define an array to hold colors
var colors = [];

// Generate a rainbow of 16 colors  
var step = 360 / 16;
// Loop, generate colors in 16 hues
for (var i = 0; i < 16; i++) {
    var hue = i * step;
    // This string is a CSS color in Hue, Saturation, and Lightness
    colors.push("hsl(" + hue + ", 100%, 80%)");
}

// Generate an array of image names. The images are in the images folder. 
// Define an array to hold a list of image names
var icons = [];
// Loop and generate names shape-1.svg to shape-16.svg
for (var i = 1; i <= 16; i++) {
    icons.push("shape-" + i + ".svg");
}

// The game needs a source of colors and icons. This will be an 
// array of objects with three properties: value, color, and icon
// Later we will randomize this array to play the game. 
colorIcons = []
for (var i = 0; i < 16; i++) {
    colorIcons.push({
        value: i,
        color: colors[i],
        icon: icons[i]
    });
}

// This array will hold game objects each of which represents a tile on the board.
var tileArray = [];
var firstPick = undefined; // Keep track of the first pick. This is used when the game is in progress



// -----------------------------------------------
// Initialize the game 
// -----------------------------------------------

// Call these two methods to setup and start the game.
makeBoard();        // Make all of the game tiles
setupGameObjects(); // Setup and handle click events on squares. 
resetGame();



// -----------------------------------------------
// Game functions 
// -----------------------------------------------

// This function represents a JS class object. 
// Objects made from this class represent tiles on the game board. 
function Tile(value, color, element, icon) {
    this.isOpen = false;        // determines whether a tile is open or closed
    this.value = value;         // holds the index of a tile
    this.tileElement = element; // holds a refernce to the DOM element of this tile
    this.backElement = $(element).find(".back"); // Find the element with class name back inside of element
    this.icon = icon;           // The file name of the image to display on a tile

    // The tile object has one method to set it's color. 
    this.setColor = function (color) {
        this.color = color;
        this.backElement.css({
            backgroundColor: color,
            backgroundImage: "url(images/" + icon + ")"
        });
    }

    this.setColor(color);
}


// Make the game board
function makeBoard() {
    var boardHtml = "";
    for (var i = 0; i < 16; i++) {
        boardHtml += makeBox();
    }

    $("#game").html(boardHtml);
}


// Set up game Objects
function setupGameObjects() {
    var randomArray = randomizeArray(colorIcons);
    // Create an array of pairs
    var array = [];
    for (var i = 0; i < 8; i++) {
        array.push(randomArray[i]);
        array.push(randomArray[i]);
    }
    // Randomize pairs
    array = randomizeArray(array);
    // Loop through all tiles, these all have the class name .box
    $(".box").each(function (i) {
        tileArray.push(new Tile(array[i].value, array[i].color, this, array[i].icon));
        // Add a click event
        $(this).click(function (event) {
            clickTile(i);
        });
    });
}


function clickTile(index) {
    var tile = tileArray[index];
    if (tile.isOpen === false) {
        tile.isOpen = true;
        $(tile.tileElement).addClass("open");

        if (firstPick === undefined) {
            console.log("First pick");
            firstPick = tile;
        } else if (firstPick.value === tile.value) {
            console.log("Match!!");
            console.log(firstPick.value, tile.value);
            firstPick = undefined;
        } else {
            console.log("No Match");
            console.log(firstPick.value);
            console.log(tile.value);
            firstPick.isOpen = false;
            tile.isOpen = false;
            var a = firstPick.tileElement;
            var b = tile.tileElement;
            setTimeout(function () {
                $(a).removeClass("open");
                $(b).removeClass("open");
            }, 300);
            firstPick = undefined;
            checkForGameOver();
        }
    }
}

function checkForGameOver() {
    console.log("Check for Game Over");
}


$("#reset").click(function () {
    resetGame();
});

function resetGame() {
    // Randomize the source array
    var randomArray = randomizeArray(colorIcons);
    // Create an array of pairs
    var array = [];
    for (var i = 0; i < 8; i++) {
        array.push(randomArray[i]);
        array.push(randomArray[i]);
    }
    // Randomize pairs
    array = randomizeArray(array);
    // Reset tiles
    for (var i in tileArray) {
        tileArray[i].index = array[i].value;
        tileArray[i].isOpen = false;
        $(tileArray[i].tileElement).removeClass("open");
    }

    // Wait for tiles to close then change the colors
    setTimeout(function () {
        for (var i in tileArray) {
            tileArray[i].icon = array[i].icon;
            tileArray[i].setColor(array[i].color);
        }
    }, 300);
}


// Makes game box objects with a color.
function makeBox(color) {
    // *** Notice the new attribute added to the top level div here
    return "<div class='box'><div class='inner-box'><div class='front'></div><div class='back'></div></div></div>"
}

// Some helper methods

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



function makeStripesFromColors(colors, angle) {
    var gradStr = "";
    var step = 100 / colors.length;
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var start = i * step;
        var end = (i + 1) * step;
        var str = " " + color + " " + start + "%, " + color + " " + end + "%,";
        gradStr += str;
    }

    gradStr = gradStr.slice(0, -1);
    
    

    return "background-image: -webkit-linear-gradient(" + angle + "deg, " + gradStr + ");" + "background-image: -o-linear-gradient(" + angle + "deg, " + gradStr + ");" + "background-image: linear-gradient(" + angle + "deg, " + gradStr + ");";
}

$("body").attr("style", makeStripesFromColors(colors, 33));