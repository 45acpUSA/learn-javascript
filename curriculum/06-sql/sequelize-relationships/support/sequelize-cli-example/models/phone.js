'use strict';
module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define('Phone', {
    number: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Phone.belongsTo(models.Contact,{
          foreignKey: 'todoId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Phone;
};
