$(document).ready(function() {
  new Game;
});

function Game() {
  game = this;
  game.winner = "";
  game.errorMessageOne = "";
  game.errorMessageTwo = "";
  buildBoardArray();
  evaluateTurnUpdateStatus();
  clickHandler();
};

function buildBoardArray() {
  game.board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
  ];
};

function evaluateTurnUpdateStatus() {
  game.player = whoseTurn();
  if (game.errorMessageOne != "") {
    updateStatusMessages(game.errorMessageOne, game.errorMessageTwo);
  } else {
    var statusMessageOne = "";
    game.player == "R" ? statusMessageOne = "Red, " : statusMessageOne = "Black, ";
    statusMessageOne += "it's your turn!"
    statusMessageTwo = "Click a column to play your piece."
    updateStatusMessages(statusMessageOne, statusMessageTwo);
  };
  updateMiniPiece();
}

function whoseTurn() {
  var flattenedBoard = flattenBoard();
  var redCount = flattenedBoard.filter(function(piece) { return piece == "R" }).length;
  var blackCount = flattenedBoard.filter(function(piece) { return piece == "B" }).length;
  return redCount <= blackCount ? "R" : "B";
};

function flattenBoard() {
  return [].concat.apply([], game.board);
}

function updateStatusMessages(statusMessageOne, statusMessageTwo) {
  $('.status_message_one').text(statusMessageOne);
  $('.status_message_two').text(statusMessageTwo);
};

function updateMiniPiece() {
  if (game.player == "R") {
    $(".mini_piece").removeClass("white");
    $(".mini_piece").removeClass("black");
    $(".mini_piece").addClass("red")
  } else if (game.player == "B") {
    $(".mini_piece").removeClass("white");
    $(".mini_piece").removeClass("red");
    $(".mini_piece").addClass("black")
  } else if (game.player == "S") {
    $(".mini_piece").removeClass("red");
    $(".mini_piece").removeClass("black");
    $(".mini_piece").addClass("white")
  }
}

function clickHandler() {
  $(".piece").on("click", function(event) {
      event.preventDefault();
      if (game.winner == "") {
        var clickedPiece = $(this)[0];
        var clickedClass = $(clickedPiece).attr("class");
        var clickedColumn = clickedClass.charAt(clickedClass.indexOf("col") + 3);
        columnValues = getColumnValues(clickedColumn);
        var isValid = isValidColumn(columnValues);
        if (!isValid) {
          displayInvalidColumnMessage();
        } else {
          game.errorMessageOne = "";
          game.errorMessageTwo = "";
          placePiece(clickedColumn, columnValues);
          updateBoardArray(clickedColumn, columnValues);
        }
        evaluateWinnerStalemate();
        if (game.winner != "") {
          if (game.winner == "stalemate") {
            game.player = "S";
            updateMiniPiece();
            updateStatusMessages("Stalemate!", "No one wins.");
          } else {
            updateStatusMessages("Congratulations, " + game.winner + "!", "You Win!");
          }
        } else {
          evaluateTurnUpdateStatus();
        }
      }
    });
}

function getColumnValues(column) {
  outputColumn = [];
  game.board.forEach(function(row){outputColumn.push(row[column]);})
  return outputColumn;
};

function isValidColumn(columnValues) {
  var emptyPieces = columnValues.filter(function(piece) {return piece == ""});
  return emptyPieces.length > 0;
};

function displayInvalidColumnMessage() {
  if (game.errorMessageOne == "") {
    game.player == 'R' ? game.errorMessageOne += "Red, " : game.errorMessageOne += "Black, ";
    game.errorMessageOne += "the column's full!";
    game.errorMessageTwo = "Try a different one :)";
    updateStatusMessages(game.errorMessageOne, game.errorMessageTwo);
  }
};

function placePiece(clickedColumn, columnValues) {
  var row = "row" + lowestOpenRow(columnValues);
  var col = "col" + clickedColumn;
  var cssSelector = "." + row + "." + col;
  if (game.player == "R") {
    $(cssSelector).removeClass("white");
    $(cssSelector).addClass("red");
  } else {
    $(cssSelector).removeClass("white");
    $(cssSelector).addClass("black");
  };
};

function lowestOpenRow(columnValues) {
  for (var i = 0; i < columnValues.length; i++) {
    if (columnValues[i] != "") {return i-1;}
  }
  return i-1;
};

function updateBoardArray(clickedColumn, columnValues) {
  var row = lowestOpenRow(columnValues);
  var col = parseInt(clickedColumn);
  game.board[row][col] = game.player;
}

function evaluateWinnerStalemate() {
  evaluateWin(game.board);                             // horizontal
  evaluateWin(transpose(game.board));                  // vertical
  evaluateWin(diagonalize(game.board));                // forward-slash diagonal
  evaluateWin(diagonalize(reverseBoard(game.board)));  // back-slash diagonal
  evaluateStalemate();
}

function evaluateWin(board) {
  board.forEach(function(row){
    var rowString = row.join('.');
    if (rowString.indexOf("R.R.R.R") != -1) {
      game.winner = "Red";
    } else if (rowString.indexOf("B.B.B.B") != -1) {
      game.winner = "Black";
    }
  })
}

function evaluateStalemate() {
  var flattenedBoard = flattenBoard();
  var boardString = flattenedBoard.join('.');
  if ((boardString.indexOf("..") == -1) && (boardString.slice(0,1) != ".")) {
    game.winner = "stalemate";
  }
}

function transpose(array) {
  return array[0].map(function (_, col) {
    return array.map(function (row) {
      return row[col];
    });
  });
}

function reverseBoard(board) {
  var reversedBoard = [];
  board.forEach(function(row){
    var newRow = row.slice();
    var reversedRow = newRow.reverse();
    reversedBoard.push(reversedRow);
  })
  return reversedBoard;
}

function diagonalize(board) {
  var row1 = [ board[3][0], board[2][1], board[1][2], board[0][3] ]
  var row2 = [ board[4][0], board[3][1], board[2][2], board[1][3], board[0][4] ]
  var row3 = [ board[5][0], board[4][1], board[3][2], board[2][3], board[1][4], board[0][5] ]
  var row4 = [ board[5][1], board[4][2], board[3][3], board[2][4], board[1][5], board[0][6] ]
  var row5 = [ board[5][2], board[4][3], board[3][4], board[2][5], board[1][6] ]
  var row6 = [ board[5][3], board[4][4], board[3][5], board[2][6] ]
  return [row1, row2, row3, row4, row5, row6]
}

// As seen above, we've manually built the diagonalized version of the board.
// A more scalable solution (for board of x width & y height) would use
// nested loops & multiple counters; beginning code below:
//
// function diagonalize(board) {
//   var newBoard = [];
//   var numRows = board.length;    // 6
//   var numCols = board[0].length; // 7
//   var constraint = 4;
//   // etc.
// }
