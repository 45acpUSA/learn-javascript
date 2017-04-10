# TDD Tic-Tac-Toe

Its time to try a real world example using a TDD development style, and all of the Node libraries we're now familiar with.  Do you remember the ```checkForWinner()``` function we wrote for Tic-Tac-Toe?  Let's write that function again, this time using TDD

Time to setup a new project:

```
$ mkdir -p tdd-tic-tac-toe/test
$ cd tdd-tic-tac-toe
$ npm init
$ npm install mocha chai --save-dev
```

Same change in package.json, to enable the Mocha test runner:

```javascript
// package.json

{
  "name": "mocha-chai-demo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },


  // Update path to mocha binary for test
  "scripts": {
    "test": "./node_modules/.bin/mocha"
  },


  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.2.0"
  }
}
```

Let's setup our first failing test, so we can begin to write some production code.  

```javascript
// /test/check-for-winner-test.js

var mocha = require('mocha')
var expect = require('chai').expect

describe('Sample Application', function(){
  it("should run tests", function(){
    expect(true).to.be.true
  })
})
```

Run that and make sure everything is setup correctly:
```
$ npm test
> mocha-chai-demo-app@1.0.0 test ./mocha-chai-demo-app
> mocha

  Sample Application
    ✓ should run tests


  1 passing (12ms)
```

Great, everything is working.  Now we can delete the setup check, and write a failing test.  

```Javascript
// ./test/check-for-winner-test.js

describe('checkForWinner()', function(){
  it("should return false for empty array", function(){
    let result = checkForWinner([])
    expect(result).to.be.false
  })
})
```

And when we run it:

```Javascript
$ npm test

  checkForWinner()
    1) should return false for empty array


  0 passing (11ms)
  1 failing

  1) checkForWinner() should return false for empty array:
      ReferenceError: checkForWinner is not defined 
      at Context.<anonymous> (test/check-for-winner-test.js:6:18)
```

Excellent, we've got a test we want to make pass.  The result even tells us what we need to do next, notice 
```ReferenceError: checkForWinner is not defined ```.  Looks like its time to add some code to get past that issue.

```Javascript
// Create a new file in the top level of the project called tic-tac-toe.js

exports.checkForWinner = function(){
}
```

Back in the test, we require ```checkForWinner``` so the test has access to it

```Javascript
// ./test/check-for-winner-test.js

let mocha = require('mocha')
let expect = require('chai').expect
let checkForWinner = require('../tic-tac-toe.js').checkForWinner


describe('checkForWinner()', function(){
  it("should return false for empty array", function(){
    let result = checkForWinner([])
    expect(result).to.be.false
  })
})

```

Running our tests again, and we see that we're past the first problem, but now we have a new issue to solve, our function isn't returning the expected result.

```
$ tdd-tic-tac-toe git:(master) ✗ npm test

  checkForWinner()
    1) should return false for empty array


  0 passing (13ms)
  1 failing

  1) checkForWinner() should return false for empty array:
     AssertionError: expected undefined to be false
      at Context.<anonymous> (test/check-for-winner-test.js:9:25)

```

That's progress!  We're ready to make this test pass.  The smallest amount of code we can write to get a green test is just return false from the ```checkForWinner()``` function.  Let's do that.

```Javascript
exports.checkForWinner = function(){
  return false
}

```

```
$ tdd-tic-tac-toe git:(master) ✗ npm test

  checkForWinner()
    ✓ should return false for empty array


  1 passing (9ms)
```

** Green! ** Its time to do our first refactor.  We want to use the ES6 syntax for our functions.  We can now do that safely knowing that as long as we stay green, we haven't broken anything.  While were at it, we'll update the test to use ES6 syntax as well.

```Javascript
exports.checkForWinner = (board)=>{
  return false
}
```

Ok great, still green, but our function isn't nearly complete yet.  If we shipped this code, no one would ever win the game.  Let's write another test for a winning case, where the top row of the board is filled in with all 'X's.

