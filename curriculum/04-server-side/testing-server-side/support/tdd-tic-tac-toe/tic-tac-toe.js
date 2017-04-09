exports.checkForWinner = (board)=>{
  let winningCombinations = [
    [0,1,2],
    [0,3,6],
    [0,4,8]
  ]

  if(board.length != 9){
    return false
  }    

  let winner = false
  winningCombinations.find((combo) =>{
    if(board[combo[0]] == board[combo[1]] &&
       board[combo[1]] == board[combo[2]]){
      winner = board[combo[0]]
    }
  })

  return winner
}

