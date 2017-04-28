function userLookup(index){
  let users = [
    {
      name: 'Bob',
      age: 37 
    },
    {
      name: 'Mary',
      age: 7
    },
    {
      name: 'Enoch',
      age: undefined
    }
  ]

  return new Promise(function(resolve, reject){
    let selectedUser = users[index]

    if(selectedUser){
      resolve(selectedUser)
    }else{
      reject("Could not resolve user") 
    }
  })
}

function ageDescriptor(user){
  if(user.age){
    if(user.age < 18){
      var descriptor = "a minor"
    }else{
      var descriptor = "an adult"
    }
  }
  
  return new Promise(function(resolve, reject){
    if(!user.name){
      reject("No user name found")
    } else if(!descriptor){
      reject("Could not describe age for " + user.name)
    }else{
      resolve(user.name + " is " + descriptor)
    }
  })
}

//userLookup(1).then(function(user){
//  console.log("Found " + user.name)
//}).catch(function(error){
//  console.log("Error: " + error)
//})

//userLookup(2341).then(function(user){
//  console.log("Found " + user.name)
//}).catch(function(error){
//  console.log("Error: " + error)
//})

//ageDescriptor({name: 'Phil', age: 17}).then(function(description){
//  console.log(description)
//}).catch(function(error){
//  console.log("Error: " + error)
//})

//ageDescriptor({age: 17}).then(function(description){
//  console.log(description)
//}).catch(function(error){
//  console.log("Error: " + error)
//})


//userLookup(0).then(function(user){
//  return ageDescriptor(user)
//}).then(function(description){
//  console.log(description)
//}).catch(function(error){
//  console.log("Error: " + error)
//})

//userLookup(1).then(function(user){
  //return ageDescriptor(user)
//}).then(function(description){
  //console.log(description)
//}).catch(function(error){
  //console.log("Error: " + error)
//})

//userLookup(2).then(function(user){
//  return ageDescriptor(user)
//}).then(function(description){
//  console.log(description)
//}).catch(function(error){
//  console.log("Error: " + error)
//})

//userLookup(3).then(function(user){
  //return ageDescriptor(user)
//}).then(function(description){
  //console.log(description)
//}).catch(function(error){
  //console.log("Error: " + error)
//})

function descriptionForUser(index){
  return userLookup(index).then(function(user){
    return ageDescriptor(user)
  })
}

Promise.all([descriptionForUser(0), descriptionForUser(1)]).then(function(descriptions){
  descriptions.forEach(function(description){
    console.log(description)
  })
}).catch(function(error){
  console.log(error)
})
