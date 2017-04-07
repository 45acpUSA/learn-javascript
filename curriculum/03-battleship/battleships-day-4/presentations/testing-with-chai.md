# Testing with Chai

By now you're familiar with the development pattern of adding some code, then reloading your browser to see the affects of your new code, making some more changes, then reloading your browser again.

As your application grows, it won't be practical to evaluate the affect of each code change you make on your entire program.  For example, imagine if you had two different user types, and you built a function that affects both experiences, but in slightly different ways.  It would be a lot of work to setup the running application as each user type to see the affect of each change you make.

## Let's automate it!

We can use code to continuously test our code and make sure that it is behaving in the way we expect after every code change.  You'll hear this referred to as 'automated testing', or 'unit tests'.  Its very powerful, and it will not only help you write bug free code, you'll write better crafted code when you test it, because it will help you think more like an end user who is interacting with your application.

```Javascript
//Setup any code we need to run the test
//Call a function with specific attributes.
//assert that the response is what you expect
```

Let's look at one of the functions the "Javascript Objects, Scope and Closures" day as an example.

```Javascript
function createNewCounter() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
  }
}
```

Recall that we can use it to count:

```Javascript
counter = createNewCounter();
counter.getValue();   -> 0
counter.increase();
counter.getValue();   -> 1
```

Our test is going to look like this.  Psuedocode again:

```Javascript
// Call ```createNewCounter()``` to get a counter
// increase the counter
// assert that the value of the counter is 1
```

## Mocha and Chai 

For Javascript developers, Mocha and Chai are much more than just delicious beverages.  They are some of the most commonly used tools to make testing code easier.  The Mocha and Chai libraries work very well together to provide some useful functions for us to make assertions about our code.

This example creates a new project built around the counter function to demonstrate how to setup unit testing.

The structure of our app:
```
/counter-app/
|- index.html
|- javascripts
   |- counter.js
|- tests
   |- test-index.html
```

Index.html is not important to our example, so lets just assume that it uses the counter function in some way that dazzles users, so we need to test it!

```/tests/test-index.html``` is where we'll include ```counter.js``` as well as Mocha and Chai.  It is the test runner.

```HTML
<html>
  <head>
    <!-- We'll load Mocha and Chai from a popular CDN,  you can also host these locally -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js" type="text/javascript"></script>

    <!-- Load the file we want to test -->
    <script src="../javascripts/counter.js"></script>

    <!-- Mocha runs right in the browser, and has good looking output of our test run, so we include the css too -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.min.css">
  </head>
  <body>
    <div id='mocha'></div>
    <script>

      //set the two functions we need from chai and mocha as variables
      var expect = chai.expect
      var describe = mocha.describe

      //Mocha has some work to do before it is ready to run your test suite
      mocha.setup('bdd')

      //testing is intented to read like plain english, first we "describe" the thing were testing
      describe('Counter', function(){

        // making a statement about a particular behavior of our code we expect
        it('should start at 0', function(){
          var counter = createNewCounter()

          //This is an assertion we are making about our code, again, reads like plain english
          expect(counter.getValue()).to.equal(0)
        })

        it('should increment counter', function(){
          var counter = createNewCounter()
          counter.increase()
          expect(counter.getValue()).to.equal(1)
        })
      })

      mocha.run()
    </script>
  </body>
</html>
```

We can then load our test runner file up in a browser and see the result

![mocha results](https://s3.amazonaws.com/learn-site/curriculum/mocha-output.png)

## Testing First

It is good practice to write your tests before you write the production code that will make them pass.  This is called 'TDD', or 'Test Driven Development'.  When you write your test first, you can run it before writing the code to make it pass to prove to yourself that test will cover a real change your about to make to the code base.  The first time, you should see it fail.  Once you see it fail, you can write the code to make it pass.  Then, after it is passing, you can confidently refactor your code as you like, always assured that the code continues to behave as you expected.

Writing a test, then writing the code, then refactoring is called "Red, Green, Refactor" because when you first write the test, it fails and outputs an error (Red), then you make it pass (Green), then you refactor.

Let's show an example of TDD using red, green, refactor to implement the ```counter.decrease()``` function four our counter.

Update the describe block in test-index.html file with the following new test:


### Red

```Javascript
describe('Counter', function(){

  // making a statement about a particular behavior of our code we expect
  it('should start at 0', function(){
    var counter = createNewCounter()

    //This is an assertion we are making about our code, again, reads like plain english
    expect(counter.getValue()).to.equal(0)
  })

  it('should increment counter', function(){
    var counter = createNewCounter()
    counter.increase()
    expect(counter.getValue()).to.equal(1)
  })

  it('should decrement counter', function(){
    var counter = createNewCounter()
    counter.decrease()
    expect(counter.getValue()).to.equal(-1)
  })
})
```

And when we reload the file, we see that we've successfully added a failing test.

![mocha fail](https://s3.amazonaws.com/learn-site/curriculum/mocha-fail.png)


### Green

Now let's impliment the function to make it pass, back in counter.js

```Javascript
function createNewCounter() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
    decrease: function() { value = value - 1; }
  }
}
```

Reload test-index.html

![mocha green](https://s3.amazonaws.com/learn-site/curriculum/mocha-pass.png)

**Green!**

### Refactor

Time to do some refactoring of our production code.  We can make that a bit simpler:

```Javascript
function createNewCounter() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
    decrease: function() { value--; }
  }
}
```
Reload test-index.html again, and... **Still Green!**

![mocha green](https://s3.amazonaws.com/learn-site/curriculum/mocha-pass.png)
