# Login

So no that we have registration handled, and there are users in our data store, we can turn our attention to allowing users to log in.

First, lets add a simplified secret route.  We'll come back to finish this page off later on

```Javascript
// ./app.js

// add this route
app.get('/secret', 
  (request, response)=>{
    response.send('secret page')
  })
```

Now we can add a template for our login page

In 'views/login.ejs':

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

While we're at it, lets update './vies/register.ejs' file to have a link back to login

Then, back in app.js we need to make two new routes for login:

```Javascript
app.get('/login', 
  (request, response)=>{
    response.render('login') 
  })

app.post('/login',
  (request, response)=>{
    response.redirect('/secret');
  });
```

Even though, we haven't added any code to actually log the user in, we can navigate our browser to 'localhost:3000/login' and verify that the form exists, we can submit it, and we are redirected to '/secret'


## Passport

Remember that when we first talked about login, we discovered that the result of logging in is that the user has a session created for them which persists across multiple page views.  We're ready to add the NPM module 'passport' to our application to manage the user session for us.  Passport will likely seem quite complicated at first.  Just remember that its middleware, like all the other middleware we've looked at so far.  It operates on the response and request, before passing them along to the next middleware, and eventually our route.

There are more than 300 different ways an application can verify a user with Passport.  Username and Password is just one, and is refered to as "Local Strategey".  If you wanted your app to allow users to login using Github, Facebook, Twitter, or LinkedIn, you would add a strategy to Passport to support that.

[Read more about Passport and its strategies here](http://passportjs.org/)

We're going to need 3 new NPM modules in our application for authentication.  Let's add the now

```
$ npm install express-session passport passport-local connect-ensure-login --save
```

And then, in app.js, we require the necessary modules:

```Javascript
let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')

//the next for load the modules we need
let session = require('express-session')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
let ensureNotLoggedIn = require('connect-ensure-login').ensureNotLoggedIn

let addUser = require('./stores/UserStore').addUser
...
```

## Creating a user session

Passport has a method called ```passport.authenticate('local')``` that we'll use to create the user session for us.  First though, we need to do some configuration so Passport knows how to go about setting the session up.

The Comments come straight from the Passport source code, and are very helpful

The next sections of code go just above the ```app=express()``` line in app.js

```
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `request.user` in route handlers after authentication.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    //.... do something to validate and find user, then call done()
  }
))
```
This is the main configuration for Passport, and the 'verify' function that will be called when we ask Passport to authenticate a users login request.  We set the name of the username and password fields that will come in as part of the params on the request.

Passport will pass email, password, and a callback to the verify function so that we can verify that they are good credentials, and find the proper user.  Let's take another look at that function, this time with an eye to how we might verify the request, and lookup the user:

```Javascript
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){

    //We'll have to write findUserByEmail() ourselves
    let user = findUserByEmail(email) 

    //verify email found a user, and the password is correct
    if(user && password == user.password){

      //if so, we call done with the new user
      return done(null, user)
    }else{

      //if not, return false
      return done(null, false)
    }
  }
))

```

So how do we lookup the user by their email? We don't have any methods exported by our UserStore yet to do that, but we did so something very similar when checking uniqueness of an email during registration.  Let's start there.  Recall this method in UserStore:

```Javascript
// ./stores/UserStore.js

function findByEmail(email){
  let users = userData()
  let user = users.find(function(user){
    return user.email == email
  })
  return user
}
```

That does about exactly what we want, so we can export it, and require it in app.js for use

```Javascript
// ./stores/UserStore.js

function findByEmail(email){
  let users = userData()
  let user = users.find(function(user){
    return user.email == email
  })
  return user
}
module.exports.findByEmail = findByEmail 
```

If we leave it defined as a local method to the file, and export it on its own line, it will remain reachable from both inside and outside the UserStore.js file.

Back in app.js, we require it up near the top of the file:

```Javascript
// ./app.js

let addUser = require('./stores/UserStore').addUser
let findByEmail = require('./stores/UserStore').findByEmail
```

## Setting up the Session

Recall that Sessions and cookies are related, but sessions aren't stored in the cookie itself.  Only a unique key for the session is in the cooke then, via middleware, the session is looked up from a data store based on the key.  We need to tell passport how to handle that based on our application.  In our case, we'll use the users email as a unique identifier.

We add this directly after the LocalStrategy setup:

```Javascript
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

passport.serializeUser(function(user, callback) {
  callback(null, user.email);
});

passport.deserializeUser(function(email, callback) {
  let user = findByEmail(email)
  callback(null, user)
});
```

Finally, we need to setup our application to use Passport, and Sessions.  We add the following configuration to app.js

```Javascript
// ./app.js

let app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))

// here is the new part for Passport and sessions
app.use(session({
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
}))
app.use(passport.initialize())
app.use(passport.session())
```

## Authenticating the User

We've added a lot of new code to the app, and haven't seen much change in the behavior of the application.  Users can still log in with any credientials the like and be directed to the '/secret' page.  Its time to add some middleware to the login route that authenticates the user's login request.  Recall the login route, and the secret route:

```Javascript
app.get('/secret', 
  (request, response)=>{
    response.send('secret page')
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (request, response)=>{
    response.redirect('/secret');
  });
```

Update them to use inline middleware, authenticating the request, and ensuring a logged in user

```Javascript
app.get('/secret', 
  ensureLoggedIn('/'), // takes are path to redirect to if not logged in
  (request, response)=>{
    response.send('secret page')
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }), middleware that calls our 'verify()' method
  (request, response)=>{
    response.redirect('/secret');
  });
```

Payoff for all that work!  We can now log in, and are redirected to the '/secret' page.  If we're not logged in, and we go to the '/secret' page, we get redirected back to the home page.
