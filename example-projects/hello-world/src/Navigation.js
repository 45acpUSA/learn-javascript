import React, { Component } from 'react'

import './Navigation.css'

class Navigation extends Component {
  constructor(props){
    super(props)
    this.state = {
      links: [
        {
          name: 'Project 1',
          path: '#'
        },
        {
          name: 'Project 2',
          path: '#'
        },
        {
          name: 'Project 3',
          path: '#'
        }
      ]
    }
  }

  render() {
    return (
      <div className='navigation'>
        <ul>
          {this.state.links.map((link)=> {
            return(
              <li key={link.name}>
                <a href="{link.path}">{link.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Navigation;
