let express = require('express')
let cookieParser = require('cookie-parser')

app = express()
app.use(cookieParser())

app.get('/', 
  function(request, response){
    let pageVisits = parseInt(request.cookies.pageVisits) || 0

    let secondsToExpire = 60 * 60 * 24 // 1 day
    response.cookie('pageVisits', pageVisits + 1, { maxAge: secondsToExpire })

    response.send("Hello World. Page Visits:" + pageVisits )
  })

app.get('/clear-visit-cookie',
  function(request, response){
    response.clearCookie('pageVisits')
    response.redirect('/')
  })


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});



