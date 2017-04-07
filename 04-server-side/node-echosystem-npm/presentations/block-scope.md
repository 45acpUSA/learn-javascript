# Block Scope

## Scope Review
Remember back to the second week of class when we covered variable scope.  Variable scope means the section of code where a variable is visible, or 'in scope'.  When we define a variable inside of a function using `var` the variable is usable anywhere inside that function.  If we define a variable outside of any function, then it is in the 'global' scope.  We also talked about the special 'this' variable inside of Javascript Objects and lexical scope.  In this module, we're going to do a quick review, and then introduce one more type of scope that is new in ES6.  Create a new file and try some of these experiments:

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

## Introducing 'const'

`const` has block scope, just like `let`, with just one important difference.  When we define a variable with `const`, it is immutable (or unchangeable) for the life of the program.  If the program tries to change its value, then an exception is thrown and the program quits.  This is quite handy, and helps us to write bug free code.  It is also a great way for us to communicate with other developers what are intentions are.

```Javascript
// ./const-experiment.js
const favoriteFruit = 'bananas';
console.log(favoriteFruit);
favoriteFruit = 'apples';
```

```
$ node const-experiment.js
bananas
./const-experiment.js:3
favoriteFruit = 'apples';
              ^

TypeError: Assignment to constant variable.
...
```

That didn't work, and neither will attempting to redeclare a const variable with the same name

```Javascript
// ./const-experiment.js
const favoriteFruit = 'bananas';
console.log(favoriteFruit);
const favoriteFruit = 'apples'; //Nope! This throws an exception
```

One important note about `const`.  Its only the thing that is directly assigned to the const variable that must remain constant.  If we assign an array, or object to a `const` variable, we can change the attributes of that thing without issue.

```Javascript
// ./const-experiment.js
const favoriteFruits = ['apples', 'bananas', 'pears'];
console.log(favoriteFruits);
favoriteFruits.push("strawberries")
console.log(favoriteFruits);
```

```
$ node const-experiment.js
[ 'apples', 'bananas', 'pears' ]
[ 'apples', 'bananas', 'pears', 'strawberries' ]
```

