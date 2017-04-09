# Control structures and complicated views

Let’s update the index controller action, which is the main page of our application to pass a list of questions through to the view and show them as links:

```javascript

app.get('/', function (request, response) {
  response.render('index', {'questions': questions});
});
```

We’re going to introduce one additional topic in this view, how to use Javascript for control structures like loops, and ‘if’ conditionals.  Using Javascript, we can iterate over the questions, and show them as links.  Replace the contents of the <body> section in index.ejs to look like this:

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

The new bit here is the ```for()``` loop that we use to display each of the questions.  Up until now, ejs files looked a lot like plain old html files.  This time, we’ve added dynamic content.  A lot more html was generated and served to the browser than the number of characters we had to type into the file.  In ejs files, we can write javascript inline with our html to help us build the markup that gets generated.  It’s important to remember that this javascript is evaluated on the server, and not sent to the browser.  All the javascript contained in the <% … %> tags is evaluated and replaced before it is served.  Let’s look at it line by line

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

If we load our app up again, we see the index page with a list of San Diego trivia

![trivia index](https://s3.amazonaws.com/learn-site/curriculum/express-trivia.png)
