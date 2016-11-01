'use strict'

const _ = require('lodash')

module.exports = {
  /**
  * Process order data
  * @description :: Change the orderData object relative to rewards and user
  * @param {{obj}} orderData :: The data obj
  * @param {{obj}} orderData.userId :: The userId to associate
  * @param {{obj}} orderData.items :: An array of items for the order
  eg.
  {
    userId: 1,
    items: [{
      product: 'coffee',
      qty: 1,
      amt: 380
    }]
  }
  * @param {{callback}} cb :: The callback
  * @result :: orderData is returned ready for insertion into the database
  */
  processOrderData: (orderData, cb) => {
    let eligibleRewards = []
    if (!orderData.userId) return cb(null, orderData)
    OrderService.calculateOrderTotals(orderData.items, (err, totals) => {
      if (err) return cb(err)
      orderData.products = totals.products
      orderData.subtotal = totals.subtotal
      Users.findById(orderData.userId).then((user) => {
        if (!user) cb(null, orderData)
        async.each(orderData.items, (item, callback) => {
          RewardService.checkRewards({
            user: user,
            subtotal: orderData.subtotal,
            item: item
          }, (err, rewardData) => {
            if (err) return cb(err)
            eligibleRewards = _.concat(eligibleRewards, rewardData)
            callback()
          })
        }, (err) => {
          if (err) return cb(err)
          orderData.eligibleRewards = _.uniq(eligibleRewards)
          cb(null, orderData)
        })
      }).catch((err) => {
        cb(err)
      })
    })
  },

  /**
  * Calculate the order totals
  * @description :: Calculate subtotal and an array of products
  * @param {{obj}} items :: An array of items for the order
  eg.
  {
    items: [{
      product: 'coffee',
      qty: 1,
      amt: 250
    }]
  }
  * @param {{callback}} cb :: The callback
  * @result :: Totals returned to be appended to the orderData obj
  */
  calculateOrderTotals: (items, cb) => {
    let totals = {
      products: [],
      subtotal: 0
    }
    async.each(items, (item, cb) => {
      totals.products.push(item.product)
      totals.subtotal += (item.amt * item.qty)
      cb()
    }, (err) => {
      if (err) return cb(err)
      cb(null, totals)
    })
  }
}
