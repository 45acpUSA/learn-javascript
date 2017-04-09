## Introduction to Express JS

Today, we're going to take our first look at using the Express JS framework to build a web application.  A framework is a collection of components that all work together, along with a file structure to help organize our code.  Express follows the Model, View, Controller design pattern (MVC) when building an Express application, we separate out the different sections of our code

### Model layer

The model layer in MVC is where the data lives.  This includes database interaction, relationships between the modeled objects in our code, and enforcing business rules.  Take users, and the ability to log in as an example.  We would create a User model to represent real users of the application, and for each user we want to store their name, email address, and a password.  If there were business rules, such as passwords need to be 8 characters long, we'd enforce that rule in the User model.

### View layer

Views are the HTML pages of the application, much the same as the HTML pages you've already built in class.  Views in an Express app have access to our model layer so that they can display dynamic data to the end user.  We'll be going into great detail on how to interact with model data in the views in upcoming lessons.

### Controller layer

Controllers are the glue between models, views, and the incoming web request from the user.  They are handed the request from the Express router, determine what models need to be hydrated from the datastore, and pass that information along to the view.  Once the view has constructed the HTML, they pass the completed page back to the Express router to be sent to the user's browser.

### Router

There is one more critical piece of an Express app, and that is the router.  The router receives the request from the user, and determines what controller should be responsible for handling it.


## Getting familiar with Express

For our first Express application, we are going to focus on the V and the C of MVC.  Views and Controllers work closely together and in conjunction with the router.  Next week, we take a deeper dive into databases, after which, we'll circle back around to the model layer, and work them into Express.

Make a new directory called ‘trivia’

```
$ cd trivia
$ npm init
$ npm install express --save
$ atom app.js
```

```Javascript
var express = require('express');
var app = express();

app.get('/', function (request, response) {
 response.send('Hello World!');
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

Start the server we just created

```
$ node app.js
```


Now point your browser to http://localhost:3000

![hello world](https://s3.amazonaws.com/learn-site/curriculum/express-hello-world.png)

**Cool!**

So, what happened?

When you typed that URL into your browser and hit enter, your browser made a request back to your server on port 3000, where the application we just made and started using ‘node app.js’ was listening for connections.  The app then routed that request to this function:

```javascript
app.get('/', function (request, response) {
 response.send('Hello World!');
});
```


Inside this function, we instructed the server to respond with the text ‘Hello World’, which was sent back to the browser and displayed as a web page.  Pretty neat.  Congratulations, you just served up your first web page.


But how did the web server know to route the incoming request to this function and respond with the string ‘Hello World!’.  Let’s take a look at our application line by line.

```Javascript
var express = require('express');
```

The first thing we do is require the Express.js framework to setup our application.  Express handles all the low level processing and routing when it receives a request.  

```
var app = express();
```

This line calls the main function in Express, creating a new application and assigning it to a local variable called ‘app’.  

```javascript
app.get('/', function (request, response) {
 response.send('Hello World!');
});
```

The next 3 lines call a function defined in Express named ‘get’.  We pass in two parameters, the path we want this route to respond to, and a callback function to run when that route is accessed.  You can think of it as if you were adding a button to a big control panel.  When that button is pressed, we instruct the system on what to do.  The second parameter, which is a function, is those instructions.  

Express passes in two parameters to our responding function: request and response.  The request has all of the information available about the incoming request like path, parameters, cookies, and many other things.  We’ll talk more about each of these in this and upcoming lessons.  
The response is an object that has functions declared on it that we use to send information back to the browser, which is exactly what we do when we call ‘send’: response.send('Hello World!');

```javascript
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

This declaration starts our server actively listening for incoming requests on port 3000.  The callback function prints out some nice information when we start the server that things are working correctly.



