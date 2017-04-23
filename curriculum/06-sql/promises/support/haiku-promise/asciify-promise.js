let asciify = require('asciify')

module.exports = function(text){
  return new Promise(function(resolve, reject){
    asciify(text, function(error, result){
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    })
  })
}
