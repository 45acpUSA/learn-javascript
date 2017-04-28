# Promises in Express

We now have all the tools to use promises in our Express apps, and build highly scalable applications able to serve the needs of multiple user simultaneously.  If our boss comes to us and says that her market research indicates that there will be a huge surge in traffic of people wanting to read our programmer haikus in the near future, with a little work, we'll be ready.  Let's do that now.

We're going to rebuild our haiku app, and add some ASCII art to the poems.  Recall that we used the NPM module 'asciify' during the second week to generate our artwork.  That module makes use of a callback.  We'll wrap it in a promise to make it work in our system.

Start with a new application, installing express, asciify, and fs-promise:

```
$ mkdir haiku-server
$ cd haiku-server 
$ npm init .
$ npm install express asciify fs-promise
$ echo "Promises are fun\nPromises make life easy\nUse promises daily" > haiku.txt
```

Starting with asciify, recall from the [docs](https://www.npmjs.com/package/asciify) that we call asciify like so:

```Javascript
let asciify = require('asciify')
asciify('Awesome', function(err, res){ console.log(res) });
```

We want to call it using a promise:

```Javascript
let asciify = require('asciify-promise')
asciify('Awesome').then(function(asciiArt){
  console.log(asciiArt)
}).catch(function(error){
  console.log(error)
})
```

#### asciify-promise.js

```Javascript
let asciify = require('asciify')

function assciifyPromise(text){
  return new Promise(function(resolve, reject){
    asciify(text, function(error, result){
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    })
  })
}

//test code to make sure we got it right
assciifyPromise('Test').then(function(result){
  console.log(result)
}).catch(function(error){
  console.log(error)
})

```

And the result

```
$ node asciify-promise.js
___________                  __
\__    ___/  ____    _______/  |_
  |    |   _/ __ \  /  ___/\   __\
  |    |   \  ___/  \___ \  |  |
  |____|    \___  >/____  > |__|
                \/      \/

```

*Perfect.*

Last step for asciify-promise is to convert it to an exported module:

#### asciify-promise.js
```Javascript
let asciify = require('asciify')

module.exports = function(text){
  return new Promise(function(resolve, reject){
    asciify(text, function(error, result){
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    })
  })
}
```

Turning our attention to the Express server, we create a new app.js

```Javascript
let express = require('express')

app = express()

app.get('/', 
  function(request, response){
    response.send('Hello World')
  })


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

That works.  Next, lets try to read in the poem, and asciify it!

```Javascript
let express = require('express')
let fsPromise = require('fs-promise')
let asciify = require('./asciify-promise')

app = express()

app.get('/', 
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
```

When we run that, it almost works, but everthing is on the same line.  Not what we want!

What is going on here?  The answer lies in the fact that there are 3 lines to our poem, and asciify doesn't know how to handle that.  We're going to have to parse each line individually, then stitch them back together before sending it to the browser.


```Javascript
app.get('/', 
  function(request, response){
    fsPromise.readFile('./haiku.txt', 'ascii').then(function(poem){
      let parts = poem.split('\n')                  //split the file on each newline
      let promises = parts.map(function(part){      //put promises in an array
        return asciify(part)
      })
      return Promise.all(promises)                  //returns .all(), which is itslef a promise
    }).then(function(artworkParts){
      let output = artworkParts.join("\n")          //stitch everything back together
      response.send("<pre>"+output+"</pre>")
    }).catch(function(error){
      response.send(error)
    })
  })
```

![haiku-promise](https://s3.amazonaws.com/learn-site/curriculum/haiku-promise-2.png)

Now that's some fancy Haiku.  Again, we've delighted our boss, and our users.  
