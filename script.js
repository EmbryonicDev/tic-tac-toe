const myVariables = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
  pOneScore: 0,
  pTwoScore: 0,
  winner: '',
  moveTracker: 0,
  nextToPlay: '',
  tie: '',
  gameMoves: 0,
}

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

buttons = (() => {
  // Create buttons
  const btnWrap = document.getElementById('btnWrap'),
    newGameBtn = document.createElement('button'),
    clearScoreBtn = document.createElement('button');

  // Apply buttons
  newGameBtn.id = 'newGameBtn';
  newGameBtn.innerText = "New Game";
  btnWrap.append(newGameBtn);

  clearScoreBtn.id = 'clearScoreBtn';
  clearScoreBtn.innerText = "Clear Score";
  btnWrap.append(clearScoreBtn);

  // Clear board & array
  newGameBtn.addEventListener('click', (e) => {
    myVariables.tie = '';
    myVariables.winner = '';
    emptyPlayBoard();
    scoreBoards();
    myVariables.gameMoves = 0;
  })

  emptyPlayBoard = () => {
    document.querySelectorAll('.cell').forEach(item => {
      item.style.cssText -= 'background-color: #d4d4d8';
      item.textContent = '';
      item.classList.remove('noPlay');
    })
    playGame.gameArr.splice(0);
    playGame.addArray();
  }

  // Clear score
  clearScoreBtn.addEventListener('click', () => {
    myVariables.pOneScore = 0;
    myVariables.pTwoScore = 0;
    myVariables.tie = '';
    myVariables.winner = '';
    emptyPlayBoard();
    scoreBoards();
    myVariables.gameMoves = 0;
  })
})();

form = (() => {
  // Create button to change names / activate form
  const mainWrap = document.getElementById('mainWrap'),
    btnWrap = document.getElementById('btnWrap'),
    newNamesBtn = document.createElement('button');

  // Add button to DOM
  newNamesBtn.id = 'newNamesBtn';
  newNamesBtn.innerText = 'Edit Names';
  btnWrap.append(newNamesBtn);

  // Display form
  newNamesBtn.addEventListener('click', () => {
    const form = document.getElementById('form');
    form.style.visibility = 'visible';
    form.playerOne.value = '';
    form.playerTwo.value = '';

    // Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      myVariables.playerOne = form.playerOne.value;
      myVariables.playerTwo = form.playerTwo.value;
      scoreBoards();
      form.style.visibility = 'hidden';
    })

    // Cancel
    document.getElementById('cancelBtn').addEventListener("click", () => {
      form.style.visibility = 'hidden';
    })
  })
})()

playGame = (() => {
  let xMove = "X",
    oMove = "O",
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
          myVariables.gameMoves++;
          if (myVariables.moveTracker == 0 || myVariables.moveTracker % 2 == 0) {
            item.textContent = xMove;
            item.style.cssText = 'color: red';
            gameArr[cellId] = xMove;
            myVariables.nextToPlay = oMove;
          } else if (myVariables.moveTracker % 2 != 0 && item.classList != 'cell noPlay') {
            item.textContent = oMove;
            item.style.cssText = 'color: blue';
            gameArr[cellId] = oMove;
            myVariables.nextToPlay = xMove;
          }
          myVariables.moveTracker++;
        }
        // Check if it's a tied game
        if (myVariables.gameMoves > 8 && myVariables.winner == '' && item.classList != 'cell noPlay') {
          myVariables.tie = "Yes";
          stopNextMove();
        }
        getWinner();
      })
    })
  })()
  return {
    gameArr,
    addArray
  }
})();

