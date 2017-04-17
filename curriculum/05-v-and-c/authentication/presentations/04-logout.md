# Logout

Logging out of an application is a universally familiar concept.  We log out, and we can no longer access the protected pages.  But what actually happens behind the scenes on a server to make sure that the user needs to log in again to see private information?  In short, it means that the server has destroyed the users session, and marked the cookie to be deleted.  Both of those things must exist for a user to be logged in, so the user is logged out.

With Express, we have a method to handle both actions in one call.  Let's setup a '/logout' route with it:

```Javascript
app.get('/logout',
  function(request, response){
    request.logout()
    response.redirect('/')
  })
```

We can add a view with a link to the logout route on the '/secret' route to test it out:

```HTML
<!-- ./views/secret.ejb -->

<h1>Secret</h1>
<a href='/logout'>Logout</a>
```

And update the secret route to use it:

```Javascript
// ./app.js

app.get('/secret', 
  ensureLoggedIn('/'),
  (request, response)=>{
    response.render('secret')
  })
```

