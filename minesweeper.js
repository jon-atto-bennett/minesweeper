document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
document.addEventListener('contextmenu', checkForWin)



// Define your `board` object here!
// var board = {
//
// cells: [{row: 0, col: 0, isMine: false, hidden: true},
//         {row: 0, col: 1, isMine: true, hidden: true},
//         {row: 0, col: 2, isMine: false, hidden: true},
//         {row: 1, col: 0, isMine: false, hidden: true},
//         {row: 1, col: 1, isMine: true, hidden: true},
//         {row: 1, col: 2, isMine: false, hidden: true},
//         {row: 2, col: 0, isMine: true, hidden: true},
//         {row: 2, col: 1, isMine: false, hidden: true},
//         {row: 2, col: 2, isMine: true, hidden: true}]
//

//Resets board - a fudge!!!
function newGame() {
    location.reload();
}

//plays sounds
function playSound(path) {

  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', path);
  audioElement.play();
}

var board = {
  cells: []
};

createBoard(3);

function createBoard(squares){

  var countCol = 0;
  var countRow = 0;

  for(var i = 0; countRow<squares; i++ ) {
    for(var i=0; countCol<squares; i++){
      board.cells.push({row: countRow, col: countCol, isMine: false, isMarked: false, hidden: true});
      countCol = countCol + 1;
    }
    countCol = 0;
    countRow = countRow + 1;
  }
}

layMines(3);

function layMines(mineCount){
  while (mineCount>0){
    i = Math.floor(Math.random() * 9);
    if(board.cells[i].isMine !== true){
      board.cells[i].isMine = true;
      mineCount = mineCount -1;
    }
  }
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  for(i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }
  lib.initBoard()
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for(i=0; i<board.cells.length; i++){
    if(board.cells[i].isMine === true && board.cells[i].isMarked !== true) {
      return
    }
    else if(board.cells[i].isMine !== true && board.cells[i].hidden === true){
      return
    }
  }
  lib.displayMessage('You win!')
  playSound('sounds/clap.mp3')
}
// You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
var surrounding = lib.getSurroundingCells(cell.row, cell.col);
 var count = 0;
 for (var i = 0; i<surrounding.length; i++){
   if (surrounding[i].isMine === true){
     count += 1;
   }
 }
 return count;

}
