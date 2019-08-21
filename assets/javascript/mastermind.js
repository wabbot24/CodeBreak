// this is my take on the classic board game Mastermind
// This file contains code for all game functionality
// Game board is an HTML table created in nested for-loops that leverage iterators in ID naming for future looping --- line 51 ---
// A four color code pulling from 6 colors (green, red, orange, yellow, blue, purple) is randomly created eg. [red,green,yellow,red] --- line 103 ---
// User guesses colors <--- line 128 ---> by clicking colored squares to left of board --- line 85 ---
// On submit, user's guess is evaluated against answer code (core game logic) --- line 170 ---
// Each guess is given feedback to help user refine their guess until they get it right --- line 208 ---
// Win and loss scenarios test on each submit --- lines 222 and 237 ----
// In win scenario, points, wins, avgGuesses are changed (as localStorage variables)
// Point system decided by how many rows you had left and what the multiplier was
// Each time the multiplier increases, a row is eliminated --- line 227 ---
// Various functions deal with end game and reset. You can follow through them starting from win/loss scenarios --- lines 235, 239



// initializes localStorage values and sets global variables
if (!localStorage.wins) {
    resetValues();
} else {
    var boardChange = false;
    var guessesmade = 0;
    var currentrow = localStorage.currentrow;   
    var totalGuesses = localStorage.averageGuesses * localStorage.gamesPlayed;
    let roundedAvg = localStorage.averageGuesses;
    $("#avgguesses").text(round(roundedAvg, 2));
    $("#wins").text(localStorage.wins);
    $("#points").text(localStorage.points);
    // for (i = 0; i < 10; i++) {
    //     for (j = 0; j < 4; j++) {  
    //         let p = "#" + j + i;
    //         let savedValue = localStorage.getItem(p);
    //         $("#" + j + i).attr("pickvalue", savedValue);
    //         $("#" + j + i).css("background-color", colors["c" + savedValue]);
    //     }
    //     for (let j = 4; j < 8; j++) {
    //         let f = "#" + j + i;
    //         let savedFeedback = localStorage.getItem(f);
    //         $("#" + j + i).css("background-color", savedFeedback);
    //     }
    // }
}

// resetValues();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// runs functions that create board
initiateBoard();

// wipes existing board before creating new one - called when board needs to be altered (subtract a row) 
function resetBoard() {
    $(".main").empty();
    $("#feedback").empty();
    initiateBoard();
}

function initiateBoard() {
    ``
    var rows = 11 - localStorage.multiplier;
    createTable(rows);
    feedBackSquares(rows);
}

// These two functions create the board. They take a "rows" argument that tells them how many rows to print.
function createTable(rows) {
    for (let i = 0; i < rows; i++) {
        const tr = $("<tr>").addClass("rowmain").attr("id", "r" + i);

        for (let j = 0; j < 4; j++) {
            tr.append($("<td>").attr("id", j.toString() + i));
        }

        $(".main").append(tr);
    }
}

$("#r" + currentrow).css("background-color", "white");

function feedBackSquares(rows) {
    for (let i = 0; i < rows; i++) {

        let tr0 = $("<tr>").addClass("rowfeedback");
        let tr1 = $("<tr>").addClass("rowfeedback1");

        for (let j = 4; j < 8; j++) {

            if (j < 6) {
                tr0.append($("<td>").attr("id", j.toString() + i));

            } else {
                tr1.append($("<td>").attr("id", j.toString() + i));
            }
        }
        $("#feedback").append(tr0);
        $("#feedback").append(tr1);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// setting numerical values for each color. These are used for matching color code guesses to actual color code
$("#green").attr("colorvalue", 1);
$("#red").attr("colorvalue", 2);
$("#orange").attr("colorvalue", 3);
$("#yellow").attr("colorvalue", 4);
$("#blue").attr("colorvalue", 5);
$("#purple").attr("colorvalue", 6);
// "Filler Square" - negative value ensures user cannot submit a code containing filler square(s)
$("#lightgray").attr("colorvalue", -1);

var colors = {
    c1: "green",
    c2: "red",
    c3: "orange",
    c4: "yellow",
    c5: "blue",
    c6: "purple",
}
// creates code user is trying to break. codeArray[] contains code, and by toggling console log you can test (cheat at) game
var codeArray = [];
function gamecode() {
    for (i = 0; i < 4; i++) {
        var a = Math.floor(Math.random() * 6) + 1;
        codeArray[i] = a;
        $("#" + i).attr("answervalue", a);
        $("#" + i).css("background-color", colors["c" + a]);
    }
    // console.log(codeArray);
}
gamecode();

function pickValueSet() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 4; j++) {
            let p = "#" + j + i;
            let savedValue = localStorage.getItem(p);
            if (savedValue) {
                $("#" + j + i).attr("pickvalue", savedValue);
                $("#" + j + i).css("background-color", colors["c" + savedValue]);
            }
            else {
                $("#" + j + i).attr("pickvalue", 0);
                $("#" + j + i).css("background-color", "");
            }
        }
        for (let j = 4; j < 8; j++) {
            let f = "#" + j + i;
            let savedFeedback = localStorage.getItem(f);
            if (savedFeedback) {
                let savedFeedback = localStorage.getItem(f);
                $("#" + j + i).css("background-color", savedFeedback);
            }
        }
    }
}
pickValueSet();

