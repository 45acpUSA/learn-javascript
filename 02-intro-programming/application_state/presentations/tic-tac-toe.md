# Building Tic-Tac-Toe

In this lesson, we're going to us the concepts we learned about maintaining state in Javascript to build a real, working Tic-Tac-Toe application.  We also introduce that concept of having a ```render()``` function to update the DOM every time our state changes.  Using a render function is a core programming concept that you will use over and over as you build more complex applications.  It is the fundamental idea that all of the React Javascript framework is built around, as you'll see when we get into React in a few weeks.

## The Tic-Tac-Toe Board

Let's start by building out a board to play the game on.  Tic-tac-toe boards have 9 squares, 3 in each row.  We'll use flex to set this up

```html
<html>
  <head>
    <style>
      .board{
        display: flex;
        width: 600px;
        height: 600px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .square{
        height: 200px;
        width: 200px;
        box-sizing: border-box;
        border: 5px solid black;
        font-size: 5em;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .square:hover{
        cursor: pointer;
        background-color: green;
      }

    </style>
  </head>
  <body>
    <div class='render-target'></div>
    <script>
      var gameState = {
        board: [
          "","","","","","","","",""
        ]
      }

      //We're using Javascript to create the HTML for the page.  This allows
      //us to update it easily every time the state changes.
      function render(state){
        var renderedHtml = "<div class='board'>" +
          "<div class='square'>" +state.board[0]+ "</div>" +
          "<div class='square'>" +state.board[1]+ "</div>" +
          "<div class='square'>" +state.board[2]+ "</div>" +
          "<div class='square'>" +state.board[3]+ "</div>" +
          "<div class='square'>" +state.board[4]+ "</div>" +
          "<div class='square'>" +state.board[5]+ "</div>" +
          "<div class='square'>" +state.board[6]+ "</div>" +
          "<div class='square'>" +state.board[7]+ "</div>" +
          "<div class='square'>" +state.board[8]+ "</div>" +
        "</div>"

        //Find the target on the page where we want our game board to go
        document.querySelector(".render-target").innerHTML = renderedHtml 
      }

      //finally, we need to call our render function so it gets appended to the page
      render(gameState)

    </script>
  </body>
</html>
```

