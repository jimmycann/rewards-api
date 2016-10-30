'use strict'

/**
 * UsersController
 *
 * @description :: Logic for managing users
 */

module.exports = {
  create: create
}

/**
 * @description :: Create a new user
 * @policy :: TBA
 * @path :: /api/v1/users/create
 * @param {{int}} req.body.userId :: User ID of the user to be retrieved
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing full item details
 */
function create (req, res) {
  Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mob: req.body.mob
  }).then((result) => {
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}
