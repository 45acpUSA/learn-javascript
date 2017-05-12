# Using React Router

Watch the video above to see why we are setting up our app in this way to use the React Router.

## Installing React-Router

We'll use yarn to install the react router.  Our app is a HTML based web app, so we use react-router-dom

```
$ npm install -g yarn
$ yarn add react-router-dom
```

## Architecture we're working towards
![Recipe Architecture](https://s3.amazonaws.com/learn-site/curriculum/React/recipes-architecture.png)

## Create a Recipe store

Before this refactor, our recipes were kept as state on the App component.  Now that we're moving to have multiple pages in the app, we want to move the recipes out to a data store so any page can access them that needs to.  Tomorrow, we're going to talk about Flux, which is a pattern to make managing data stores easier.  For now, we'll create a directory called 'store', and a module there called 'Recipes'.  This will allow us to access the list of recipes from any route that needs them

#### src/store/Recipes.js
```Javascript
const recipes = [
  {
    id: 1,
    name: 'Mac & cheese'
  },
  {
    id: 2,
    name: 'Tofu Burgrer'
  }
]

export default recipes
```

## Rename Recipes to RecipeIndex

Now that we have a Recipe store, and we'll soon have a Recipe detail page, its somewhat confusing to have a 'Recipes' component.  Let's rename it to 'RecipesIndex'

#### src/RecipeIndex.js (was Recipes.js)
```Javascript
import React, { Component } from 'react'

class RecipeIndex extends Component {
  render() {
    return (
      <ul>
        <li>Recipe 1</li>
        <li>Recipe 2</li>
      </ul>
    );
  }
}

export default RecipeIndex;
````

Then in App.js, we need to use the renamed component

#### src/App.js
```Javascript
import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import RecipeIndex from './RecipeIndex'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header name='Bob' />
          <div>
            <RecipeIndex />
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
```

## React Router
Then, in the main App component, we setup the router to navigate be able to navigate to both pages:

#### src/App.js
```Javascript
import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import RecipeIndex from './RecipeIndex'
import RecipeDetail from './RecipeDetail'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header name='Bob' />
            <Route exact path="/" component={RecipeIndex} />
            <Route path='/recipes/:id' component={RecipeDetail} />
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
```

## Add Links in RecipeIndex
Link is a component provided by ReactRouter to create links between pages in our app.  Once we import it, we can use it like any other component.  We'll need to add links for each recipe in the RecipeIndex component, and then a link back to the home page from the detail pages.

#### src/RecipeIndex.js
```Javascript
import React, { Component } from 'react'
import Recipes from './store/Recipes'
import {Link} from 'react-router-dom'

class RecipeIndex extends Component {
  componentWillMount(){
    this.setState({recipes: Recipes})
  }
  render() {
    let list = this.state.recipes.map(function(recipe){
      return(
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`} >
            {recipe.name}
          </Link>
        </li>
      )
    })
    return (
      <ul>
        {list} 
      </ul>
    );
  }
}

export default RecipeIndex;
```



## Add a detail page

Our app has a home page, and a recipe detail page.  We create a new component to be the main component for the detail page called ```RecipeDetail```

#### src/RecipeDetail.js
```Javascript
import React, { Component } from 'react'
import Recipes from './store/Recipes'
import {Link} from 'react-router-dom'

class RecipeDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipes: Recipes
    }
  }
  componentWillMount(){
    const id = this.props.match.params.id
    this.setState({recipeId: id})
    let recipe = this.state.recipes.find(function(listing){
      return listing.id === parseInt(id)
    })
    if(recipe){
      this.setState({recipe: recipe})
    }
  }

  render() {
    return (
      <div>
        <Link to='/'>Home</Link> 
        <h2>{this.state.recipe.name}</h2>
      </div>
    );
  }
}

export default RecipeDetail;
```


