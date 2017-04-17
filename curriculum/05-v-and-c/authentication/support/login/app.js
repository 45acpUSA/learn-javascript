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

app.get('/', 
  (request, response)=>{
    response.send("Homepage")
  })

app.get('/secret', 
  ensureLoggedIn('/'),
  (request, response)=>{
    response.render('secret')
  })

app.get('/login', 
  //ensureNotLoggedIn('/'),
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

