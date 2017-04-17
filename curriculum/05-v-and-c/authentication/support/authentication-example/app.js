let express = require('express')
let expressLayouts = require('express-ejs-layouts')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let findUserById = require('./user-store').findByUserId
let findUserByEmail = require('./user-store').findUserByEmail
let session = require('express-session')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
let ensureNotLoggedIn = require('connect-ensure-login').ensureNotLoggedIn

// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `request.user` in route handlers after authentication.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    let user = findUserByEmail(email)
    if(user && password == 'secret'){
      return done(null, user)
    }else{
      return done(null, false)
    }
  }
))

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

passport.serializeUser(function(user, callback) {
  callback(null, user.email);
});

passport.deserializeUser(function(email, callback) {
  let user = findUserByEmail(email)
  callback(null, user)
});

app = express()
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(request, response, next){
  response.locals.user = request.user
  next()
})

app.get('/', 
  function(request, response){
    response.render('home')
  })

app.get('/secret', 
  ensureLoggedIn('/login'),
  function(request, response){
    response.render('secret', { user: request.user })
  })

app.get('/login', 
  ensureNotLoggedIn('/'),
  function(request, response){
    response.render('login') 
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(request, response) {
    response.redirect('/secret');
  });

app.get('/logout',
  function(request, response){
    request.logout()
    response.redirect('/')
  })

app.get('/register', 
  ensureNotLoggedIn('/'),
  function(request, response){
    response.render('login') 
  })

app.post('/register',
  function(request, response) {
    //response.redirect('/secret');
  });


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});



