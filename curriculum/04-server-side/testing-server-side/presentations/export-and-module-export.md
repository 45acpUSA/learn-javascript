# Node's export and module.export

Often, we need access to the code stored in one file for use in another file.  In the 'Build a Webserver' example yesterday, you may recall the line at the very top of the file:

```Javascript
let http = require('http')
```
Further down in the file, we used the ```http``` object to build the webserver.  This line is telling the program that we want to use the http server that is included in Node's standard library.  That code acutally lives somewhere in your local Node instalation, and Node knows how to access it.  We can require any file we like into our programs, including files that we write ourselves, which makes the export/require duo a powerful way to organize our code.

Let's return to our counter function again, and imagine that we now have need to use that function in several different places in our application.  In order to do that easily, we want to pull it out into its own module that can be included anywhere we like.

For this example, we'll create a new project in a directory called 'export-example'.

```
$ mkdir export-example
$ cd export-example
```

Our first try at the marbles game looks like this:

```Javascript
// ./marbles.js

function reportMarbleCount(count){
  console.log("My marble count is now", count)
}

function createNewCounter() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
    decrease: function() { value--; }
  }
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
```

This works, and our marble counting application is wildly successful, it gets mentioned in the New York Times, and soon our boss is wanting to expand into other products.  She comes to your desk, and tells you that the company intends to release a new "Jacks counter" application and asks if you can code something up.  "Sure", you say, no problem because most of the functionality is the same.  Should be simple enough.  But, you don't want to duplicate the code, so you need to pull the common parts out to a new library to be used in both.  ```module.exports``` to the rescue!  Let's create a new file called counter.js with the common code.

```Javascript
//exports is a special object available in Node application that makes code available through 'require' statements in other files
exports.createNewCounter = function() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
    decrease: function() { value--; }
  }
}

```

And now, we can update the original ```marbles.js``` file to use the new counter module

```Javascript
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

```

Everything still works as expected, and better still, we can reuse the 'createNewCounter()' function in our new "Jumpin' Jacks" application

```Javascript
// ./jumpin-jacks.js

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
```

Your application ships, and your company is instantly rocketed to the top of the Forbe's top 100 new companies of the year.  You get a huge promotion, and are event knighted by the queen of England.  All because you know secrets of Node's module.export and how to reuse your code among different applications.  Well done!
