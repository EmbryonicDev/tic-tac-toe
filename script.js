Gameboard = (() => {
  const gameboard = document.getElementById('gameboard');

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
})();

addBtns = (() => {
  // Create button
  const btnWrap = document.getElementById('btnWrap'),
    newGameBtn = document.createElement('button'),
    clearScoreBtn = document.createElement('button');

  newGameBtn.id = 'newGameBtn';
  newGameBtn.innerText = "New Game";
  btnWrap.append(newGameBtn);

  clearScoreBtn.id = 'clearScoreBtn';
  clearScoreBtn.innerText = "Clear Score";
  btnWrap.append(clearScoreBtn);

  // Clear board
  newGameBtn.addEventListener('click', (e) => {
    emptyPlayBoard();
    playGame.gameArr.splice(0);
    playGame.addArray();
  })
  
  emptyPlayBoard = () => {
    document.querySelectorAll('.cell').forEach(item => {
      item.style.cssText -= 'background-color: #d4d4d8';
      item.textContent = '';
      item.classList.remove('noPlay');
    })
  }

  // Clear score
  clearScoreBtn.addEventListener('click', () => {
    players.pOneScore = 0;
    players.pTwoScore = 0;
    scoreBoards();
    emptyPlayBoard();
  })
})();

playGame = (() => {
  let xMove = "X",
    oMove = "O",
    moveTracker = 0,
    gameArr = [];

  // Build Array to hold 9 empty values
  addArray = () => {
    for (let i = 1; i < 10; i++) {
      gameArr.push("");
    }
  }
  addArray();

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
            gameArr[cellId] = xMove;
          } else if (moveTracker % 2 != 0 && item.classList != 'cell noPlay') {
            item.textContent = oMove;
            item.style.cssText = 'color: blue';
            gameArr[cellId] = oMove;
          }
          cellHelper();
        }
      })
    })
  })()

  cellHelper = () => {
    moveTracker++
    getWinner()
  }
  return {
    gameArr,
    addArray
  }
})();

const players = {
  pOneScore: 0,
  pTwoScore: 0,
  winner: '',
}

const scoreFactory = (name, score, marker) => {
  const changeBoard = () => (`${name} \n Marker: ${marker} \n Score: ${score}`);
  return { changeBoard, name, score, marker }
}

scoreBoards = () => {
  const playerOneBoard = document.getElementById('playerOneWrap'),
    playerTwoBoard = document.getElementById('playerTwoWrap');

  const playerOne = scoreFactory("Player 1", players.pOneScore, "❌");
  playerOneBoard.innerText = playerOne.changeBoard();

  const playerTwo = scoreFactory("Player 2", players.pTwoScore, "⭕");
  playerTwoBoard.innerText = playerTwo.changeBoard();

};
scoreBoards();

// Determine winner
getWinner = () => {
  const gameArr = playGame.gameArr,
    _winArray = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ],
    playerOne = "Player 1",
    playerTwo = "Player 2",
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

    // Get winner by comparing gameArr to _winArray
    if (gameArr[_winArray[i][0]] + gameArr[_winArray[i][1]] + gameArr[_winArray[i][2]] == "XXX") {
      console.log("We have a winner: X")
      players.winner = playerOne;
      players.pOneScore++;
      fillWinCells();
    } else if (gameArr[_winArray[i][0]] + gameArr[_winArray[i][1]] + gameArr[_winArray[i][2]] == "OOO") {
      console.log("We have a winner: O")
      players.winner = playerTwo;
      players.pTwoScore++;
      fillWinCells();
    }
  }
  scoreBoards();
}

// Render eventListener obsolete 
stopNextMove = () => {
  document.querySelectorAll('.cell').forEach(item => {
    item.classList.add('noPlay');
  })
}