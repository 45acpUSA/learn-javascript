## finAll()
Finding multiple records is done through ```.findAll()```.  It takes numerous differnt arguments, but when passed with no arguments, it will return model instances of all records of that type.

```Javascript
Country.findAll()
```

translates to SQL:
```SQL
SELECT
  *
FROM
  countries;
```

# Querying Specific Attributes
You may not need all attributes on a model to build your view, and in that case, you can add a ```attributes: []``` section to your query to modify the ```select for,bar,baz``` section of the query.  For example:

```Javascript
Country.findAll({
  attributes: ['code','name']
})
```
translates to SQL:
```SQL
SELECT
  code,
  name
FROM
  countries;
```
* Note: whatever you use in the 'where' section of your query also needs to be in the 'select' portion

## Querying Specific Records

You'll often want to pull a selected group of records from the database to build a webpage.  For example, all the records relating to a specific user, or in the Countries example, all the countries in Europe.

In Sequelize, we pass in a ```where: {}``` clause to ```.findAll()``` to achieve this:

```Javascript
Country.findAll({
  where:{
    region: 'Europe'
  }
})
```

## Operators
You can get very sophisticated with the where section to match exactly your needs.  For these sorts of queries, we use logical operators in our 'where' section.  Imagine, for example, you wanted to find all Eurpoean or North American countries with a poupulation over 50 million.  For this query, you'd need to use both 'and' and 'or' sections.

```Javascript
Country.findAll({
  where{
    $or: [
      {
        region: 'Europe',
        population: { $gt: 50000000 }
      },
      {
        region: 'North America',
        population: { $gt: 50000000 }
      }
    ]
  }
})
```

[Read the Docs](http://docs.sequelizejs.com/en/v3/docs/querying/) on Querying for more detail on all the logical operators you can use.
