# The Node.js REPL

REPL stands for "Read Eval Print Loop".  The console built into chrome is an example of a REPL that you are already familiar with.  Node.js has a REPL that we can use on the server.

```
$ node
> //we can write comments, and define variables
undefined
> const name = "LEARN Academy"
undefined
> console.log(name)
LEARN Academy
undefined
> console.log("Hello", name)
Hello LEARN Academy
undefined
>
>//we can do math, use built in functions, and much more
>undefined
> 1 + 1
2
> Date()
'Sat Jan 28 2017 13:41:55 GMT-0800 (PST)'
>
>//we can even write our own functions
>undefined
> function sayHello(name){
... console.log("Good Day", name)
... }
undefined
> sayHello("Carmen San Diego")
Good Day Carmen San Diego
undefined
>
>//loops, if/else, and all block statements work as well
undefined
> ["Barney", "Fred", "Whilma", "Bam Bam"].forEach((name)=>{
... sayHello(name)
... })
Good Day Barney
Good Day Fred
Good Day Whilma
Good Day Bam Bam
undefined
>.exit
$
````

You may have noticed all those 'undefined' statements as we executed code
in the REPL.  This is a good opportunity to talk about an important aspect
of functions in JavaScript.  You'll hear people say that "there is no
explicit return in Javascript functions", and this is what exactly what is
causing Node.js to print out 'undefined' above.  Node.js is telling us
that the return value of each of the statements above is undefined.  We
need to specify a return value explicitly from our functions if we want to
return something.  It is not wrong, or incorrect to not return a value
from a function, Node.js is just letting us know what the result of
performing the last operation was, and without a return statement, that is
undefined.

```
$ node
> function simpleSum(number1, number2){
... number1 + number2
... }
undefined
> function betterSum(number1, number2){
... return number1 + number2
... }
undefined
> simpleSum(2,5)
undefined
> betterSum(2,5)
7
> .exit
$
```

## Node.js on the command line

Node.js has a command line interface that allows us to run files, and run
code directly from the terminal.  Lets create an application that prints
out the current date.

```JavaScript
// ./today.js

const today = new Date()
console.log("Today is", today)

````

Once we save our program, we can use Node.js to run our program
```
$ node today.js

Today is 2017-01-28T21:28:10.001Z
```

Now were starting to see how powerful Node.js is, and how we can use it to
build full stack applications.  Netflix, the New York Times, PayPal,
LinkedIn, and Uber use Node.js in exactly this same way to run their web
applications, serving millions upon millions of pages each day.