```Javascript
describe('checkForWinner()', ()=>{
  it("should return false for empty array", ()=>{
    let result = checkForWinner([])
    expect(result).to.be.false
  })

  it("should return true if top row is filled by one player", ()=>{
    let result = checkForWinner(['X','X','X','','','','','',''])
    expect(result).to.eq('X')
  })
})
```

```
  tdd-tic-tac-toe git:(master) ✗ npm test

  checkForWinner()
    ✓ should return false for empty array
    1) should return true if top row is filled by one player


  1 passing (18ms)
  1 failing


  1) checkForWinner() should return true if top row is filled by one player:
     AssertionError: expected false to equal 'X'
      at Context.it (test/check-for-winner-test.js:14:23)
```

With a new failing test, we can write some more code to make it pass.  Our first attempt will check to see if the first 3 spots are the same player, and report a winner if so.  Here's our first try:

```Javascript
exports.checkForWinner = (board)=>{
  if(board[0] == board[1] && board[1] == board[2]){
    return board[0]
  }else{
    return false
  }
}
```

And an interesting thing happens.  The new test passes, but we broke the first test!  When we pass an empty array in, it doesn't return ```false```, instead it now returns 'undefined'.  What is going on here?  Reasoning about it a bit, we realize that ```board[0]``` is undefined, because the array is empty, and since 'undefined' == 'undefined', the if is truthy, so the function returns the value in ```board[0]``` which is `undefined`.  Clearly not what we want.  Let's fix this and get back to all green.

```Javascript
exports.checkForWinner = (board)=>{
  if(board.length != 9){
    return false
  }else if(board[0] == board[1] && board[1] == board[2]){
    return board[0]
  }else{
    return false
  }
}
```

Better!  We're green again, but there are still more winning cases that our function doesn't know about.  Time for another test.

```Javascript
  it("should return true if the left column is filled by one player",()=>{
    let result = checkForWinner(['O','','','O','','','O','',''])
    expect(result).to.eq('O')
  })
```

That fails, but we can make it pass by updating the function:

```Javascript
exports.checkForWinner = (board)=>{
  if(board.length != 9){
    return false
  }else if(board[0] == board[1] && board[1] == board[2]){
    return board[0]
  }else if(board[0] == board[3] && board[3] == board[6]){
    return board[0]
  }else{
    return false
  }
}
```

Green again, and now we're starting to see a pattern.  We could continue down this path and check all the winning combinations as new sections of our if/else statement, and that would work.  Since we're green currently, this is a good chance to refactor the code.  How can we make this simpler and easier to understand?  A good place to start is by working on the if/else statement.  Let's try pulling the two winning combinations we know about into an array of their own, and loop over them.

```Javascript
exports.checkForWinner = (board)=>{
  let winningCombinations = [
    [0,1,2],
    [0,3,6]
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

```

That is a lot more readable, and our tests are still green.  But, there are still more winning cases we don't report correctly.  Time for another test.

```Javascript
  it("should return true if the diagonal is filled by one player",()=>{
    let result = checkForWinner(['O','','','','O','','','','O'])
    expect(result).to.eq('O')
  })
```

Running it, assures us it fails, and then we can make it pass by updating the ```winningCombinations``` array:

```Javascript
  let winningCombinations = [
    [0,1,2],
    [0,3,6],
    [0,4,8]
  ]
```

At this point, we just need to add 1 line of code for each winning combination, and when we get them all, the function is complete.  This brings up an interesting issue that you will face often when doing TDD.  Should I write a new test for each winning combination?  If there were thousands of winning combinations, this would quickly become tedious, and wouldn't add at all to the clarity of the code.  In tic-tac-toe, there are just 8 combinations, and we want to be sure to get them all, so it may be worth it to write a test for each one, especially since we as programmers need to reason through each one, and the tests can help us do that.  You don't want to over test the code, and you definatly don't want to under test the code, so you have to use your best judgement as to what is the correct amount of coverage.  The best rule of thumb is to write as many tests as required to cover all of the logical conditions the code has to deal with.

