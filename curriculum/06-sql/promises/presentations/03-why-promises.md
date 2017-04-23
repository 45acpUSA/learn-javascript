# Why Promises?

"So why use promises?" you may be asking.  They certainly are more complicated than writing the code out in a synchronous way.  The answer to that question lies in the fact that our code will need to do certain things asynchronously.  The term 'asynchronous' means that our program needs to jump outside of its normal process, and let some other system or program do some work for us.  The most classic example of this is in the browser on a web page, but there are many, many more.  In Javascript on a web page, we can make a call back to the server to push or pull more data, and then update the page accordingly.  Sending data over the internet is very slow compared to how fast the rest of the application works, and we don't want to freeze the page, locking it up for the user, while we wait for that request to go out and come back.

Using asynchronous code and promises, we can fire off the request, let the user go about her business, and update the page when we get a response.

Asynchronous actions are also useful on the server.  Think about the case of an Express webserver.  The server runs in one process, meaning that it can run exactly one line of code at a time.  If we had to do database lookups (for example) in a synchronous way, we'd fire off the query, and wait, and wait, and wait until it returned with an answer, or timed out.  Every other request would pile up and wait until that database query finished.  This would very quickly crash your webserver and have you answering emails from confused and frustrated users.

## Evented Programming
Instead, Express uses an evented model.  Even with one process, it can handle many, many simultaneous requests.  The secret is Promises.  When Express needs information from a database, or any other long running process, it fires off the request, and gets a promise in return.  While that promise is resolving, it is free to handle other requests that are coming in.  When the promise resolves, it picks that request back up and finishes handling it.

![evented programming](https://s3.amazonaws.com/learn-site/curriculum/YCTgK.png)


## Avoiding callback nesting

Before promises were available in Javascript, we used callbacks to program asynchronously.  With a callback, you could pass a function to the long running process, and it would call that function once it finished doing its work.  This allowed the main application to go about its other business, and the asynchronous action could call back into it once it was finished.

Let's go back to the "Programmer's Haiku" example that we worked with a few weeks ago to compare using callbacks vs. Promises.  In that example, we loaded the poem from a file on disk.

We had a file named ```haiku.txt```, and a program called ```haiku-reader.js```

#### haiku.txt
```
Programming is fun.
If you want to have more fun,
program JavaScript!
```

#### haiku-reader.js
```Javascript
let fs = require('fs');
fs.readFile('haiku.txt', 'ascii', function (err, data){
  if(err){
    console.log('Unable to read file.')
  }else{
    console.log(data);
  }
});
```

Reading files is an asynchronous action.  ```fs``` takes a callback function as an argument that the long running process can call when its through.  Callbacks get complicated very fast.

Imagine we need to call out to Twitter's api to look up tweets relating to this haiku, which can, and sometimes will fail.  The program flow with callbacks looks something like this:

![haiku tweet flow](https://s3.amazonaws.com/learn-site/curriculum/haiku-tweet.png)

Using callbacks, we're going to have to nest a lot of conditionals.  In psuedo-code, it looks something like this:

```Javascript

function readFile(fileName, errorCallback, successCallback){
  //read file from disk
  //success?
    //successCallback(poem)
  //failure?
    //errorCallback(reason)
}

function getKeywords(poem){
  // parse out keywords and return array.  Could be empty.
}

function getTweets(keywords, errorCallback, successCallback){
  //call out to Twitter api for list of tweets
  //success?
    //if some tweets are found?
      //successCallback(arrayOfTweets)
    //else
      //errorCallback("No tweets found")
  //failed?
    errorCallback("Twitter api not responding")
}


//Now to run our program for the haiku.txt file.

readFile('./haiku.txt', 
  function(errorReason){ //the error callback
    //display error
  },
  function(poem){ //the success callback
    let keywords = getKeywords(poem)
    if(keywords?){
      getTweets(keywords,
        function(errorReason){ // the error callback
          // display error
        },
        function(tweetList){ // the success callback
          // display tweets
        })
    }else{
      // display error
    }
  }
)
```

In a word, *Yuck!*.  Even for this small example, callbacks quickly become complicted.

So, how does this look using promises?  Again, psuedo-code:

```Javascript
function readFile(fileName){
  //read file from disk
  return new Promise(function(resolve, reject){
    //success?
      resolve(poem)     
    //failure?
      reject("Could not read file.")
  })
}

function getKeywords(poem){
  // parse out keywords.  Could be empty.
  return new Promise(function(resolve, reject){
    if(keywords){
      resolve(keywords)
    }else{
      reject('No keywords found')
    }
  })
}

function getTweets(keywords){
  return callToTwitterApi(keywords) // returns a promise
}

// Now the payoff for using promises,
// Our main program flow is much simpler and readable

readFile('./haiku.txt').then(function(poem){
  return getKeywords(poem)
}).then(function(keywords){
  return getTweets(keywords)
}).then(function(tweets){
  //display peom and tweets to user
}).catch(function(error){
  //display error to user
}
```
