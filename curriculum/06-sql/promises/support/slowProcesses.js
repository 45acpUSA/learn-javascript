function processDelayedBySeconds(seconds){
  let miliseconds = seconds * 1000
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("Resolved after " + seconds + " seconds.")
    }, miliseconds)
  })
}

processDelayedBySeconds(4).then(function(response){
  console.log(response)
})
processDelayedBySeconds(1).then(function(response){
  console.log(response)
})
processDelayedBySeconds(3).then(function(response){
  console.log(response)
})
