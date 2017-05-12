#Managing Forms in React

Let's consider the case where we want a complete form in our child component.  We want to capture a users input, and relay that information back to the 'smart' component when the user presses the submit button.

![smart-dumb](https://s3.amazonaws.com/learn-site/curriculum/React/smart-dumb.jpeg)

This app has one main component to manage overall state, and two 'dumb' components that work with the form and display the user input after it is submitted.  To accomplish this, we setup the state on the Main App component, and then pass it along in a prop to the UserDataForm, and UserData component.

#### src/App.js

```Javascript
import React, { Component } from 'react'
import UserDataForm from './UserDataForm'
import UserData from './UserData'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData: {
        name: '',
        description: '',
        pet: '',
        languages: {
          javascript: false,
          python: false
        },
        education: ''
      }
    }
  }
  userDataUpdated(userData){
    this.setState({userData: userData})
  }
  render() {
    return (
      <div>
        <UserDataForm 
          userData={this.state.userData} 
          userDataUpdated={this.userDataUpdated.bind(this)}
        />
        <UserData userData={this.state.userData} />
      </div>
    );
  }
}

export default App;
```

```<UserDataForm />``` also needs a handler passed in to update the state on App when the user submits the form.

```<UserDataForm />``` manages some internal state to provide a good user experience for the form, and then when its time to submit the form, it simply calls the handler it was passed via props.

#### src/UserDataForm.js
```Javascript
import React, { Component } from 'react'

class UserDataForm extends Component {
  constructor(props){
    super(props)
    this.state = props.userData
  }

  handleUpdate(event){

    const target = event.target
    const attribute = target.name
    const value = target.value
    this.setState({[attribute]: value})
  }

  handleLanguageChange(event){
    const target = event.target
    const attribute = target.name
    const value = target.checked

    const languages = this.state.languages
    languages[attribute] = value
    this.setState({languages: languages})
  }

  handleSubmit(event){
    this.props.userDataUpdated(this.state)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <h3>Text Input</h3>
          <label>Name</label>
          <br />
          <input 
            name='name' 
            value={this.state.name} 
            onChange={this.handleUpdate.bind(this)} />

          <h3>Textarea</h3>
          <label>Description</label>
          <br />
          <textarea
            name='description'
            value={this.state.description}
            onChange={this.handleUpdate.bind(this)} />

          <h3>Select</h3>
          <label>Pet</label>
          <br />
          <select 
            name='pet' 
            value={this.state.pet} 
            onChange={this.handleUpdate.bind(this)} 
          >
            <option></option>
            <option value='Dog'>Dog</option>
            <option value='Cat'>Cat</option>
          </select>

          <h3>Radio</h3>
          <label>Education</label>
          <br />
          <input 
            type='radio'
            name='education' 
            value="High School" 
            checked={this.state.education === 'High School'} 
            onChange={this.handleUpdate.bind(this)} 
          />
          High School
          <br />
          <input 
            type='radio'
            name='education' 
            value="College" 
            checked={this.state.education === 'College'} 
            onChange={this.handleUpdate.bind(this)}
          />
          College

          <h3>Checkboxes</h3>
          <label>Programming Languages</label>
          <br />
          <input
            type='checkbox'
            name='javascript'
            checked={this.state.languages.javascript}
            onChange={this.handleLanguageChange.bind(this)}
          />
          Javascript
          <br />
          <input
            type='checkbox'
            name='python'
            checked={this.state.languages.python}
            onChange={this.handleLanguageChange.bind(this)}
          />
          Python

          <br />
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default UserDataForm;
```

```<UserData />``` displays user data that is passed into it via props

#### src/UserData.js
```Javascript
import React, { Component } from 'react'

class UserData extends Component {
  render() {
    const userData = this.props.userData
    let languages = []
    for(var language in userData.languages){
      languages.push(
        <li key={language}>{language}: {userData.languages[language] ? 'Yes' : 'No'}</li>
      )
    }
    return (
      <div>
        <h3>User Data</h3>
        <ul>
          <li>Name: {userData.name}</li> 
          <li>Description: {userData.description}</li>
          <li>Pet: {userData.pet}</li>
          <li>Education: {userData.education}</li>
          <li>Languages: 
            <ul>
              {languages}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserData;
```

## Summary

To summarize what we have accomplished here, we've built 3 components, each of them with a single responsibility.  The UserDataForm manages the form.  It doesn't care what happens to the results of the user submitting the form, only that the user has a good experience filling out the form.  The UserData component similarity is only concerned with displaying the data.  It doesn't care where that data comes from.  The App component is also only concerned with one thing, and that is the user data itself.  Its responsible for maintaining the main state of our application.

By structuring our application this way, we've simplified each component, made them testable as stand along objects, and opened up the possibility for us to reuse the components.  Anywhere we need to show user data in the application, we have a component ready to drop into place.


