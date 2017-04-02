# Lesson

## Maintain State outside of the DOM

Now that you've spent a time getting familiar with HTML, CSS, Javascript, and JQuery, we're going to introduce you to some terms used when discussing the architecture or general layout of your application.  Well written applications main state in one central location, and allow components of the application to access that state when they need to decide what to render to the page.  Keeping state of the app in one place assures that everything stays in sync and things displayed on the webpage can communicate properly with each other.


Up until now, we've kept track of application state in the DOM itself, and used Javascript to inspect the DOM and determine what actions to take.  This works for small applications, but gets hard to manage as our app grows, and is nearly impossible to test.  

Fortunately, we can pull the application state out of the HTML, and into our Javascript code where it can be easily managed.  To demonstrate the differences in these two approaches, we're going to start with a small web page that manages state in the DOM, and uses JQuery to control things.  This code should be familiar to you based on what we have worked on up to this point in class.

Follow along in your own application with this example.

```html
<html>
  <head>
  </head>
  <body>
    <h1 id='greeting'>Hello Bob</h1>
    <button onclick="greetNext()">Greet Next Person</button>
    <script>
      function greetNext(){
        //Inspect the dom to find current state of the element
        var element = document.getElementById('greeting');
        var currentGreeting = element.innerHTML;

        //Determine next state
        if(currentGreeting == 'Hello Bob'){
          var nextGreeting = 'Hello Mary';
        }else if(currentGreeting == 'Hello Mary'){
          var nextGreeting = 'Hello Carson';
        }else if(currentGreeting == 'Hello Carson'){
          var nextGreeting = 'Hello Bob';
        }

        //Update the dom with new state
        element.innerHTML = nextGreeting;
      }
    </script>
  </body>
</html>
```

This works, and we can toggle between the different greetings.  You can probably imagine though that if our code were to get more complicated than this, it would become hard to manage pretty quickly.  Lets pull who we're greeting out of the DOM, and see if we can simplify things.

Start by creating a Javascript object to keep track of the current state of our application.  In the ```<script>``` section:

```javascript
var currentState = {
  availableGreetings: ["Bob", "Mary", "Carson"],
  greetingIndex: 0
}
```

Once we've done that, we can add our greeting to the ```<h1 id='greeting'></h1>``` tag:

```html
<html>
  <head>
  </head>
  <body>
    <h1 id='greeting'></h1>
    <script>
      var currentState = {
        availableGreetings: ["Bob", "Mary", "Carson"],
        greetingIndex: 0
      }

      var element = document.getElementById('greeting');
      element.innerHTML = "Hello " +currentState.availableGreetings[currentState.greetingIndex];
    </script>
  </body>
</html>


```

This is starting to look better, but we've lost the ability to greet other people by clicking the button. Lets add some code to do that.

```html
<html>
  <head>
  </head>
  <body>
    <h1 id='greeting'></h1>
    <button onclick="greetNext()">Greet Next Person</button>
    <script>
      var currentState = {
        availableGreetings: ["Bob", "Mary", "Carson"],
        greetingIndex: 0
      }

      var element = document.getElementById('greeting');
      element.innerHTML = "Hello " +currentState.availableGreetings[currentState.greetingIndex];

      function greetNext(){
        currentState.greetingIndex += 1;

        //we need to check to see if we are at the last greeting, and circle around to first if so
        if(currentState.greetingIndex == currentState.availableGreetings.length){
          currentState.greetingIndex = 0;
        }

        //update the dom with new greeting
        var element = document.getElementById('greeting');
        element.innerHTML = "Hello " +currentState.availableGreetings[currentState.greetingIndex];
      }
    </script>
  </body>
</html>
```

Excellent, we now are maintaining state of the application completely in Javascript.  In such a trivial example, it may seem like overkill to set things up this way, but imagine if we wanted to save the state of the app back to the server every time the button was clicked.  With state stored in pure Javascript, its a lot simpler to do.  One of the exercises for today is to update the button in this app with the name of the next person to greet, so instead of it saying "Greet Next Person", it will update each time to say "Greet Mary", or "Greet Carson".  Do you have some ideas already how you would do that?


# Challenge

Recall the code we wrote for our greeting application

```html
<html>
  <head>
  </head>
  <body>
    <h1 id='greeting'></h1>
    <button onclick="greetNext()">Greet Next Person</button>
    <script>
      var currentState = {
        availableGreetings: ["Bob", "Mary", "Carson"],
        greetingIndex: 0
      }

      var element = document.getElementById('greeting');
      element.innerHTML = "Hello " +currentState.availableGreetings[currentState.greetingIndex];

      function greetNext(){
        currentState.greetingIndex += 1;

        //we need to check to see if we are at the last greeting, and circle around to first if so
        if(currentState.greetingIndex == currentState.availableGreetings.length){
          currentState.greetingIndex = 0;
        }

        //update the dom with new greeting
        var element = document.getElementById('greeting');
        element.innerHTML = "Hello " +currentState.availableGreetings[currentState.greetingIndex];
      }
    </script>
  </body>
</html>
```

Your challenge: Update the "Greet Next Person" button so it shows the name of the next person to greet.

Bonus Challenge: Add an image for each of the people in the list, and display the image when they are being greeted.

hint: Update currentState.availableGreetings to contain objects instead of strings.
```javascript
[
  {name: 'Bob',
   image: './bob-avatar.jpg'
  }
]
```
