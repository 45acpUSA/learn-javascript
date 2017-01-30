##What is Node.js

Node.js is JavaScript running on the server.  Up until
this point, we've been writing all of our JavaScript in the console of the
browser. You can think of Node.js as replicating that exact same
experience in the terminal of your computer.  In fact, Node.js is
a wrapper around the Chrome V8 engine, which is the exact same library
that the browser uses.  

![Node.js wraps V8, just like
Chrome](./assets/node-ecosystem-npm/node-chrome-v8.png)

This provides all the capabilities of JavaScript server side, where we can
do a host of interesting things:
- Create a web server.
- Manage system resources and files.
- Interact with databases such as MongoDB, Postgres, and Redis.
- Communicate with other computers on the local network and across the
  internet.

##In this module, we're going to cover
- The Node.js REPL
- Function return values
- Node.js on the command line
- Evented, non-blocking, functional programming
- NPM package manager and package.json
- Building a fully functional Node.js webserver

## The Node.js REPL

REPL stands for "Read Eval Print Loop".  The console built into chrome is an example of a REPL that you are already familiar with.  Node.js has a REPL that we can use on the server.

```
$ node
> //we can write comments, and define variables
undefined
> const name = "LEARN Academy"
undefined
> console.log(name)
LEARN Academy
undefined
> console.log("Hello", name)
Hello LEARN Academy
undefined
>
>//we can do math, use built in functions, and much more
>undefined
> 1 + 1
2
> Date()
'Sat Jan 28 2017 13:41:55 GMT-0800 (PST)'
>
>//we can even write our own functions
>undefined
> function sayHello(name){
... console.log("Good Day", name)
... }
undefined
> sayHello("Carmen San Diego")
Good Day Carmen San Diego
undefined
>
>//loops, if/else, and all block statements work as well
undefined
> ["Barney", "Fred", "Whilma", "Bam Bam"].forEach((name)=>{
... sayHello(name)
... })
Good Day Barney
Good Day Fred
Good Day Whilma
Good Day Bam Bam
undefined
>.exit
$
````

You may have noticed all those 'undefined' statements as we executed code
in the REPL.  This is a good opportunity to talk about an important aspect
of functions in JavaScript.  You'll hear people say that "there is no
explicit return in Javascript functions", and this is what exactly what is
causing Node.js to print out 'undefined' above.  Node.js is telling us
that the return value of each of the statements above is undefined.  We
need to specify a return value explicitly from our functions if we want to
return something.  It is not wrong, or incorrect to not return a value
from a function, Node.js is just letting us know what the result of
performing the last operation was, and without a return statement, that is
undefined.

```
$ node
> function simpleSum(number1, number2){
... number1 + number2
... }
undefined
> function betterSum(number1, number2){
... return number1 + number2
... }
undefined
> simpleSum(2,5)
undefined
> betterSum(2,5)
7
> .exit
$
```

##Node.js on the command line

Node.js has a command line interface that allows us to run files, and run
code directly from the terminal.  Lets create an application that prints
out the current date.

```JavaScript
// ./today.js

const today = new Date()
console.log("Today is", today)

````

Once we save our program, we can use Node.js to run our program
```
$ node today.js

Today is 2017-01-28T21:28:10.001Z
```

Now were starting to see how powerful Node.js is, and how we can use it to
build full stack applications.  Netflix, the New York Times, PayPal,
LinkedIn, and Uber use Node.js in exactly this same way to run their web
applications, serving millions upon millions of pages each day.

## NPM package manager and package.json

One of the powerfull parts of Node.js is the robust ecosystem of libraries and
modules available to build our applications with.  We gain access to these
modules through Node.js' built in package manager callled NPM (Node Package
Manager).  NPM modules are common functionality wrapped up in a module, and
able to be used in different applications.

Some examples of useful NPM Modules:
- Express - A web development framework
- Socket.io - Cutting edge websocket functionality for web apps
- Pug / Jade - Templating engines to make writing HTML easier
- Mongo / Mongoos - Database wrappers
- Date.js - Make working with Dates much easier

### Creating a Node.js application with package.json

Up to this point, all of our applications have been contained in a single file.
As our apps grow, we're going to want to break parts of it out into their own
files so things stay nice and organized.  Also, as we start to use the
functionality of 3rd party NPM modules, we're going to need a way to tell our
application what modules we're using.  All Node.js apps have a file located
right in the root of the project to keep all of that information in one spot
called package.json.  

We're going to start building towards fully functional web server, but
first let's create a new Node.js app with a package.json file, and see
what we get.

```
npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (super-man-server)
version: (1.0.0)
description: A super powered ASCII generator
entry point: (index.js)
test command:
git repository: super-man-server
keywords:
author:
license: (ISC)
About to write to /Users/mclark/Projects/notch8/voltjs/super-man-server/package.json:

{
  "name": "super-man-server",
  "version": "1.0.0",
  "description": "A super powered ASCII generator",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "super-man-server"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes) yes
$
```

We used NPM to create a brand new app, and generate a simple package.json
file.  So far, our app has little more than a description.  The other
important line in package.json so far is "main": "index.js",.  That line
tells Node.js what file we want the entry point to our application to be.
That file doesn't exist yet, so lets create it now.

