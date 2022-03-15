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
    gameboard.append(cell);
    cell.addEventListener('click', () => {
      cell.textContent = "X";
      cell.style.cssText = 'color: red';
    });
  }
  
  return { gameboardArr };


})();