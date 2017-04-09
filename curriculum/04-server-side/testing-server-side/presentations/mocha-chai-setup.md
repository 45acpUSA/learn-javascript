## Mocha / Chai Setup

We used Mocha and Chai to write tests run in the browser by creating an HTML file, including all of the libraries as scripts, and then writing the tests in another ```<script></script>``` section.  For tests run from the command line, we'll use the ```module.export()``` and ```require``` statements to organize our files.  Then we can use NPM's script runner to run the tests.  

Let's walk through an example to show how to set testing up.  Start with a sample app

```
$ mkdir -p mocha-chai-demo-app/test
$ cd mocha-chai-demo 
$ npm init
$ npm install mocha chai --save-dev
```

The ```package.json``` file needs one change so that we can run ```$ npm test``` from the command line to run our tests. Update the path to Mocha in the "scripts" section:

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

Our setup test to make sure everything is working uses NPM's 'require' statement to pull in the parts of Mocha and Chai that we'll be using.  The test itself works exactly the same as we've seen before.

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

Now we're ready to run the tests from the command line:

```
$ npm test
> mocha-chai-demo-app@1.0.0 test ./mocha-chai-demo-app
> mocha

  Sample Application
    ✓ should run tests


  1 passing (12ms)
```

