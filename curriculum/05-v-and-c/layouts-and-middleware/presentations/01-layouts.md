# Layouts

> “Don’t repeat yourself. It’s not only repetitive, it’s redundant, and people have heard it before.”
>
> ― Lemony Snicket, Who Could That Be at This Hour?

Recall the Trivia app that we've been building using Express JS. You can clone the repo here if you'd like to start with a fresh copy.  [Trivia App](https://github.com/notch8/layout-forms-auth-base-trivia)


[Don't Repeat Yourself](http://deviq.com/don-t-repeat-yourself/)

The app currently has two views, and you may have noticed that there is a lot of common markup between the two.

```HTML
// ./views/index.ejs

<html>
  <head>
  </head>
  <body>
    <h3> San Diego Trivia </h3>
    <img src='/images/trivia.png' />
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
</html>

```

```HTML
// ./views/trivia.ejs

<html>
  <head>
  </head>
  <body>
    <h3> San Diego Trivia </h3>
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

Everything in these views is the same except for the part of the ```<body>``` section.  This is very common in webapps, so common it turns out, that there is a pattern to factor out the common parts so we only need to maintain it in one spot.  To do this, we use a layout view for the common code, and then render the unique parts inside of the layout on each page.

![layout](https://s3.amazonaws.com/learn-site/curriculum/layout-1.png)

The common parts of the HTML pages can be pulled out into a layout, reducing the amount of code we need to write for each page.  To get started, we'll need to install another npm package.  Navigate to your trivia app, then:

```
$ npm install express-ejs-layouts --save
```

Then inside app.js, we require it, and tell Express that we want to use the layout package.

```Javascript
// ./app.js

var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

//nothing else needs to change in the routes for us to start using the new layout
...
```

By default, ExpressLayouts will use the file ```./views/layout.ejs``` as the layout.  Lets create that file, and extract out the common markup from index.ejs and trivia.ejs.  Here are all 3 files:

```HTML
// ./views/layout.ejs

<html>
  <head>
  </head>
  <body>
    <div id='top'>
      <h3> San Diego Trivia </h3>
      <img src='/images/trivia.png' />
    </div>
    <%- body %>
  </body>
</html>
```

Express will automatically replace ```<%- body %>``` with the content we specify when we call ```app.render('index.ejs')``` from the route.

```HTML
// ./views/index.ejs

<ul>
  <% for(var key in questions) { %>
    <li>
      <a href="/trivia/<%= key %>">
        <%= questions[key]["question"] %>
      </a>
    </li>
  <% } %>
</ul>

```

```HTML
// ./views/trivia.ejs

<strong>
  <%= question %>
</strong>
<br />
<%= answer %>

<br />
<a href="/">Back</a>

```

Staring up the app, and we see the shared components on both pages:

![trivia 1](https://s3.amazonaws.com/learn-site/curriculum/express-trivia-layout-1.png)
![trivia 1](https://s3.amazonaws.com/learn-site/curriculum/express-trivia-layout-2.png)

While we're here, lets add a stylesheet to the app, and make things look a bit nicer.  Create a new directory under 'public' called 'stylesheets', and add application.css to it:

```css
ul{
  list-style: square outside none;
}
li{
  margin: 10px;
}

#top{
  margin-bottom: 20px;
}

.question{
  padding: 10px 0px;
  margin-bottom: 10px;
  border-left: 4px solid grey;
  background-color: #cdcdcd;
}
```

Then in layout.ejs, we can add it to the ```<head>``` section, and now we have a shared stylesheet across the entire application.

```HTML
<html>
  <head>
    <link rel='stylesheet' href='/stylesheets/application.css'>
  </head>
  <body>
    <div id='top'>
      <h3> San Diego Trivia </h3>
      <img src='/images/trivia.png' />
    </div>
    <%- body %>
  </body>
</html>
```

In trivia.ejs, we'll make a few updates to make styling it easier:

```HTML
<div class='question'>
  <%= question %>
</div>
<%= answer %>

<br />
<a href="/">Back</a>
```

That may not win a design competition yet, but its making progress, and because we're using a layout, the design is applied to all pages on the application.
