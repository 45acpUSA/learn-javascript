import React, { Component } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import MainContent from './MainContent'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <div className='app-header'>
          <Header></Header>
        </div>
        <div className='app-main-content'>
          <div className='app-navigation'>
            <Navigation></Navigation>
          </div>
          <div className='app-projects'>
            <MainContent></MainContent>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
