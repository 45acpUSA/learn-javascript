function reverseText(text, callback){
  let splitText = text.split("")
  let reverseArray = splitText.reverse()
  callback(reverseArray.join(""))
}

function capitalizeText(text, callback){
  callback(text.toUpperCase())
}

reverseText('Hello World', function(text){
  console.log(text)
})
capitalizeText('HellO world', function(text){
  console.log(text)
})
