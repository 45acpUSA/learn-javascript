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


