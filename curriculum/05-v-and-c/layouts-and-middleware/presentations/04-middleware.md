# Middleware

[Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
[Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)

Did You notice in the last section about cookies how we setup Express to use the cookie-parser?

```Javascript
let express = require('express')
let cookieParser = require('cookie-parser')

app = express()
app.use(cookieParser())

```
First we setup the ```cookieParser``` variable, and then we told express to use it.  But what does that mean?

Recall that in the route, we had access to cookies on the inbound and outbound request and response.

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

How did those get there?  The answer is middleware, and understanding how it works is the key to understanding how Express works.

Middleware in Express is a function that receives a request object, a response object, and the next middleware function to call.  Inside of a middleware function, we can do whatever we like to both the request and the response.  Even cooler, we can act on the request or response both before and after we call the next middleware function.

All of express is a middleware stack, with each piece being responsible for its own small piece of handling the request.  One Middleware sets up the request/response objects, the next parses the cookies, the next fetches the session, then the params handler, etc..  All they way at the bottom of the stack are our routes, and then it bubbles back up through the middlware stack again with each one getting another opportunity to do its work before being sent back to the client.

![middleware](https://s3.amazonaws.com/learn-site/curriculum/middleware.png)

## Order is important

The order that middleware is invoked in the stack is very important, to ensure that everything works correctly.  The params middleware needs to be invoked after the body-parser middleware has done its job, for example, so that it can correctly setup the params from the body of the request.  So how do we specify the order things happen?  Order of execution is determined by the order that the middleware is specified in our app.

Let's create a new app to see how this works.  In this app, we'll bring in the cookie-parser again, and create some of our own middleware.

```
$ mkdir middleware-example
$ cd middleware-example 
$ npm init
$ npm init express cookie-parser --save
```

Then we setup the base app.js

```Javascript
let express = require('express')

app = express()

app.get('/', 
  function(request, response){
    console.log("Hello from GET /")
    response.send("Hello World.")
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

And running that app, and loading the page, we see that we are console.logging out to the running process:

```
Example app listening on port 3000!
Hello from GET /
```

Time to write some middleware.  Back in app.js:

```Javascript
let express = require('express')

let middlewareA  = function(request, response, next){
  console.log("Entering Middleware A")
  next()
  console.log("Finishing Middleware A")
}

app = express()
app.use(middlewareA)

app.get('/', 
  function(request, response){
    console.log("Hello from GET /")
    response.send("Hello World.")
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

In the output, you can see that we started in the middlewareA function, decended down to the route, and accended back up to middlewareA before finishing to proces the request:

```
Example app listening on port 3000!
Entering Middleware A
Hello from GET /
Finishing Middleware A
```

By Adding another middlware function, we can see that the yo-yo path our request is on gets deeper.

```Javascript
...
let middlewareA  = function(request, response, next){
  console.log("Entering Middleware A")
  next()
  console.log("Finishing Middleware A")
}

let middlewareB  = function(request, response, next){
  console.log("Entering Middleware B")
  next()
  console.log("Finishing Middleware B")
}


app = express()
app.use(middlewareA)
app.use(middlewareB)
...
```

```
Example app listening on port 3000!
Entering Middleware A
Entering Middleware B
Hello from GET /
Finishing Middleware B
Finishing Middleware A
```

## The Order of Middleware

Let's bring back the PageView example that used cookies to store information between page requests to explore changing the order of middleware.  Update ```app.get('/', ...)``` to track page views:

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
We also need to require 'cookie-parser' at the top of the file:

```Javascript
  let express = require('express')
  let cookieParser = require('cookie-parser')
```

Now we'll tell the app that we want to use cookie-parser below middlewareB, but above where the route gets its turn:

```Javascript
...
app = express()
app.use(middlewareA)
app.use(middlewareB)
app.use(cookieParser())
...
```

Modifying middlewareA, we can see what the cookies look like before and after the request is passed along:

```Javascript
let middlewareA  = function(request, response, next){
  console.log("Entering Middleware A")
  console.log("page visits: " + request.cookies)
  next()
  console.log("Finishing Middleware A")
  console.log("page visits: " + request.cookies.pageVisits)
}
```

After reloading the page a few times to set the cookie, this is the output:

```
Entering Middleware A
page visits: undefined
Entering Middleware B
Finishing Middleware B
Finishing Middleware A
page visits: 2
```

While the request is on its way down, cookies aren't set on the request or response until cookieParser middleware is called, so we can't access it in Middleware A.  That may, or may not be what we want.  If we need access to the cookies in Middlware A, we can change the order they are invoked:

```Javascript
...
app = express()
app.use(cookieParser())
app.use(middlewareA)
app.use(middlewareB)
...
```

```
Entering Middleware A
page visits: 5
Entering Middleware B
Finishing Middleware B
Finishing Middleware A
page visits: 5
```


Here's the app at this point.  The route itself tracks page views:

```Javascript
let express = require('express')
let cookieParser = require('cookie-parser')

let middlewareA  = function(request, response, next){
  console.log("Entering Middleware A")
  console.log("page visits: " + request.cookies.pageVisits)
  next()
  console.log("Finishing Middleware A")
  console.log("page visits: " + request.cookies.pageVisits)
}

let middlewareB  = funtion(request, response, next){
  console.log("Entering Middleware B")
  next()
  console.log("Finishing Middleware B")
}


app = express()
app.use(cookieParser())
app.use(middlewareA)
app.use(middlewareB)

app.get('/', 
  function(request, response){

    //we read cookies from the request
    let pageVisits = parseInt(request.cookies.pageVisits) || 0

    //we set cookies on the response
    response.cookie('pageVisits', pageVisits + 1)

    response.send("Hello World. Page Visits:" + pageVisits )
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

```

Imagine that our boss came to us and asked us to add more routes, and track page views for them too.  How could we solve that without repeating a bunch of code?  Well, we could move the page counter up into middleware!  Let's update middlewareB to handle it:

```Javascript
let middlewareB  = function(request, response, next){
  console.log("Entering Middleware B")

  let pageVisits = parseInt(request.cookies.pageVisits) || 0
  response.cookie('pageVisits', pageVisits + 1)

  next()

  console.log("Finishing Middleware B")
}
```

The new '/' route:

```Javascript
app.get('/', 
  function(request, response){
    let pageVisits = parseInt(request.cookies.pageVisits)
    response.send("Hello World. Page Visits:" + pageVisits )
  })
```

And everything still works
```
Entering Middleware A
page visits: 7
Entering Middleware B
Finishing Middleware B
Finishing Middleware A
page visits: 7
```


## Custom middleware for a route

Things are going well with the app, page views are being tracked, but imagine again that our boss comes back and tells us that a new route is needed, and we shouldn't track page views on it.  Now we have a problem!  We were clever and moved the page view stuff to middleware, but it acts upon every single request coming in.

Not to fear, Express has us covered.  We can invoke middleware for each request as needed, tracking page views for some routes, and not for others.  The ```app.get("", ..)``` and ```app.post("",...)``` methods actually take a list of as many middleware functions as we like.  In our case, we're going to remove middlewareB from the main callstack, and add it to only the requests to be tracked.  Here's how that works.

```Javascript
app = express()
app.use(cookieParser())
app.use(middlewareA)
//removed middlewareB
```

Now we add it to the '/' request.  We'll also add an untracked route.

```Javascript
app.get('/', 
  middlewareB, // added middleware for just this route
  function(request, response){
    console.log('Visited the tracked page')
    let pageVisits = parseInt(request.cookies.pageVisits)
    response.send("Hello World. Page Visits:" + pageVisits )
  })

app.get('/untracked', // no page tracking middleware here
  function(request, response){
    console.log('Visited the untracked page')

    let pageVisits = parseInt(request.cookies.pageVisits)
    response.send("Hello from the untracked page: " + pageVisits)
  })
```

Here's the output from loading both pages a few times

```
Entering Middleware A
page visits: 10
Entering Middleware B
Visited the tracked page
Finishing Middleware B
Finishing Middleware A
page visits: 10

Entering Middleware A
page visits: 11
Visited the untracked page
Finishing Middleware A
page visits: 11

Entering Middleware A
page visits: 11
Visited the untracked page
Finishing Middleware A
page visits: 11

Entering Middleware A
page visits: 11
Entering Middleware B
Visited the tracked page
Finishing Middleware B
Finishing Middleware A
page visits: 11
```

Now we never enter middlewareB for untracked pages, but are tracking views when the middleware is set on the route.
