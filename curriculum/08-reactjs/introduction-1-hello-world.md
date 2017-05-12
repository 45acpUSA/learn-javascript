# ReactJS

## What is Reactjs?

React is a Javascript library for building user interfaces.  We can use it to
build webpages, mobile web pages, and even native mobile applications.  It is
component based, which means that we use it to build many small parts, and then
join them together to form entire applications.  This turns out to be extremely
scalable.  It was created from Facebook as that application grew and
became more dynamic.

## Read the docs

React has great documentation for just starting with the framework, and as you grow into bigger and more complex applications.  You'll want to bookmark their documentation, and refer to it often.

[React Documentation](https://facebook.github.io/react/)

## What does a React Webpage look like?

We'll start with an app that is composed of just a single component, and from
there build out more useful and engaging features for our users.  Everything in React is a component, from the outer most container of the whole page, to a single line of text or button, its all components, and every component that is visible on the page has a render function.

Here's a complete React application, containing just one component, with one line of text:

#### public/index.html
```HTML
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

In the HTML file, the entire app renders into one element on the page.  In our example, we give the div an id of 'app' so we can find it later.

#### src/App.js
```Javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <h1>Hello LEARN</h1>
    );
  }
}

export default App;
```

#### src/index.js
```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```


