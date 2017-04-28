# Getting and Setting your Data

## Get one record
You should now have a model setup that connects to the 'countries' table that already exists on your classroom computer.  If you can't find the countries table, or it was removed somehow, checkout [creating a table with Sequelize]()

Recall that the SQL to fetch a record looks like this:

```SQL
SELECT
  code,
  name,
  region
FROM
  country
WHERE
  id = 1;
```

or if you're after everything:

```SQL
SELECT
  *
FROM
  country
WHERE
  id = 1;
```

Using Sequelize, we run queries on the class like so:

```Javascript
  Country.findOne(1) //returns a promise
```

If there is a row with an ID of 1 in the table, than it will be returned.  We can also call ```.findOne()``` with no arguments to get the first row of the table back.  We'll use that for our examples.

## Interacting with a model instance

Let's load a Country instance from the database and see what we can do with it.  

```Javascript
Country.findOne().then(function(country){
  // Do anything we like with the country object
}).catch(function(error){
  console.log(error)
})
```

If you were to console.log the country object above, you'll notice a lot of information included in the object.  Most of it isn't very interesting to us as developers.  We can call ```.get()``` on the object to get just the attributes of the object

```Javascript
Country.findOne().then(function(country){
  console.log(country.get())
})
```

And we can access individual attributes of the country as well

```Javascript
let Country = require('./models/country')

Country.findOne().then(function(country){
  console.log(country.get('name'))
})
```

## Get a set of records

[Learn more about modifying queries](http://docs.sequelizejs.com/en/latest/docs/models-usage/#findall-search-for-multiple-elements-in-the-database)

Getting a set of records works similarity to fetching just one, except we get an array of Sequelize objects back instead of just one. 

```Javascript
Country.all().then(function(){
  let mapped = countries.map(function(country){
    return country.get()
  })
  console.log(mapped)
})
```

This logs out all the rows in your table, which could be quite a lot.  You can limit how many you want back

```Javascript
Country
  .all({limit: 2})
  .then(function(countries){
  let mapped = countries.map(function(country){
    return country.get()
  })
  console.log(mapped)
})
```

That's a little more reasonable.
```
[ { id: 1,
    code: 'AFG',
    name: 'Afghanistan',
    continent: 'Asia',
    region: 'Southern and Central Asia',
    createdAt: 2017-04-23T21:28:01.104Z,
    updatedAt: 2017-04-23T21:28:01.104Z },
  { id: 2,
    code: 'NLD',
    name: 'Netherlands',
    continent: 'Europe',
    region: 'Western Europe',
    createdAt: 2017-04-23T21:28:01.105Z,
    updatedAt: 2017-04-23T21:28:01.105Z } ]
```

You can add an offset too along with limit, to get a slice of the rows somewhere in the middle of your table:

```Javascript
Country
  .all({limit: 2, offset: 1})
  .then(function(countries){
  let mapped = countries.map(function(country){
    return country.get()
  })
  console.log(mapped)
})
```

What if we want to only get the countries in Europe?  In SQL, it would look like this:

```SQL
SELECT
  *
FROM
  countries
WHERE
  continent = 'Europe'
LIMIT 2;
```

In Sequelize:

```Javascript
Country.all({
  where: {
    continent: 'Europe'
  }
})
```

And we can see from the output that the Sequelize matches the SQL we reasoned through first:

```
$ node get.js
Executing (default): SELECT "id", "code", "name", "continent", "region", "createdAt", "updatedAt" FROM "countries" AS "country" WHERE "country"."continent" = 'Europe' LIMIT 2;
[ { id: 2,
    code: 'NLD',
    name: 'Netherlands',
    continent: 'Europe',
    region: 'Western Europe',
    createdAt: 2017-04-23T21:28:01.105Z,
    updatedAt: 2017-04-23T21:28:01.105Z },
  { id: 3,
    code: 'ALB',
    name: 'Albania',
    continent: 'Europe',
    region: 'Southern Europe',
    createdAt: 2017-04-23T21:28:01.105Z,
    updatedAt: 2017-04-23T21:28:01.105Z } ]
```



