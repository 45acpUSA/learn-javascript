'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Contact.hasMany(models.Phone,{
          foreignKey: 'contactId',
          as: 'phones'
        })
      }
    }
  });
  return Contact;
};
