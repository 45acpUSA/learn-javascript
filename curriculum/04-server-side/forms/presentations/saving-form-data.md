# Processing the Form Data Server Side

Let's turn our attention back to ExpressJS, and how client side forms and back end server applications work together.  When a user submits a form, the default behavior is to POST the data back to the server based on whatever is set as the ```action``` of the form.  To demonstrate this, we're going to work up an example with very simple user interaction.  We'll ask the user how their day is going so far, and then report back to them what they input.

At the end of the lesson, we'll talk a little bit about persisting the data, but we haven't talked about databases yet, which is where you'll most often store data in your applications, so this section will feel a bit contrived.  Never fear, next week, we dive deep into databases and the full stack of gathering user data and persisting it in a SQL database.

## Create a new Express App

Review 'Express Routing, Controllers, & Views' if you need a refresher on building an Express app.

Make a new directory called 'server-form'

```
$ cd server-form
$ npm init
$ npm install express --save
$ npm install ejs --save
```

In /views/form-demo.ejs, we’ll add some markup

```html
<html>
  <head>
  </head>
  <body>
    <h1>Server Form Processing Demo</h1>
    <form action='/day-update' method='post'>
      <div>
        <label>How's your day going?</label>
        <br />
        <input type='text' name='dayStatus' />
      </div>

      <div>
        <h2>What would make it better</h2>
        <label>
          <input type='radio' name='improvement' value='more javascript' />
          More Javascript
        </label>
        <label>
          <input type='radio' name='improvement' value='surfing' />
          Surfing
        </label>
        <label>
          <input type='radio' name='improvement' value='caramel corn' />
          Caramel Corn
        </label>
      </div>

      <div>
        <input type='submit' value='Submit' />
      </div>
    </form>
  </body>
</html>
```

Not much new here, except notice the ```<form>``` tag:

```HTML
<form action='/day-update' method='post'>
```

We've added an action, and specified that we want to POST the data to the server.  If you're curious about what 'POST' is vs. 'GET' when making a request to the server, you can read all about it here:

[get vs post](https://www.w3schools.com/tags/ref_httpmethods.asp)

The important piece of information to gather from that is that GET requests are for getting information, and POSTs are for sending data to the server that you want it to do something with.  For forms, we use POST 99% of the time, but you could use GET if you had reason to.

Back on the server side, we need to add the new ```/day-update``` method to handle incomming requests, and we need to add one more NPM module to be able to process those requests.  Here's how to set this up:

In your terminal, add the 'body-parser' middleware:
```
$ npm install body-parser --save
```

Then ```app.js``` looks like this.  Notice that we instruct our Express app to use the body-parser

```Javascript
var express = require('express')

// requiring our new body-parser
var bodyParser = require('body-parser')

var app = express()
app.set('view engine', 'ejs')

//let the app know we want to use body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (request, response) {
  response.render('form-demo')
});

app.post('/day-update', function(request, response){

  //because we're using body-parser, incomming form data
  //is found on request.body
  let responses = request.body

  //In this case, we're just turning around and dispaying the user input
  response.render('day-update', responses )
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

```

With the server setup, all we need to do now is show the user's input back to them in the html file:

```HTML
<html>
  <head>
  </head>
  <body>
    <h1>Thanks for the input!</h1>
    Your Day so far is going: <%= dayStatus %>
    <br />
    To make it better, might I suggest: <%= improvement %>

    <br />

    <a href='/'> Try again?</a>
  </body>
</html>
```

## Persisting Data

In the last example, we didn't do much with the data submitted other than turn around and display it to the user.  Imagine that we wanted to keep a list of user responses, and show all of them to the user.  In order to do that, we'd need to persist the data somehow, and look it up each time a new request comes in.  Normally, you'll do this type of thing using a database, but we haven't covered databases yet, so we'll just write data out to a json file, and read it back in on each request.  

Keeping going with the "How's your day?" application.  Let's handle the saving part first.  We're going to save respones to an array of respones, then convert the whole structure to JSON before writing it to a file.

To make things simpler, we'll start with a file called 'data.json' in the root of the directory.

```JSON
// ./data.json

[]
```

Next, require 'fs' so that we can interact with the file system:

```Javascript
var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs') // this is the new part

var app = express()
...

```

In the handler for posting day updates, we need to read in our data file, and add the new response:

```Javascript
app.post('/day-update', function(request, response){
  let responses = request.body

  //open the data.json file, and parse into a JSON Object
  var dayUpdates = undefined
  var rawFile = fs.readFileSync('data.json')
  var dayUpdates = JSON.parse(rawFile)

  dayUpdates.push(responses)

  //time to save the data back to disk
  fs.writeFileSync('data.json', JSON.stringify(dayUpdates))

  response.render('day-update', responses )
})

```

If we run that, and add a few days, we see that data is being saved in our ```data.json``` file.

Finally, lets show the users all day updates on the page:

Change this line to expose all the ```dayUpdates``` instead of just the most recent response:

```Javascript
response.render('day-update', responses )
```
Changes to

```Javascript
response.render('day-update', { responses: dayResponses } )
```

And the ```data-update.ejs``` changes to

```HTML
<!-- ./day-update.ejs -->

<html>
  <head>
  </head>
  <body>
    <h1>Thanks for the input!</h1>

    <h2>Here's all your responses so far</h2>
    <% for(var key in responses){ %>
      <div>
        So far this day went: <%= responses[key].dayStatus %>
        <br />
        <%= responses[key].improvement %> would make it better
      </div>
    <% } %>

    <a href='/'> Try again?</a>
  </body>
</html>
```

There we go.  We can now collect user data from a form, save it to file, read it back, and show it to the user.  Here is the complete application for reference.

```Javascript
// ./app.js

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (request, response) {
  response.render('form-demo')
});

app.post('/day-update', function(request, response){
  let responses = request.body

  //open the data.json file, and parse into a JSON Object
  var dayUpdates = undefined
  var rawFile = fs.readFileSync('data.json')
  var dayUpdates = JSON.parse(rawFile)

  dayUpdates.push(responses)

  //time to save the data back to disk
  fs.writeFileSync('data.json', JSON.stringify(dayUpdates))

  response.render('day-update', {responses: dayUpdates} )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


```

```JSON
// ./data.json
//Note, this will change as users interact with the application

[]
```

```HTML
<!-- ./form-demo.ejs -->

<html>
  <head>
  </head>
  <body>
    <h1>Server Form Processing Demo</h1>
    <form action='/day-update' method='post'>
      <div>
        <label>How's your day going?</label>
        <br />
        <input type='text' name='dayStatus' />
      </div>

      <div>
        <h2>What would make it better</h2>
        <label>
          <input type='radio' name='improvement' value='more javascript' />
          More Javascript
        </label>
        <label>
          <input type='radio' name='improvement' value='surfing' />
          Surfing
        </label>
        <label>
          <input type='radio' name='improvement' value='caramel corn' />
          Caramel Corn
        </label>
      </div>

      <div>
        <input type='submit' value='Submit' />
      </div>
    </form>
  </body>
</html>
```

```HTML
<!-- day-update.ejs -->

<html>
  <head>
  </head>
  <body>
    <h1>Thanks for the input!</h1>

    <h2>Here's all your responses so far</h2>
    <% for(var key in responses){ %>
      <div>
        So far this day went: <%= responses[key].dayStatus %>
        <br />
        <%= responses[key].improvement %> would make it better
      </div>
    <% } %>

    <a href='/'> Try again?</a>
  </body>
</html>
```
