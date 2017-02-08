##Notes

any function without an explicit return, returns undefined
anonymous functions
assigning functions to variables


##CodeSchool
V8 JavaScript Runtime
Node is a wrapper around V8

What can you do with Node
- Websocket Server
- File Upload Client
- Content Server
- Real-Time Data Applications

Node is single threaded
Blocking Code vs. Non Blocking
- using callbacks to be non-blocking
- timeline examples

Requiring files in Node

http.createServer
- Event Loop
- registers: request, connection, close


##Traversy Media
###Syllabus
* What is Node.js & how does it work
* Installing Node.js
* Using the REPL
* NPM - Node Package Manager
* How modules work
* package.json
* http.createServer

###What is Node.js
- V8 JavaScript engine
- Node is Javascript running on the server
- Event-driven non-blocking I/O model

###Non-blocking Event Loop
- single thread
- concurrency via callbacks
- EventEmitter class binds events to listeners

###What is Node.js used to build
- REST APIs
- Real-Time services
- Blog, CMS
- Utilities & Tools
- Non-CPU expensive programs

###NPM
- Node.js Package Manager
- Manages node programs/modules
- Manages dependencies between modules
- node_modules folder
- Examples of NPM Modules (there are thousands)
  - Express - Web development framework
  - Socket.io - websockets
  - Pug / Jade - Templating engine
  - Mongo / Mongoose - Database wrappers

###package.json file
- root of project
- meta data for application
- NPM package dependencies
- $npm init

###REPL
- very similar to console in Chrome
- multi-line commands
- create functions
- no DOM

###Build a Node application
- command line
- npm init
- build a web server
  - http.createServer
  - http is a core module
  - status code 200
  - setHeader
  - output content
  - server.listen

