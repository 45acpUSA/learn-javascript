# Funny Cat

## Fetch

Fetch is a new standard to fetch urls over the network using promises.  We can use it to get any data we like from our own web applications, or even other apis available on the internet.  In this challenge, we'll use it to fetch interesting Gif animations from Giphy.  

Fetch is available as a node module: ```npm install node-fetch --save```

To complete this challenge, you'll want to go and read the documentation on Fetch.  A good place to start is the NPM website

[NPM - node-fetch](https://www.npmjs.com/package/node-fetch)

## Example Giphy request

Giphy requests require an api_key.  You can use this one:

> http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

## Challenge

### Epic
Create a web application that fetches funny Gifs from Giphy and displays them to the user.

### Stories
As a user, I can go to the web application and view funny pictures of cats.

### Stretch Story
As a user, I can enter search terms to find funny Gifs of anything I choose.
As a user, I should see the last thing I searched for prepopulate the search box.

Hint:  If you want to use the same endpoint in your express app, instead of ```app.get('/', function)```, use ```app.all('/', function)```
