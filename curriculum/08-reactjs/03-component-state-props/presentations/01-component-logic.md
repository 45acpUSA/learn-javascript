# Component Logic

Today we're going to take a closer look at managing state in Components, and handling state changes among components as they work together on the page.  We've been working with both state and props to manage state in components.  Recall that state is for managing internal state of a component, and props are used to communicate state between components.  As you work more with react you'll begin to use component state less and less, keeping state contained in a few top level, 'smart', components and relying on props to pass state to other components.  

Let's take a closer look at the difference between component state and props by adding an input element to the page.  We'll start by creating a Header component that takes a greeting, and displays it

#### src/Header.js
```Javascript
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <h1>Hello {this.props.greeting} </h1>
    );
  }
}

export default Header;
```
This component is 'Pure', or 'dumb'.  It just accepts a greeting in props, and displays it.

In App.js, we add a greeting to the components state, and then can user the Header component to display a greeting.

#### src/App.js
```Javascript
import React, { Component } from 'react';
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: 'Bob'
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header greeting={this.state.greeting} />
        </div>
      </div>
    );
  }
}

export default App;
```

Next, lets add an input element to the App component so we can update the greeting.  

#### src/App.js
```Javascript
import React, { Component } from 'react';
import Header from './Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: 'Bob'
    }
  }

  updateGreeting(e){
    this.setState({greeting: e.target.value})
  }

  render() {
    return (
      <div>
        <div>
          <Header greeting={this.state.greeting} />
        </div>
        <div>
          <input value={this.state.greeting} onChange={this.updateGreeting.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
```
**Notice** that for the input, we need both a `value` and `onChange`.  You may have thought at first that because we set the value of the input to the value of greeting in our component state that the input would be bound correctly to component state, but it doesn't work.  ```<input>``` has its own internal state, so we need to use the props 'value' and 'onChange' to pass the proper context into it.  The input is re-rendered every time the state of the component changes, resetting the value of the input to whatever the component state is at that moment.  By using ```onChange``` that action is passed back up the the App component and handled correctly.

Also notice that we call ```.bind(this)``` on our ```onChange()``` handler.  This binds the context of the function to the App component where we are managing state for the app.  ```<input>``` in React is just another component, and we are passing the ```onChange``` handler in as a prop.  ```<input>``` doesn't have 'greeting' set in its state, so the state change would be silently ignored.  By calling ```.bind(this)```, we make sure that state on that App component is updated, and everything works as we expect.

## Moving the input to a component

As our app grows, we'll likely want to move the ```<input>``` into its own component.  When doing this, we still want to manage state for the application in App, so we pass a handler function down into the new component for it to call when the input value is changed.  We're just passing the functionality of ```updateGreeting``` along here, first App passes it to GreetingInput.  GreetingInput is the middleman, translating the value from the input, and communicating that back up to App.

#### src/GreetingInput.js
```Javascript
import React, { Component } from 'react';

class GreetingInput extends Component {
  handleChange(e){
    this.props.updateGreeting(e.target.value)
  }

  render() {
    return (
      <input value={this.props.greeting} onChange={this.handleChange.bind(this)} />
    );
  }
}

export default GreetingInput;
```

Then up in App.js, we import GreetingInput, and pass our handler in

#### src/App.js
```Javascript
import React, { Component } from 'react';
import Header from './Header'
import GreetingInput from './GreetingInput'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: 'Bob'
    }
  }

  updateGreeting(greeting){
    this.setState({greeting: greeting})
  }
  render() {
    return (
      <div>
        <div>
          <Header greeting={this.state.greeting} />
        </div>
        <div>
          <GreetingInput greeting={this.state.greeting} updateGreeting={this.updateGreeting.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
```
