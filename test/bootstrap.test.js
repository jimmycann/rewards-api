const Sails = require('sails')

before(function (done) {
  this.timeout(5000)
  Sails.lift({
    // configuration for testing purposes
  }, (err, sails) => {
    if (err) return done(err)
    global.server = sails.hooks.http.app
    // here you can load fixtures, etc.
    done(err, sails)
  })
})

after((done) => {
  // here you can clear fixtures, etc.
  Sails.lower(done)
})
