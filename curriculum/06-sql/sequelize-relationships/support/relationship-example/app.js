let connection = require('./models/sequelize-connection')
let Contact = require('./models/contact')


Contact.findOne().then(function(contact){
  console.log("Contact: ", contact.get())
  console.log("And related phone numbers")
  contact.getPhones().then(function(phones){
    for(index in phones){
      console.log('Phone:', phones[index].get())
    }
  })
})
.catch(function(error){
  console.log('Error: ' + error)
})
