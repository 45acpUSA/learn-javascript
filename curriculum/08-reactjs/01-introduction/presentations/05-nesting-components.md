# Nesting Components
<iframe src="https://player.vimeo.com/video/216356133" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Components are composed of other components nested inside of them.  To nest a component, we first import it, and then we can use it in our render function.  In this example, we're building an 'App' Component that has three nested components inside of it.

![Nested Components](https://s3.amazonaws.com/learn-site/curriculum/React/nested-components.png)

## Add the Header to App

#### src/App.js
```
import React, { Component } from 'react';
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
      </div>
    );
  }
}

export default App;
```

#### src/Header.js
```
import React, { Component } from 'react'

class Header extends Component{
  render(){
    return(
      <div>
        <h1>Header</h1>
      </div>
    )
  }
}

export default Header;
```

## Add Recipes

Adding the Recipes component is a repeat of the same steps, create the component, import it into App, and use in the JSX.

#### src/App.js
```
import React, { Component } from 'react';
import Header from './Header'
import Recipes from './Recipes'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Recipes />
        </div>
      </div>
    );
  }
}

export default App;
```

#### src/Recipes.js
```Javascript
import React, { Component } from 'react'

class Recipes extends Component{
  render(){
    return(
      <ul>
        <li>Recipe 1</li>
        <li>Recipe 2</li>
      </ul>
    )
  }
}

export default Recipes
```

## Add Footer 
Repeat the process for the Footer

#### src/App.js
```
import React, { Component } from 'react';
import Header from './Header'
import Recipes from './Recipes'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
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

#### src/Footer.js
```Javascript
import React, { Component } from 'react'

class Footer extends Component{
  render(){
    return(
      <div>
        LEARN Academy Inc.
        2017
      </div>
    )
  }
}

export default Footer
```

