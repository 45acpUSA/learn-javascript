#creating a table with Sequelize

This Script creates a new table called 'my_countries' using Sequelize.  We first connect to the database, then define the model as normal.  Finally, we call ```MyCountry.sync()``` which creates the table, and sets up the fields according to the model definition.  Pretty neat!

```Javascript
let Sequelize = require('sequelize')

let sequelize = new Sequelize( 'countries', '','', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idel: 10000
  }
})


let MyCountry = sequelize.define('my_country',{
  code: {
    type: Sequelize.STRING
  
  },
  name: {
    type: Sequelize.STRING 
  },
  continent: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  }
})

MyCountry.sync({force: true})
  .then(function(){
    console.log('success!')
  })
  .catch(function(error){
    console.log(error)
  })
```
