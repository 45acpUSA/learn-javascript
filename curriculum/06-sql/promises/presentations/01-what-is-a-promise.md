# Promises

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/2UVYUIsl-iY?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

[MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## What is a promise

Promises in Javascript operate much the same way promises operate in real life.  Imagine you ask your child to clean his room, then he can go out to play.  He replies, "Sure dad, I promise to clean my room."  Once you have this agreement with your child, you go about your day, and eventually he'll report back to you that either he succeeded, or failed to actually clean his room.  At that point, you decide if he can go out to play or take some other action.

Here's that same scenario, but with a coding example.  Imagine you ask the database to fetch you some data, and the database replies, "Sure program, I'll fetch that data for you, and let you know what I find."  Once the program has this agreement with the database, it can go about other business until it receives a response.  Eventually, be it 1/100th of a second or 20 seconds later, the database responds with either success and the data it found, or failure and an explanation of why it couldn't do what the program asked it to do.  At that point, the program can either do what it needs to with the data, or take some other action on failure.



## Promise Example

So what does a promise look like, and how do we use it?  Let's look at some code:

```Javascript
let myPromise = new Promise(function(resolve, reject){

  let isSuccess = true //just as an example

  if(isSuccess){
    resolve("the data")
  }else{
    reject("reason it failed") 
  }
})

myPromise.then(function(result){
  console.log("success: " + result)
}).catch(function(result){
  console.log("failed: " + result)
})
```

Go ahead and create a new file with this code and run it for yourself.  Try changing the line ```let isSuccess = true``` to ```let isSuccess = false``` and notice the output.

Let's look at this promise in more detail.  

```Javascript
let myPromise = new Promise(function(resolve, reject){ 
  // do something asyncronously
  // if success
    // resolve the promise
  // if failure
    // reject the promise
})
```

A Promise is an object that wraps other code.  Its role is to execute the code, and return either success or failure of that code at some point in the future.  When a promise is invoked, the rest of the program can go about other business until the promise is finished, and responds.

Promises have two possible outcomes.  They will either resolve or error out, and before runtime we won't know for sure which, so we need to be prepared for both.

```Javascript
myPromise.then(function(result){
  console.log("success: " + result)
}).catch(function(result){
  console.log("failed: " + result)
})

```

When we invoke the promise, we provide two paths to follow: success and failure.  In a real application, this could be responding to a web request, doing some more calculations, or whatever else is required.