![tic-tac-toe board](https://s3.amazonaws.com/learn-site/curriculum/tic-tac-toe-board.png)

Pretty Nice!

For the rest of this module, we're only going to change the code inside of the ```<script></script>``` tags, so that is all that we'll show here in the examples.  If you are following along, just leave everything outside the ```<script>``` tags as is.

Let's add some interactivity to our board.  When a user clicks on a square, we want to update that square with either an 'X' or an 'O' to represent the player's turn.  We need to add the symbol for both players to the ```gameState``` as well as which player is currently taking their turn.  Add the following to the ```gameState``` object:

```javascript
  var gameState = {
    PLAYER_ONE: 'X',
    PLAYER_TWO: 'O',
    currentPlayer: 'X',
    board: [
      "","","","","","","","",""
    ]
  }
```

Now we need to handle a click when the user selects a square.  We add ```onclick()``` to each of our squares, and the matching function to catch the action and update our state:

```javascript
  function handleClick(index){
    gameState.board[index] = gameState.currentPlayer
    gameState.currentPlayer = gameState.currentPlayer == gameState.PLAYER_ONE ? gameState.PLAYER_TWO : gameState.PLAYER_ONE

    render(gameState)
  }

  function render(state){
    var renderedHtml = "<div class='board'>" +
      "<div class='square' onclick='handleClick(0)'>" +state.board[0]+ "</div>" +
      "<div class='square' onclick='handleClick(1)'>" +state.board[1]+ "</div>" +
      "<div class='square' onclick='handleClick(2)'>" +state.board[2]+ "</div>" +
      "<div class='square' onclick='handleClick(3)'>" +state.board[3]+ "</div>" +
      "<div class='square' onclick='handleClick(4)'>" +state.board[4]+ "</div>" +
      "<div class='square' onclick='handleClick(5)'>" +state.board[5]+ "</div>" +
      "<div class='square' onclick='handleClick(6)'>" +state.board[6]+ "</div>" +
      "<div class='square' onclick='handleClick(7)'>" +state.board[7]+ "</div>" +
      "<div class='square' onclick='handleClick(8)'>" +state.board[8]+ "</div>" +
    "</div>"

    document.querySelector(".render-target").innerHTML = renderedHtml 
  }
```

Excellent, with those changes, we can almost play a real game of tic-tac-toe.  Users can click on squares, and either an 'X' or an 'O' displays correctly.  Lets make one small change so that a user can't choose a square that is already populated.

In the handleClick function:

```javascript
  function handleClick(index){
    gameState.board[index] = gameState.currentPlayer
    gameState.currentPlayer = gameState.currentPlayer == gameState.PLAYER_ONE ? gameState.PLAYER_TWO : gameState.PLAYER_ONE

    render(gameState)
  }

```

Change it to this:

```Javascript
  function handleClick(index){
    if(gameState.board[index] == ""){
      gameState.board[index] = gameState.currentPlayer
      gameState.currentPlayer = gameState.currentPlayer == gameState.PLAYER_ONE ? gameState.PLAYER_TWO : gameState.PLAYER_ONE

      render(gameState)
    }
  }
```

Now we're ready to check to see if a player has won the game.  There are many ways to determine if a winning combination of sqares are all 'X' or all 'O'.  This one looks to see if any of the winning combinations are all the same.

```Javascript
  function checkForWinner(){
    var winningCombos = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]
    ]

    var winner = false
    winningCombos.find(function(combo){
      if(gameState.board[combo[0]] == gameState.board[combo[1]] && gameState.board[combo[1]] == gameState.board[combo[2]]){
        winner = gameState.board[combo[0]]
      }
    })

    return winner
  }
```

Then we need to call the ```checkForWinner()``` function after every state change, and message the players if the game is over.  Here is the new and improved ```handleClick()``` function:

```Javascript
  function handleClick(index){
    if(gameState.board[index] == ''){
      gameState.board[index] = gameState.currentPlayer
      gameState.currentPlayer = gameState.currentPlayer == gameState.PLAYER_ONE ? gameState.PLAYER_TWO : gameState.PLAYER_ONE

      let winner = checkForWinner()
      if(winner){
        alert(`${winner} is the winner!`)
        gameState.gameWinner = winner
      }

      render(gameState)
    }
  }
```

That's it!  You can now challenge your friends to tic-tac-toe.  One of the challenges builds off of this lesson.  It would be fun for the players to be able to play multiple games, and keep track of how many games each player has won.  Can you think of how we'd add that functionality?

![winner](https://s3.amazonaws.com/learn-site/curriculum/tic-tac-toe-winner.png)
Here is the complete program:
[CodePen](https://codepen.io/winescout/pen/VpgErx)

```html
<html>
  <head>
    <style>
      .board{
        display: flex;
        width: 600px;
        height: 600px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .square{
        height: 200px;
        width: 200px;
        box-sizing: border-box;
        border: 5px solid black;
        font-size: 5em;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .square:hover{
        cursor: pointer;
        background-color: green;
      }

    </style>
  </head>
  <body>
    <div class='render-target'></div>
    <script>
      var gameState = {
        PLAYER_ONE: 'X',
        PLAYER_TWO: 'O',
        currentPlayer: 'X',
        board: [
          "","","","","","","","",""
        ]
      }

      function checkForWinner(){
        var winningCombos = [
          [0, 1, 2], 
          [3, 4, 5], 
          [6, 7, 8], 
          [0, 3, 6], 
          [1, 4, 7], 
          [2, 5, 8], 
          [0, 4, 8], 
          [2, 4, 6]
        ]

        var winner = false
        winningCombos.find(function(combo){
          if(gameState.board[combo[0]] == gameState.board[combo[1]] && gameState.board[combo[1]] == gameState.board[combo[2]]){
            winner = gameState.board[combo[0]]
          }
        })

        return winner
      }

      function handleClick(index){
        if(gameState.board[index] == ''){
          gameState.board[index] = gameState.currentPlayer
          gameState.currentPlayer = gameState.currentPlayer == gameState.PLAYER_ONE ? gameState.PLAYER_TWO : gameState.PLAYER_ONE

          let winner = checkForWinner()
          if(winner){
            alert(`${winner} is the winner!`)
            gameState.gameWinner = winner
          }
          render(gameState)
        }
      }

      function render(state){
        var renderedHtml = "<div class='board'>" +
          "<div class='square' onclick='handleClick(0)'>" +state.board[0]+ "</div>" +
          "<div class='square' onclick='handleClick(1)'>" +state.board[1]+ "</div>" +
          "<div class='square' onclick='handleClick(2)'>" +state.board[2]+ "</div>" +
          "<div class='square' onclick='handleClick(3)'>" +state.board[3]+ "</div>" +
          "<div class='square' onclick='handleClick(4)'>" +state.board[4]+ "</div>" +
          "<div class='square' onclick='handleClick(5)'>" +state.board[5]+ "</div>" +
          "<div class='square' onclick='handleClick(6)'>" +state.board[6]+ "</div>" +
          "<div class='square' onclick='handleClick(7)'>" +state.board[7]+ "</div>" +
          "<div class='square' onclick='handleClick(8)'>" +state.board[8]+ "</div>" +
        "</div>"

        document.querySelector(".render-target").innerHTML = renderedHtml 
      }

      render(gameState)

    </script>
  </body>
</html>

```
