



mkdir super-man-server
cd super-man-server
node init
cat package.json






const today = new Date()
console.log("Today is", today)

Today is 2017-01-28T21:28:10.001Z




var foo = 'bananas'
let bar = 'grapes'

function fruitSalad(){
  console.log("I'd like some", foo, "and", bar)
}
fruitSalad()


function mixer(){
  for(let i = 0; i < 3; i++){
    console.log("adding banana piece", i)
  }
  //console.log("added", i, "banana pieces")
  //otherwise: ReferenceError: i is not defined

  for(var n=0; n < 3; n++){
    console.log("adding orange slice", n)
  }
  console.log("added", n, "orange slices")
}

mixer()

adding banana piece 0
adding banana piece 1
adding banana piece 2
adding orange slice 0
adding orange slice 1
adding orange slice 2
added 3 orange slices


const fruit = 'bananas'
//foo = 'grapes'
//otherwise: TypeError: Assignment to constant variable.

function washer(fruit){
  fruit = 'blueberries'
  //No problem here, washer is a new scope, and fruit can be re-assigned
  console.log('washed', fruit)
}

washer(fruit)

washed blueberries


const vegetable = 'tomato'
const legume = 'pinto'

for(let i=0; i < 2; i++){
  const vegetable = 'squash'
  console.log(vegetable, "are good for us!")
  //No problem here.  Each time for loop enters a new iteration,
  //a new block scope is created, and a new const 'vegetable' is created.

  //var legume = 'black eyed peas'
  //otherwise: SyntaxError: Identifier 'legume' has already been declared
  //we can't assign a var variable with the same name as the const in the 
  //containing scope, because the var variable 'legume' gets hoisted out of
  //the for loops block scope, and into the global scope.  This reassigns
  //the global legume, and is an error
}

console.log(vegetable, "is good for us")
console.log(legume, "is tasty too")

squash are good for us!
squash are good for us!
tomato is good for us
pinto is tasty too



const vegetable = {
  name: 'carrot',
  color: 'orange',
  vitaminAMiligrams: 110,
  recomendedServings: 2
}

console.log("original", vegetable)

vegetable.recomendedServings = 6

console.log("modified", vegetable)

//We can even add attributes to a JavaScript object
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
