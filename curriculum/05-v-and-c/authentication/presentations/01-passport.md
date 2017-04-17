# User Identity
We now have all the tools in our toolbox to maintain a user session, and collect information from our users.  That means we're ready to tackle one of the main challenges facing nearly every application on the internet.  How do we manage the identity of our users?  How do we make sure that who the person is claiming to be is actually who they are, and that we don't mistakenly show them private information belonging to another user?  As you may have guessed, the answer lies with using cookies and maintaining a session.

## Application Architecture
We're going to be building a new application in this lesson, and its worth taking a moment up front to plan out the application architecture, thinking about what pages we'll have that require the user to be logged in, what pages require the user to be logged out, and what pages are available to users in both states.  These decisions are different for each individual application, so its a good habit to get into to draw our initial plan out quickly to make sure that it is viable, and it meets the needs of our stakeholders and users.

Here's the plan for the authentication-example app we're about to build

![architecture](https://s3.amazonaws.com/learn-site/curriculum/authentication-architecture.png)

In this app, we have two main pages, a homepage, and a secret page.  The homepage is accessible for users who are not logged in, and also users who have logged in.  The secret page is only available to users who have logged in, and will show them account information.  Then there are the login and registration pages that are only available to logged out users.  Finally, the log out page is only useful if a user is already logged in.

From the diagram, we can see that we have 7 routes to build.  Now we can start think deeper about each of these individual routes, and what actions the need to perform.

### app.get('/',..)
The home page has:
* information about the application for non-logged in users
* a link to the login page if user is not logged in
* a link to the secret page if the user is logged in
* a link to logout page if the user is logged in

### app.get('/login',..)
The login page has:
* a form for the user to login
* a link to the registration page if the user is new

### app.post('/login',..)
The form handler for login:
* logs user in on success
* does not log user in on failure
* allows retry on failure
* redirects to '/secret' on success

### app.get('/register',..)
The registration page has:
* a form for the user to register
* a link for the user to go to login

### app.post('/register',..)
The form handler for registration
* creates a new account on success
* logs the user in on success
* allows retry on failure
* redirects to '/secret' on success

### app.get('/secret')
The secret page has:
* Information about the user
* a link to logout
* a link to the homepage

### app.get('/logout')
The logout route:
* logs the user out
* redirects to the home page


## TDD
So now we've broken our application down into 7 pieces of functionality, and laid out the required behavior of each.  We're in a great position to do Test Driven Development, confident that if we write one or two tests for each requirement, we'll have a functioning app.

For this demo, we won't do TDD, so that we can focus on the topic of authentication.  If this were a real project we would, and you should for your challenges.
