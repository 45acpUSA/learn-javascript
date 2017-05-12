# Submitting a Form

Up until the user submits the form, the state of the form is managed internally in the component.  When the user presses submit, the component needs to process the results of the interaction.  The default behavior of a form in a web browser is to submit the request back to a server, and reload the page with the server's response.  With React, we want to replace the default behavior with an experience that we control from within the React app itself.

Imagine this component:

```Javascript
import React, { Component } from 'react'

class UserDataForm extends Component {
  handleSubmit(event){
    //Do what we need to with the results of the form
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <!-- Form Inputs -->
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default UserDataForm;
```

Just like inputs have an ```onChange``` prop, forms have callback behaviors as well.  In this case, we're hooking into ```onSubmit```
```Javascript
<form onSubmit={this.handleSubmit.bind(this)} >
  <!-- Form Inputs -->
  <input type='submit' value='Submit' />
</form>
```

In the handler, we can do whatever we need to with the user input.  We'd likely want to check that the user entered correct values (validation), and then pass along the results.  Finally, we need to call ```event.preventDefault()``` to prevent the submit event from performing its default action, which is attempting to send a request to the server.

```Javascript
handleSubmit(event){
  //Do what we need to with the results of the form
  event.preventDefault()
}
```

