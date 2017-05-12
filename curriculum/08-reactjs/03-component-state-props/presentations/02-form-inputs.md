# Form Inputs

## Controlled Components

When we provide both the ```value={}``` and ```onChange={}``` props for form fields, the component is known as a `controlled component`.  React is fully in control of the behavior of the input, textarea, or select.  Its possible to build forms that are uncontrolled, but not recommended because it can be challenging to reason about what is happenening between the input, form, and React component.  Better to let the React component be 100% in charge of maintaining state within the form.

## Text Input

Take a look at the following form component, complete with a submit button:

```Javascript
import React, { Component } from 'react'

class UserDataForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      hometown: ''
    }
  }

  handleUpdate(event){
    const target = event.target
    const attribute = target.name
    const value = target.value
    this.setState({[attribute]: value})
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
            name='hometown' 
            value={this.state.hometown} 
            onChange={this.handleUpdate.bind(this)} 
          />

          <br />
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default UserDataForm;
```

We start with the input.

```Javascript
<input 
  name='hometown'   // <-- passed with the onChange event, so the handler can handle the change appropriatly
  value={this.state.hometown} 
  onChange={this.handleUpdate.bind(this)} 
/>
```

Here, we've included a name for the input, which will be passed along when ```onChange()``` fires, sending the name of the input to the handler function.  Our handler function can then update the propper attribute in the components state.

```Javascript
handleUpdate(event){
  const target = event.target
  const attribute = target.name
  const value = target.value
  this.setState({[attribute]: value})
}
```
In the handleUpdate, we pull the value and the name of the input off of the target of the event so we can set state appropriatly.  When we're finally ready to ```setState()```, we then evaluate the attribute by placing it in ```[variable]``` 

```Javascript
this.setState({[attribute]: value})
```

## Textarea
```Javascript
<textarea
  name='description'
  value={this.state.description}
  onChange={this.handleUpdate.bind(this)} 
/>
```

A controlled textarea input work the same as text inputs.  To use them, we set the 'name', 'value', and 'onChange' props.

## Select
To use a Select, we again set the 'name', 'value', and 'onChange' props, nesting any options we need.

```Javascript
<select 
  name='pet' 
  value={this.state.pet} 
  onChange={this.handleUpdate.bind(this)} 
>
  <option></option>
  <option value='Dog'>Dog</option>
  <option value='Cat'>Cat</option>
</select>
```

## Radio Buttons
```Javascript
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
```
Radio buttons have a ```checked``` prop that determines if the button is selected, and we need need our component to be in control over it.  Otherwise, they are handled exactly the same in the ```handleUpdate(event)``` handler.  When the user selects one, the target of the event is sent along with a 'name', and 'value' so we can update state appropriatly.

## Checkboxes
```Javascript
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
```

Checkboxes work somewhat differently from text and radio inputs.  They don't have a value, but instead have a 'checked' attribute, and it is always either ```true``` or ```false```.  We get control over a checkbox by setting the ```checked``` and ```onChange``` props, and then in the handler, we need to look at the ```checked``` attribute from the target:

```Javascript
handleLanguageChange(event){
  const target = event.target
  const attribute = target.name
  const value = target.checked

  const languages = this.state.languages
  languages[attribute] = value
  this.setState({languages: languages})
}
```