```JavaScript
// ./index.js

console.log("I have the super powers of a Node.js developer!")
````

Now, if we go to the command line, and type:

```
$ node .
I have the super powers of a Node.js developer!
```

We see that we have started up Node.js, and it knew what file to look in to begin running the program.  Pretty neat!

Now, lets do something a little more super with our superman app.  We're going to create some ASCII art for this example.  Make sure you are inside the sper-man-server directory, then:

```
$ npm install --save asciify
super-man-server@1.0.0 /Users/mclark/Projects/notch8/voltjs/super-man-server
└─┬ asciify@1.3.5
  ├─┬ chalk@0.3.0
    │ ├── ansi-styles@0.2.0
      │ └── has-color@0.1.7
        ├─┬ optimist@0.6.1
          │ ├── minimist@0.0.10
            │ └── wordwrap@0.0.3
              └── pad@0.0.4
````

So what just happened?  NPM installed the module we asked for, asciify, and all of the modules that asciify depends on.  We added the flag --save to our command, and that caused NPM to update our package.json file so that when we deploy our app, or share it with our friends, we'll be able to easily install all of its dependencies, and get things running.  Here's a closer look at what NPM did:

```
$  cat package.json
{
  "name": "super-man-server",
  "version": "1.0.0",
  "description": "A super powered ASCII generator",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "super-man-server"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "asciify": "^1.3.5"
  }
}

$ ls
index.js     node_modules package.json
$ cd node_modules
$ ls
ansi-styles asciify     chalk       has-color   minimist    optimist    pad         wordwrap
```

We can see that it added a "dependencies" section to our package.json file.  When we run the command "ls", we can see that it also added a "node_modules" directory, and inside that, install asciify as well as all of the libries that it depends on.  Looks like we're all set to start creating some super ASCII art.  Lets give it a whirl in our index.js file.

```Javascript
// ./index.js

let asciify = require('asciify')

const text = "Up Up And Away!"

// asciify is a function that accepts parameters, telling it what we want to do.
// The last parameter is a function, known as a 'callback'.  The callback is run
// once asciify has completed, or errored out.
asciify(text, {font: 'larry3d'}, (err, result)=>{
  if(err){
    console.log("Sorry, we couldn't generate that art")
  } else {
    console.log(result)
  }
})
```
And the result:

![Up, Up, And Away!](./assets/node-ecosystem-npm/up-up-and-away.png)

Now were cooking!  You can read more about asciify on its [Github page](https://github.com/olizilla/asciify)

## Building a fully functional Node.js webserver

We're getting somewhere now.  Our application requires a NPM module, creates some interesting artwork, and prints it out to the console.  So far though, we're the only ones who've been able to enjoy our masterpiece.  Its time we build a web server into our application, so we can share it with the world.  Fame, glory, and untold riches are sure to follow.

Node.js has a built in webserver, so we don't need to include any additional modules to set it up.  Be aware that we're going to build a low level webserver, and not something more full featured like an Express or Sails application.  Those are frameworks that help to make bigger applications easier.  Under the hood, both use Node.js' native 'http' library to handle requests, just like were going to do now.

```Javascript
// ./index.js

// built in libraries are included in exactly the same way we include NPM modules
let http = require('http')
let asciify = require('asciify')

// http has a function callled "createServer" that we use to define our webserver.
// We pass in a function that accepts a request, and response object.
// We can get information about the current request from request, and manipulate.
// the response to ouput what we want.
let server = http.createServer((request, response)=>{
  const text = "Up Up And Away!"

  asciify(text, {font: 'larry3d'}, (err, result)=>{
    if(err){
      var content = "Sorry, we couldn't generate that art"
    } else {
      var content = result
    }

    // Every response has a status, which tells our caller if we were
    // successful in handling the request.  '200' indicates success.
    response.writeHead(200, {'Content-Type': 'text/plain'})

    // We send our information, and complete the request by calling 'end' and 
    // passing it our result.
    response.end(content)
  })
})

// Finally, we need to tell the server to listen for incoming requests. This
// will cause the server to enter an event loop (a topic for the near future),
// and wait for requests to come in forever, or until we stop the process.
server.listen(3000, '127.0.0.1', ()=>{
  console.log('HTTP Server Started') 
})

```

Now we can fire up our application, and try it out:

```
$ node .
HTTP Server Started
```

![Up, Up, And Away! in
browser](./assets/node-ecosystem-npm/up-up-and-away-browser.png)

And there we are!  We have now created a webserver that serves out ASCII art using a 3rd party module.  We could take our application, deploy it somewhere, and share it with the world.  There are a few topics we should look at first.  Did you notice that we set our content type to be 'text/plain' in this line?

```Javascript
response.writeHead(200, {'Content-Type': 'text/plain'})
````

That tells the browser that we are not going to send it HTML, but rather plain text.  When we get ready to serve real HTML web pages, we'll change it to look like this:

```Javascript
response.writeHead(200, {'Content-Type': 'text/html'})
```

Try it out now, and see what happens.  Fortunately, browsers do a pretty good job with plain text, and our artwork looks nice.  An upcoming lesson goes into detail on serving real HTML and CSS pages, which will allow us to do much more interesting and beautiful things.

We also glossed over one of the most important parts of Node.js, and why it makes such a great platform to build a webserver on.  In a few places, we used callbacks to handle the content that functions returned to us.  The next lesson is devoted entirely to what callbacks are actually doing, and how they are used in evented programming.  Here's an example of a callback that we used, just so you can start thinking about them:

```Javascript
// asciify takes 3 arguments: asciify(content, options, callback)
// In this case, we pass in an anonymous function to be called when
// asciify has perfomed its action.
// The important thing to grasp here is that somewhere in asciify, it is
// calling this function, and giving control back to us, so we can do
// what we want with the results it generated.
asciify(text, {font: 'larry3d'}, (err, result)=>{
  if(err){
    console.log("Sorry, we couldn't generate that art")
  } else {
    console.log(result)
  }
})

```


