var should = require('should')
var request = require('supertest')

describe('UsersController', () => {
  describe('.create', () => {
    describe('POST /api/v1/users/create', () => {
      let now = (new Date()).getTime()
      it('should create a new user', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/users/create')
          .send({
            firstName: 'Jimmy',
            lastName: 'Cann',
            email: now + '@jimmycann.com'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.createdAt)
            should.exist(res.body.updatedAt)
            res.body.should.have.property('firstName', 'Jimmy')
            res.body.should.have.property('lastName', 'Cann')
            res.body.should.have.property('email', now + '@jimmycann.com')
            done()
          })
      })
    })
  })
})
