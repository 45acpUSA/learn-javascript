# Displaying images and other resources

We can display a lot more than just text on our web pages, including images, videos, games, and maps.  Let’s take a look at how to serve up an image on the page from our application.  You can use any image you like for this.  We’ll use a Creative Commons image for this example.

https://en.wikipedia.org/wiki/File:Trivia.png

![trivia](https://s3.amazonaws.com/learn-site/curriculum/640px-Trivia.png)

First, we need to tell our application where we’ll keep static files.  At the top of the file, add this line:

```javascript
var express = require('express');
var app = express();
app.use(express.static('public'));  //tell Express that we’ll keep files in the /public directory
app.set('view engine', 'ejs');
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


