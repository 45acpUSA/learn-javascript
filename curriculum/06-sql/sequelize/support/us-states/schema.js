let Sequelize = require('sequelize')

let sequelize = new Sequelize( 'united_states', '','', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idel: 10000
  }
})

let UsState = sequelize.define('us_state', {
  name: {
    type: Sequelize.STRING
  },
  population: {
    type: Sequelize.INTEGER
  },
  bird: {
    type: Sequelize.INTEGER
  },
  tree: {
    type: Sequelize.STRING
  },
  mineral: {
    type: Sequelize.STRING
  }
})

let Person = sequelize.define('person', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
})

let City = sequelize.define('city',{
  name: {
    type: Sequelize.STRING
  },
})

UsState.belongsTo(Person, { as: 'governor', foreignKey: 'governorId' })

function createTables(){
  return new Promise(function(resolve, reject){
    resolve(Person.sync({force: true}))
  })
  .then(function(){
    return new Promise(function(resolve, reject){
      UsState.sync({force: true})
    })
  })
  .then(function(){
    return new Promise(function(resolve, reject){
      City.sync({force: true})
    })
  })
}

createTables()
  .then(function(){
    console.log('success, tables created')
  })
  .catch(function(error){
    console.log(error)
  })

