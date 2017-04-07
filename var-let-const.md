In ES5, there is just one variable keyword, 'var'.  Every variable
declared using var was confined to its lexical scope.  If a programmer
left off the word var, and just declared a variable like this:

```Javascript
foo = "bananas"
```

then that variable ('foo' in this case) would be in the global scope, and
visible to all other scopes.

ES6 introduces two new types of variable declarations that are very
useful.  They use the keywords 'let' and 'const'.  We'll look at each of
them individually, starting with 'let'. 

###Let 

At first glance, 'let' and
'var' look very similar.  If we declare a variable in the global scope,
they behave in exactly the same way.

```Javascript
var foo = 'bananas'
let bar = 'grapes'

function fruitSalad(){
  console.log("I'd like some", foo, "and", bar)
}

fruitSalad()

Output:
-------------------------
I'd like some bananas and grapes
```

The difference between 'let' and 'var' is how they are scoped.  'Var' has
a function scope, and 'let' a block scope.  This means that a 'var'
variable is visible anywhere within the function that defines it, and
'let' variables are contained by their surrounding block.

```Javascript
function mixer(){
  for(let i = 0; i < 3; i++){
    console.log("adding banana piece", i)
  }
  //console.log("added", i, "banana pieces")
  //ReferenceError: i is not defined

  for(var n=0; n < 3; n++){
    console.log("adding orange slice", n)
  }
  console.log("added", n, "orange slices")
  //No problem here, var variables are in the function 
  //scope.  This is sometimes refered to as 'hoisting'
  //the variable from the block scope (in this case, the 
  //for loop), into the function scope.
}

mixer()

Output:
-------------------------
adding banana piece 0
adding banana piece 1
adding banana piece 2
adding orange slice 0
adding orange slice 1
adding orange slice 2
added 3 orange slices
````

Getting greater control over the scope of our variables is very useful,
and helps us write code with less bugs.  When we start writing code that
uses more advanced structures like closures, we'll appreciate the control
that let gives us even more.

###Const

Const is the third type of variable that we can declare in ES6, and as its name
implies, its useful for declaring things that we as programmers don't want to
get reassigned.  Its very helpful for programmers who read our code sometime
years from now to understand the intent of our program and that we meant
this variable to be exactly what it is, and to stay that way.  Const
variables are like let variables, in that they have block scope.  Lets
look at some of the behaviors of const.

```Javascript
const fruit = 'bananas'
//foo = 'grapes'
//TypeError: Assignment to constant variable.

function washer(fruit){
  fruit = 'blueberries'
  //No problem here, washer is a new scope, and fruit can be re-assigned
  console.log('washed', fruit)
}

washer(fruit)

Output:
-------------------------
washed blueberries
```

More behavior for const variables

```Javascript
const vegetable = 'tomato'
const legume = 'pinto'

for(let i=0; i < 2; i++){
  const vegetable = 'squash'
  console.log(vegetable, "is good for us!")
  //No problem here.  Each time for loop enters a new iteration,
  //a new block scope is created, and a new const 'vegetable' is created.

  //var legume = 'black eyed peas'
  //SyntaxError: Identifier 'legume' has already been declared
  //we can't assign a var variable with the same name as the const in the 
  //containing scope, because the var variable 'legume' gets hoisted out of
  //the for loops block scope, and into the global scope.  This reassigns
  //the global legume, and is an error
}

console.log(vegetable, "is good for us")
console.log(legume, "is tasty too")

Output:
-------------------------
squash is good for us!
squash is good for us!
tomato is good for us
pinto is tasty too
````

Const creates variables that are called 'immutable', meaning that their
value can not be changed.  An interesting thing to note however, is that
the thing assigned to that variable is not immutable, and can be modified.
If we were to assign a json object to a constant variable, for example, we
could assign and re-assign the attributes of that object without any
issue.

```Javascript
const vegetable = {
  name: 'carrot',
  color: 'orange',
  vitaminAMiligrams: 110,
  recomendedServings: 2
}

console.log("original", vegetable)

vegetable.recomendedServings = 6

console.log("modified", vegetable)

//We can even add attributes to a Const JavaScript object
vegetable.shelfLife = "36 days"

console.log("amended", vegetable)


output
------------------
original { name: 'carrot',
  color: 'orange',
  vitaminAMiligrams: 110,
  recomendedServings: 2 }
modified { name: 'carrot',
  color: 'orange',
  vitaminAMiligrams: 110,
  recomendedServings: 6 }
amended { name: 'carrot',
  color: 'orange',
  vitaminAMiligrams: 110,
  recomendedServings: 6,
  shelfLife: '36 days' }
```
