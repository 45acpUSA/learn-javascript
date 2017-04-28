# Using Promises

Let's write a few more promises, this time introducing some slow running process into the mix, and see how it affects our code.  Imagine that we had the following functionality in our application:

```Javascript
function processDelayedBySeconds(seconds){
  let miliseconds = seconds * 1000
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("Resolved after " + seconds + " seconds.")
    }, miliseconds)
  })
}

processDelayedBySeconds(4).then(function(response){
  console.log(response)
})
processDelayedBySeconds(1).then(function(response){
  console.log(response)
})
processDelayedBySeconds(3).then(function(response){
  console.log(response)
})
```

And the result:
```
Resolved after 1 seconds.
Resolved after 3 seconds.
Resolved after 4 seconds.
```

If you haven't seen ```setTimeout()``` before, it is a built in Javascript function that runs an action after some amount of time.

```Javascript
setTimeout(function(){}, milisecondDelay)
```

## Loading Files Asynchronously

There are many NPM libraries out there that use promises, and many built in Node functions do as well.  We'll look at the Haiku example one more time to see how we can load the file using a Promise.

Start a new Node project, and at a haiku.txt file

```
$ mkdir promise-haiku
$ cd promise-haiku
$ npm init .
$ echo "Promises are fun\nPromises make life easy\nUse promises daily" > haiku.txt
```

Next, install the NPM package 'fs-promise'
[fs-promise](https://www.npmjs.com/package/fs-promise)

```
$ npm install fs-promise --save
```

Now we can use 'fs-promise' to read the file in a non-blocking way

```Javascript
let fsPromise = require('fs-promise')

fsPromise.readFile('./haiku.txt','ascii').then(function(poem){
  console.log(poem)
}).catch(function(error){
  console.log(error)
})
```

## Wrapping callbacks

It often happens that you run into another developers code that you want to use, that doesn't use promises, but instead uses a callback function.  What can you do in that case?

Well, wrapping their older style code in a promise wrapper function is the best solution.  Take, for example the built in node `fs` module that does the same thing as `fs-promise` above, only using a callback.  Let's say `fs-promise` wasn't available, or for some reason we wanted to write our own promise for it.

Here's how `fs` works using a callback

```Javascript
let fs = require('fs');

fs.readFile('haiku.txt', 'ascii',function (err, data){
  if(err){
    console.log('Unable to read file.')
  }else{
    console.log(data);
  }
});
```

We can take advantage of the fact that we have [closure](https://www.learnacademy.org/current-days/526) around the callback function passed into ```fs.readfile()``` and pass in our promise actions instead.

```Javascript
let fs = require('fs');

function promiseReadFile(path, encoding){
  return new Promise(function(resolve, reject){
    fs.readFile('./promise-haiku/haiku.txt', 'ascii',function (err, data){
      if(err){
        reject('Unable to read file.')
      }else{
        resolve(data);
      }
    });
  })
}

promiseReadFile('./haiku', 'ascii').then(function(poem){
  console.log(poem)
}).catch(function(error){
  console.log(error)
})
```
