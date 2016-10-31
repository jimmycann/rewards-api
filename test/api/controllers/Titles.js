var should = require('should')
var request = require('supertest')

describe('TitlesController', () => {
  describe('.create', () => {
    describe('POST /api/v1/titles/create', () => {
      it('should create a new title', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/titles/create')
          .send({
            name: 'Initiate',
            description: 'You\'ve only come in a couple of times, but you know what we\'re all about'
          })
          .set('Accept', 'application/json')
          .end((err, res) => {
            console.log(err)
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.name)
            should.exist(res.body.description)
            res.body.should.have.property('name', 'Initiate')
            res.body.should.have.property('description', 'You\'ve only come in a couple of times, but you know what we\'re all about')
            done()
          })
      })
    })
  })
  describe('.update', () => {
    describe('PUT /api/v1/titles/update', () => {
      it('should update a title', (done) => {
        request('http://127.0.0.1:10010')
          .put('/api/v1/titles/update')
          .send({
            titleId: 1,
            titleData: {
              name: 'Initiate',
              description: 'You\'ve only come in a couple of times, but you know what we\'re all about'
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
  describe('.fetchOne', () => {
    describe('GET /api/v1/titles/{titleId}', () => {
      it('should retrieve a title', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/titles/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.name)
            should.exist(res.body.description)
            done()
          })
      })
    })
  })
  describe('.fecthAll', () => {
    describe('GET /api/v1/titles', () => {
      it('should retrieve all titles', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/titles')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)
            should.exist(res.body[0].id)
            should.exist(res.body[0].name)
            should.exist(res.body[0].description)
            done()
          })
      })
    })
  })
  describe('.delete', () => {
    describe('DELETE /api/v1/titles/{titleId}', () => {
      it('should create a new title then delete', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/titles/create')
          .send({
            name: 'Budding Superhero',
            description: 'On the road to becoming a regular, baristas call you "sir"'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.name)
            should.exist(res.body.description)
            res.body.should.have.property('name', 'Budding Superhero')
            res.body.should.have.property('description', 'On the road to becoming a regular, baristas call you "sir"')
            let deleteId = res.body.id
            request('http://127.0.0.1:10010')
              .delete('/api/v1/titles/' + deleteId)
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
