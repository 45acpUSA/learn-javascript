let fs = require('fs')

module.exports.addUser = function(userAttributes){
  let invalidCheck = userIsInvalid(userAttributes)
  if(invalidCheck == false ){
    let users = userData()
    users.push(userAttributes)
    save(users)
    return true
  }else{
    return invalidCheck  
  }
}

function userData(){
  let data = fs.readFileSync('./user-data.json','utf-8')
  return JSON.parse(data)
}

function userIsInvalid(userAttributes){
  //check to see that required values are filled in
  let requiredErrors = requiredFieldErrors(userAttributes)

  //check to see that email does not already exist
  let unqErrors = uniqueErrors(userAttributes)

  let errors = requiredErrors.concat(unqErrors)

  if(errors.length == 0){
    return false
  }else{
    return errors
  }
}

function requiredFieldErrors(userAttributes){
  let errors = []
  if(!userAttributes.name){
    errors.push("Missing name")
  }

  if(!userAttributes.email){
    errors.push("Missing email")
  }

  if(!userAttributes.password){
    errors.push("Missing password")
  }

  return errors
}

function uniqueErrors(userAttributes){
  let user = findByEmail(userAttributes.email)
  if(user){
    return ["Email already exists"] 
  }
}

function findByEmail(email){
  let users = userData()
  let user = users.find(function(user){
    return user.email == email
  })
  return user
}

function save(users){
  fs.writeFileSync('./user-data.json', JSON.stringify(users))
}
