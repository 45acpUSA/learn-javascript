let Sequelize = require('sequelize')
let psqlConnection = require('./sequelize-connection')
let Contact = require('./contact')

let Phone = psqlConnection.define('phone', {
  number:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  }
},{
  classMethods:{
    associate: function(models){
      Phone.belongsTo(models.Contact)
    }
  }
})

module.exports = Phone
