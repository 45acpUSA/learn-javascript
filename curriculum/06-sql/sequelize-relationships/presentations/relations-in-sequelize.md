# Relations between Sequelize Objects

Sequelize has fantastic documentation.  When you need to do something new, or things aren't working as you expect, this is the first place to check for answers:
[Sequelize Docs](http://docs.sequelizejs.com/en/v3/docs/associations/)


With Sequelize, we are mapping rows in database tables to objects that we can interact with in our application.  A Sequelize object mixes data with behavior, and we need to define how those two interact.  We do that using the ```sequelize.define('table-name', {definition})```.  You saw an example of that yesterday in the 'Creating Tables' section.  Today we're going te explore defining our models further, and look specifically at setting up relationships between data. 

For this example, we'll explore the relationship between US States, cities, and Govereners.

![us governors](https://s3.amazonaws.com/learn-site/curriculum/us-governors.png)

For a database Schema, this is what we're going to setup

![db schema](https://s3.amazonaws.com/learn-site/curriculum/us-governors-schema.png)

## Defining Attributes

**Don't forget to setup a new project, and install the 'sequelize' NPM module before we begin.**

Create a new database called 'usStates' in Postgres.  You can use a db tool like PgAdmin, or the command line:

```
$ psql
# create database us_states;
# \quit
$
```

We'll start our application by defining the basic attributes of our tables:

```Javascript
let Sequelize = require('sequelize')

let sequelize = new Sequelize( 'us_states', '','', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idel: 10000
  }
})

let UsState = sequelize.define('us_states', {
  name: {
    type: Sequelize.STRING
  },
  population: {
    type: Sequelize.INTEGER
  },
  bird: {
    type: Sequelize.INTEGER
  },
  tree: {
    type: Sequelize.STRING
  },
  mineral: {
    type: Sequelize.STRING
  }
})

let Person = sequelize.define('people', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
})

let City = sequelize.define('cities',{
  name: {
    type: Sequelize.STRING
  },
})
```

That setups up our database connection, and defines the data attributes for the tables we'll need.  Notice that there are no id, or relational columns in the definitions.  Sequelize will automatically add the id, and we're going to setup the relationships next.

You can interact with your application at this point, adding states, cities, and people as you like, but you can't yet make associations between any of them.  Let's get to setting that up.


