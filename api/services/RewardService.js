'use strict'

module.exports = {
  /**
  * Check rewards
  * @description :: Check an item and user for all eligible rewards can can be applied
  * @param {{obj}} data :: The obj to check
  * @param {{obj}} data.user :: The user obj to check
  * @param {{obj}} data.subtotal :: The order subtotal to check
  * @param {{obj}} data.item.product :: The product to check
  * @param {{obj}} data.item.qty :: The qty to check
  * @param {{obj}} data.item.amt :: The amount to check
  eg.
  {
    user: (standard user obj),
    subtotal: 500,
    item: {
      product: 'coffee',
      qty: 1,
      amt: 250
    }
  }
  * @param {{callback}} cb :: The callback
  * @result :: An array with eligible rewards is returned
  */
  checkRewards: (data, cb) => {
    Rewards.findAll({
      where: {
        level: {
          $lte: data.user.level
        },
        minQty: {
          $lte: data.item.qty
        },
        minOrderAmt: {
          $lte: data.subtotal
        },
        $or: [
          { products: { $contains: [data.item.product] } },
          { products: null }
        ]
      }
    }).then((result) => {
      result = JSON.parse(JSON.stringify(result))
      cb(null, result)
    }).catch((err) => {
      cb(err)
    })
  }
}
