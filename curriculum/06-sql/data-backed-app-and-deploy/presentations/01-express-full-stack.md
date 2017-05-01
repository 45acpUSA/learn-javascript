# Express Full Stack

Today, we're going to build an end to end todo list using Express and Sequelize.  We'll bring together all of the individual pieces of an app you've learned about for the past few weeks.  Specifically, we'll be using:

* Express
* Views
* Layouts
* Forms
* Sequelize
* Sequelize-CLI

## App Setup

Let's jump right in, and get a basic Express app running

```
$ mkdir express-full-stack
$ cd express-full-stack
$ npm init .
$ npm install express body-parser ejs express-ejs-layouts sequelize pg --save
```

Add our '.sequelizerc' file

```Javascript
const path = require('path');

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "seeders-path": path.resolve('./seeds'),
  "migrations-path": path.resolve('./migrations')
}
```

And run ```sequelize init```

So far so good.  Time to make sure Express is setup correctly.  We'll add a layout, index.ejs, adn app.js to test it all out.

#### ./views/layout.ejs
```HTML
<html>
  <head>
  <head>
  <body>
    <h1>TODO List</h1>
    <%- body %>
  </body>
</html>
```

#### ./views/index.ejs
```HTML
<h2>My Todo Lists </h2>
```

#### ./app.js
```Javascript
var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(expressLayouts)


app.get('/', function (request, response) {
  response.render('index')
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});

```

Excellent,  we're off to a good start

![todo 1](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-1.png)

## Sequelize Setup

Let's turn our attention to setting up Sequelize now, starting with the config file.

#### ./config/config.json
```Javascript
{
  "development": {
    "username": null,
    "password": null,
    "database": "express_full_stack_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": null,
    "password": null,
    "database": "express_full_stack_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

And we can create the database

```
$ createdb express_full_stack_development
```

## Modeling our data

For our database schema, we're going to have two tables, TodoLists, and Todos. A TodoList hasMany Todos, and inversly, Todos belongTo a TodoList.

![Todo Schema](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-schema.png)

We can start generating the models and schemas.  A TodoList has a name, and that is it.  A Todo has a name, and isComplete flag to check off when the task has been completed.

TodoList
* name : String

Todo
* name : String
* isComplete : Boolean

Time to use Sequelize-CLI to generate our models and migrations

```
$ sequelize model:create --name TodoList --attributes name:string
$ sequelize model:create --name Todo --attributes name:string,isComplete:boolean
```

Inspecting the TodoList model, all we need to do is add the association to Todo


#### ./models/todolist.js
```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var TodoList = sequelize.define('TodoList', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        TodoList.hasMany(models.Todo,{
          foreignKey: 'todoListId',
          as: 'todos'
        }) 
      }
    }
  });
  return TodoList;
};
```

Inversly, add the TodoList association in Todo

#### ./models/todo.js

```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Todo.belongsTo(models.TodoList,{
          foreignKey: 'todoListId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Todo;
};
```

## Setting up Migrations

The TodoList migration is good to go, but we need to update the Todo migration so it knows to add the Todo foriegn key.

```Javascript
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      isComplete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      todoListId:{                   // <- This is the new attribute
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'TodoLists',
          key: 'id',
          as: 'todoListId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Todos');
  }
};
```

## Seed Data

Do you recall that 'seeds' direcory that Sequelize-CLI created for us when we bootstrapped the app?  That is the directory where we can bootstrap the data for our application.  This is most often used to setup a development environment with some records so developers can get up and working quickly without having to hand enter a bunch of data into the database.  That would be very useful to us in this situation, so lets use it!

Seeds work a lot like migrations, and Sequelize will keep track of what seeds have been loaded into a database.  We can generate a new seed using the CLI:

```
$ sequelize seed:create --name todo-lists
```

And in the seeds file, we use a Sequelize's ```.bulkInsert()``` method to insert method to add several records at once.  Notice that the ```up``` function expects a promise to be returned, which ```.bulkInsert()``` does.  Also notice that we need to manually set the ```updatedAt``` and ```createdAt``` for seed data.

```Javascript
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TodoLists',  //Notice the plural here
    [
      {
        name: 'House Chores',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        name: 'Work Tasks',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TodoLists', null, {})
  }
};
```

We want to add some Todos associated with the todo lists as well, so we create another seed, and modify it accordingly.  This one takes a bit more work because we need to lookup the existing TodoLists in the database, and associate them together, remembering to return a promise from ```up```.

```
sequelize seed:create --name todos
```

```Javascript
'use strict';

let TodoList = require('../models').TodoList

module.exports = {
  up: function (queryInterface, Sequelize) {
    return TodoList.findAll().then(function(lists){ // returns a promise
      let todoPromises = lists.map(function(list){
        return queryInterface.bulkInsert('Todos', 
        [
          {
            name: 'task 1',
            isComplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'task 2',
            isComplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
      })
      return Promise.all(todoPromises) 
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Todos', null, {})
  }
};
```

## Loading the Seeds

Now that we have some seeds defined, we need to load them into the database.  This is very similar to migrations as well.

```
$ sequelize db:seed:all
```

## Show Todo Lists in index

We're ready to display our Todo Lists, and Todo's in our web app.  First up is listing the Todo Lists on the home page.

Require TodoList in the top section
#### ./app.js
```Javascript
var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var app = express();
var TodoList = require('./models').TodoList // <- Added this
```

And get a list of TodoLists in the '/' route.
#### ./app.js
```
app.get('/', function (request, response) {
  TodoList.findAll().then(function(todoLists){
    response.render('index', {todoLists: todoLists})
  }).catch(function(error){
    response.send("Error, couldn't fetch TodoLists")
  })
});
```


#### ./views/index.ejs
```HTML
<h2>My Todo Lists </h2>

<ul>
  <% for(index in todoLists){ %> 
    <% let todoList = todoLists[index] %>
    <li>
      <a href="/todo-list/<%= todoList.get('id') %>">
        <%= todoList.get('name') %>
      </a>
    </li>
  <% } %>
</ul>
```

![TodoLists listed](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-2.png)

But of course, when we click on one of the Lists, we go to a broken page.  We can fix that!

## Detail page for a Todo List

#### ./app.js
```Javascript
app.get('/todo-list/:id', function(request, response){
  TodoList.findById(request.params.id, 
    {include: [{
      model: Todo, 
      as: 'todos'
    }]
  }).then(function(todoList){
    response.render('todo-list', {todoList: todoList, todos: todoList.todos})
  }).catch(function(error){
    response.send("Error, couldn't fetch TodoList")
  })
})

```

This route has a new bit that we'll look at line by line.

```Javascript
TodoList.findById(request.params.id, 
```
We get the Id passed on fro the route, and it is assigned to ```request.params.id``` for us to use

```Javascript
    {include: [{
      model: Todo, 
      as: 'todos'
    }]
```
This part tells Sequelize that we want to also fetch the Todos associated with the TodoList when we query the database.

```Javascript
  }).then(function(todoList){
    response.render('todo-list', {todoList: todoList, todos: todoList.todos})
  })
```
Now we assign the TodoList returned, and the associated todos to local variables in the view for use.


#### ./views/todo-list.ejs
```HTML
<h2>My Todo Lists </h2>

<ul>
  <% for(index in todoLists){ %>
    <% let todoList = todoLists[index] %>
    <li>
      <a href="/todo-list/<%= todoList.get('id') %>">
        <%= todoList.get('name') %>
      </a>
    </li>
  <% } %>
</ul>
```

And there we go,  we can now see a detail page for our TodoList that show's the related Todo items.

![Todo 3](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-3.png)
