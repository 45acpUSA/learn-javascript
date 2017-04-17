# Ensure Not Logged In

Just as we can ensure that a user is not logged into the app like we do for the '/secret' route, we can assure that the user is not logged in as well.  In our app, we want to do this on the '/login' and '/registration' pages.  If the user is logged in, we'll redirect them to the home page when they try to navigate there.

This may seem unnecessary at first, because who would ever go to a login page if they were already logged in, but its more common than you think.  Users often bookmark pages, so they can quickly get back to them later.  If they were to bookmark the login page, then we can safely assume that they mean to go to the homepage if they are already logged in.  

Along with ```ensureLoggedIn()```, the 'connect-ensure-login' module also provides ```ensureNoteLoggedIn()```.  We already required it in app.js back when we were were working on login, so just make sure its there.

```Javascript
// ./app.js

let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let session = require('express-session')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

// This is the one we want for making sure users aren't logged in before a route is rendered
let ensureNotLoggedIn = require('connect-ensure-login').ensureNotLoggedIn

let addUser = require('./stores/UserStore').addUser
let findByEmail = require('./stores/UserStore').findByEmail
let doPasswordsMatch = require('./stores/UserStore').doPasswordsMatch
```

It works similarily to ```ensureLoggedIn()``` so we just need to add it to our protected routes:

```Javascript
// ./app.js

app.get('/login', 
  ensureNotLoggedIn('/'),
  (request, response)=>{
    response.render('login') 
  })

app.get('/register', 
  ensureNotLoggedIn('/'),
  (request, response)=>{
    response.render('register')
  })
```

## Final touches

At this point, we've completed nearly everything we set out to do in the requirements layout out in the '01-passport' module.  Go back and review those requirements now.

Looks like there is one thing still missing.  We need to add a link to the homepage if the user is logged in.

```HTML
<!-- ./vies/homepage.ejs -->

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

