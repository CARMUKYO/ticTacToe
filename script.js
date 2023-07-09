const gameboard = function(){
    let board = ["x", "o", "x", "", "", "", "", "", ""];
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
        const board = gameboard.getBoard();
        const cells = document.querySelectorAll(".cell");

        cells.forEach(function(cell,index){
            cell.textContent = board[index];
        })
    }
    return {renderBoard};
}();

displayController.renderBoard();
