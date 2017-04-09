# Testing on the server

Last week we took a look at running tests on code that runs in the browser.  This week, were going to turn our attention to testing code on the server, where it really starts to come into its own.  With the power of Node's include system, and command line interface, testing and doing test driven development become a natural part of the way you develop an application.  After coding in a TDD style, you may find yourself wondering how you ever able to write code without writing tests first, and you write more bullet proof and easy to understand code as a result.

## Be Proud of Your Tests

It has been said that code is written once, but read over and over again, so its more important to write easy to understand code that clearly states your intent than anything else.  Think about that for a moment, after you write a line of code or function, you'll refer back to it again and again, often months later.  If your code is well written, you'll easily remember what you were intending to accomplish with it, and can get on with the current task at hand.  Other programmers will appreciate that your code is well written as well, when the read it for the first time.

Your tests can be thought of as documentation for your code.  By writing a test, you are declaring "This is how I intend this code to be used, and these are the ways it behaves when I call it with these parameters."  That's a powerful way to communicate.  Tests are considered better documentation than even comments peppered throughout the code.  If you ever change the behavior of a piece of code, the test will break and you'll be reminded to update it, so they always stay current.  If you changed some code, but were in a hurry and forget to update the comments, they will quickly grow stale, and in the worst case mislead programmers who read them later about what the code does.

You can be proud of the tests that you write, and they will be a powerful indicator to potential employers and other programmers that you know what you are doing and care about your code.  When you interview for your next job, show them well tested code, and give yourself a leg up on being called in for a second interview!

##Red, Green, Refactor

The process used to test code on the server is the same as in the browser.  Most programmers even write all of their tests for browser code using Node and the tools available on the server so all the tests are run right from the command line.  Running tests from the command line makes it easy to run them often, over and over again while developing.

### Process

Here's an in depth review of 'Red, Green, Refactor'

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


### 3 rules of TDD

TDD can be summarized in 3 rules.  Follow these, and you'll write clear, concise code that is well tested every time.

* Don't write production code until you first have a failing test
* You can't write more of a unit test than is sufficient to fail, and not compiling is failing
* You can't write more production code than is sufficient to pass the currently failing unit test.


