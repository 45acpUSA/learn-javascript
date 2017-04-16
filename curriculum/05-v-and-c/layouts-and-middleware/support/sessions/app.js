let express = require('express')
let session = require('express-session')

app = express()
app.use(session({
  secret: 'im a string to make the session secure'
}))

app.get('/', 
  function(request, response){
    let pageViews = request.session.pageViews || 0
    request.session.pageViews = pageViews + 1
    response.send("Hello World, Page Views:" + pageViews )
  })

app.get('/clear-session',
function(request, response){
  request.session.destroy(function(err){
    if(err){
      response.send("Error clearing session " + err)
    }else{
      response.send("Session Cleared")
    }
  })
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});



