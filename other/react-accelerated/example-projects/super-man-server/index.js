let http = require('http')
let asciify = require('asciify')

let server = http.createServer((request, response)=>{
  const text = "Up Up And Away!"
  asciify(text, {font: 'larry3d'}, (err, result)=>{
    if(err){
      var content = "Sorry, we couldn't generate that art"
    } else {
      var content = result
    }
    // Every response has a status, which tells our caller if we were
    // successful in handling the request.  '200' indicates success.
    response.writeHead(200, {'Content-Type': 'text/plain'})

    // We send our information, and complete the request by calling 'end' and 
    // passing it our result.
    response.end(content)
  })
})

server.listen(3000, '127.0.0.1', ()=>{
  console.log('HTTP Server Started') 
})

