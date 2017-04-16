# Cookies and Sessions

Every request that a server receives is independent from every other request that comes in.  In other words the server doesn't know anything about the request except for what the information in that particular request.  It doesn't know anything about the user making the request.  It doesn't even know that that user made a request a second ago, an hour ago, or a year ago.  It doesn't know anything special about the request, that is, except if the request itself provides enough information for the server to figure that stuff out.

Web apps do know stuff about us users between requests of course.  Otherwise, you wouldn't be able to log into a webpage, and have it remember you on every new page you visit.  Servers keep all kinds of information about users, and presents that data each time they log in, day after day, and year after year.

So how do servers know that its you making the request, and that you logged in a few minutes before?  The answer is that it is in the request, as we talked about earlier, specifically, it is information kept in a cookie.

A cookie is a special part of the request that isn't visible to normal users, and is sent along with every request in the HEAD.  Servers can set whatever information they like (up to a certain size), and then use that information when it is passed back to them.

Cookies are unique to the browser that is storing them.  They can be set to expire and be deleted after a certain time, or they can be set to be deleted as soon as the user closes the window or the browser.  Users can also easily delete cookies, so we can never count on a cookie existing for our application to work.

![cookies](https://s3.amazonaws.com/learn-site/curriculum/1280px-HTTP_cookie_exchange.svg.png)

Cookies are very useful.  Here's a list of all the cookies that learnacademy.org sets to help customize the experience for users when they visit the site

![learn cookies](https://s3.amazonaws.com/learn-site/curriculum/learn-cookies.png)

Let's setup a new Express app, and explore how we can interact with cookies.  Express doesn't expose cookies to the developer in an accessible way by default, but by adding the 'cookie-parser' NPM package we can access them.

```
$ mkdir cookies
$ cd cookies
$ npm init
$ npm init express cookie-parser --save
```

Now we create a new app.js, setup Express, and tell it to use 'cookie-parser'

```Javascript
let express = require('express')
let cookieParser = require('cookie-parser')

app = express()
app.use(cookieParser())

app.get('/', 
  function(request, response){
    //we're not doing anything with cookies yet
    //Let's just make sure everything works
    response.send("Hello World")
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

```

Ok, now that we have an app to work with.  Lets see what cookies Express set for us automatically.

```Javascript
app.get('/', 
  function(request, response){
    console.log("the cookies", request.cookies)
    response.send("Hello World")
  })


```

On my machine, they look like below,  yours will be somewhat different:

![my cookies](https://s3.amazonaws.com/learn-site/curriculum/my-cookies.png)

We can set our own cookies too, and read them back the next time the user requests a page.  Notice that the value is empty when you load the page the first time.

```Javascript
app.get('/', 
  function(request, response){

    //we read cookies from the request
    let pageVisits = parseInt(request.cookies.pageVisits) || 0

    //we set cookies on the response
    response.cookie('pageVisits', pageVisits + 1)

    response.send("Hello World. Page Visits:" + pageVisits )
  })

```

# Cookie Expiration

Cookies by default expire when the browser window is closed.  We can set an expiration time for them to allow them to persist between browser sessions.  We can also set the expiration time in the past to force the browser to delete the cookie for us.

The ```response.cookie()``` method also takes an optional options hash, where we can set the ```maxAge``` of the cookie in seconds.  Browsers translate this to the seconds since the cookie is set.

```Javascript
app.get('/', 
  function(request, response){
    let pageVisits = parseInt(request.cookies.pageVisits) || 0

    let secondsToExpire = 60 * 60 * 24 // 1 day
    response.cookie('pageVisits', pageVisits + 1, { maxAge: secondsToExpire })

    response.send("Hello World. Page Visits:" + pageVisits )
  })


```

And to expire a cookie, we call ```response.clearCookie('<cookie name>')```.  Here's the complete application:

```Javascript
let express = require('express')
let cookieParser = require('cookie-parser')

app = express()
app.use(cookieParser())

app.get('/', 
  function(request, response){
    let pageVisits = parseInt(request.cookies.pageVisits) || 0

    let secondsToExpire = 60 * 60 * 24 // 1 day
    response.cookie('pageVisits', pageVisits + 1, { maxAge: secondsToExpire })

    response.send("Hello World. Page Visits:" + pageVisits )
  })

app.get('/clear-visit-cookie',
  function(request, response){
    response.clearCookie('pageVisits')
    response.redirect('/')
  })


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

```

## Sessions

Sessions in an Express app work in conjunction with cookies.  Session data is not stored in the cookie itself, but rather is kept server side.  This minimizes the amount of data that is transfered over the wire with each request.  The session data can grow to be fairly large, and would slow the equest down if it was transfered each time.  

In our examples, and some of the ones following in class, the session is stored in the memory of the running process.  This isn't suitable for an app that is going out to production because it wouldn't be shared if you had more than one server handling requests.  What is normally done in production is to keep the sessions in some sort of data store, then set a key in a cookie to recall it with.  This gives the app the best of both worlds: small transfer size, and rich session data.

We use the NPM package 'express-session' to handle sessions for us.  It abstracts the cookie part from us, so we don't have to worry about reading and writing cookies.  

Let's update the cookie application we just built to use sessions instead.

** NOTE:  Clear the cookies for localhost from your browser before trying this example

First, we'll need to install the 'express-session' NPM package

```
$ npm install express-session --save
```

Next, we setup the session.  Sessions have a 'secret', which the package uses to encrypt the session data so it is secure

```
let express = require('express')
let session = require('express-session')

app = express()
app.use(session({
  secret: 'im a string to make the session secure'
}))

app.get('/', 
  function(request, response){
    response.send("Hello World" )
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

Once we have the session setup, we treat it like a plain old Javascript Object, setting and getting attributes directly.

```Javascript
app.get('/', 
  function(request, response){
    let pageViews = request.session.pageViews || 0
    request.session.pageViews = pageViews + 1
    response.send("Hello World, Page Views:" + pageViews )
  })
```

One difference between using cookies and sessions to note is that we read and write to the session on the request, instead of writing to it on the response.

We clear a session by calling ```request.session.destroy()``` and passing in a callback for when the action is complete:

```Javascript
app.get('/clear-session',
function(request, response){
  request.session.destroy(function(err){
    if(err){
      response.send("Error clearing session " + err)
    }else{
      response.send("Session Cleared")
    }
  })
})

```

## One more word about Cookies

So that's what we need to work with cookies and sessions.  We now know how to remember things in our application between page loads from the same user.  Cookies are very interesting, and have been used in many creative ways when building websites.  Several years ago, they wern't as secure as they are today, and got a bad wrap in the media.  Browsers are much better about providing security for users, and the situation is better today.  Cookies have always been intended to be used for exactly the type of situations we've shown here.

There are some important limitations to concider though when working with cookies:

* The user may have their browser set to not allow cookies, and you should at least aknowledge that in your apps, and tell them that your app requires cookies to function properly.
* Cookies may expire or be deleted at any time.
* Cookies are for your domain, and your domain only.

