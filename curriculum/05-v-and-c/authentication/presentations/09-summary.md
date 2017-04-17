# Summary

In this section, we built an end to end application complete with user login.  Our completed application files look like this:

![File Structure](https://s3.amazonaws.com/learn-site/curriculum/auth-example-structure.png)

# Files

### ./app.js
```Javascript
let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let session = require('express-session')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
let ensureNotLoggedIn = require('connect-ensure-login').ensureNotLoggedIn

let addUser = require('./stores/UserStore').addUser
let findByEmail = require('./stores/UserStore').findByEmail
let doPasswordsMatch = require('./stores/UserStore').doPasswordsMatch

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    let user = findByEmail(email)
    if(user && doPasswordsMatch(password,user.password)){
      return done(null, user)
    }else{
      return done(null, false)
    }
  }
))

passport.serializeUser(function(user, callback) {
  callback(null, user.email);
});

passport.deserializeUser(function(email, callback) {
  let user = findByEmail(email)
  callback(null, user)
});

let app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(request, response, next){
  response.locals.currentUser = request.user
  next()
})

app.get('/', 
  (request, response)=>{
    response.render('homepage')
  })

app.get('/secret', 
  ensureLoggedIn('/'),
  (request, response)=>{
    response.render('secret')
  })

app.get('/login', 
  ensureNotLoggedIn('/'),
  (request, response)=>{
    response.render('login') 
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (request, response)=>{
    response.redirect('/secret');
  });

app.get('/logout',
  function(request, response){
    request.logout()
    response.redirect('/')
  })

app.get('/register', 
  ensureNotLoggedIn('/'),
  (request, response)=>{
    response.render('register')
  })

app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
  
    let addResponse = addUser(userAttributes) // true or array of errors
    if(addResponse == true){
      request.login(userAttributes, (error)=>{
        if(error){
          response.render('register', { 'errors': error })
        }else{
          response.redirect('/secret') 
        }
      })
    }else{
      response.render('register', { 'errors': addResponse })
    }
  })

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
})
```

### ./package.json
```Jaascript
{
  "name": "registration",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.1",
    "connect-ensure-login": "^0.1.1",
    "ejs": "^2.5.6",
    "express": "^4.15.2",
    "express-ejs-layouts": "^2.3.0",
    "express-session": "^1.15.2",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0"
  }
}
```

### user-data.json
```Javascript
[]
```

## Stores
### ./stores/UserStore.js

```Javascript
let fs = require('fs')
let bcrypt = require('bcrypt')

module.exports.addUser = function(userAttributes){
  let invalidCheck = userIsInvalid(userAttributes)
  if(invalidCheck == false ){
    //encrypt password
    userAttributes.password = encryptPassword(userAttributes.password)

    let users = userData()
    users.push(userAttributes)
    save(users)
    return true
  }else{
    return invalidCheck  
  }
}

module.exports.doPasswordsMatch = function(userSuppliedPassword, encryptedPassword){
  return bcrypt.compareSync(userSuppliedPassword, encryptedPassword)
}

function encryptPassword(password, callback){
  return bcrypt.hashSync(password, 5)
}

function findByEmail(email){
  let users = userData()
  let user = users.find(function(user){
    return user.email == email
  })
  return user
}
module.exports.findByEmail = findByEmail 


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

### ./views/homepage.ejs

```HTML
<h1>Welcome</h1>

<% if(typeof currentUser != 'undefined'){ %>
  Its nice that you are here <%= currentUser.name %>
<% } %>

<% if(typeof currentUser != 'undefined'){ %>
  <div>
    <h3>Links</h3>
    <a href='/secret'>About You</a>
  </div>
<% } %>
```

### ./views/layout.ejs

```HTML
<html>
  <head>
  </head>
  <body>
    <div id='user-session-management'>
      <% if(typeof currentUser != 'undefined'){ %>
        <a href='/logout'>Logout</a>
      <% }else{ %>
        <a href='/login'>Login</a>
      <% } %>
    </div>
    <%- body %> 
  </body>
</html>
```

### ./views/login.ejs
```HTML
<h1>Please Login</h1>
<form action='/login' method='POST'>
  <div>
    <label>Email</label>
    <br />
    <input type='text' name='email' />
  </div>
  <div>
    <label>Password</label>
    <br />
    <input type='password' name='password' />
  </div>
  <div>
    <input type='submit' value='Login' />
  </div>

  <br />
  <div>
    Or, <a href='/register'>create an account.</a>
  </div>
</form>
```

### ./views/register.ejs
```HTML
<h1>Please Create an Account</h1>
<% if(typeof errors != 'undefined'){ %>
  <h4>There were some problems</h4>
  <ul>
    <% for(let index in errors){ %>
      <li><%= errors[index] %></li> 
    <% } %>
  </ul>
<% } %>
<form action='/register' method='POST'>
  <div>
    <label>Name</label>
    <br />
    <input type='text' name='name' />
  </div>
  <div>
    <label>Email</label>
    <br />
    <input type='text' name='email' />
  </div>
  <div>
    <label>Password</label>
    <br />
    <input type='password' name='password' />
  </div>
  <div>
    <input type='submit' value='Create Account' />
  </div>
</form>
<div>
  Or, <a href='/login'>Login</a>
</div>
```

### .views/secret.ejs
```HTML
<h1>Secret</h1>
<a href='/'>Home</a>
<dl>
  <dt>Name</dt>
  <da><%= currentUser.name %></da>
  
  <dt>Email</dt>
  <da><%= currentUser.email %></da>
</dl>
```

