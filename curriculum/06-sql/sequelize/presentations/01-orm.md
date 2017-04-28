# ORM

We've spent the past few days looking at SQL, and promises.  The week before, we looked at the Express framework, and made the promise (pun intended) to ourselves that we'd work on a full stack implementation as soon as we had all the pieces to do so, including databases.  Today, the last piece of the puzzle is going to be put in place.  We're going to look at an ORM called 'Sequelize'.  'ORM' stands for 'Object Relation Mapper'.  What it allows us to do in our code is treat the tables in our databases as Classes in our code, and rows in those tables as instances of those classes.

As an example of this, recall the Countries database that you worked with on the first day of SQL.  The Countries table would map to a 'Country' class in our application, and each row would be an instance of the Country class.

![ORM](https://s3.amazonaws.com/learn-site/curriculum/orm-1.png)

## Connecting to the database

Sequelize needs to know what database you wish to connect to.  You can connect to a local database (like we'll do today), or you can connect to a database on another computer.  Since we're using Postgres as our database, we need to tell Sequelize that as well.

Create a new project if you haven't already, and add the 'sequelize' and 'pg' packages.  'pg' is a package that allows Sequelize to talk to a Postgres database.

```
$ mkdir sequelize-example
$ cd sequelize-example
$ npm init .
$ npm install sequelize pg --save
```

Next, let's create a module that contains our Sequelize connection.  We'll go ahead and put this in a 'models' directory, where all of our database model files will live.

```
$ mkdir models
$ cd models
```

```new Sequelize('database-name', 'username', 'password', {options})```
In our case, we're working in a development environment, so the username is your shell user, and its not password protected.  This would change for a production environment.

#### sequelize-connection.js

```Javascript
let Sequelize = require('sequelize')

module.exports = new Sequelize( 'countries', '','', {
  host: 'localhost',  
  dialect: 'postgres',
  pool: { // the pool determines how many connections we can have at one time
    max: 5,
    min: 0
  }
})
```

Then in app.js, lets test the connection to make sure everything is hooked up correctly:

#### app.js
```Javascript
let connection = require('./models/sequelize-connection')

connection.authenticate()
  .then(function(){
    console.log('success!')
  })
  .catch(function(error){
    console.log(error)
  })
```

You should see:

```
$ node get.js
Executing (default): SELECT 1+1 AS result
success!
```


## Defining models

Time to set up our first model.  We need to tell Sequelize what the attributes are on our model, what kind of data each field contains, and the database field name it relates to.  Note that the 'field' is optional, if the field name is the same as the attribute on your model.

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

There are many, many options you can set to customize how your model accesses the database.  Read all about in the [documentation](http://docs.sequelizejs.com/en/latest/docs/models-definition/)


