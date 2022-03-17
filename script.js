const Gameboard = (() => {

  // Make gameboardArr array
  let gameboardArr = [];
  for (let i = 1; i < 10; i++) {
    gameboardArr.push("");
  }

  // Make board
  const gameboard = document.getElementById('gameboard');
  gameboard.style.gridTemplateColumns = `repeat(3, 100px)`;
  gameboard.style.gridAutoRows = `minmax(100px, auto)`;
  gameboard.style.display = 'grid';
  for (i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.set = [i];
    gameboard.append(cell);
  }
  gameboard.style.gridTemplateColumns = `repeat(3, 100px)`;
  gameboard.style.gridAutoRows = `minmax(100px, auto)`;
  gameboard.style.display = 'grid';

  let moveTracker = 0;

  return { gameboardArr, moveTracker };

})();

const playGame = (() => {
  let xMove = "X";
  let oMove = "O";
  let tempArr = Gameboard.gameboardArr;
  let moveTracker = Gameboard.moveTracker;
  
  // EventListener on cells
  const cellListener = (() => {
    document.querySelectorAll(".cell").forEach(item => {
      item.addEventListener('click', () => {
        let cellId = item.getAttribute('data-set');

        // Draw on cells
        if (item.textContent == '' && item.classList != 'cell noPlay') {
          if (moveTracker == 0 || moveTracker % 2 == 0) {
            item.textContent = xMove;
            item.style.cssText = 'color: red';
            tempArr[cellId] = xMove;
          } else if (moveTracker % 2 != 0 && item.classList != 'cell noPlay') {
            item.textContent = oMove;
            item.style.cssText = 'color: blue';
            tempArr[cellId] = oMove;
          }
          cellHelper();
          Gameboard.moveTracker = moveTracker;
          Gameboard.gameboardArr = tempArr
        }
      })
    })
  })()

  const cellHelper = () => {
    moveTracker++
    getWinner()
  }

  // Determine winner
  const getWinner = () => {
    if (
      tempArr[0] == xMove && tempArr[1] == xMove && tempArr[2] == xMove ||
      tempArr[3] == xMove && tempArr[4] == xMove && tempArr[5] == xMove ||
      tempArr[6] == xMove && tempArr[7] == xMove && tempArr[8] == xMove ||
      tempArr[0] == xMove && tempArr[3] == xMove && tempArr[6] == xMove ||
      tempArr[1] == xMove && tempArr[4] == xMove && tempArr[7] == xMove ||
      tempArr[2] == xMove && tempArr[5] == xMove && tempArr[8] == xMove ||
      tempArr[0] == xMove && tempArr[4] == xMove && tempArr[8] == xMove ||
      tempArr[2] == xMove && tempArr[4] == xMove && tempArr[6] == xMove
    ) {
      console.log("We have a winner: " + "X");
    } else if (
      tempArr[0] == oMove && tempArr[1] == oMove && tempArr[2] == oMove ||
      tempArr[3] == oMove && tempArr[4] == oMove && tempArr[5] == oMove ||
      tempArr[6] == oMove && tempArr[7] == oMove && tempArr[8] == oMove ||
      tempArr[0] == oMove && tempArr[3] == oMove && tempArr[6] == oMove ||
      tempArr[1] == oMove && tempArr[4] == oMove && tempArr[7] == oMove ||
      tempArr[2] == oMove && tempArr[5] == oMove && tempArr[8] == oMove ||
      tempArr[0] == oMove && tempArr[4] == oMove && tempArr[8] == oMove ||
      tempArr[2] == oMove && tempArr[4] == oMove && tempArr[6] == oMove
    ) {
      console.log("We have a winner: " + "O");
    }
  }
})();