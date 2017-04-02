## Building a fully functional Node.js webserver

In this exercise, we're going to use Node and NPM to build a functioning webserver.

Node.js has a built in webserver, so we don't need to include any additional modules to set it up.  Be aware>

```Javascript
// ./index.js

// built in libraries are included in exactly the same way we include NPM modules
let http = require('http')

// http has a function callled "createServer" that we use to define our webserver.
// We pass in a function that accepts a request, and response object.
// We can get information about the current request from request, and manipulate.
// the response to ouput what we want.
let server = http.createServer((request, response)=>{
  // Every response has a status, which tells our caller if we were
  // successful in handling the request.  '200' indicates success.
  response.writeHead(200, {'Content-Type': 'text/plain'})

  // We send our information, and complete the request by calling 'end' and
  // passing it our result.
  response.end("Hello World!")
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
$ node index.js
HTTP Server Started
```

And there we are!  We have created a webserver that renders anything we like to the page.  Now that you have created your first 'Hello World' webapp, you can customize it all you like.

```Javascript
response.writeHead(200, {'Content-Type': 'text/plain'})
````

That tells the browser that we are not going to send it HTML, but rather plain text.  When we get ready to send a real webpage, we'll change the content type:

```Javascript
response.writeHead(200, {'Content-Type': 'text/html'})
```
