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

  // Draw X / O on board & fill gameBoardArr
  document.querySelectorAll(".cell").forEach(item => {
    item.addEventListener('click', () => {
      let xMove = "X";
      let oMove = "O";
      let tempArr = Gameboard.gameboardArr;
      let tempMoveTracker = Gameboard.moveTracker;
      let cellId = item.getAttribute('data-set');
  
      if (item.textContent == '') {
        if (tempMoveTracker == 0 || tempMoveTracker % 2 == 0) {
          item.textContent = xMove;
          item.style.cssText = 'color: red';
          tempArr[cellId] = xMove;
          tempMoveTracker++;
        } else if (tempMoveTracker % 2 != 0) {
          item.textContent = oMove;
          item.style.cssText = 'color: blue';
          tempArr[cellId] = oMove;
          tempMoveTracker++;
        }
        Gameboard.moveTracker = tempMoveTracker;
        Gameboard.gameboardArr = tempArr
      }
    })
  })
})();