# Using Sequelize in Express

[Clone and run this project](https://github.com/notch8/learn-javascript-examples/tree/master/06-sql/express-countries)

Let's work on using Sequelize inside of an Express application.  In this app, we're going to display information from our existing Countries database.

Starting with a new application:

```
$ mkdir express-countries
$ cd express-countries 
$ npm init .
$ npm install express sequelize pg ejs --save
```

Time to get the Express app setup, and make sure everything is working correctly.  We'll create app.js, and an index.ejs view.

#### ./app.js
```Javascript
var express = require('express');
var app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')



app.get('/', function (request, response) {
  response.render('index')
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})

```

#### ./views/index.ejs
```HTML
<html>
  <head>
  </head>
  <body>
    <h1>Express - Sequelize Example</h1>
  </body>
</html>
```

Looks good.  The server starts: ```node app.js```, and the view renders.

## Adding Sequelize

Now lets add the setup for Sequelize

#### ./models/sequelize-connection.js
```Javascript
let Sequelize = require('sequelize')

module.exports = new Sequelize( 'countries', '','', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idel: 10000
  }
})
```

And the model for Country

#### ./models/country.js
```Javascript
let Sequelize = require('sequelize')
let connection = require('./sequelize-connection')

let country = connection.define('country',{
  code: {
    type: Sequelize.STRING,
    field: 'code'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  continent: {
    type: Sequelize.STRING,
    field: 'continent'
  },
  region: {
    type: Sequelize.STRING,
    field: 'region'
  }
})

module.exports = country
```

In order to query Country, we'll need to require the model in app.js

#### ./app.js
```Javascript
var express = require('express');
var app = express();
var Country = require('./models/country') // <- Add this line

app.use(express.static('public'))
app.set('view engine', 'ejs')
```

And then we're ready to perform a query in the '/' route.

#### ./app.js
```Javascript
app.get('/', function (request, response) {
  let countries = Country.findAll().then(function(countries){
    response.render('index', {countries: countries})
  })
})
```

Finally, we're ready to update the view to show the countries

#### ./views/index.ejs
```HTML
<html>
  <head>
  </head>
  <body>
    <h1>Express - Sequelize Example</h1>
    <ul>
      <% for(index in countries){ %>
        <li><%= countries[index].get('name') %>
      <% } %>
  </body>
</html>
```