// adds pickvalue 0 to every cell. This ensures a clean board so only user can generate codes
function pickvaluereset() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 4; j++) {
            $("#" + j + i).attr("pickvalue", 0);
            let p = "#" + j + i;
            localStorage.removeItem(p);
            $("#" + j + i).css("background-color", "");
        }
        for (let j = 4; j < 8; j++) {
            let f = "#" + j + i;
            localStorage.removeItem(f);
        }
    }
}
// pickvaluereset();

var canSubmit = false;
// code for buttons on left that add color picks to current row
$(".button").on("click", function () {
    var colorpick = ($(this).attr("colorvalue"));
    var norepeat = true;
    for (i = 0; i < 4; i++) {
        var cell = "#" + i + currentrow;
        if (this.id === "clear") {
            $(cell).attr("pickvalue", 0);
            $(cell).css("background-color", "");
            $(".guess").css("display", "none");
        }
        else if ($(cell).attr("pickvalue") === "0" && norepeat) {
            $(cell).attr("pickvalue", colorpick);
            $(cell).css("background-color", this.id);
            norepeat = false;
        }
    }
    // Looks at pickvalue in each cell of current row. Only if all 4 are filled with a code color can the user submit their guess
    if ($("#" + 0 + currentrow).attr("pickvalue") > 0 && $("#" + 1 + currentrow).attr("pickvalue") > 0 &&
        $("#" + 2 + currentrow).attr("pickvalue") > 0 && $("#" + 3 + currentrow).attr("pickvalue") > 0) {
        $(".guess").css("display", "block");
        canSubmit = true;
    }
});

// ties ENTER key to submit function
var guessInput = $(".guess");
addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && canSubmit) {
        event.preventDefault();
        guessInput.click();
    }
});
// submit function for user code guess
guessInput.on("click", function () {
    guessesmade++;
    var reds = 0;
    var whites = 0;
    //global (within this function) arrays that hold guess and answer values
    var guesses = [];
    var answers = [];

    // :::THE CORE GAME LOGIC:::
    // To illustrate: say Guess = [r,r,g,b] and Answer = [r,g,y,r]
    // First for loop: Tests if there are exact matches eg: red in the first position of each
    for (i = 0; i < 4; i++) {
        var answerval = $("#" + i).attr("answervalue");
        var pickval = $("#" + i + currentrow).attr("pickvalue");
        let p = "#" + i + currentrow;
        localStorage.setItem(p, pickval);
        if (pickval === answerval) {
            // inserts "x" in place of matches, effectively "x"ing them out so they can't be double counted, adds red marker
            guesses[i] = "x";
            answers[i] = "x";
            reds++;
        }
        else {
            // if no direct match, sets pick values for secondary query
            guesses[i] = answerval;
            answers[i] = pickval;
        }
    }
    // after this first query our arrays would look like Guess: ["x",r,g,b], Answer: ["x",g,y,r], and we'll have 1 red marker
    // nested for-loops allow for comparison between colors in different positions
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            // checks each guess against all 4 answer positions
            // if the guess value = "x" it is immediately eliminated. So our first value would not pass this query
            // g2 (red) would query against each position in Answer ["x",g,y,r].
            // g2 matches with the r at a4, so this function would add a white marker and test g3 with arrays now g:["x","x",g,b] and a:["x",g,y,"x"]
            // g3 would match with a2, adding a second white marker and leaving g:["x","x","x",b] and a:["x","x",y,"x"]
            // g4 would have no match, and the query would be complete with 1 red and 2 whites as our feedback code.
            if ("x" !== guesses[i] && guesses[i] === answers[j]) {
                guesses[i] = "x";
                answers[j] = "x";
                whites++;
            }
        }
    }
    // console.log(guesses);
    // console.log(answers);

    //displays the reds and whites to user. In our case, 1 red + 2 whites, alerting user their guess contains 3 matching colors, 1 of which is in correct position
    for (i = 1; i <= reds; i++) {
        $("#" + (3 + i) + currentrow).css("background-color", "red");
        let r = "#" + (3 + i) + currentrow;
        localStorage.setItem(r, "red");
    }
    for (i = 1; i <= whites; i++) {
        $("#" + (3 + i + reds) + currentrow).css("background-color", "white");
        let w = "#" + (3 + i + reds) + currentrow;
        localStorage.setItem(w, "white");
    }

    // Hides Submit button, moves user to next row, prevents submit until full user code entered, and sets background color of current row to white as visual cue
    $(this).css("display", "none");
    currentrow--;
    localStorage.currentrow = currentrow;
    canSubmit = false;
    $("#r" + currentrow).css("background-color", "white");

    // checks for win (4 reds). Initiates winning end game functionality if so (updating localStorage variables, calling gameover())
    if (reds === 4) {
        localStorage.wins++;
        $("#wins").text(localStorage.wins);
        let w = parseInt(localStorage.wins);
        let p = parseInt(localStorage.points);
        p += ((currentrow + 2) * localStorage.multiplier);
        localStorage.points = p;
        // checks if game is at interval where it subtracts a row to increase difficulty (and scoring multiplier)
        if (w === 1 || w === 3 || w === 6 || w === 10 || w === 15 || w === 21 || w === 28 || w === 36) {
            localStorage.multiplier++;
            boardChange = true;
        }
        gameover();
    }
    // loss scenario. If all guesses have been used without win case, calls displayLoss function which initiates complete reset of game
    if (currentrow < 0) {
        displayLoss();
    }
});

