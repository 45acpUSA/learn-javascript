let fsPromise = require('fs-promise')

fsPromise.readFile('./haiku.txt','ascii').then(function(poem){
  console.log(poem)
}).catch(function(error){
  console.log(error)
})
