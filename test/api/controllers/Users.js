var should = require('should')
var request = require('supertest')

describe('UsersController', () => {
  describe('.createUser', () => {
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
          .expect(201)
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
  describe('.updateUser', () => {
    describe('PUT /api/v1/users/update', () => {
      let now = (new Date()).getTime()
      it('should update a user', (done) => {
        request('http://127.0.0.1:10010')
          .put('/api/v1/users/update')
          .send({
            userId: 1,
            userData: {
              firstName: 'Jimmy',
              lastName: 'Cann',
              email: now + '@jimmycann.com',
              mob: '0455555555'
            }
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            res.body.should.have.property('success', true)
            done()
          })
      })
    })
  })
  describe('.fetchOneUser', () => {
    describe('GET /api/v1/users/{userId}', () => {
      it('should retrieve a user', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/users/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.firstName)
            should.exist(res.body.lastName)
            should.exist(res.body.email)
            should.exist(res.body.mob)
            should.exist(res.body.createdAt)
            should.exist(res.body.updatedAt)
            done()
          })
      })
    })
  })
  describe('.fecthAllUsers', () => {
    describe('GET /api/v1/users', () => {
      it('should retrieve all users', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)
            should.exist(res.body[0].id)
            should.exist(res.body[0].firstName)
            should.exist(res.body[0].lastName)
            should.exist(res.body[0].email)
            should.exist(res.body[0].createdAt)
            done()
          })
      })
    })
  })
  describe('.searchUsers', () => {
    describe('POST /api/v1/users/search', () => {
      it('should return a match', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/users/search')
          .send({
            query: 'Jim'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)
            should.exist(res.body[0].id)
            should.exist(res.body[0].firstName)
            should.exist(res.body[0].lastName)
            should.exist(res.body[0].email)
            should.exist(res.body[0].createdAt)
            done()
          })
      })
    })
  })
  describe('.removeUser', () => {
    describe('DELETE /api/v1/users/{userId}', () => {
      let now = (new Date()).getTime()
      it('should create a new user then delete', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/users/create')
          .send({
            firstName: 'Jimmy',
            lastName: 'Cann',
            email: now + '@jimmycann.com'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.createdAt)
            should.exist(res.body.updatedAt)
            res.body.should.have.property('firstName', 'Jimmy')
            res.body.should.have.property('lastName', 'Cann')
            res.body.should.have.property('email', now + '@jimmycann.com')
            let deleteId = res.body.id
            request('http://127.0.0.1:10010')
              .delete('/api/v1/users/' + deleteId)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                console.log(res.body)
                should.not.exist(err)
                res.body.should.have.property('success', true)
                done()
              })
          })
      })
    })
  })
})
