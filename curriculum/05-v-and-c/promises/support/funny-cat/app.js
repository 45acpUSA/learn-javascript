var express = require('express')
var fetch = require('node-fetch')

var bodyParser = require('body-parser')

var app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.all('/', function (request, response) {
  if(request.body.searchTerm){
    var searchTerm = request.body.searchTerm
  }else{
    var searchTerm = 'funny cat'
  }
  let searchUrl = 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC'
  fetch(searchUrl).then(function(giphyResponse){
    return giphyResponse.text()
  }).then(function(body){
    let data = JSON.parse(body)
    return data.data.map(function(gif){
      return gif.images.fixed_height.url
    })
  }).then(function(gifs){
    response.render('index', {urls: gifs, searchTerm: searchTerm})
  })
  .catch(function(error){
    response.send('there was a problem: ' + error)
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


