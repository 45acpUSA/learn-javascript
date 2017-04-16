let express = require('express')
let cookieParser = require('cookie-parser')

let middlewareA  = (request, response, next)=>{
  console.log("Entering Middleware A")
  console.log("page visits: " + request.cookies.pageVisits)
  next()
  console.log("Finishing Middleware A")
  console.log("page visits: " + request.cookies.pageVisits)
}

let middlewareB  = (request, response, next)=>{
  console.log("Entering Middleware B")

  let pageVisits = parseInt(request.cookies.pageVisits) || 0
  response.cookie('pageVisits', pageVisits + 1)
  next()

  console.log("Finishing Middleware B")
}


app = express()
app.use(cookieParser())
app.use(middlewareA)

app.get('/', 
  middlewareB,
  function(request, response){
    console.log('Visited the tracked page')
    let pageVisits = parseInt(request.cookies.pageVisits)
    response.send("Hello World. Page Visits:" + pageVisits )
  })

app.get('/untracked', 
  function(request, response){
    console.log('Visited the untracked page')

    let pageVisits = parseInt(request.cookies.pageVisits)
    response.send("Hello from the untracked page: " + pageVisits)
  })

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});


