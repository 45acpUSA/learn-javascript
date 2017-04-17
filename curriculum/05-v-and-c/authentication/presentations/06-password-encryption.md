# Password Protection

We also said that we would revisit encrypting passwords, so our user data stays safe and secure.  Passwords are encrypted using one way encryption.  This means that once they are encrypted, they can't be decrypted again.  Instead, whenever we need to verify that a password given by the user at login is correct, we encrypt it as well using the same technique, and verify that the encrypted values match.

First, let's add the 'bcrypt' module to our application, then we'll look at how it works.

```
$ npm install bcrypt --save
```

All encryption belongs in the UserStore, so we can access from wherever we need too.  Add it as a required module at the top
```
// ./stores/UserStore.js

let bcrypt = require('bcrypt')
```

## Bcrypt

To encrypt a password, we use a method called ```bcrypt.hash()```.  It takes 3 arguments, the string to encrypt, the number of passes to make (more is safer, but CPU intensive), and a callback for when the encryption is complete.

When we get a new password, this is how we'll store it:
```Javascript
bcrypt.hash('password', 5, function( err, bcryptedPassword) {
   //save to db
});
```

Then, to compare a password when logging in:
```Javascript
var hash = //get from data store;
bcrypt.compare(userSuppliedPassword, hash, function(err, doesMatch){
  if (doesMatch){
     //log him in
  }else{
     //go away
  }
 });
 ```

## Add Bcrypt to the app

First step, lets clear the user-data.json file.  We'll need to replace all the existing passwords with encrypted versions.  It should look like:

```
[]
```

In UserStore.js, lets encrypt passwords before saving them.  We add the private function to do the encryption:

```Javascript
./stores/UserStore.js

function encryptPassword(password, callback){
  return bcrypt.hashSync(password, 5)
}

```

And then can use it in ```adduser(userAttributes)```, again in UserStore.js

```Javascript
// ./stores/UserStore.js

module.exports.addUser = function(userAttributes){
  let invalidCheck = userIsInvalid(userAttributes)
  if(invalidCheck == false ){
    //encrypt password
    userAttributes.password = encryptPassword(userAttributes.password)

    let users = userData()
    users.push(userAttributes)
    save(users)
    return true
  }else{
    return invalidCheck  
  }
}

```

Comparing user supplied password on login happens in the Passport verify method that we setup.  Once the user has logged in, the user key is saved into the session, and we don't have to do the comparison on each subsequent page load.

In UserStore.js, we add an exported method to do the comparison:

```Javascript
// ./stores/UserStore.js

module.exports.doPasswordsMatch = function(userSuppliedPassword, encryptedPassword){
  return bcrypt.compareSync(userSuppliedPassword, encryptedPassword)
}
````

Then, in app.js, after requiring it

```Javascript
// ./app.js


let doPasswordsMatch = require('./stores/UserStore').doPasswordsMatch
```

We call it in the function setup for our LocalStrategy:

```Javascript
// ./app.js

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    let user = findByEmail(email)
    if(user && doPasswordsMatch(password,user.password)){
      return done(null, user)
    }else{
      return done(null, false)
    }
  }
))
```


