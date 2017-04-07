//Build a board 10 X 10
function buildBoard(){
  var board = []
  for(var x=0; x < 10; x++){
    for(var y=0; y < 10; y++){
      board.push({
        x: x, //x-position on board
        y: y, //y-position on board
        ships:{
          1: null, //ship placed on cell by player 1
          2: null //ship placed on cell by player 2
        },
        isTorpedoed: {
          1: false, //torpedoes fired at cell by player 1
          2: false //torpedoes fired at cell by player 2
        }
      })
    }
  }
  return board
}

//Build ships for players to place on board
function buildShips(){
  var shipTemplate = {
    length: null, //length of ship
    isPlacedOnBoard: false, //keeps track of if ship has been placed by user
    damage: 0, //records damage when opponent hits ship with torpedoe
    isSunk: false //set to true when ship is sunk
  }

  var ships = []
  for(var i=1; i<=5; i++){
    ships.push(Object.assign({}, shipTemplate, {length: i}))
  }
  return ships
}

//Build players for game
function buildPlayers(){
  var players = []
  for(var i=1; i<=2; i++){
    players.push(Object.assign({}, {
      number: i, //player number
      torpedoesLeft: 25, //how many torpedoes left to fire
      ships: buildShips() //ships in user's armada
    }))
  }

  return players
}

var gameState = {
  mode: 'setup', //two modes to game, 'setup', and 'play'
  playerTurn: 1, //which player is setting up board, or taking turn turin play
  board: buildBoard(), //the game board
  players: buildPlayers(), // the players
  winner: null //set when a winner sinks all opponent battleships
}

//Fired from DOM when user clicks on cell
function cellSelected(coordinates){
  if(gameState.mode == 'setup'){
    //In setup mode, user selects ship and orientation before choosing cell to place ship on
    cellSelectedForSetup(coordinates)
  }else{
    //In play mode, user is firing torpedo at a call
    cellSelectedForGamePlay(coordinates)
  }

  render(gameState)
}

function cellSelectedForSetup(coordinates){
  var orientation = gameState.selectedOrientation //chosen by user
  var length = gameState.selectedShipLength //choosen by user

  // validate length and orientation set
  if(!orientation || !length){
    return false
  }

  // validate room on grid to place ship
  if(orientation == 'vertical' && coordinates.y + length > 10){
    return false
  }
  if(orientation == 'horizontal' && coordinates.x + length > 10){
    return false
  }

  // validate cells do not have other ships placed on them
  if(orientation == 'vertical'){
    var occupiedCells = gameState.board.filter(function(cell){ //loop through all cells
      if(cell.ships[gameState.playerTurn] != null && //cell does have ship
        cell.x == coordinates.x && //cell has correct x coordinate
        cell.y >= coordinates.y && //cell is gte than selected y
        cell.y < coordinates.y + length){ //cell is lt selected y plus lenght of selected ship
        
        return true
      }
    })
  }else{
    var occupiedCells = gameState.board.filter(function(cell){
      if(cell.ships[gameState.playerTurn] != null &&
        cell.y == coordinates.y &&
        cell.x >= coordinates.x &&
        cell.x < coordinates.x + length){
        
        return true
      }
    })
  }

  //the above filters check for any ships in selected slot, if lenth is 0, we're clear to place ship
  if(occupiedCells.length > 0){
    return false
  }

  // mark ship as assigned
  var ship = gameState.players[gameState.playerTurn -1].ships.filter(function(option){
    return option.length == gameState.selectedShipLength 
  })[0]

  ship.isPlacedOnBoard = true

  // assign ship to cells
  if(orientation == 'vertical'){

    //loop through cells, and place ship on appropriate cells
    var occupiedCells = gameState.board.forEach(function(cell){
      if(cell.ships[gameState.playerTurn] == null &&
        cell.x == coordinates.x &&
        cell.y >= coordinates.y &&
        cell.y < coordinates.y + length){

        cell.ships[gameState.playerTurn] = ship
      }
    })
  }else{
    var occupiedCells = gameState.board.forEach(function(cell){
      if(cell.ships[gameState.playerTurn] == null &&
        cell.y == coordinates.y &&
        cell.x >= coordinates.x &&
        cell.x < coordinates.x + length){

        cell.ships[gameState.playerTurn] = ship
      }
    })
  }

  //clear selections
  gameState = Object.assign({}, gameState, {selectedOrientation: null, selectedShipLength: null})


  // switch active player and mode if needed
  var unPlacedShips = gameState.players[gameState.playerTurn -1 ].ships.filter(function(ship){
    return !ship.isPlacedOnBoard
  })

  //check to see if player has placed all of their ships
  if(unPlacedShips.length == 0){
    if(gameState.playerTurn == 1){
      //if player 1 is done, move to player 2
      gameState = Object.assign({}, gameState, {playerTurn: 2})
    }else{
      //if player 2 is done, we're ready to play the game
      gameState = Object.assign({}, gameState, {playerTurn: 1, mode: 'play'})
    }
  }
}

