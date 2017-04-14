var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(expressLayouts)


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


app.get('/', function (request, response) {
  response.render('index', {'questions': questions});
});

app.get('/trivia/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  response.render('trivia', {'question': triviaQuestion.question, 'answers': triviaQuestion.answers});
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

