# Relations between Sequelize Objects

Sequelize has fantastic documentation.  When you need to do something new, or things aren't working as you expect, this is the first place to check for answers:
[Sequelize Docs](http://docs.sequelizejs.com/en/v3/docs/associations/)


With Sequelize, we are mapping rows in database tables to objects that we can interact with in our application.  A Sequelize object mixes data with behavior, and we need to define how those two interact.  We do that using the ```sequelize.define('table-name', {definition})```.  You saw an example of that yesterday in the 'Creating Tables' section.  Today we're going te explore defining our models further, and look specifically at setting up relationships between data. 

## Pre-requisites for this Module

Be sure you are familiar with using Sequelize-CLI, and can setup a new application using it.

You should be familiar with:

* Creating a new Node application
* Installing NPM Modules
* Using Sequelize-CLI to:
  * connect to the database
  * create models and migrations

[Clone and run this example](https://github.com/notch8/learn-javascript-examples/tree/master/06-sql/contact-list)


## One - to - Many Relationship

Recall that a one-to-many relationship in SQL means that a thing has many of another thing, and inversly, the other thing belongs to the first thing.  For this example, using Contacts and Phone numbers, this means that a Contact has many phone numbers, and a phone number belongs to a contact.

![contacts have many phones](https://s3.amazonaws.com/learn-site/curriculum/contact-phone.png)

Once we get this setup correctly, Sequelize will add a host of useful methods for us to use the relationship between the two models.

On a Contact, we'll be able to call:
* contact.phones()
* contact.createPhone()
* many more

On a Phone, we'll be able to call:
* phone.contact()
* and others as well.

[Read the Docs](http://docs.sequelizejs.com/en/v3/docs/associations/) for details on the Sequelize API.

## Create a Sequelize Project

Refer to the 'Sequelize-CLI' tab to review if necessary

```
$ mkdir contact-list
$ cd contact-list
$ npm init .
$ npm install sequelize pg --save
$ npm install sequelize-cli  #note: should alredy be installed
$ createdb contact-list-development
```

Don't forget to:
* create the ```.sequelizerc``` file
* run ```$ sequelize init```
* update config.json appropriatly

## Create models and migrations

Now that we've bootstrapped our application, we can create the Contact and Phone models.  Nothing new here yet.

```
$ sequelize model:create --name Contact --attributes name:string,email:string
$ sequelize model:create --name Phone --attributes number:string,description:string
```

Don't migrate yet.  We need to add an association between Contacts and Phones first.

## Add association to the Models

We need to add the hasMany/belongsTo association to our models so that Sequelize knows to add the methods for us to use the association.  Starting with Contact, we open up the model file and add the association.

Notice the 'associate' section that Sequelize-CLI setup for us.  This is where we tell Sequelize about the associations for this model

#### ./models/contact.js
```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Contact.hasMany(models.Phone,{
          foreignKey: 'contactId',
          as: 'phones'
        })
      }
    }
  });
  return Contact;
};
```

Remember that in a hasMany/belongsTo relationship, the foreign key lives with the side that belongs to the other, or Phone in our case.  We tell Contact what the name of the field on Phone is that holds the assoiation, so Sequelize can optimize lookups of related phone records.

The ```as: 'phones'``` tells the Contact model that the method on Contact instances will be 'phones()', 'createPhone()', etc.


In the Phone model, we add the other side of the relationship, the belongsTo part.

#### ./models/phone.js
```Javascript
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define('Phone', {
    number: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Phone.belongsTo(models.Contact,{
          foreignKey: 'contactId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Phone;
};
```

Here we identify the foreign key again, this time, its a field on this table.  We also specified what behavior we want when an associated Contact is deleted.  In this case, it doesn't make a lot of sense to have an orphaned phone record sticking around if the Contact is deleted, so we instruct Sequelize to delete related Phone records as well.

## hasMany/belongsTo Migrations

Now that our models are setup, we can look at the migrations that are going to create the database structure we'll need to support the application.  The foreign key is on the Phones table, so its that migration that we'll need to modify:

#### ./migrations/20170430211202-create-phone.js
```Javascript
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
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
      },
      contactId: {   // <- This is the new section to add
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'contactId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Phones');
  }
};
```

* Note: When defining the reference, we use the plural version of the model name

## Using hasMany/belongsTo relationships

Run the migrations

```
$ sequelize db:migrate
```

and then we're ready to start using our Contact and Phome models in our application.  Create a new app.js file to test things out.

#### ./app.js
```
let Contact = require('./models').Contact

Contact.create({
  name: 'Bob',
  email: 'bob@bobber.com'
}).then(function(contact){
  console.log(contact.get())

  return contact.createPhone({
    number: '222-333-4444',
    description: 'home'
  })
})
.then(function(phone){
  console.log("New Phone", phone.get())
}).catch(function(error){
  console.log(error)
})
```

Running our sample script, we see that we can now create contacts, and associate phone records.  Pretty neat!

```
$ node app.js
Executing (default): INSERT INTO "Contacts" ("id","name","email","createdAt","updatedAt") VALUES (DEFAULT,'Bob','bob@bobber.com','2017-04-30 21:44:18.966 +00:00','2017-04-30 21:44:18.966 +00:00') RETURNING *;
{ id: 1,
  name: 'Bob',
  email: 'bob@bobber.com',
  updatedAt: 2017-04-30T21:44:18.966Z,
  createdAt: 2017-04-30T21:44:18.966Z }
Executing (default): INSERT INTO "Phones" ("id","number","description","createdAt","updatedAt","contactId") VALUES (DEFAULT,'222-333-4444','home','2017-04-30 21:44:19.077 +00:00','2017-04-30 21:44:19.077 +00:00',1) RETURNING *;
New Phone { id: 1,
  number: '222-333-4444',
  description: 'home',
  contactId: 1,
  updatedAt: 2017-04-30T21:44:19.077Z,
  createdAt: 2017-04-30T21:44:19.077Z }
```

## Other Relationship types

There are several different relationship types that will be useful in different scenarios.  Here's a list of all the different types:

* belogsTo
* hasOne
* hasMany
* belongsToMany

[Read the Docs](http://docs.sequelizejs.com/en/v3/docs/associations/) for descriptions and examples of how to use them.
