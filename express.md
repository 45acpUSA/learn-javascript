##Serve HTML and other resources
Install Express and create a new app


Npm and Node.js are already installed on your computer at LEARN.  For more information on what npm and Node are, as well as instructions on how to install them on your own machine, visit: https://docs.npmjs.com/getting-started/installing-node


Make a new directory called ‘trivia’

```
$ cd trivia
$ npm init
$ npm install express --save
$ atom app.js


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
Cool!
So, what happened?
When you typed that url into your browser and hit enter, your browser made a request back to your server on port 3000, where the application we just made and started using ‘node app.js’ was listening for connections.  The app then routed that request to this function:

```javascript
app.get('/', function (request, response) {
 response.send('Hello World!');
});
```


Inside this function, we instructed the server to respond with the text ‘Hello World’, which was sent back to the browser and displayed as a web page.  Pretty neat.  Congratulations, you just served up your first web page.


But how did the web server know to route the incoming request to this function and respond with the string ‘Hello World!’.  Let’s take a look at our application line by line.


var express = require('express');
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

The next 3 lines call a function defined in Express named ‘get’.  We pass in two parameters, the path we want this route to respond to, and a callback function to run when that route is accessed.  You can think of it as if you were adding a button to a big control panel.  When that button is pressed, we instruct the system what to do.  The second parameter, which is a function, are those instructions.  
Express passes in two parameters to our responding function: request and response.  The request has all of the information available about the incoming request like path, parameters, cookies, and many other things.  We’ll talk more about each of these in this and upcoming lessons.  
The response is an object that has functions declared on it that we use to send information back to the browser, which is exactly what we do when we call ‘send’: response.send('Hello World!');

```javascript
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

This declaration starts our server actively listening for incoming requests on port 3000.  The callback function prints out some nice information when we start the server that things are working correctly.


Using GET parameters


Consider this URL
http://localhost:3000/hello/charline


It contains some information that we want to use back on the server when we respond with a new web page, ‘charline’.  Let’s build a response that greets the user.

```javascript
app.get('/hello/:name', function (request, response){
  var name = request.params["name"];
  response.send("Hello " + name + ".  Welcome!");
});
```

We know from our ‘Hello World’ example that ‘app.get(<url>,callback)’ defines a route for the server to listen to, but their is a fair bit more going on with this url.  ‘/hello/:name’ to match urls such as: 
‘/hello/rick’
‘/hello/fantastic-four’
‘/hello/charline’
It will not match urls that don’t fit the pattern:
        ‘/hello’ //doesn’t have the second parameter
        ‘/hello/rick/goodbye/jan’  //has too many parameters
        ‘/charline’ //doesn’t have the first ‘/hello’ parameter


What is the ‘:name’ part of this url?  Why doesn’t the server match the url ‘/hello/:name’, and only that url?  


‘:’ when declaring routes has special meaning in an Express app.  ‘:<parameter-name>’ tells Express that this part of the URL should be treated as a parameter.  Anything between the ‘/’ and the next ‘/’ will be passed as a parameter into our callback function.  Let’s take a closer look at how that works.


var name = request.params["name"];


The request passed into our function has an attribute called ‘params’ defined on it.  The params hash has all of the parameter information that came in with the calling url.  In our case, ‘/hello/charline’, ‘charline’ is assigned to ‘name’ in the hash, so we assign it to a local variable for use in the rest of our function.


The next line:
response.send("Hello " + name + ".  Welcome!");


Builds up a string with the ‘name’ variable, and sends it back to the browser.  Give it a try if you haven’t already, we’ve now built a dynamic web application that responds to user input in a personalized way.  Pretty neat!




###Using templates to build views
So far we’ve rendered simple text from the controller back to the browser.  In order to provide a rich and engaging experience, we want to render HTML pages with CSS, and client side javascript.  It would be very tedious to try and do this using only text strings in the controller, so we use templates to build our views.  The controller builds up any dynamic content we want to serve, passes it off to the template, and then sends the constructed view back to the browser.  We can use templates for many different controller actions, and they also help us keep the view code separate from the controller code, so our applications stay nice and tidy.


###Install a template engine


Express supports many different template engines, and there are dozens, if not hundreds to choose from.  All of them serve the same purpose, to mix dynamic content with HTML markup, and build web pages, and which one to use is largely a matter of developer preference.  In this class, we’ll use one of the most popular template engines called EJS.  In order to do so, we need to install it as an NPM package.

```
$ npm install ejs --save
```

Next we need to tell our Express app to use ejs for serving templates.  Open the app.js file in our Trivia app again, and add this line:

```javascript
var express = require('express');
var app = express();
app.set('view engine', 'ejs');  // Let Express know we want to use EJS.
….
```


Make a directory to hold our views, and call it ‘views’

```
$ mkdir views
```

Create a new template inside of /views called index.pug and open in Atom

```
$ atom ./views/index.ejs
```

In /views/index.ejs, we’ll add some markup

```html
<html>
  <head>
  </head>
  <body>
    <h1> Hello LEARN Family</h1>
  </body>
</html>
```


Next we’ll go back to app.js, and tell our main controller action to use the new template.  Change the content of this function:

```javascript
app.get('/', function (request, response) {
  response.send('Hello World!');
});
```

To

```javascript
app.get('/', function (request, response) {
  response.render(‘index’);
});
```


Express knew to automatically look in the /views directory for our template.  Notice that we left off the file extension.  Express knows what type of file we are looking for because we declared EJS as our template engine above.


