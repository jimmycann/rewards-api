'use strict'

/**
 * OrdersController
 *
 * @description :: Logic for managing orders
 */

const _ = require('lodash')

module.exports = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  fetchOneOrder: fetchOneOrder,
  fetchAllOrders: fetchAllOrders,
  removeOrder: removeOrder,
  applyReward: applyReward
}

/**
 * @description :: Create a new order
 * @policy :: TBA
 * @path :: /api/v1/orders/create (POST)
 * @param {{int}} req.body :: order parameters to be created
{
  userId: integer
  items: array *
    [{
      product: string,
      qty: integer,
      amt: integer
    }]
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (201) Object containing the newly created order
 */
function createOrder (req, res) {
  OrderService.processOrderData(req.body, (err, orderData) => {
    if (err) return res.status(500).send('Err: ' + err)
    Orders.create({
      userId: orderData.userId,
      products: orderData.products,
      items: JSON.stringify(req.body.items),
      subtotal: orderData.subtotal
    }).then((result) => {
      return res.status(201).send({
        order: result,
        eligibleRewards: orderData.eligibleRewards
      })
    }).catch((err) => {
      return res.status(500).send('Err: ' + err)
    })
  })
}

/**
 * @description :: Update an order
 * @policy :: TBA
 * @path :: /api/v1/orders/update (PUT)
 * @param {{int}} req.body :: Order parameters
{
   orderId: integer
   orderData: {
     name: string *
     description: string
  }
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (200) { success: true }
 */
function updateOrder (req, res) {
  Orders.update(req.body.orderData, {
    where: {
      id: parseInt(req.body.orderId)
    }
  }).then((result) => {
    if (result[0] === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves a order
 * @policy :: TBA
 * @path :: /api/v1/orders/:orderId (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.orderId.value :: The orderId to retrieve
 * @result :: (200) Object containing the requested order data
 */
function fetchOneOrder (req, res) {
  Orders.findById(parseInt(req.swagger.params.orderId.value)).then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves all orders
 * @policy :: TBA
 * @path :: /api/v1/orders (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (200) Array containing all orders
 */
function fetchAllOrders (req, res) {
  Orders.findAll().then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Delete a order
 * @policy :: TBA
 * @path :: /api/v1/orders/:orderId (DELETE)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.orderId.value :: The orderId to delete
 * @result :: (200) { success: true }
 */
function removeOrder (req, res) {
  Orders.destroy({
    where: {
      id: parseInt(req.swagger.params.orderId.value)
    },
    truncate: false
  }).then((result) => {
    if (result === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Apply a reward to an order
 * @policy :: TBA
 * @path :: /api/v1/orders/apply-reward (PUT)
 * @param {{int}} req.body :: Reward IDs
{
  orderId: integer
  rewards: array
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (200) { success: true }
 */
function applyReward (req, res) {
  Orders.findById(req.body.orderId).then((order) => {
    if (!order) return res.status(204).send()
    let rewards = _.concat(order.rewards, req.body.rewards)
    Orders.update({
      rewards: rewards
    }, {
      where: {
        id: parseInt(req.body.orderId)
      }
    }).then(() => {
      return res.status(200).send({ success: true })
    }).catch((err) => {
      return res.status(500).send('Err: ' + err)
    })
  }).catch((err) => {
    return res.status(500).send('Err: ' + err)
  })
}
