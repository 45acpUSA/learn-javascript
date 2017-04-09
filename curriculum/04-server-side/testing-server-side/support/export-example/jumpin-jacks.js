let createNewCounter = require('./counter').createNewCounter 

function reportJacksCount(count){
  console.log("My Jumpin Jacks count is now", count)
}

let jacksCounter = createNewCounter()

console.log("Welcome to a game of Jumpin Jacks.")
reportJacksCount(jacksCounter.getValue())

console.log("You give me one of your jacks.")
jacksCounter.increase()

reportJacksCount(jacksCounter.getValue())
console.log("I give you one of my jacks.")

jacksCounter.decrease()
reportJacksCount(jacksCounter.getValue())

