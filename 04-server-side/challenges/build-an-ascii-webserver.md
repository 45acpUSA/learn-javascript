## Building an ASCII Webserver

In this exercise we are going to build an ASCII art webserver and share our creativity with the entire internet

### Story
As the internet, I want to be dazzled with cool ASCII artwork

### Tasks
- Create a new directory called ascii-webserver
- use ```npm init``` to create a new Node.js project and package.json file
- Install the asciify node module
- Create a new webserver, and make sure it functions correctly
- replace the contents of ```http.createServer``` function with the ```asciify``` method and call ```response``` from the callback passed into ```asciify```
