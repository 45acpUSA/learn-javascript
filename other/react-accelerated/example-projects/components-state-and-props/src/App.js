import React, { Component } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import MainContent from './MainContent'

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      projects: [
        {
          name: 'Project 1',
          description: "An introduction to programming.  Making HTML beautiful, and interesting.",
          anchor: '#'
        },
        {
          name: 'Project 2',
          description: "Engaging content through Javascript",
          anchor: '#'
        },
        {
          name: 'Project 3',
          description: "Bringing it all together.",
          anchor: '#'
        }
      ]
    }
  }
  render() {
    return (
      <div className='app-container'>
        <div className='app-header'>
          <Header></Header>
        </div>
        <div className='app-main-content'>
          <div className='app-navigation'>
            <Navigation links={this.state.projects}></Navigation>
          </div>
          <div className='app-projects'>
            <MainContent projects={this.state.projects}></MainContent>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
