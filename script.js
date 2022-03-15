const Gameboard = (() => {

  // Make gameboardArr array
  let gameboardArr = [];
  for (let i = 1; i < 10; i++) {
    gameboardArr.push("");
  }

  // Make board
  const gameboard = document.getElementById('gameboard');
  for (i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    gameboard.append(cell)
  }
  gameboard.style.gridTemplateColumns = `repeat(3, 1fr)`;
  gameboard.style.display = 'grid';
  return { gameboardArr };

})();