It’s time to add some links to the template, so our users can navigate between the web pages.  Back in /views/index.ejs, update the body to look like this:
```html
<body>
  <h3>Who are you?</h3>
  <ul>
    <li>
      <a href='/hello/charline'>Charline</a>
    </li>
    <li>
      <a href='/hello/bob'>Bob</a>
    </li>
    <li>
      <a href='/hello/adorable-cat-emoji'>Adorable Cat Emoji</a>
    </li>
  </ul>
</body>
```


When you open http://localhost:3000 in your browser, you can click the links, and be greeted.


Dynamic content in Views


For our next experiment, we’re going to put dynamic content in the view, and create a more engaging user experience.  We’ll build a list of trivia questions about San Diego, and then link them to a page that reveals the answer.  We start with some questions, and answers:

```javascript
var questions = {
  'coronado-bridge':{
    question: "Who was the first person to ever drive over the Coronado bridge?",
    answer: "Ronald Reagan"
  },
  'hotel-del':{
    question: "What is the largest wooden structure in the United States?  (Hint, it’s located in San Diego)",
    answer: "Hotel Del Coronado"
  },
  'san-diego-county-fair':{
    question: "What was the original name of the San Diego County Fair?",
    answer: "Del Mar Fair"
  },
  'mission-bay':{
    question: "How many visitors come to Mission Bay Park every year?",
    answer: "More than 5 million"
  },
  'la-jolla-playhouse':{
    question: "What famous actor founded the La Jolla Playhouse?",
    answer: "Gregory Peck"
  }
};
```

This is a hash of questions assigned to the ‘questions’ variable.  


Let’s use this data object to build a controller action and view of each question and answer.  The URL for our trivia page will look like ‘/trivia/hotel-del’.  We’ll define the route as ‘/trivia/:question’ so that the params.question will contain the key in our questions data object that we want to display.  Here’s the whole controller function:

```javascript
app.get('/trivia/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  response.render('trivia', {'question': triviaQuestion.question, 'answer': triviaQuestion.answer});
});
```

In Express, we pass content to the view as part of the call to ‘render’.  Along with the name of the view, it accepts a data object to make available to use in the view.


Next, make a new file in views called ‘trivia.ejs’


$ atom ./views/trivia.ejs

```html
<html>
  <head>
  </head>
  <body>
    <h1> San Diego Trivia </h1>
    <strong>
      <%= question %>
    </strong>
    <br />
    <%= answer %>


    <br />
    <a href="/">Back</a>


  </body>
</html>
```

This file is just like our hello world example except for the new dynamic content.  In an EJS template, we escape out of HTML mode, and into javascript mode using the special <%= … %> tags.  These special javascript bits get evaluated while the template is being built, and before they are served to the browser.  When they get to the browser, they look like normal html markup.


You should now be able to point your browser at any of the trivia urls, and see both the question and answer.  Try http://localhost:3000/hotel-del for example.




###Control structures and complicated views


Next let’s update the index controller action, which is the main page of our application to pass these questions through to the view and show them as links:

```javascript
app.get('/', function (request, response) {
  response.render('index', {'questions': questions});
});
```

We’re going to introduce one additional topic in this view, how to use javascript for control structures like loops, and ‘if’ conditionals.  Using Javascript, we can iterate over the questions, and show them as links.  Replace the contents of the <body> section in index.ejs to look like this:

```javascript
<body>
  <h3> San Diego Trivia </h3>
  <ul>
    <% for(var key in questions) { %>
      <li>
        <a href="/trivia/<%= key %>">
          <%= questions[key]["question"] %>
        </a>
      </li>
    <% } %>
  </ul>
</body>
```

The new bit here is the for loop that we use to display each of the questions.  Up until now, ejs files looked a lot like plain old html files.  This time, we’ve added dynamic content.  A lot more html was generated and served to the browser than the number of characters we had to type into the file.  In ejs files, we can write javascript inline with our html to help us build the markup that gets generated.  It’s important to remember that this javascript is evaluated on the server, and not sent to the browser.  All the javascript contained in the <% … %> tags is evaluated and replaced before it is served.  Let’s look at it line by line

```html
<% for(var key in questions) { %>
  <!-- This starts a loop over our questions data object.  It will run once, in sequence for every member of the questions we passed in through the controller.  -->

  <li>
    <!-- You can put any html markup you like in the for loop, and it will be repeated each time →
    <a href="/trivia/<%= key %>">
      <!-- This is a link, as we’ve seen before, with the addition of inserting the key as the final segment of the link -->
      <%= questions[key]["question"] %>
      <!-- We want to display the question for the user to click on, so we use the key to access the appropriate question in the questions data object
    </a>
  </li>
<% } %>
<!-- this closed the for loop, and matches the opening bracket above -->
```


##Displaying images and other resources


We can display a lot more than just text on our web pages, including images, videos, games, and maps.  Let’s take a look at how to serve up an image on the page from our application.  You can use any image you like for this.  We’ll use a Creative Commons image for this example.
https://en.wikipedia.org/wiki/File:Trivia.png


First, we need to tell our application where we’ll keep static files.  At the top of the file, add this line:

```javascript
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));  //tell Express that we’ll keep files in the /public directory
```

Now we can create the public directory and move our image into place

```
$ mkdir -p public/images
$ mv ~/trivia.png ./public/images/trivia.png
```

Finally, in index.ejs view, we can add the html tag to display it.

```html
<html>
  <head>
  </head>
  <body>
    <h3> San Diego Trivia </h3>
    <img src='/images/trivia.png' />
    <ul>
    ...
```

#Activities

1. Display a unique image on each of the trivia answer pages.
2. Add a link to each trivia answer page pointing to the next question, and on the last one, looping back to the first
