'use strict'

module.exports = {
  /**
  * Level up a user
  * @description :: Increment the 'level' feild of a user by an amount
  * @param {{obj}} data :: The data obj
  * @param {{obj}} data.userId :: The userId to level up
  * @param {{obj}} data.levelIncrement :: The number of levels to increment
  * @param {{callback}} cb :: The callback
  * @result :: All auction lots are inserted into the live_auctions table
  */
  levelUp: (data, cb) => {
    Users.findById(data.userId).then((user) => {
      if (!user) cb(null, false)
      user.increment({ level: data.levelIncrement })
      cb(null, user)
    }).catch((err) => {
      cb(err)
    })
  }
}
