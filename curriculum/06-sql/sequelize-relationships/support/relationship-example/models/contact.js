let Sequelize = require('sequelize')
let psqlConnection = require('./sequelize-connection')
let Phone = require('./phone')

let Contact = psqlConnection.define('contact', {
  name:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  dob:{
    type: Sequelize.DATE
  }
},{
  classMethods:{
    associate: function(models){
      Contact.hasMany(models.Phone)
    }
  }
})
module.exports = Contact
