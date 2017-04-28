# Create / Update / Delete

## Insert a record
How would we go about inserting a record?  You'll run across two functions on your models that are useful when working with new records ```.build()``` and ```.create()```.  Build does not save the record right away, where create does.  Let's look at an example of each

### Build
```Javascript
let connection = require('./models/sequelize-connection')

let Country = require('./models/country')

let genovia = Country.build({
  code: 'GEN',
  name: 'Genovia',
  continent: 'Europe',
  region: 'Make Believe'
})

genovia.save()
  .then(function(){
    //whatever you need to do afterwards
  })
  .catch(function(error){
  })
```

### Create
Create works much the same way as build, only it persists the record right away.

```Javascript
let florin = Country.create({
  code: 'FLR',
  name: 'Florin',
  continent: 'Europe',
  region: 'Make Believe'
})
  .then(function(){
    //whatever you need to do afterwards
  })
  .catch(function(error){
  })
```

## Delete a record

Now that we've create two make believe records, we should probably delete them from the database.  That happens when you call ```.destroy()``` on an instance, and it also returns a promise.  We're going to delete multiple records, so we'll need ```Promise.all()``` to make sure they've all been removed before continuing on.

```Javascript
Country.all({
  where: {
    region: 'Make Believe'
  }
})
  .then(function(records){
    let promises = records.map(function(country){
      return country.destroy()
    })
    
    return Promise.all(promises)
  })
  .then(function(results){
    console.log("They're gone!")
  })
```

## Update a record

We often need to update existing records, and Sequelize can help us there too.  First, we'll create Florin again, then update it.


```Javascript
let florin = Country.create({
  code: 'FLR',
  name: 'Florin',
  continent: 'Europe',
  region: 'Make Believe'
})
  .then(function(country){
    country.region = "Storyland"  // <-- this is where we update its values
    return task.save() // a promise
  })
  .catch(function(error){
  })
```
