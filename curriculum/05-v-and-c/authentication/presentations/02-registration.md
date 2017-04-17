# Registration
We could start building the app with any of the 7 routes laid out in our architecture, but registration is a particularly good place to start because without registration, we don't have a way to create users, and without users, we can't log in, and if we can't log in, we can't show the secret page.  So starting with registration it is.

## Breaking down the problem even further
We're going to work on the registration form, and ignore logging the user in after registration.

One of the requirements we'll need to tackle is to log in a user when they register.  That task adds quite a bit of complexity to registration, and feels more related to login.  Let's ignore it for now while we work on registration, and remember to re-visit it after we get login working.  That helps us focus on getting the registration part working, a smaller part of the problem.

  It is very useful as a developer to look at the application you are building and look for ways to carve out functionality to work on that is small, and something that can be completed end to end.  There's no single answer on how small to breakup a problem into, though there is a rule of thumb.  Each piece you work on should deliver benefit to the user directly.  In this case, we've identified two discrete pieces of functionality that the user will enjoy:
  * Ability to register an account
  * Ease of being logged in after registration

## create an app

Time to create a new app to work with, and some NPM modules we're going to need.

```
$ mkdir authentication-example
$ cd authentication-example 
$ npm init
$ npm install express ejs express-ejs-layouts body-parser
```

Our layout (./views/layout.ejs):

```HTML
<html>
  <head>
  </head>
  <body>
    <%- body %> 
  </body>
</html>
```

Our registration form (./views/register.js):

```HTML
```

Now we turn our attention to app.js, and set it up with ejs, and to use the layout

```Javascript
// ./app.js

var express = require('express');
var expressLayouts = require('express-ejs-layouts')

var app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/register', 
  (request, response)=>{
    response.render('register')
  })

app.post('/register',
  (request, response)=>{
    //create account based on user input
    response.redirect('/register')  //just for now
  })

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
})
```

## Store registration data

Let's store the user data in a flat JSON file until we are working with databases next week.  Create a new file called 'user-data.json', with the contents

```
[]
```
This is an empty array to start our data file off with.

Now well create a new file that allows us to easily manage data in the user store.  This is where we'll keep all the functions that read and write to the file.  Call it './stores/UserStore.js'

```Javascript
// ./UserStore.js

let fs = require('fs')

module.exports.addUser = function(userAttributes){
  let users = userData()
  users.push(userAttributes)
  save(users)
}

function userData(){
  let data = fs.readFileSync('./user-data.json','utf-8')
  return JSON.parse(data)
}

function save(users){
  fs.writeFileSync('./user-data.json', JSON.stringify(users))
}
```

In app.js, we require the new UserStore, and use it to save our data.

```Javascript
let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let addUser = require('./stores/UserStore').addUser

let app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/register', 
  (request, response)=>{
    response.render('register')
  })

app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
    addUser(userAttributes)
    response.redirect('/register')  //just for now
  })

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
})
```

Restart the application, and after submitting the Registration form, we check to see that it is populated with data:

```
[{"name":"Matt","email":"matt@notch8.com","password":"password"}]
```

That looks like we're on the right track.  Notice that the password is being stored in plain text.  This is very insecure, and we would never want to launch a real application like this.  Its another thing to add to the todo list.  Once we get login working, we'll come back to how to encrypt passwords.

## Data Validation

There is one more thing we should take care of before we move on from registration.  Currently, the app allows users to register with the same email as many times as they like.  They can also register without filling in a password, or even an email.  This isn't a good situation, and users who made such a mistake would not have a good experience.  Lets add some validations to make sure that users can't enter bad data.  We'll also need to update our view to let the user know what the errors are if they make any.

Starting in ./stores/UserStore.js, we can update ```addUser()``` to report failures if the new user data isn't valid.

```Javascript
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
```

Then in app.js, we need to handle errors if we get any back from adding a user

```Javascript
app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
  
    let addResponse = addUser(userAttributes) // true or array of errors
    if(addResponse == true){
      response.redirect('/register')  //just for now
    }else{
      response.render('register', { 'errors': addResponse })
    }
  })
```

The last thing to do before we leave registration for now is to redirect to the correct spot after a successful registration.  Let's add a simple homepage, and update ```app.post('/register', ..)``` to point there.

Here's the complete app.js

```Javascript
let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let addUser = require('./stores/UserStore').addUser

let app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', 
  (request, response)=>{
    response.send("Homepage")
  })

app.get('/register', 
  (request, response)=>{
    response.render('register')
  })

app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
  
    let addResponse = addUser(userAttributes) // true or array of errors
    if(addResponse == true){
      response.redirect('/') 
    }else{
      response.render('register', { 'errors': addResponse })
    }
  })

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
})
```

