# Jasmine and testing your code

##Red, Green, Refactor

### Process

1. Scope the application requirement to something that can be proved true or false
2. Write the test that proves the statement
3. Run the test and see it fail
4. Implement the feature
5. Run the test and see it pass
6. Refactor the code to improve it
7. Run the tests and make sure they still pass

### What makes a good test

#### Readable

A good unit test is readable an clearly conveys a specific behavior of the program that can be reproduced.

#### Simpler is better

Simple equality statements are usually the right approach when writing unit tests.

What was the expected result?

What was the actual result?

Are they the same?

Use good variable names to indicate what values being tested are.  One of the major benefits to a robust set of tests is documenting how your application works.  If developers can quickly read your tests and understand how the application works, then you are on the right track.

### Use factories to simplify test setup code

### Unit vs. integration tests

Unit tests test individual units of code.  Integration tests test your complete application, much like a user.  

### 3 rules of TDD

Don't write production code until you first have a failing test

You can't write more of a unit test than is sufficient to fail, and not compiling is failing

You can't write more production code than is sufficient to pass the currently failing unit test.

## Mocha / Chai Setup

Start with a sample app

```
$ mkdir -p mocha-chai-demo-app/test
$ cd mocha-chai-demo 
$ npm init
$ npm install mocha chai --save-dev
```

```javascript
// package.json

{
  "name": "mocha-chai-demo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },


  // Update path to mocha binary for test
  "scripts": {
    "test": "./node_modules/.bin/mocha"
  },


  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.2.0"
  }
}
```

```javascript
// /test/setup-test.js

var mocha = require('mocha')
var expect = require('chai').expect

describe('Sample Application', function(){
  it("should run tests", function(){
    expect(true).to.be.true
  })
})
```

```
$ npm test
> mocha-chai-demo-app@1.0.0 test ./mocha-chai-demo-app
> mocha



  Sample Application
    ✓ should run tests


  1 passing (12ms)
```


grunt/gulp
phantom.js
sinon.js
mocha / chai
blanket.js - test coverage
