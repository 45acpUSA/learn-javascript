# Object Orientation in JavaScript

We've talked a little about how JavaScript is an object-oriented programming language, and it sure is, if in a slightly unusual way. But it is also a powerful functional programming language.

Here is an important subject that will probably stretch your mind a bit, known as the <i>closure</i>. It's where functional programming really starts to come into its own.

The classic way to illustrate what a closure does is to create a counter. First, let's define a really short function in the console:

```javascript
function newCounter() {
  var counter = 0;
  return function() {
    counter += 1;
    return counter;
  }
}
```

A function that returns another function is known as a 'higher order function', and they are very useful.  ```newCounter``` returns a function, and when you call <i>the returned</i> function somewhere else in your program, it adds one to the current value of the counter variable and then returns it.

Try it in the console:

```javascript
var c = newCounter();
var c1 = newCounter();
c();
1

c();
2

c();
3

c1();
1

c1();
2

c();
4
```

The way variables are handled in JavaScript and many other programming languages is that the variable is kept in the computer's memory until no part of the program refers to it. Once that happens, the memory it occupies is reclaimed for use by other variables or parts of the program. A closure retains a reference to any variables it uses, so even if all other parts of the program stop using a variable, any closures that are kept around will in turn keep around the variables they "close over".

Each time we call newCounter, the function creates a new counter variable in memory, and returns a function that closes over that variable. We can easily have as many counting functions as we like, which might be useful, actually.

```javascript
function newFancyCounter() {
  var counter = 0;
  return {
    more: function() {
      counter += 1;
      return counter;
    },
    less: function() {
      counter -= 1;
      return counter;
    }
  }
}
```

There really isn't anything new here. Instead of just returning a function, this function returns an object that contains two functions, <i>both</i> of which refer to the <i>same</i> counter variable. Some of those curly braces there block out the beginning and of a function, and others mark out the beginning and end of an object.

In this case, as they were defined at the same time referring to the <i>same</i> counter variable, they can both manipulate it and see what each other has done to it. Check it:

```javascript
var c = newFancyCounter();
c.more()
1

c.more()
2

c.more()
3

c.more()
4

c.less()
3

c.less()
2

c.more()
3
```

If you are familiar with more traditional object oriented programming, you'll have noticed how the object returned by newFancyCounter is pretty much an object with a private property. In fact, JavaScript and other languages with closures and other functional programming features can define their own object oriented programming systems. Functional programming is in a very real sense more powerful and general, yet in the end simpler, than object oriented programming.

