import React, { Component } from 'react';

class MainContent extends Component {
  render() {
    return (
      <div className='main-content'>
        <p>Welcome to my Portfolio.  I've been busy, so there is a lot to see here.</p>
        <h4>We've covered</h4>
        <ul>
          {this.props.projects.map((project)=>{
            return (
              <li key={project.name}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default MainContent;

