import React, { Component } from 'react'

import './Navigation.css'

class Navigation extends Component {
  render() {
    return (
      <div className='navigation'>
        <ul>
          {this.props.links.map((link)=> {
            return(
              <li key={link.name}>
                <a href="{link.anchor}">{link.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Navigation;
