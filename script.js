
Gameboard = (() => {
  const gameboard = document.getElementById('gameboard');
  let gameboardArr = [];

  // Make gameboardArr array
  emptyArr = () => {
    for (let i = 1; i < 10; i++) {
      gameboardArr.push("");
    }
  }
  emptyArr();

  // Make board
  addBoard = (() => {
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
  })();

  let moveTracker = 0;
  return { gameboardArr, moveTracker };
})();

btnNewGame = (() => {
  // Create button
  const btnWrap = document.getElementById('btnWrap'),
    newGameBtn = document.createElement('button');
  newGameBtn.id = 'newGameBtn';
  newGameBtn.innerText = "New Game";
  btnWrap.append(newGameBtn);

  // Clear board
  newGameBtn.addEventListener('click', (e) => {
    document.querySelectorAll('.cell').forEach(item => {
      item.style.cssText -= 'background-color: #d4d4d8';
      item.textContent = '';
      item.classList.remove('noPlay');
    })
    Gameboard.gameboardArr.splice(0);
    emptyArr();
  })
})();

playGame = (() => {
  let xMove = "X",
    oMove = "O",
    tempArr = Gameboard.gameboardArr,
    moveTracker = Gameboard.moveTracker;

  // EventListener on cells
  cellListener = (() => {
    document.querySelectorAll(".cell").forEach(item => {
      item.addEventListener('click', () => {
        let cellId = item.getAttribute('data-set');

        // Play on cells
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

  cellHelper = () => {
    moveTracker++
    getWinner()
  }
  return {
    tempArr
  }
})();

// Determine winner
getWinner = () => {
  const tempArr = playGame.tempArr,
    _winArray = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ],
    boardChildren = document.getElementById('gameboard').children;

  // Select winning cells based on _winArray
  for (i = 0; i < _winArray.length; i++) {
    let boardChildOne = boardChildren.item(_winArray[i][0]);
    let boardChildTwo = boardChildren.item(_winArray[i][1]);
    let boardChildThree = boardChildren.item(_winArray[i][2]);

    // Fill winning cells background-color
    fillWinCells = () => {
      boardChildOne.style.cssText += 'background-color: #d4d4d8';
      boardChildTwo.style.cssText += 'background-color: #d4d4d8';
      boardChildThree.style.cssText += 'background-color: #d4d4d8';
      stopNextMove();
    }

    // Get winner by comparing tempArr to _winArray
    if (tempArr[_winArray[i][0]] + tempArr[_winArray[i][1]] + tempArr[_winArray[i][2]] == "XXX") {
      console.log("We have a winner: X")
      fillWinCells();
    } else if (tempArr[_winArray[i][0]] + tempArr[_winArray[i][1]] + tempArr[_winArray[i][2]] == "OOO") {
      console.log("We have a winner: O")
      fillWinCells();
    }
  }
}

// Render eventListener obsolete 
stopNextMove = () => {
  document.querySelectorAll('.cell').forEach(item => {
    item.classList.add('noPlay');
  })
}