# Component State

Up until now, we've looked at components that are static chunks of html.  We
could have accomplished the same outcome using nothing more than a static html
file, and a bit of css.  The real power of React comes from its ability to
manage state changes in an application.  When users interact with our webpage,
state changes and the app needs to respond appropriately, perhaps many
different parts of our app need to update.  Things can get complicated pretty
quickly, but React makes managing this complexity easier, and really, really
fast to render in the browser.

Each component maintains its own state.  Whenever that state changes, the
component is re-rendered on the page, including all of its sub-components.
React has loads of optimizations to make this efficient in the browser, but the
component itself is re-rendered every time anything at all changes.  We'll look
closer at how React does this efficiently over the next few days.  For now, its
enough to know that changing the state of a component will cause it to be
updated every time, guaranteed.

## Set Component State

So, how do we manage state of a component as something separate from the
html markup?  Lets take another look at the MainContent component.  Here's
what we have so far:

```javascript

import React, { Component } from 'react';

class MainContent extends Component {
  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Client Side JavaScript</li>
          <li>Server Side JavaScript</li>
          <li>SQL</li>
        </ul>
      </div>
    );
  }
}

export default MainContent;

```

Notice how we have 3 links in there.  Let's pull them into the components
state, and build them dynamically inside of the render function.  React
components are JavaScript classes, which means that we can use
a constructor function to do initial setup.  That's a perfect place to
setup an initial state.

```javascript
...
class MainContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      topics: [
        {
          name: "HTML"
        },
        {
          name: "CSS"
        },
        {
          name: "Client Side Javascript"
        },
        {
          name: "Server Side Javascript"
        },
        {
          name: "SQL"
        },

      ]
    }
  }
...
```

Here we've added a constructor method to our component.  Notice that
'props' are passed into the constructor.  We'll be getting into what props
are in the next few lessons.  For now, know that React passes these into
the constructor for us, and we need to pass them along.  We're overriding
the parent `constructor()` method so we just pass them along to the parent
class that we inherit from.  If we forget to do this, React won't behave
how we expect. We call the parent constructor right away in our
constructor by calling `super(props)`.

Next we setup the state of our component by defining `this.state`.  We can
put anything we like in here that we want to access later on in the render
function.

And speaking of render, how do we use the component's state now that we
have it pulled out into a nice, easy to read array?

```javascript
...
  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          {this.state.topics.map((topic)=>{
            return (
              <li key={topic.name}>{topic.name}</li>
            )
          })}
        </ul>
      </div>
    );
  }
...
```

Notice the key attribute in `<li key={topic.name}>`.  This is required by
React whenever we are iterating over a list.  React needs to know how to
identify each component of the list by something unique, in our case, the
name of the link.  Try and remove the key attribute and when the page reloads your page you'll see an error in the console.

Here is the complete MainContent.js file

```javascript
import React, { Component } from 'react';

class MainContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      topics: [
        {
          name: "HTML"
        },
        {
          name: "CSS"
        },
        {
          name: "Client Side Javascript"
        },
        {
          name: "Server Side Javascript"
        },
        {
          name: "SQL"
        },

      ]
    }
  }
  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          {this.state.topics.map((topic)=>{
            return (
              <li key={topic.name}>{topic.name}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default MainContent;

```


## Change Component State

Now that we can manage the state of our component outside of the render function this opens up a world of new possibilities.  We can pass state around between components, or allow the user to update state by interacting with our app, for example.  We'll add some controls so that we can manage what topics are displayed.

### Removing a topic

We can add an action to each topic that allows us to remove it from the
list. Here is the component action that will update our state for us:

```javascript
  removeTopicClick(event){
    const indexToRemove = event.target.dataset.index
    const topics = this.state.topics.slice(0)
    topics.splice(indexToRemove, 1)
    this.setState({topics: topics})
  }
```

This operation is done in a functional style of programming, meaning that
we make a copy of the part of our state we want to modify first, before
updating it.  We then call `this.setState()` to update the components
state with the new value.  Every time the component notices that the state
has changed, the render function is called again, and the dom is updated
with our new list of topics.

Next we add a button to the render function to allow users to click on
topics they want to remove.  We have a list of topics, so we need to pass
along enough information to `removeTopicClick()` for it to know which
topic to take out of the list.  Event handlers in JavaScript capture that
information for us and put it into an event object, which it passes as an
argument to the handler.  

```javascript
  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          {this.state.topics.map((topic, index)=>{
            return (
              <li key={topic.name}>
                {topic.name}
                <button
                  onClick={(event) => this.removeTopicClick(event)} 
                  data-index={index}
                >X</button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
```

Notice the `data=index={index}` attribute on the button.  That is the
index of the element in the topic array.  In our `removeTopicClick()`
function, we can access that attribute from the target of the event `const
indexToRemove = event.target.dataset.index`.

There are many events available for DOM elements in Javascript.  `onClick` is
just the beginning.  Here's an example of a few more:

* onChange
* onKeydown
* onHover
* onTouch (for mobile)
* onSubmit (for forms)
* onMouseOver
* onLoad
* onUnload


