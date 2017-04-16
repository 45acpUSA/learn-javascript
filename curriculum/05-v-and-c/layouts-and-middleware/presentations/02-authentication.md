#  Authentication

Authentication is knowing what user is accessing the application.  For most web and mobile applications, this starts with the ability to log in.  There are many ways to authenticate a user, and keep track of them.  The most common is session/cookie based.  When the user successfully logs in, a cookie is set in their browser, and then for each request afterwards, the server reads that cookie to determine who the user is making the request.  Cookies are automatically sent by the browser with each request.

This may sound complicated, and it is, but fortunately Express (like most all frameworks) has some npm modules that make the interaction much, much simpler for programmers to implement. We'll be using 'express-authentication' for this demo.

Let's jump in and see how login works in an Express application.  We'll store user information in a flat file again, but normally, you would keep this information in the database.

In this presentation, we'll cover:

* Login
* Protecting sensitive pages
* Registering new users
* Securing Passwords with salt and hashing algorithms
* User specific data

### Setup a new Express Project

Time to create a new application, so first make a directory called 'authentication-example'

```
```

We're going to use the NPM package passport for authentication, a layout and ejs to make things simple.  So when we setup the app, we add those in right away

```
$ cd authentication-example 
$ npm init
$ npm install express ejs express-ejs-layouts express-session cookie-parser body-parser passport passport-local connect-ensure-login --save
```

### About Passport

Passport provides the ability for us to verify users of the application, and redirect appropriately if they are not logged in.  It currently supports more than 300 different ways to log in, including username/password, Google, Github, Tumbler, and many many more.  

[More about Passport, and all the Strategies here](http://passportjs.org/)

### Login

For our app, we're going to support username/password for login, so we need a Login screen, which is a form just like the ones we've worked with before.  One new thing is that instead of an input type of 'text', our input type will be 'password'.  This input behaves exactly the same as 'text', except that browsers know to mask the data users enter into it.  You likely recall seeing this behavior before when logging into just about everything.

Here's the HTML for the login page.

```HTML
```

Back in ```app.js``` we need to routes to handle login.  The first one shows the login page, and the second process login information.

```Javascript
```

That's all there is to logging in.  Its the same as the forms that we are already used to working with.  

### Protecting Sensitive Pages

### Registering New Users

### Secure Passwords

### Showing User specific data