// displays winning code, updates points/wins/guessAvg, displays playagain button, which initiates new game
function gameover() {
    $(".answerkey").css("display", "table");
    totalGuesses += guessesmade;
    localStorage.gamesPlayed++;
    localStorage.averageGuesses = totalGuesses / localStorage.gamesPlayed;
    let roundedAvg = localStorage.averageGuesses;
    // round(roundedAvg, 2);
    $("#avgguesses").text(round(roundedAvg, 2));
    $("#points").text(localStorage.points);
    $(".playagain").css("display", "block");
    $(".answercode").css("display", "block");
}

// resets board, erases pickvalues/table cell colors/answer code, creates new random game code, and resets row and guess variables to start new game
$(".playagain").on("click", function () {
    if (boardChange) {
        resetBoard();
    }
    boardChange = false;
    pickvaluereset();
    currentrow = 10 - localStorage.multiplier;
    $("#r" + currentrow).css("background-color", "white");
    guessesmade = 0;
    gamecode();
    $(".answerkey").css("display", "none");
    for (i = 0; i < 10; i++) {
        for (j = 4; j < 8; j++) {
            $("#" + j + i).css("background-color", "rgb(165, 164, 164)");
        }
    }
    for (i = 0; i < 9; i++) {
        $("#r" + i).css("background-color", "");
    }
    $(".playagain").css("display", "none");
    $(".answercode").css("display", "none");
});

// Allows user to deselect colors in their current guess row by clicking on them
$("td", ".rowmain").on("click", function () {
    var a = parseInt(this.id) - currentrow;
    if (a % 10 === 0) {
        $(".guess").css("display", "none");
        canSubmit = false;
        $(this).attr("pickvalue", 0);
        $(this).css("background-color", "");
    }
});

// rounding function used for avgGuesses to keep it 2 decimal places
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// resets all localStorage values and global variables. Displays points/wins/avgGuesses to user (all will be 0 after this function runs)
function resetValues() {
    localStorage.wins = 0;
    localStorage.points = 0;
    localStorage.averageGuesses = 0;
    localStorage.gamesPlayed = 0;
    localStorage.multiplier = 1;

    guessesmade = 0;
    currentrow = 10 - localStorage.multiplier;
    $("#r" + currentrow).css("background-color", "white");
    totalGuesses = localStorage.averageGuesses * localStorage.gamesPlayed;
    let roundedAvg = localStorage.averageGuesses;
    $("#avgguesses").text(round(roundedAvg, 2));
    $("#wins").text(localStorage.wins);
    $("#points").text(localStorage.points);
}

// function called when user loses. shows them the answer key, calls resetValues() and displays the restart button
function displayLoss() {
    $(".answerkey").css("display", "table");
    $(".restart").css("display", "block");
    $(".answercode").css("display", "block");
    resetValues();
}

// resets everything else needed for a new game. Mirrors <playagain> button without functionality relevant only for wins
$(".restart").on("click", function () {

    resetBoard();
    pickvaluereset();
    gamecode();
    $(".answerkey").css("display", "none");
    for (i = 0; i < 10; i++) {
        for (j = 4; j < 8; j++) {
            $("#" + j + i).css("background-color", "rgb(165, 164, 164)");
        }
    }
    for (i = 0; i < 9; i++) {
        $("#r" + i).css("background-color", "");
    }
    $(".restart").css("display", "none");
    $(".answercode").css("display", "none");
});