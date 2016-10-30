'use strict'

/**
 * UsersController
 *
 * @description :: Logic for managing users
 */

module.exports = {
  create: create,
  update: update,
  remove: remove
}

/**
 * @description :: Create a new user
 * @policy :: TBA
 * @path :: /api/v1/users/create (POST)
 * @param {{int}} req.body :: User parameters to be created
{
  firstName: string *
  lastName: string *
  email: string *
  mob: integer
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing the newly created user
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

/**
 * @description :: Update a user
 * @policy :: TBA
 * @path :: /api/v1/users/update (PUT)
 * @param {{int}} req.body :: User parameters
{
   userId: integer
   userData: {
     firstName: string
     lastName: string
     email: string
     mob: integer
  }
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing the newly created user
 */
function update (req, res) {
  if (req.body.userData.mob) req.body.userData.mob = parseInt(req.body.userData.mob)
  Users.update(req.body.userData, {
    where: {
      id: parseInt(req.body.userId)
    }
  }).then(() => {
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Delete a user
 * @policy :: TBA
 * @path :: /api/v1/users/:userId (DELETE)
 * @param {{int}} userId :: The userId to delete
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing the newly created user
 */
function remove (req, res) {
  Users.destroy({
    where: {
      id: parseInt(req.swagger.params.userId.value)
    },
    truncate: false
  }).then(() => {
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}
