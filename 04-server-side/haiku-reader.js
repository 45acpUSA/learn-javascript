let fs = require('fs');
fs.readFile('haiku.txt', 'ascii',function (err, data){
  if(err){
    console.log('Unable to read file.')
  }else{
    console.log(data);
  }
});

