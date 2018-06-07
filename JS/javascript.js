let nextPlayer = 1;
let playercolors = {
    "1": "cross",
    "2": "circle"
}
let playState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let winner = 0;

$(document).ready(function () {
    let colWidth = $(".FieldColum").width();
    $(".FieldRow").height(colWidth);
    $(".FieldColum").height(colWidth);

})


window.onresize = function (event) {
    let colWidth = $(".FieldColum").width();
    $(".FieldRow").height(colWidth);
    $(".FieldColum").height(colWidth);
}

function selectPlayer(player) {
    nextPlayer = player

    $("#player1").attr("disabled", true);
    $("#player2").attr("disabled", true);
}

function newGame() {
    location.reload();

}



function indicatePlayer() {
    if (nextPlayer == 1) {
        $("#player1").addClass("cross");
        $("#player2").removeClass("circle");

    } else {
        $("#player1").removeClass("cross");
        $("#player2").addClass("circle");

    }
}

function nextPlayerHover(x, number) {
    let current = $(x).css('background-color');

    let isCircleORCross = checkField(x);

    switch (number) {
        case 1:

            if (!isCircleORCross) {
                if (nextPlayer == 1) {
                    $(x).css("background-color", "rgba(0, 0, 0, 0.6)");

                } else {
                    $(x).css("background-color", "rgba(255, 255, 255, 0.6)");

                }
            }

            break;
        case 2:
            if (!isCircleORCross) {
                $(x).css("background-color", "transparent");
            }
            break;

    }



}

function chooseField(x, row, column) {
    let ready = (checkField() || winner != 0);

    if (ready) {


    } else {


        $(x).addClass(playercolors[nextPlayer]);
        playState[row][column] = nextPlayer;
        if (nextPlayer == 1) {
            nextPlayer = 2;
        } else {
            nextPlayer = 1;
        }
        checkForWinner(row, column);



    }
}


// Checks whether a field is empty (false) or full (true)
function checkField(x) {
    return ($(x).hasClass("circle") || $(x).hasClass("cross"));
}


function checkForWinner() {
    winner = 0;

    // Checks for horizontal Winner
    for (let row = 0; row < playState.length; row++) {
        for (let column = 1; column < playState[row].length; column++) {
            if (playState[row][column] == playState[row][column - 1] && playState[row][column] != 0) {
                winner = playState[row][column];
            } else {
                winner = 0;
                break;
            }
        }
        if (possibleWinner()) {
            break;
        }
    }

    // Checks for vertical Winner
    for (let column = 0; column < playState[0].length; column++) {
        for (let row = 1; row < playState.length; row++) {
            if (playState[row][column] == playState[row - 1][column] && playState[row][column] != 0) {
                winner = playState[row][column];
            } else {
                winner = 0;
                break;
            }
        }
        if (possibleWinner()) {
            break;
        }

    }

    // Checks for diagonal Winner (top left to bottom right)
    for (let field = 1; field < playState.length; field++) {
        if (playState[field][field] == playState[field-1][field-1] && playState[field][field] != 0) {
            winner = playState[field][field];
        } else {
            winner = 0;
            break;
        }
    }
    if (possibleWinner()) {
    }

    // Checks for diagonal Winner (top right to bottom left)
    for (let column = 1, row = 1; column < playState.length; row--, column++) {
        if (playState[row][column] == playState[row+1][column-1] && playState[row][column] != 0) {
            winner = playState[row][column];
        } else {
            winner = 0;
            break;
        }
    }
    if (possibleWinner()) {
    }


}

function possibleWinner() {
    if (winner == 1 || winner == 2) {
        $("#test").text("The WINNER is Player: " + winner);
        return true;

    }
}


