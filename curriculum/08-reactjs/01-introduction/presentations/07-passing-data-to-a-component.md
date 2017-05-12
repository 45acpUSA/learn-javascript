## Props
Props are how we communicate between components in a React app.  We use props to pass data down to a nested component.  Take, for example, passing a 'name' into the Header of our application.

#### src/App.js
```Javascript
import React, { Component } from 'react'
import Header from './Header'
import Recipes from './Recipes'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Header name="Matt" />
        <div>
          <Recipes />
        </div>
        <div>
          <Footer />
        </div>
      </div>

    );
  }
}

export default App;
```

We can then use the prop in Header

#### src/Header.js
```Javascript
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
      </div>
    );
  }
}

export default Header;
```

## State
State is a related concept, but it internal to a component, and not shared.  We can define state on each component, but in order to do so, we need to get comfortable with the ```constructor()``` method first.

## Constructors
Constructors for a class are called each time a new instance of a class is created.  By definition, constructors of a React component are passed the props.  When using a constructor, we need to remember that the parent class from React ```Component``` also has setup work to do, so we need to call ```super(props)``` when overridding the constructor.  

Let's setup our recipes in the Recipes component using state.

#### src/Recipes.js
```Javascript
import React, { Component } from 'react';

class Recipes extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipes: [
        {name: 'Meatballs'},
        {name: 'Mac & Cheese'}
      ]
    }
  }

  render() {
    let recipes = this.state.recipes.map(function(recipe){
      return(
        <li key={recipe.name}>{recipe.name}</li>
      )
    })
    return (
      <ul>
        {recipes}
      </ul>
    );
  }
}

export default Recipes;
```

## Looping in ```render()```
In a render function of a component, we are returning a string of HTML markup created for us using JSX.  Because of this, we can't loop over an array of values directly, but because ```render()``` is a regular old javascript function, we can assign the result of a loop to a variable, and use that in the return from ```render()```.  Here's how this works:

```Javascript
  render() {
    let recipes = this.state.recipes.map(function(recipe){
      return(
        <li key={recipe.name}>{recipe.name}</li>
      )
    })
    return (
      <ul>
        {recipes}
      </ul>
    );
  }
```
Notice how we use ```.map(function)``` to build up the values from our array, and then use that in the return from ```render()```

## Passing recipes down
Components in a React app generally come in two flavors, they can be pure, or impure (sometimes called 'dumb' and 'smart' components).  Pure components recieve data via props, and use that data without making any additions or modifications to that data.  The Header component is a great example of a 'pure' component.  We pass in a name, and the Header just displays it.  The App component, conversly is an 'impure' component.  It is where the logic for deciding on what name to display is kept.  Impure components manipulate the state of the application by fetching data from the server, or maniuplating data in some other way.

Its best to create impure components very purpousfully, and have as few of them as possible in an application.  When we keep data manipulation limited to just a few components, all of the complex logic of the application is kept in one spot.  The pure components can then go about their work, knowing that they will have no impact on other components.  A good analogy is a bee hive.  There is only one queen in charge, and the worker bees are out in the flower fields doing their own thing.

Both Pure and Impure components are necessisary and good to use in an application, as long as we keep their roles distinct.

![Queen Bee](https://s3.amazonaws.com/learn-site/curriculum/React/queen.nurse.gif)

So, we'll keep all data operations in the App component, and pass it down into our Pure components, Header, Recipes, and Footer.  In order to do that, we need to move the recipes list out of the state of Recipes, and up into App.

#### src/app.js
```Javascript
import React, { Component } from 'react'
import Header from './Header'
import Recipes from './Recipes'
import Footer from './Footer'

class App extends Component {
  constructor(props){                // <-- Move the recipes setup to state of App
    super(props)
    this.state = {
      recipes: [
        {name: 'Meatballs'},
        {name: 'Mac & Cheese'}
      ]
    }
  }

  render() {
    return (
      <div>
        <Header name="Matt" />
        <div>
          <Recipes recipes={this.state.recipes} /> // <-- Pass recipes list to Recipes in the props
        </div>
        <div>
          <Footer />
        </div>
      </div>

    );
  }
}

export default App;
```

#### src/Recipes.js
```Javascript
import React, { Component } from 'react';

class Recipes extends Component {
  // Recipes is 'pure' again because it just responds to the data it was passed in props
  render() {
    let recipes = this.props.recipes.map(function(recipe){  
      return(
        <li key={recipe.name}>{recipe.name}</li>
      )
    })
    return (
      <ul>
        {recipes}
      </ul>
    );
  }
}

export default Recipes;
```
