var express = require('express');
var app = express();
app.set('view engine', 'ejs');  // Let Express know we want to use EJS.

app.get('/', function (request, response) {
  response.render('index');
});

app.get('/hello/:name', function (request, response){
  var name = request.params["name"];
  response.send("Hello " + name + ".  Welcome!");
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

