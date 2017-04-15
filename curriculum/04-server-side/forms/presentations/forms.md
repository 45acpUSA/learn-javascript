# Forms

Forms are one of the primary tools we use to interact with users, and accept their input.  We use forms for login, filling out applications, and many, many other things.When a user enters input into a form, and clicks the 'submit' button, they are expecting the application to perform an operation for them, and provide a response.  F

For the trivia app, we can add a form to the trivia page that prompts the user for a guess at the answer (multiple choice in our example), and then reports to them if they are correct.  Forms don't always have to send the input back to the server, but in our case we're going to do that, so we can explore how posting information to an Express application works, and how to respond.

An HTML form is a collection of HTML elements that all work together to gather user input, and allow them to submit it.  Most forms have the following structure:

```HTML
<form>
  <input type name value />

  <input type='submit' value='Submit'/>
</form>
```

There are 3 types of input elements that collect user supplied information: 'text', 'radio', and 'checkbox'.  You choose which one to use by setting ```type='text'``` on the input

Name can be anything you like, and is what the variable name is when the form is sent off for processing. ```name='firstName'``` for example.

Value is set just like type and name, but takes on special meaning depending on what kind of input is specified.  We'll look at each one in turn.

## Input Types

### Text

The text input is for collecting a single line of text from the user, one or a few words.  Here are a few examples:

```HTML
<input type='text' name='firstName' />
<input type='text' name='bestRoundHouse' value='Chuck Norris' />
```

The ```value``` is optional, and as the user enters text into the field, it will be updated with their input.  When the form is submitted, the data will include an attribute based on the name, with the user entered value.

### Radio

Radio buttons are intended to allow the user to select one of several values.  Related radio buttons are grouped together by their name.  Each should have a unique value.  Only one can be selected at a time, and will change when the user picks one.  Radio inputs are almost always sourrounded by a ```<label>```.  This lets the user know what value the radio input represents.  When you place the input inside of the label, browsers group them together, so that the user can click on any part of the label and the radio input will be toggled.  This helps users out by giving them a bigger target to click on.  The text of the label can go before or after the input itself.

```HTML
<label>
  <input type='radio' name='favoriteVegetable' value='carrot' selected />
  Carrot
</label>
<label>
  <input type='radio' name='favoriteVegetable' value='tomato' />
  Tomato
</label>
<label>
  <input type='radio' name='favoriteVegetable' value='zucchini' />
  Zucchini
</label>
```

When the form is submitted, the data will have an attribute based on the name, with the value of the selected option.

### Checkbox

Checkboxes allow the user to select one value or not.  If the form has more than one checkbox, they have no relationship to eachother.  Labels work the same for checkboxes as they do for radios.

```HTML
<label>
  <input type='checkbox' name='soda' value='true' checked/>
  Do you want a soda?
</label>
<label>
  <input type='checkbox' name='cheeseburger' value='true' checked/>
  Do you want a cheeseburger?
</label>
<label>
  <input type='checkbox' name='fries' value='true' checked/>
  Do you want fries?
</label>
```

When the form data is submitted, if the checkbox is checked, then the data will contain the name/value pair from the input.  If it is not checked, neither will be in the form data at all.

### Submit

Submit inputs, believe it or not, work almost the same as the other inputs.  They have a value, and when the user presses it, the form is sent for processing along with the attribute/value pair from the submit button.  The value of a submit input is what shows as the label of the button.  This allows you to have more than one submit button for a form if you need to. and ability to check which one the user pressed when processing the form.

```HTML
<input type='submit' value='Submit' />
<input type='submit' value='Submit and make me a sandwich'
```

## Demo time

Time to see how forms work on a real webpage.  Often you'll want to send the form data back to a server for processing.  Just as often, you'll want to process the data via Javascript, which is what we'll show in this example.

Let's start by creating a new single page app called ```form-demo.html```

```HTML
<html>
  <head>
  </head>
  <body>
    <h1>Form Demo</h1>
    <form action='#'>
      <div>
        <label>Text Input</label>
        <input type='text' name='textValue' />
      </div>
      <div>
        <label>Prefilled Text</label>
        <input type='text' name='favoriteColor' value='green' />
      </div>
      <div>
        <h2>Radio Buttons</h2>
        <label>
          <input type='radio' name='favoriteBaloonAnimal' value='dog' />
          Dog
        </label>
        <br />
        <label>
          <input type='radio' name='favoriteBaloonAnimal' value='butterfly' selected />
          Butterfly 
        </label>
        <br />
        <label>
          <input type='radio' name='favoriteBaloonAnimal' value='turtle' />
          Turtle
        </label>
      </div>
      <div>
        <h2>Checkboxes</h2>
        <label>
          <input type='checkbox' name='javascript' value='true' checked />
          I want to learn Javascript
        </label>
        <br />
        <label>
          <input type='checkbox' name='html' value='true' checked />
          I want to learn HTML
        </label>
        <br />
        <label>
          <input type='checkbox' name='css' value='true' checked />
          I want to learn CSS
        </label>
        <br />
        <label>
          <input type='checkbox' name='css' value='true' />
          I want to learn LOLCODE
        </label>
      </div>
      <div>
        <input type='submit' value='Show' />
      </div>
    </form>
  </body>
</html>

```

So far, so good.  We've got a form on the page with all 3 input types.  But what to do with the data when the user submits?  Did you notice the ```action='#'``` in the ```<form>``` tag?  Action tells the browser where we want to send the data, and in this case, we don't want to send it nowhere.  Instead, lets add an ```onSubmit``` action to the form and capture it in Javascript.

```HTML
<form id='demo-form' action='#' onsubmit='handleFormSubmit(); return false'>
...
</form>

<script>
  function handleFormSubmit(){
    alert('Form submitted!')   
  }
</script>
```

This doesn't do anything with the form data yet, but we need to make sure our ```onSubmit()``` is working.  Note the ```return false``` that we added as well.  Without it, the form would utilize its normal behavior, and try to submit the form to the server, which we don't want in this case.

Now, to show the data from the form, we update our function like so:

```Javascript
function handleFormSubmit(){
  var inputs = document.getElementById('demo-form').elements
  var obj ={};
  for(var i = 0 ; i < inputs.length ; i++){
    var item = inputs.item(i);
    obj[item.name] = item.value;
  }
  document.getElementById("form-values").innerHTML = JSON.stringify(obj);
}
```

## LOLCODE

By the way,  LOLCODE is a real programming language. If you have an afternoon, or entire weekend to blow learning a useless but ridiculously fun programming language then I has a webpage for you, Itz: 

[LOLCODE](http://lolcode.org/)

KTHXBYE


