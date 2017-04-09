let createNewCounter = require('./counter').createNewCounter 

function reportMarbleCount(count){
  console.log("My marble count is now", count)
}

let marbleCounter = createNewCounter()

console.log("Welcome to a game of marbles.")
reportMarbleCount(marbleCounter.getValue())

console.log("You give me one of your marbles.")
marbleCounter.increase()

reportMarbleCount(marbleCounter.getValue())
console.log("I give you one of my marbles.")

marbleCounter.decrease()
reportMarbleCount(marbleCounter.getValue())

