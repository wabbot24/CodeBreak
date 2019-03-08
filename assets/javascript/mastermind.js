var currentrow = 9;

$("#green").attr("colorvalue", 1);
$("#red").attr("colorvalue", 2);
$("#orange").attr("colorvalue", 3);
$("#yellow").attr("colorvalue", 4);
$("#blue").attr("colorvalue", 5);
$("#purple").attr("colorvalue", 6);
$("#lightgray").attr("colorvalue", -1);

var colors = {
    c1: "green",
    c2: "red",
    c3: "orange",
    c4: "yellow",
    c5: "blue",
    c6: "purple",
}
// creates code user is trying to break
var codeArray = [];
function gamecode() {
    for (i = 0; i < 4; i++) {
        var a = Math.floor(Math.random() * 6) + 1;
        codeArray[i] = a;
        $("#" + i).attr("answervalue", a);
        $("#" + i).css("background-color", colors["c" + a]);
    }
}
gamecode();
console.log(codeArray);

// adds pickvalue 0 to every cell
for (i = 0; i < 10; i++) {
    for (j = 0; j < 4; j++) {
        $("#" + j + i).attr("pickvalue", 0);
    }
}


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
    if ($("#" + 0 + currentrow).attr("pickvalue") > 0 && $("#" + 1 + currentrow).attr("pickvalue") > 0 && $("#" + 2 + currentrow).attr("pickvalue") > 0 && $("#" + 3 + currentrow).attr("pickvalue") > 0) {
        $(".guess").css("display", "block");
    }
});

// evaluates pick vs gamecode
$(".guess").on("click", function () {
    var reds = 0;
    var whites = 0;
    var guesses = [];
    var answers = [];
    for (i = 0; i < 4; i++) {
        var answerval = $("#" + i).attr("answervalue");
        var pickval = $("#" + i + currentrow).attr("pickvalue");
        if (pickval === answerval) {
            guesses[i] = "x";
            answers[i] = "x";
            reds++;
        }
        else {
            guesses[i] = answerval;
            answers[i] = pickval;
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if ("x" !== guesses[i] && guesses[i] === answers[j]) {
                guesses[i] = "x";
                answers[j] = "x";
                whites++;
            }
        }
    }
    console.log(guesses);
    console.log(answers);
    for (i = 1; i <= reds; i++) {
        $("#" + (3 + i) + currentrow).css("background-color", "red");
    }
    for (i = 1; i <= whites; i++) {
        $("#" + (3 + i + reds) + currentrow).css("background-color", "white");
    }
    console.log(reds);
    console.log(whites);
    currentrow--;
    $(this).css("display", "none");
});

// deselecting picked colors in current row
$("td", ".rowmain").on("click", function () {
    $(".guess").css("display", "none");
    var a = parseInt(this.id) - currentrow;
    if (a % 10 === 0) {
        $(this).attr("pickvalue", 0);
        $(this).css("background-color", "");
    }
});

