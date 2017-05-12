# Flux introduction


## React is a view layer

React doesn't provide a framework like Angular or Ember to build an application

## Flux is a pattern

Flux is not a framework, it is a pattern to build applications.  There are frameworks built on the pattern, but its easy enough to implement the flux pattern from scratch, and we'll learn something along the way.

![Flux Diagram](https://s3.amazonaws.com/learn-site/curriculum/React/flux.jpeg)

### Components
* React part of the application.
* Fire off actions based on user interactions
* Query store for information

### Actions
* Pipe action to dispatcher
* Can create multiple actions

### Dispatcher
* Communicate events
* Handles every single event
* Publishes it to every single subscriber
* Every store gets the opportunity to update

### Stores
* Data driving the application
* Can ignore dispatched actions
* Can update their data


## Review of State in Non-Flux application

## Add Emitter to Store
Component need to be able to listen to actions on Store

* EventsEmitter
  * Packaged with Node.js

* Store.on('change', doSomething)
  
(Build a store with fake data)
(add getAll method in store)
(Import store into component)
(Render initial state)
(Demo information coming from store)