// Determine winner
getWinner = () => {
  const gameArr = playGame.gameArr,
    _winArray = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ],
    playerOne = myVariables.playerOne,
    playerTwo = myVariables.playerTwo,
    boardChildren = document.getElementById('gameboard').children;

  // Select winning cells based on _winArray
  for (i = 0; i < _winArray.length; i++) {
    let boardChildOne = boardChildren.item(_winArray[i][0]);
    let boardChildTwo = boardChildren.item(_winArray[i][1]);
    let boardChildThree = boardChildren.item(_winArray[i][2]);

    // Fill winning cells background-color
    fillWinCells = () => {
      boardChildOne.style.cssText += 'background: #fbbf24';
      boardChildTwo.style.cssText += 'background: #fbbf24';
      boardChildThree.style.cssText += 'background: #fbbf24';
      stopNextMove();
    }

    // Get winner by comparing gameArr to _winArray
    if (gameArr[_winArray[i][0]] + gameArr[_winArray[i][1]] + gameArr[_winArray[i][2]] == "XXX") {
      myVariables.winner = playerOne;
      myVariables.pOneScore++;
      fillWinCells();
    } else if (gameArr[_winArray[i][0]] + gameArr[_winArray[i][1]] + gameArr[_winArray[i][2]] == "OOO") {
      myVariables.winner = playerTwo;
      myVariables.pTwoScore++;
      fillWinCells();
    }
  }
  scoreBoards();
}

// Feed info to scoreboards
const scoreFactory = (name, score, marker) => {
  const changeBoard = () => (`${name} \n Marker: ${marker} \n Score: ${score}`);
  return { changeBoard, name, score, marker }
}

scoreBoards = () => {
  const pOneBoard = document.getElementById('playerOneWrap'),
    pTwoBoard = document.getElementById('playerTwoWrap'),
    pOneWinner = document.createElement('p'),
    pTwoWinner = document.createElement('p'),
    pOneText = document.createElement('p'),
    pTwoText = document.createElement('p'),
    pOneDisplay = scoreFactory(myVariables.playerOne, myVariables.pOneScore, "❌"),
    pTwoDisplay = scoreFactory(myVariables.playerTwo, myVariables.pTwoScore, "⭕"),
    winnerDisplay = document.getElementById('gameResult');

  let leader = "";

  // Show leader
  if (myVariables.pOneScore > myVariables.pTwoScore) {
    leader = myVariables.playerOne;
    pOneWinner.innerText = "Leader";
    pOneBoard.style.cssText = "border: solid black";
    pTwoBoard.style.cssText -= "border: solid black";
  } else if (myVariables.pTwoScore > myVariables.pOneScore) {
    leader = myVariables.playerTwo;
    pTwoWinner.innerText = "Leader";
    pTwoBoard.style.cssText = "border: solid black";
    pOneBoard.style.cssText -= "border: solid black";
  } else {
    pOneWinner.innerText = "";
    pTwoWinner.innerText = "";
    pOneBoard.style.cssText -= "border: solid black";
    pTwoBoard.style.cssText -= "border: solid black";
  }

  // Show player info
  pOneText.innerText = pOneDisplay.changeBoard();
  pTwoText.innerText = pTwoDisplay.changeBoard();

  pOneBoard.append(pOneWinner);
  pTwoBoard.append(pTwoWinner);
  pOneBoard.append(pOneText);
  pTwoBoard.append(pTwoText);

  // Prevent new <p>'s from being added everytime scoreBoards() is called
  while (pOneBoard.childNodes.length > 2 || pTwoBoard.childNodes.length > 2) {
    pOneBoard.removeChild(pOneBoard.firstChild);
    pTwoBoard.removeChild(pTwoBoard.firstChild);
  }

  // Show next player
  if (myVariables.nextToPlay == "O" && myVariables.tie == "") {
    winnerDisplay.innerText = "⭕ to play...";
  } else if (myVariables.nextToPlay == "X" && myVariables.tie == "") {
    winnerDisplay.innerText = "❌ to play...";
  } else if (myVariables.tie == 'Yes') {
    winnerDisplay.innerText = "It's a tie 👔";
  }

  // Show winner
  displayWinner = (() => {
    const firstCell = document.querySelector("[data-set='1']");
    if (firstCell.classList.contains('noPlay')) {
      if (myVariables.winner == myVariables.playerOne) {
        winnerDisplay.innerText = myVariables.playerOne + " Wins!!!";
      } else if (myVariables.winner == myVariables.playerTwo) {
        winnerDisplay.innerText = myVariables.playerTwo + " Wins!!!";
      }
    }
  })()
};
scoreBoards();

// Render gameboard eventListener obsolete 
stopNextMove = () => {
  document.querySelectorAll('.cell').forEach(item => {
    item.classList.add('noPlay');
  })
}