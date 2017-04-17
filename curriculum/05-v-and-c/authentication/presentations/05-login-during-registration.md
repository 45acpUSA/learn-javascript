# Login during registration

Remember when we added logging in during registration to our todo list?  That time has come.  Let's cross it off our list!

Passport added a ```request.login()``` method for us to use for exactly this purpose.  We can call it after a successful registration, and send the user on their way.  In app.js

```Javascript
app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
  
    let addResponse = addUser(userAttributes) // true or array of errors
    if(addResponse == true){
      request.login(userAttributes, (error)=>{
        if(error){
          response.render('register', { 'errors': error })
        }else{
          response.redirect('/secret') 
        }
      })
    }else{
      response.render('register', { 'errors': addResponse })
    }
  })
```
