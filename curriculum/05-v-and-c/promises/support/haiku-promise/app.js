let express = require('express')
let fsPromise = require('fs-promise')
let asciify = require('./asciify-promise')

app = express()

app.get('/', 
  function(request, response){
    fsPromise.readFile('./haiku.txt', 'ascii').then(function(poem){
      let parts = poem.split('\n') //split the file on each newline
      let promises = parts.map(function(part){
        return asciify(part)
      })
      return Promise.all(promises)
    }).then(function(artworkParts){
      let output = artworkParts.join("\n")
      response.send("<pre>"+output+"</pre>")
    }).catch(function(error){
      response.send(error)
    })
  })

app.get('/raw', 
  function(request, response){
    fsPromise.readFile('./haiku.txt', 'ascii').then(function(poem){
      return asciify(poem) 
    }).then(function(artwork){
      response.send("<pre>" + artwork + "</pre>") //<pre> stands for 'preformatted'
    }).catch(function(error){
      response.send(error)
    })
  })





app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});



