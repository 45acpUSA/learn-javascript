let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let addUser = require('./stores/UserStore').addUser

let app = express();
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', 
  (request, response)=>{
    response.send("Homepage")
  })

app.get('/register', 
  (request, response)=>{
    response.render('register')
  })

app.post('/register',
  (request, response)=>{
    let userAttributes = request.body 
  
    let addResponse = addUser(userAttributes) // true or array of errors
    if(addResponse == true){
      response.redirect('/') 
    }else{
      response.render('register', { 'errors': addResponse })
    }
  })

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
})

