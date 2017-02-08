##Components

Let's start building out a portfolio application using React so that we
have a place to show off all of the great work we've been doing in class.
To do this, we're going to build several new components, and nest them
within other components until we have a full featured webpage.

Add a new file the the ./src directory called header.js

```
$ atom ./src/Header.js
```

```javascript
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>My LEARN Portfolio</h1>
      </div>
    );
  }
}

export default Header;
```

Then, back in App.js, we can use our new component

```javascript
import React, { Component } from 'react'

// We import our header the same way as functions we get from React
import Header from './Header'

class App extends Component {
  render() {
    return (
      // Our render function has access to the Header component, and can
      // use it like a normal HTML element
      <Header></Header>
    );
  }
}

export default App;
```

Now we'll create two more components to start building out the page,
navigation and main content.  First up, a navigation menu.  For now, lets
put in some placeholder links.  We can make them active a bit later on
when we get more content onto the page.

```javascript
// .src/Navigation.js

import React, { Component } from 'react'

import './Navigation.css'

class Navigation extends Component {
  render() {
    return (
      <div className='navigation'>
        <ul>
          <li>
            <a href="#">Project 1</a>
          </li>
          <li>
            <a href="#">Project 2</a>
          </li>
          <li>
            <a href="#">Project 3</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navigation;
```

The MainContent component also has placeholder text for now.

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

Next, we update App.js to import and use our new components

```javascript
import React, { Component } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import MainContent from './MainContent'

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Navigation></Navigation>
        <MainContent></MainContent>
      </div>
    );
  }
}

export default App;
```

!(React Components)[../assets/reactjs-introduction/basic-components.png]


