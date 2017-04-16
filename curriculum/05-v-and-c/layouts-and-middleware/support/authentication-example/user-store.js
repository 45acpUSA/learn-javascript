let fs = require('fs')

module.exports.findUserById = function(id){
  let users = userData()
  let user = users.find(function(user){
    return user.id == id
  })

  //returns null if user is not found
  return user
}

module.exports.findUserByEmail = function(email){
  let users = userData()
  let user = users.find(function(user){
    return user.email == email
  })

  //returns null if user is not found
  return user

}

function userData(){
  let data = fs.readFileSync('./user-data.json','utf-8')
  return JSON.parse(data)
}
