# From ES5 to ES6
ECMAScript is a programming language specification first developed by Netscape in 1995.  It is the specification that defines how Javascript should function as a language.  It has changed significantly since then, and continues to evolve today.  The community is currently in a transition from ES5 to the new, and greatly improved ES6, also known as ES2015.  It takes a few years for all of the web browsers to fully support a new language specification, which can add some interesting challenges to us as programmers if we are writing Javascript that needs to run in our users browsers, where we have little to no control over when they upgrade to the latest version that supports ES6.

Up to this point in the class, we've been working with ES5 to avoid these issues, because it is widely supported, and avoids the issue completely.  But, this is class is about your future as a web developer, and the future is ES6, so we're going to turn our focus to the new specification.  The next few sections of the course are focused on running Javascript on the server, where we as developers have more control over the environment our code runs in.  This is great news because it means that we can use a modern version of Node.js which has great support for the ES6 syntax.  As long as we are running a version of Node greater than 6.5, we're good to go.  

When it comes to ES6 vs. ES5, the improvements are substantial enough that developers are motivated to use it, even for code running in web browsers, and have developed tools to allow them to do so.  We'll be covering these tools, and making use of them when we're done looking at server side Javascript, and shift our attention back to React.  Stay tuned!

## Benefits of ES2015 / ES6
So why is ES6 so important?  Why are we committing to learn yet another language syntax when there is already so much ground that needs to be covered?  As already mentioned, it is the new standard, and will become ubiquitous over the next 2 year, so its worth learning now to stay ahead of that wave, but there is more.  ES6 fixes a lot of the long standing problems that existed in Javascript beforehand, helping us write less buggy code that is more concise and easier to read at the same time.  That's a lot of win.

The 4 major improvements in ES6 that we'll look into today are:
- Block Scope
- Classes
- Destructured Literals
- Text Interpolation 


# Block Scope

## Scope Review
Remember back to the first week of class when we covered variable scope.  Variable scope means the section of code where a variable is visible, or 'in scope'.  When we define a variable inside of a function using `var` the variable is usable anywhere inside that function.  That may seem obvious enough, but there is actually enough going on here that its worth diving down into the scope of our variables and understanding their scope.  Create a new file and try some of these experiments:

```Javascript
// ./block-scope-experiment.js

var globalColor = 'red';

function colorGetter(){
  console.log(globalColor);
}

colorGetter();
```

When we run that using the Node cli `node block-scope-experiment.js` we see that it prints out our color.

```
$ node block-scope-test.js
red
```

In this case, the variable `globalColor` is in the global scope because it is declared outside of any function.  We can use it anywhere.  

When we define a `var` variable inside of a function, it is scoped to that function only.  Try this:

```Javascript
// ./block-scope-experiment.js

function colorGetter(){
  var localColor = 'red';
  console.log("Inside the function: "+localColor);
}

colorGetter();
console.log("Outside the function: "+localColor);

```

```
$ node block-scope-experiment.js
Inside the function: red
./block-scope-experiment.js:10
console.log("Outside the function: "+localColor);
                                     ^

ReferenceError: localColor is not defined
  ...
```

That threw an error because `localColor` is not in the global scope.

## Introducing `let`
ES6 introduces a new scope called 'Block Scope'.  Try and run this code:

```Javascript
function iterator(){
  for(var i=0; i <= 3; i++){
    console.log(i);
  }
  
  console.log("I'm done with the loop, and i is: "+i);
}

iterator();
```

```
$ node block-scope-experiment.js
0
1
2
3
I'm done with the loop, and i is: 4
```

Notice that we can access the variable `i` outside the for loop.  At a minimum, that is some confusing code, and at worst will lead to bugs.  ES6 has a new keyword called `let` that we can use to change the scope of our variable.  Now try this:

```Javascript
function iterator(){
  for(let i=0; i <= 3; i++){
    console.log(i);
  }
  
  console.log("I'm done with the loop, and i is: "+i);
}

iterator();
```

```
$ node block-scope-experiment.js
0
1
2
3
./block-scope-experiment.js:8
  console.log("I'm done with the loop, and i is: "+i);
                                                   ^

ReferenceError: i is not defined
```

Another error!  This time however, its a good thing because we were trying to access an internal variable to the for loop after it had finished, which we likely didn't intend to do.

## What is a block exactly?

Lets do a few more experiments to understand exactly what a block is, and how it affects variable scope.  Try this:

```Javascript
var varColor = 'red';
let letColor = 'blue';
let anotherLetColor = 'green';

console.log('\nBefore the block\n================');
console.log("letColor:        "+letColor);
console.log("anotherLetColor: "+anotherLetColor);
console.log("varColor:        "+ varColor);

{
  let anotherLetColor = 'purple';
  var varColor = 'white';

  console.log('\nIn the block\n================');
  console.log("letColor:        "+letColor+"   <---- We can still access parent scope let inside the block");
  console.log("anotherLetColor: "+anotherLetColor+" <---- We've masked the let variable with a new one in our block");
  console.log("varColor:        "+ varColor);
}
console.log('\nAfter the block\n================');
console.log("letColor:        "+letColor);
console.log("anotherLetColor: "+anotherLetColor);
console.log("varColor:        "+ varColor+" <---- var has global scope, so this changed.");
```

# Classes

# Destructuring
  - function arguments
  - default arguments
  - named arguments 
- Template strings


# Text Interpolation
