let fs = require('fs');

function promiseReadFile(path, encoding){
  return new Promise(function(resolve, reject){
    fs.readFile('./haiku.txt', 'ascii',function (err, data){
      if(err){
        reject('Unable to read file.')
      }else{
        resolve(data);
      }
    });
  })
}


promiseReadFile('./haiku', 'ascii').then(function(poem){
  console.log(poem)
}).catch(function(error){
  console.log(error)
})
