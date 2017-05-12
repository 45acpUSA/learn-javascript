# Single Page web applications

## Server Side vs. Client Side webapps
We've gotten quite familiar with building applications in Express.  An Express application typically has several routes, each with their own template that is served out to the user as they interact with the website.  With this structure, the code that runs in the browser contains very little, if any of the code that runs the app, other than the view itself.  Each time a user interacts with the page, a request is sent back to the server for processing, and a new page is sent back to the browser.

Now, we're going to turn our attention to React, which builds on a brand new paradigm known as 'client side', or 'single page' application.  With a client side application, all the views and code required to handle webpage interactions is served to the browser at once.  As the user clicks around, interacts with page elements, or whatever else they may be able to do, the code to handle that is all run right in the browser.  The only time a single page app needs to interact with the server is when data needs to be fetched or saved.

![single page app](https://s3.amazonaws.com/learn-site/curriculum/React/single-page-app.png)

## In a Single Page App
* All interaction happens in the browser
* Data instead of HTML is sent to and from the server
* Feedback for the user is immediate

## Benefits of a Single Page Application

A Single page app is very responsive to user input.  There is no request that needs to travel across the internet for most user interactions, so the page feels 'snappy'.  Additionally, because all were sending to and from the server is pure data (JSON), those requests happen much quicker.  

## New Challenges with Single Page Applications

While the benefits of a single page app are many, there are additional challenges that we as developers must consider when building them.  With traditional applications, all the logic for the app lives in once place, on the server.  In single page apps, we now have to deal with logic being in both server and browser, and how to keep them in sync.  We also need to be careful when building single page applications not to break the behaviors that users expect from our websites.  Its very easy, for example, to build a single page app that breaks the back button functionality because as far as the browser knows, its only loaded a single page and we're mimicking changing pages in our code.  If we don't also manage how the back button works as users switch between virtual pages in our app, they will be come frustrated.


## Sever Side vs. Client Side
|Topic | Server Side | Client Side |
| -----| ----------- | ---------------|
| Routing | Express Router | React Router |
| Validations | Validate on server only | validate on client and server |
| Server Communication | Use Form attributes in Post | Use JSON for form data |
| Patterns | MVC Pattern | Components, State, & Props |
| Coding Style | Object Oriented Programming | Functional Programming |
| Data Patterns | SQL / ORM | Flux |


## React gives us patterns to build single page apps

Fortunately, React provides us with patterns to manage data between client and server, as well as facilitating expected user interactions with our app.

Its still easy to make mistakes when using React that would confuse our users, but its even easier to do things the right way, creating very responsive applications that delight our users.  We just need to learn a few principles of React and apply them every time to be successful.

The next few presentations will go over these principles in detail, and then at the end we'll sum them up in a checklist for you to reference every time you are building a new application.  We're going to cover:

## What we'll look at using React
* Components, State & Props
* Routing between pages the right way
* Managing data between client and server
* Functional programming
* Managing data in a React app using Flux
