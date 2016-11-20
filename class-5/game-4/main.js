// This example modifies the previous example to make use jQuery to save some effort. 


var colorArray = ["red", "green", "blue", "yellow", "orange", "cyan", "magenta", "violet"];
var game = $("#game");      // *** Use jQuery to get #game
var tileArray = [];         // *** Declare an array to hold game objects. 
var firstPick = undefined;  // *** Keep track of the first pick. 
var resetButton = $("#reset");


// Call these two methods to setup and start the game.
makeBoard();        // Make all of the game tiles
setupGameEvents();  // Setup and handle click events on squares. 


// Make Game Board
function makeBoard() {
    var allColors = colorArray.slice().concat(colorArray.slice());
    var randomColors = randomizeArray(allColors);
    for (var i in randomColors) {
        // *** Use jQuery here
        game.html(game.html() + makeBox(randomColors[i]));
    }
}


function Tile(index, color, element) {
    this.isOpen = false;
    this.index = index;
    this.color = color;
    this.element = element;
}


// *** Setup Game events ***
function setupGameEvents() {
    $(".box").each(function(index){
        var color = $(this).attr("data-color");
        tileArray.push(new Tile(index, color, this));
        
        $(this).click(function(event){
            clickTile(index);
        });
    });
}


function clickTile(index) {
    if (tileArray[index].isOpen === false ) {
        tileArray[index].isOpen = true;
        $(tileArray[index].element).addClass("open");
        
        if (firstPick === undefined) {
            console.log("First pick");
            firstPick = tileArray[index];
        } else if (firstPick.color === tileArray[index].color) {
            console.log("Match!!");
            firstPick = undefined;
        } else {
            console.log("No Match");
            firstPick.isOpen = false;
            tileArray[index].isOpen = false;
            var a = firstPick.element;
            var b = tileArray[index].element;
            setTimeout(function() {
                $(a).removeClass("open");
                $(b).removeClass("open");
            }, 300);
            firstPick = undefined;
            checkForMatch();
        }
    }
    
}

function checkForMatch(index) {
    console.log("Check for match");
    
}


resetButton.click(function() {
    resetGame();
});

function resetGame() {
    var allColors = colorArray.slice().concat(colorArray.slice());
    var randomColors = randomizeArray(allColors);
    for (var i in tileArray) {
        tileArray[i].color = randomColors[i];
        $(tileArray[i].element).removeClass("open");
        // $(tileArray[i].element).find(".back").css({backgroundColor:randomColors[i]});
        tileArray[i].isOpen = false;
    }
    
    // Wait for tiles to close then change the colors
    setTimeout(function(){
        for (var i in tileArray) {
            $(tileArray[i].element).find(".back").css({backgroundColor:randomColors[i]});
        }
    }, 300);
}


// Makes game box objects with a color.
function makeBox(color) {
    // *** Notice the new attribute added to the top level div here
    return "<div class='box' data-color='"+color+"'><div class='inner-box'><div class='front'></div><div class='back' style='background-color:" + color + "'></div></div></div>"
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