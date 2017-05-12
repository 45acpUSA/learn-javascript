# Promise Wrapping

Given you have the following two functions, wrap each in a new function that returns a promise, so you can chain them together.

```Javascript
function reverseText(text, callback){
  let splitText = text.split("")
  let reverseArray = splitText.reverse()
  callback(reverseArray.join(""))
}

function capitalizeText(text, callback){
  callback(text.toUpperCase())
}
```
## Story
As a user, I want to be able to reverse and capitalize my text
