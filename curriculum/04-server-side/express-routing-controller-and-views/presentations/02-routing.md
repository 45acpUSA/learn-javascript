# Routing

Consider this URL
http://localhost:3000/hello/charline


It contains some information that we want to use back on the server when we respond with a new web page, ‘charline’.  Let’s build a response that greets the user.

```javascript
app.get('/hello/:name', function (request, response){
  var name = request.params["name"];
  response.send("Hello " + name + ".  Welcome!");
});
```

Running the app again with ```node app.js```, we can point our browser to ```http://localhost:3000/hello/charline```

![hello charline](https://s3.amazonaws.com/learn-site/curriculum/express-hello-charline.png)

We know from our ‘Hello World’ example that ```app.get(<url>,callback)``` defines a route for the server to listen to, but their is a fair bit more going on with this url.  ‘/hello/:name’ to match urls such as: 

```
  ‘/hello/rick’
  ‘/hello/fantastic-four’
  ‘/hello/charline’
  It will not match urls that don’t fit the pattern:
        ‘/hello’ //doesn’t have the second parameter
        ‘/hello/rick/goodbye/jan’  //has too many parameters
        ‘/charline’ //doesn’t have the first ‘/hello’ parameter
```

What is the ‘:name’ part of this url?  Why doesn’t the server match the url ‘/hello/:name’, and only that url?  


‘:’ when declaring routes has special meaning in an Express app.  ‘:<parameter-name>’ tells Express that this part of the URL should be treated as a parameter.  Anything between the ‘/’ and the next ‘/’ will be passed as a parameter into our callback function.  Let’s take a closer look at how that works.

```Javascript
var name = request.params["name"];
```

The request passed into our function has an attribute called ‘params’ defined on it.  The params hash has all of the parameter information that came in with the calling url.  In our case, ‘/hello/charline’, ‘charline’ is assigned to ‘name’ in the hash, so we assign it to a local variable for use in the rest of our function.


The next line:

```Javascript
response.send("Hello " + name + ".  Welcome!");
```

Builds up a string with the ‘name’ variable, and sends it back to the browser.  Give it a try if you haven’t already, we’ve now built a dynamic web application that responds to user input in a personalized way.  Pretty neat!


