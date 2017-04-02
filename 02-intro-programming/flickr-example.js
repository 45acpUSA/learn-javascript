var Flickr = require('flickr-sdk');

var flickr = new Flickr({})
flickr
.request()
.media()
.search("puppies")
.get()
.then(function (response) {
  console.log(response)
 });
