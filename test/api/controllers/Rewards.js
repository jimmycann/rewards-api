var should = require('should')
var request = require('supertest')

describe('RewardsController', () => {
  describe('.createReward', () => {
    describe('POST /api/v1/rewards/create', () => {
      it('should create a new reward', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/rewards/create')
          .send({
            name: 'Free Coffee',
            description: 'Who doesn\'t love a free coffee from their favourite cafe? Dedication to the morning java has brought you here.',
            level: 1,
            minQty: 1,
            minOrderAmt: 0,
            products: ['coffee'],
            discountType: 'pc',
            amount: 100
          })
          .set('Accept', 'application/json')
          .end((err, res) => {
            console.log(err)
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.name)
            should.exist(res.body.description)
            should.exist(res.body.level)
            should.exist(res.body.minQty)
            should.exist(res.body.minOrderAmt)
            should.exist(res.body.products)
            should.exist(res.body.discountType)
            should.exist(res.body.amount)
            res.body.should.have.property('name', 'Free Coffee')
            res.body.should.have.property('description', 'Who doesn\'t love a free coffee from their favourite cafe? Dedication to the morning java has brought you here.')
            res.body.should.have.property('level', 1)
            res.body.should.have.property('minQty', 1)
            res.body.should.have.property('minOrderAmt', 0)
            res.body.should.have.property('products', ['coffee'])
            res.body.should.have.property('discountType', 'pc')
            res.body.should.have.property('amount', 100)
            done()
          })
      })
    })
  })
  describe('.updateReward', () => {
    describe('PUT /api/v1/rewards/update', () => {
      it('should update a reward', (done) => {
        request('http://127.0.0.1:10010')
          .put('/api/v1/rewards/update')
          .send({
            rewardId: 1,
            rewardData: {
              name: 'Free Coffee',
              description: 'Who doesn\'t love a free coffee from their favourite cafe? Dedication to the morning java has brought you here.',
              level: 1,
              minQty: 1,
              minOrderAmt: 0,
              products: ['coffee'],
              discountType: 'pc',
              amount: 100
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
  describe('.fetchOneReward', () => {
    describe('GET /api/v1/rewards/{rewardId}', () => {
      it('should retrieve a reward', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/rewards/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.name)
            should.exist(res.body.description)
            should.exist(res.body.level)
            should.exist(res.body.minQty)
            should.exist(res.body.minOrderAmt)
            should.exist(res.body.products)
            should.exist(res.body.discountType)
            should.exist(res.body.amount)
            done()
          })
      })
    })
  })
  describe('.fecthAllRewards', () => {
    describe('GET /api/v1/rewards', () => {
      it('should retrieve all rewards', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/rewards')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)
            should.exist(res.body[0].id)
            should.exist(res.body[0].name)
            should.exist(res.body[0].description)
            should.exist(res.body[0].level)
            should.exist(res.body[0].minQty)
            should.exist(res.body[0].minOrderAmt)
            should.exist(res.body[0].products)
            should.exist(res.body[0].discountType)
            should.exist(res.body[0].amount)
            done()
          })
      })
    })
  })
  describe('.removeReward', () => {
    describe('DELETE /api/v1/rewards/{rewardId}', () => {
      it('should create a new reward then delete', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/rewards/create')
          .send({
            name: 'Buy Two Get One Free',
            description: 'Enjoy a freebie for yourself, or share one with a friend',
            level: 1,
            minQty: 1,
            minOrderAmt: 0,
            products: ['croissant'],
            discountType: 'pc',
            amount: 100
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
            should.exist(res.body.level)
            should.exist(res.body.minQty)
            should.exist(res.body.minOrderAmt)
            should.exist(res.body.products)
            should.exist(res.body.discountType)
            should.exist(res.body.amount)
            res.body.should.have.property('name', 'Buy Two Get One Free')
            res.body.should.have.property('description', 'Enjoy a freebie for yourself, or share one with a friend')
            res.body.should.have.property('level', 1)
            res.body.should.have.property('minQty', 1)
            res.body.should.have.property('minOrderAmt', 0)
            res.body.should.have.property('products', ['croissant'])
            res.body.should.have.property('discountType', 'pc')
            res.body.should.have.property('amount', 100)
            let deleteId = res.body.id
            request('http://127.0.0.1:10010')
              .delete('/api/v1/rewards/' + deleteId)
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
