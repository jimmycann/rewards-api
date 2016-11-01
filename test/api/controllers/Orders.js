var should = require('should')
var request = require('supertest')

describe('OrdersController', () => {
  describe('.createOrder', () => {
    describe('POST /api/v1/orders/create', () => {
      it('should create a new order', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/orders/create')
          .send({
            userId: 1,
            items: [{
              product: 'coffee',
              qty: 1,
              amt: 380
            }]
          })
          .set('Accept', 'application/json')
          .end((err, res) => {
            console.log(err)
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.order.id)
            should.exist(res.body.order.userId)
            should.exist(res.body.order.products)
            should.exist(res.body.order.items)
            should.exist(res.body.order.subtotal)
            res.body.order.should.have.property('userId', 1)
            res.body.order.should.have.property('products', ['coffee'])
            res.body.order.should.have.property('subtotal', 380)
            done()
          })
      })
    })
  })
  describe('.updateOrder', () => {
    describe('PUT /api/v1/orders/update', () => {
      it('should update a order', (done) => {
        request('http://127.0.0.1:10010')
          .put('/api/v1/orders/update')
          .send({
            orderId: 1,
            orderData: {
              userId: 1,
              products: ['coffee'],
              items: [{
                product: 'coffee',
                qty: 1,
                amt: 380
              }],
              orders: [1],
              subtotal: 380
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
  describe('.fetchOneOrder', () => {
    describe('GET /api/v1/orders/{orderId}', () => {
      it('should retrieve a order', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/orders/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.id)
            should.exist(res.body.userId)
            should.exist(res.body.products)
            should.exist(res.body.items)
            should.exist(res.body.subtotal)
            done()
          })
      })
    })
  })

  describe('.fecthAllOrders', () => {
    describe('GET /api/v1/orders', () => {
      it('should retrieve all orders', (done) => {
        request('http://127.0.0.1:10010')
          .get('/api/v1/orders')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)
            should.exist(res.body[0].id)
            should.exist(res.body[0].userId)
            should.exist(res.body[0].products)
            should.exist(res.body[0].items)
            should.exist(res.body[0].subtotal)
            done()
          })
      })
    })
  })
  describe('.removeOrder', () => {
    describe('DELETE /api/v1/orders/{orderId}', () => {
      it('should create a new order then delete', (done) => {
        request('http://127.0.0.1:10010')
          .post('/api/v1/orders/create')
          .send({
            userId: 1,
            items: [{
              product: 'coffee',
              qty: 1,
              amt: 380
            }]
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            should.exist(res.body.order.id)
            should.exist(res.body.order.userId)
            should.exist(res.body.order.products)
            should.exist(res.body.order.items)
            should.exist(res.body.order.subtotal)
            res.body.order.should.have.property('userId', 1)
            res.body.order.should.have.property('products', ['coffee'])
            res.body.order.should.have.property('subtotal', 380)
            let deleteId = res.body.order.id
            request('http://127.0.0.1:10010')
              .delete('/api/v1/orders/' + deleteId)
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
