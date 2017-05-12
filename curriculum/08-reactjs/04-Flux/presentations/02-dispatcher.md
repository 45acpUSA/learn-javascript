# Flux Dispatcher
![Flux Dispatcher](https://s3.amazonaws.com/learn-site/curriculum/React/flux-dispatcher.jpeg)

Flux is a new pattern, but once we understand it, it makes our app much simpler

(Add create method in store)
(Emit change event)

## componentWillMount
* First first time, and first time only when component mounts
(Add on('CHANGE', doSomething))

* actions are UPPERCASE by default

## Adding a Dispatcher

(yarn add flux)

(import {Dispatcher} from 'flux')

(Register Store as listener dispatcher.register)

(dispatcher.dispatch in Actions)

(handle actions)

(console example)

(flush out handleActions() in store)


