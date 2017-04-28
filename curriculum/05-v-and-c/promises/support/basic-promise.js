let myPromise = new Promise(function(resolve, reject){
  let isSuccess = true

  if(isSuccess){
    resolve("the data")
  }else{
    reject("reason it failed") 
  }
})

myPromise.then(function(result){
  console.log("success: " + result)
}).catch(function(result){
  console.log("failed: " + result)
})
