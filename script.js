const gameBoard = function(){
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
}();


const displayController = function(){
    const renderBoard = function(){
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");

        cells.forEach(function(cell,index){
            cell.textContent = board[index];
        })
    }
    const showModal = function(message){
        document.getElementById("modalTitle").textContent = message;
        document.getElementById("modal").classList.remove("hidden");
        document.getElementById("modal").style.visibility = "visible";
      };
    
    const hideModal = function(){
        document.getElementById("modal").classList.add("hidden");
        document.getElementById("modal").style.visibility = "hidden"; 
    };

    return {renderBoard, showModal, hideModal};
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
        if(board[index] === "" && !checkWin()){
            gameBoard.setBoard(index, activePlayer.marker);
            displayController.renderBoard();
            let winner = checkWin();
            if(winner){
                if(winner === "X"){
                    displayController.showModal(`Player 1 wins!`);
                    return;
                }else{
                    displayController.showModal(`Player 2 wins!`);
                    return;
                }    
            }else if(board.every((cell) => cell !== "")) {
                displayController.showModal("It's a tie!");
                return;
            }
        switchPlayer();
    } }

    const checkWin = function(){
        const board = gameBoard.getBoard();
        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for(let combo of win){
            if( board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]){
                return board[combo[0]];
            }
        }
            return false; 
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

document.getElementById("replay").addEventListener("click", () => {
    gameBoard.resetBoard();
    displayController.renderBoard();
    displayController.hideModal();
  });