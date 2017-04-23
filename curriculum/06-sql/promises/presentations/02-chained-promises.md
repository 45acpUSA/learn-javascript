# Promises work together

Many times, you will need to do several operations, with each one depending on the previous outcome.  In these cases, we chain promises together.

Imagine that we have a list of users that looks like this:

```Javascript
let users = [
  {
    name: 'Bob',
    age: 37 
  },
  {
    name: 'Mary',
    age: 7
  },
  {
    name: 'Enoch',
    age: undefined
  }
]
```

We want to write a function that can describe the age of our users.  "Bob is an adult", or "Mary is a minor". Simple enough for Bob and Mary, but what about Enoch?  We're going to run into trouble with that record.  And, what if we ask for a record that doesn't exist due to some other problem in our application?  We should be prepared for that as well.

Let's handle the case where we ask for a record that doesn't exist first.  We'll use a promise.

```Javascript
function userLookup(index){
  let users = [
    {
      name: 'Bob',
      age: 37 
    },
    {
      name: 'Mary',
      age: 7
    },
    {
      name: 'Enoch',
      age: undefined
    }
  ]

  return new Promise(function(resolve, reject){
    let selectedUser = users[index]

    if(selectedUser){
      resolve(selectedUser)
    }else{
      reject("Could not resolve user") 
    }
  })
}
```

If the record is found we resolve the promise with the user, otherwise, we reject.

We can call this function and get a user back (hopefully!):

```Javascript
userLookup(1).then(function(user){
  console.log("Found " + user.name)
}).catch(function(error){
  console.log("Error: " + error)
})

userLookup(2341).then(function(user){
  console.log("Found " + user.name)
}).catch(function(error){
  console.log("Error: " + error)
})
```

The result:

```
Found Mary
Error: Could not resolve user
```

Next, we write a function that takes a user record for input, and describes the user's age.  If the record has both name and age, we can describe it.  If it is missing either, we don't have enough information, and need to reject.

```Javascript
function ageDescriptor(user){
  if(user.age){
    if(user.age < 18){
      var descriptor = "a minor"
    }else{
      var descriptor = "an adult"
    }
  }
  
  return new Promise(function(resolve, reject){
    if(!user.name){
      reject("No user name found")
    } else if(!descriptor){
      reject("Could not describe age for " + user.name)
    }else{
      resolve(user.name + " is " + descriptor)
    }
  })
}
```

Again, we can call this function directly, and it works as expected:

```Javascript
ageDescriptor({name: 'Phil', age: 17}).then(function(description){
  console.log(description)
}).catch(function(error){
  console.log("Error: " + error)
})

ageDescriptor({age: 17}).then(function(description){
  console.log(description)
}).catch(function(error){
  console.log("Error: " + error)
})
```

```
Phil is a minor
Error: No user name found
```

## Chaining Promises
Promises can depend on each other.  Imagine the case where we know the index of the user, and we want to get a description of their age.

```Javascript
userLookup(0).then(function(user){
  return ageDescriptor(user)
}).then(function(description){
  console.log(description)
}).catch(function(error){
  console.log("Error: " + error)
})

```

```
Bob is an adult
```

Works!

Now lets consider the case of Enoch, who we don't know the age for.

```Javascript
userLookup(2).then(function(user){
  return ageDescriptor(user)
}).then(function(description){
  console.log(description)
}).catch(function(error){
  console.log("Error: " + error)
})
```

```
Error: Could not describe age for Enoch
```
That's a good outcome for this bad situation.  We get a nice error telling us exactly what happened.  If we needed to, we could report this information back to the user so they could correct the situation.

### Many ```.then()``` one ```.catch()```
Notice in that last example that we have several 'then' clauses chained together, but only one 'catch' at the end.  That's the way promises work.  Wherever the promise chain rejects, it jumps to the catch clause.

### Promise.all()

Now that we can get the age descriptor for anyone in our list of people, image that we want to get the description for all of them, and deal with them together.  Promises can help us there too.

```Promise.all([promise1, promise2,...])``` takes a list of promises, and doesn't resolve until all the promises do.

In order to take advantage of this, we'll need to wrap this code in its own function, which returns a promise itself:

```Javascript
userLookup(2).then(function(user){
  return ageDescriptor(user)
})
```

In its own function, it looks like this:

```Javascript
function descriptionForUser(index){
  return userLookup(index).then(function(user){
    return ageDescriptor(user)
  })
}
```

Then we can call it for multiple index like so:

```Javascript
Promise.all([descriptionForUser(0), descriptionForUser(1)]).then(function(descriptions){
  descriptions.forEach(function(description){
    console.log(description)
  })
}).catch(function(error){
  console.log(error)
})
```

And the result:

```
Bob is an adult
Mary is a minor
```

## Testability
One of the great things about promises is that they help to make our code very testable.  The code in each link of the promise chain is responsible for just one thing.  Each has well defined inputs, and well defined outputs.  Promises help us write code that is clear, concise, and something we can be proud of.
