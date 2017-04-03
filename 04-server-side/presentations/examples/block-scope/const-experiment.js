// ./const-experiment.js

const favoriteFruits = ['apples', 'bananas', 'pears'];
console.log('global scope\n=============');
console.log(favoriteFruits);

{
  const favoriteFruits = ['blueberries', 'raspberries'];

  console.log('\nfirst block scope\n================');
  console.log(favoriteFruits);
}

{
  console.log('\nsecond block scope\n================');
  favoriteFruits.push('oranges');
  console.log(favoriteFruits);
}

console.log('\nglobal scope again\n==================')
console.log(favoriteFruits);