function cellSelectedForGamePlay(coordinates){
  //get cell user clicked on
  var cell = gameState.board.filter(function(cell){
    return cell.x == coordinates.x && cell.y == coordinates.y
  })[0]
  //validate game is not over
  if(gameState.winner){
    return false
  }

  //validate turn is not completed
  if(gameState.turnComplete){
    return false
  }

  //validate player has torpedoes left
  if(gameState.players[gameState.playerTurn -1].torpedoesLeft == 0){
    return false
  }

  var opponent = gameState.playerTurn == 1 ? 2 : 1

  //validate cell is not already torpedoed and place torpedoe
  if(cell.isTorpedoed[gameState.playerTurn]){
    return false
  }else{
    //decrement torpedoes left
    gameState.players[gameState.playerTurn -1].torpedoesLeft -= 1

    //set cell to be torpedoed
    cell.isTorpedoed[gameState.playerTurn] = true

    //damage ship if on cell
    if(cell.ships[opponent]){
      var ship = cell.ships[opponent]
      ship.damage += 1

      //sink ship if max damage
      if(ship.damage == ship.length){
        ship.isSunk = true
      }
    }

    //check if game won
    var unsunkOpponentShips = gameState.players[opponent -1].ships.filter(function(ship){
      return !ship.isSunk
    })
    if(unsunkOpponentShips.length == 0){
      gameState = Object.assign({}, gameState, {winner: gameState.playerTurn})
    }
 
    //set turn completed flag
    gameState = Object.assign({}, gameState, {turnComplete: true})
  }
}

function shipToPlaceSelected(shipLength){
  gameState = Object.assign({}, gameState, {selectedShipLength: shipLength})
}

function orientationSelected(orientation){
  gameState = Object.assign({}, gameState, {selectedOrientation: orientation})
}

function setNextPlayer(){
  var nextPlayer = gameState.playerTurn == 1 ? 2 : 1
  gameState = Object.assign({}, gameState, {playerTurn: nextPlayer, turnComplete: false})
  render(gameState)
}

function render(state){
  //Render game state
  if(state.winner){
    var gameState = "<H1>Player "+ state.winner+" Wins!</H1>"
  }else if(state.mode == 'setup'){
    var gameState = "<h2>Setup</h2>"
  }else{
    var gameState = "<h2>Play</h2>"
  }

  //Render setup controls
  if(state.mode == 'setup'){
    var cells = state.board.map(function(cell){
      var ship = cell.ships[state.playerTurn]
      if(ship){
        cssClass = 'cell occupied'
      }else{
        cssClass = 'cell'
      }
      return "<div class='"+ cssClass +"' onclick='cellSelected({x:"+cell.x+", y:"+cell.y+"})'></div>"
    }).join('')
  }else{
    var cells = state.board.map(function(cell){
      //deterine cell class based on ship/torpedo state
      var currentPlayer = state.playerTurn;
      var opponent = state.playerTurn == 1 ? 2 : 1
      var ship = cell.ships[opponent]
      var isTorpedoed = cell.isTorpedoed[currentPlayer]
      if(ship && ship.isSunk){
        cssClass = 'cell sunk'
      }if(ship && isTorpedoed){
        cssClass = 'cell hit'
      }else if(isTorpedoed){
        cssClass = 'cell miss'
      }else{
        cssClass = 'cell'
      }
      return "<div class='"+ cssClass +"' onclick='cellSelected({x:"+cell.x+", y:"+cell.y+"})'></div>"
    }).join('')
  }

  if(state.mode == 'setup'){
    var shipsToPlace = state.players[state.playerTurn -1].ships.filter(function(ship){
      return !ship.isPlacedOnBoard
    })
    var shipOptions = shipsToPlace.map(function(ship){
      return "<li>" +
        "<input type='radio' name='ship-to-place' value='" + ship.length + "' onclick='shipToPlaceSelected("+ship.length+")'>"+
          "<label>Length "+ ship.length +"</label>" +
        "</li>"
    }).join('')
    var actions = "<h2>Player "+ state.playerTurn +" Setup</h2>" +
      "<h3>Ships to Place</h3>" +
      "<h4>Instructions</h4>" +
      "<p>Select a ship and orientation, then select a square on board to place the ship</p>" +
      "<ul>" +
        shipOptions +
      "</ul>" +
      "<div>" +
        "<h3>Orientation</h3>" +
        "<ul>" +
          "<li>" +
            "<label>"+
              "<input type='radio' name='orientation' value='vertical' onclick='orientationSelected(\"vertical\")'>" +
              "Vertical"+
            "</label>" +
          "</li>" +
          "<li>" +
            "<label>" +
              "<input type='radio' name='orientation' value='horizontal' onclick='orientationSelected(\"horizontal\")'>"+
              "Horizontal"+
            "</label>" +
          "</li>" +
        "</ul>" +
      "</div>"
  }else{
    var actions = "<h2>Player "+ state.playerTurn +" Turn</h2>" +
      "<p>"+ state.players[state.playerTurn -1].torpedoesLeft +" Torpedoes left.</p>" +
      "<div>" +
        "<button onclick='setNextPlayer()'>Next Player</button>"+
      "</div>"
  }


  //We have game state, cells, and current actions sorted, time to draw the board
  var renderedGame = "<h1>Battleship</h1>" +
    gameState +
    "<div class='game'>" +
      "<div class='board'>" +
        cells +
      "</div>" +
      "<div class='actions'>"+
        actions +
      "</div>" +
    "</div>"
  document.querySelector('#render-target').innerHTML = renderedGame
}

//initial render
render(gameState)


