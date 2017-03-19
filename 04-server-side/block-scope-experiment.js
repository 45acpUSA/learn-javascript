// ./block-scope-experiment.js

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
