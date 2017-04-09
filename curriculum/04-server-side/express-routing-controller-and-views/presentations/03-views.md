# Using templates to build views
So far we’ve rendered simple text from the controller back to the browser.  In order to provide a rich and engaging experience, we want to render HTML pages with CSS, and client side Javascript.  It would be very tedious to try and do this using only text strings in the controller, so we use templates to build our views.  The controller builds up any dynamic content we want to serve, passes it off to the template, and then sends the constructed view back to the browser.  We can use templates for many different controller actions, and they also help us keep the view code separate from the controller code, so our applications stay nice and tidy.

## Install a template engine

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

Create a new template inside of /views called index.ejs and open in Atom

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

![hello learn family](https://s3.amazonaws.com/learn-site/curriculum/express-hello-family.png)

How about adding some links to the template, so our users can navigate between the web pages?  Back in /views/index.ejs, update the body to look like this:

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



