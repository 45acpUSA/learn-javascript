# Forms

Forms are one of the primary tools we use to interact with users, and accept their input.  We use forms for login, filling out applications, and many, many other things.When a user enters input into a form, and clicks the 'submit' button, they are expecting the application to perform an operation for them, and provide a response.  F

For the trivia app, we can add a form to the trivia page that prompts the user for a guess at the answer (multiple choice in our example), and then reports to them if they are correct.  Forms don't always have to send the input back to the server, but in our case we're going to do that, so we can explore how posting information to an Express application works, and how to respond.

## Add anwers to the questions

Starting in app.js, we need to add potential answers to our questions.  To keep the examples small, we're going to reduce the number of trivia questions down to two, but you can have as many as you like:

```Javascript
// ./app.js

var questions = {
  'coronado-bridge':{
    question: "Who was the first person to ever drive over the Coronado bridge?",
    answers: ["Ronald Reagan", "Simon & Simon", "Marilyn Monroe", "Henry Ford"],
    correctAnswerIndex: 0
  },
  'hotel-del':{
    question: "What is the largest wooden structure in the United States?  (Hint, it’s located in San Diego)",
    answers: ["The Giant Dipper", "Cabrillo Bridge", "Hotel Del Coronado", "The Marriott"],
    correctAnswerIndex: 2
  }
};

```

Then, in the view, we add a new ```<form></form>``` section, and place the answer options inside

```HTML
```
