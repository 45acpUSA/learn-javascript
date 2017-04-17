# User Data

Once we have logged a user in, we have access to all of the data that we store for them.  In the Routes, we access it on the request by looking at the user attribute that Passport sets for us in middleware, but it is not directly accessible in the view.

## User in the routes
Let's take a look at accessing the user from the routes first

```Javascript
// ./app.js

app.get('/', 
  (request, response)=>{
    // homepage is not required to be logged in, so we may not have user
    if(request.user){
      console.log(request.user.name)
    }
    response.send("Homepage")
  })
```

We could even assign it to the local values, and show it in the view:

```Javascript
// ./app.js

app.get('/', 
  (request, response)=>{
    response.render('homepage', { currentUser: request.user })
  })
```

And we add a template for the homepage:

```HTML
<!-- ./views/homepage.ejb -->

<h1>Welcome</h1>

<% if(typeof currentUser != 'undefined'){ %>
  Its nice that you are here <%= currentUser.name %>
<% } %>
```

## User data in the layouts (using middleware)

Most of the time we'll want access to the current user (or lack of a current user) in the layout as well.  We could set a local variable as we just did for the homepage in every route in our application, but that would be tedious, and lead to a lot of duplicated code.  Instead, we can add Middleware to do it for us:

In app.js, after passport and the session are set up, we add one final one to assign the user:

```Javascript
// ./app.js
app.use(passport.initialize())
app.use(passport.session())

app.use(function(request, response, next){
  response.locals.currentUser = request.user
  next()
})
```

Then we can remove the local assignment from the homepage route, and everything still works:

```Javascript
// ./app.js

app.get('/', 
  (request, response)=>{
    response.render('homepage')
  })
```

![welcome matt](https://s3.amazonaws.com/learn-site/curriculum/welcom-matt.png)

## Login / Logout Link

Now we're all set to add a login, or logout link to the header of the application.  The layout has access to the currentUser because of the work we've done setting it in middleware

Open the layout file, and add the appropriate link

```HTML
<!-- ./views/layout.ejs -->

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

# Secret page

Similarity, we're ready to add the user details to the '/secret' page.  Notice here that there is no reason to check if the user is logged in here, because the route is already protected by ```ensureLoggedIn()```

```HTML
<!-- ./views/secure.ejs -->

<h1>Secret</h1>
<a href='/'>Home</a>
<dl>
  <dt>Name</dt>
  <da><%= currentUser.name %></da>
  
  <dt>Email</dt>
  <da><%= currentUser.email %></da>
</dl>
```
