# Sequelize-CLI

So far, we've setup the tables in our database using Postgres directly.  Sequelize has the ability to manage tables and columns for us.  We can write code to create tables, and even add or update columns to them after they already exist.  This has a major advantage when it comes to deploying our code to other servers because the database structure will be updated just in time for the new code in our application that uses it.

## In this lesson

In this lesson, we'll look at the following topics
* How to use Sequelize-CLI to create tables in the database and models in our project
* How to update the database using migrations

[Clone and run this example](https://github.com/notch8/learn-javascript-examples/tree/master/06-sql/vegetables)

## CLI

'CLI' stands for 'Command Line Interface', so the Sequelize-CLI is a command line interface to Sequelize.  It provides several utilities that we can use directly from the command line to manage our database.

## Setting up an application with Sequelize-CLI

### Install dependencies
The first thing we'll want to do is create a new sample application, and install the 'sequelize-cli' module.  Note that we'll use the '-g' flag for sequelize-cli because we want it installed globally on the system.  This allows us to call it from the command line directly.

```
# mkdir sequelize-cli-example
# cd sequelize-cli-example
# npm init .
# npm install sequelize pg --save
# npm install -g sequelize-cli
```

### Configure Sequelize

Sequelize-cli needs to know a few things about how you want to structure your application, so by convention, it reads from a file called `.sequelizerc`.  This file tells Sequelize-cli 4 things:

* where the config file for Sequelize is.
* where the models will be kept
* where the seeds will be kept.  (Seeds are a tool to load initial data into the database)
* where the migrations will be kept.  (Migrations are the files that update the database schema)


.sequelizerc
```Javascript
const path = require('path');

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "seeders-path": path.resolve('./seeds'),
  "migrations-path": path.resolve('./migrations')
}
```

With that in place, we can initialize the sequelized environment:
```
$ sequelize init
```

Have a look at the file structure that it created.  Sequelize-CLI created all of the directories that you specified above.

![file structure](https://s3.amazonaws.com/learn-site/curriculum/sequelize-cli-structure.png)

It also created a file called ```index.js``` in '/models' that bootstraps the application with all the model files you will be creating.  Nothing to change in there, but its a good place to look to understand how Sequelize is loading files for you.

```Javascript
'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

## Create a database

Now we're ready to create a sample database to work with:

```
createdb sequelize-example
```

And once we've done that, we open up the config.json file that was created for us, and update it with our connection information:

#### config.json

```Javascript
{
  "development": {
    "username": null,
    "password": null,
    "database": "sequelize-example",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": null,
    "password": null,
    "database": "sequelize-example",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
* Note: if your database has a username and password specified, you can add them in-place of 'null'.

* Note: also note that we deleted the production environment, because we'll won't need it for this example.  Best to keep things tidy!

### Generating Models

We're ready to generate a model using Sequelize-CLI.  We'll create a model for the vegetables you might find at the local farmers market.  Back on the command line:

```
$ sequelize model:create --name Vegetable --attributes name:string,calories:integer,description:string 
```

That created some more files for us:

![generate model](https://s3.amazonaws.com/learn-site/curriculum/sequelize-model-create.png)

And when we look into those two files:

#### ./models/vegetable.js
```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vegetable = sequelize.define('Vegetable', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Vegetable;
};
```
This looks a lot like the Sequelize model definitions we're already familiar with.  It specifies that vegetables have names, calories, and descriptions.

#### 20170430200835-create-vegetable.js
```Javascript
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Vegetables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      calories: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Vegetables');
  }
};
```

This is the migration file, and instructs Sequelize-CLI how to create the 'Vegetable' file in the database.  Notice that it added the 'createdAt' and 'updatedAt' fields for us that Sequelize will automatically maintain as we create and modify records.  Also note that there is a 'down' function.  This allows us to roll back migrations if we choose.  Its one of the many commands that Sequelize-CLI provides.  You can see the rest by typing ```sequelize``` on the command line:

```
$ sequelize

Sequelize [Node: 7.5.0, CLI: 2.7.0, ORM: 3.30.4]

Usage
  sequelize [task] [OPTIONS...]
Available tasks
  db:migrate             Run pending migrations.
  db:migrate:old_schema  Update legacy migration table
  db:migrate:status      List the status of all migrations
  db:migrate:undo        Reverts a migration.
  db:migrate:undo:all    Revert all migrations ran.
  db:seed                Run specified seeder.
  db:seed:all            Run every seeder.
  db:seed:undo           Deletes data from the database.
  db:seed:undo:all       Deletes data from the database.
  help                   Display this help text. Aliases: h
  init                   Initializes the project. [init:config, init:migrations, init:seeders, init:models]
  init:config            Initializes the configuration.
  init:migrations        Initializes the migrations.
  init:models            Initializes the models.
  init:seeders           Initializes the seeders.
  migration:create       Generates a new migration file. Aliases: migration:generate
  model:create           Generates a model and its migration. Aliases: model:generate
  seed:create            Generates a new seed file. Aliases: seed:generate
  version                Prints the version number. Aliases: v
Available manuals
  help:db:migrate             The documentation for "sequelize db:migrate".
  help:db:migrate:old_schema  The documentation for "sequelize db:migrate:old_schema".
  help:db:migrate:status      The documentation for "sequelize db:migrate:status".
  help:db:migrate:undo        The documentation for "sequelize db:migrate:undo".
  help:db:migrate:undo:all    The documentation for "sequelize db:migrate:undo:all".
  help:db:seed                The documentation for "sequelize db:seed".
  help:db:seed:all            The documentation for "sequelize db:seed:all".
  help:db:seed:undo           The documentation for "sequelize db:seed:undo".
  help:db:seed:undo:all       The documentation for "sequelize db:seed:undo:all".
  help:init                   The documentation for "sequelize init".
  help:init:config            The documentation for "sequelize init:config".
  help:init:migrations        The documentation for "sequelize init:migrations".
  help:init:models            The documentation for "sequelize init:models".
  help:init:seeders           The documentation for "sequelize init:seeders".
  help:migration:create       The documentation for "sequelize migration:create".
  help:model:create           The documentation for "sequelize model:create".
  help:seed:create            The documentation for "sequelize seed:create".
  help:version                The documentation for "sequelize version".
```

Lot's of important and useful information there!  Explore the help sections to learn more about Sequelize-CLI

## Running Migrations

Now that we have a migration file created, we can run it and add a table to the database we created above.  On the command line:

```
$ sequelize db:migrate
Sequelize [Node: 7.5.0, CLI: 2.7.0, ORM: 3.30.4]

Loaded configuration file "config/config.json".
Using environment "development".
== 20170430200835-create-vegetable: migrating =======
== 20170430200835-create-vegetable: migrated (0.078s)
```

Looks good!  Let's create a file to test out our work:

#### app.js
```Javascript
let Vegetable = require('./models').Vegetable

Vegetable.create({
  name: 'Squash',
  description: 'Tasty fall vegetable.',
  calories: 110
}).then(function(vegetable){
  console.log(vegetable.get())
}).catch(function(error){
  console.log(error)
})
```

And it works!  We can create vegetables in the database:

```
$ node app.js
Executing (default): INSERT INTO "Vegetables" ("id","name","calories","description","createdAt","updatedAt") VALUES (DEFAULT,'Squash',110,'Tasty fall vegetable.','2017-04-30 20:28:29.115 +00:00','2017-04-30 20:28:29.115 +00:00') RETURNING *;
{ id: 1,
  name: 'Squash',
  description: 'Tasty fall vegetable.',
  calories: 110,
  updatedAt: 2017-04-30T20:28:29.115Z,
  createdAt: 2017-04-30T20:28:29.115Z }
```

## Updating a Table

Imagine that we need to add a color column to the vegetable table after we've shipped the application.  We may be tempted to update the existing migration we have, but that wouldn't do.  Migrations are sequential, and only run once.  If we added to an old migration, it would never be run.  We need to create a new migration.

>  **Important**:  We can not modify old migrations when we need to change the database schema.  We must create new ones.

In order to generate a new migration, we go back to the command line:

```
sequelize migration:create --name add-color-to-vegetables
```

And we open the new file up to add our code:

#### ./migrations/20170430203240-add-color-to-vegetables.js
```Javascript

```

We also need to add the new attribute to our model definition

#### ./models/vegetable.js
```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vegetable = sequelize.define('Vegetable', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    description: DataTypes.STRING,
    color: DataTypes.STRING  // <-- the new part
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Vegetable;
};
```

And the result:
```
node app.js
Executing (default): INSERT INTO "Vegetables" ("id","name","calories","description","color","createdAt","updatedAt") VALUES (DEFAULT,'Squash',110,'asty fall vegetable.','orange','2017-04-30 20:45:44.858 +00:00','2017-04-30 20:45:44.858 +00:00') RETURNING *;
{ id: 1,
  name: 'Squash',
  description: 'asty fall vegetable.',
  calories: 110,
  color: 'orange',
  updatedAt: 2017-04-30T20:45:44.858Z,
  createdAt: 2017-04-30T20:45:44.858Z }
```

Excellent!
