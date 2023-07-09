const gameBoard = (function(){
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = function(){
        return board;
    }
    const setBoard = function(index,value){
        board[index] = value;
    }
    const resetBoard = function(){
        board = ["", "", "", "", "", "", "", "", ""];
    }
    return {getBoard, setBoard, resetBoard};
})();


const displayController = function(){
    const renderBoard = function(){
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");

        cells.forEach(function(cell,index){
            cell.textContent = board[index];
        })
    }
    return {renderBoard};
}();

displayController.renderBoard();

const player = function(name, marker){
    return {name, marker};
}

const gameController = function(){
    let player1 = player("Player 1", "X");
    let player2 = player("Player 2", "O");
    let activePlayer = player1;

    const switchPlayer = function(){
        if(activePlayer === player1){
            activePlayer = player2;
        }else{
            activePlayer = player1;
        }
    }

    const playTurn = function(index){
        let board = gameBoard.getBoard();
        gameBoard.setBoard(index, activePlayer.marker);
        displayController.renderBoard();
        switchPlayer();
    }

    const startGame = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
          cell.addEventListener("click", () => playTurn(index));
        });
        displayController.renderBoard();
      }
      
      return { startGame };
}();


gameController.startGame();
