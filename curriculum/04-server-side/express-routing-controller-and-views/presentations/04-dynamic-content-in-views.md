# Dynamic content in Views

For our next experiment, we’re going to put dynamic content in the view, and create a more engaging user experience.  We’ll build a list of trivia questions about San Diego, and then link them to a page that reveals the answer.  Its worth mentioning that this is where we are bypassing the Model layer for now.  Eventually, this data will all come from a model in our application.  We start with some questions, and answers:

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


