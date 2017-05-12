# State and Component Lifecycle

##  ```setState()```

In the past few examples, we've been modifying the state of components in the constructor by setting up an initial state when the component is created.  To do so, we create the state directly like this:

```Javascript
constructor(props){
  super(props)
  this.state = {
    recipes: [
      {name: 'Mac & Cheese'},
      {name: 'Tofu Burger'}
    ]
  }
}
```

The constructor is actually the only place where we can set state like that because no state exists before the constructor is called.  Whenever else we want to manipulate the state of a component, we need to call ```this.setState()```.  Lets look at an example straight from the React Docs:

```Javascript
//wrong
this.state.comment = 'Hello'
```

Instead, use ```setState()```
```Javascript
//correct
this.setState({comment: 'Hello'})
```

Using ```setState()``` correctly allows React to hook into the lifecycle of the component, and allows it to make sure that the component is updated correctly and things stay consistent between the code and the view that the user sees.

## Component Lifecycle
So what do we mean when we talk about the 'lifecycle of a component'?  

Every component in an application has a lifecycle that it proceeds throug as the app is running.  It starts from nothingness, is created, mounts into the app, is updated, unmounts, and is eventually destroyed.  React provides callbacks for each of these events that allow us to modify what happens within the component.  Let's look at just one of these callbacks first ```componentWillMount()``` and then we'll cover the rest.

## ```componentWillMount()```

Returning to our Recipes app, recall that we have a main component that looks like this:
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
        <Header name='Bob' />
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

We add ```compnentWillMount()``` to Header, and watch the console in the browser for its output
#### src/Header.js
```Javascript
import React, { Component } from 'react';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: 'hello'
    }
    console.log('In Constructor')
  }

  componentWillMount(){
    console.log('In componentWillMount', this.state, this.props)
  }

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

Here are the other lifecycle callbacks

#### src/Header.js
```Javascript
import React, { Component } from 'react';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: 'hello'
    }
    console.log('In Constructor')
  }

  componentWillMount(){
    console.log('In componentWillMount', this.state, this.props)
  }

  componentDidMount(){
    console.log('In componentDidMount', this.state)
  }

  componentWillReceiveProps(){
  }

  componentWillUpdate(){
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

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
