'use strict'

/**
 * UsersController
 *
 * @description :: Logic for managing users
 */

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  fetchOneUser: fetchOneUser,
  fetchAllUsers: fetchAllUsers,
  removeUser: removeUser
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
function createUser (req, res) {
  Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mob: req.body.mob
  }).then((result) => {
    return res.status(201).send(result)
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
 * @result :: { success: true }
 */
function updateUser (req, res) {
  if (req.body.userData.mob) req.body.userData.mob = parseInt(req.body.userData.mob)
  Users.update(req.body.userData, {
    where: {
      id: parseInt(req.body.userId)
    }
  }).then((result) => {
    if (result[0] === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves a user
 * @policy :: TBA
 * @path :: /api/v1/users/:userId (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.userId.value :: The userId to retrieve
 * @result :: Object containing the requested user data
 */
function fetchOneUser (req, res) {
  Users.findById(parseInt(req.swagger.params.userId.value)).then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves all users
 * @policy :: TBA
 * @path :: /api/v1/users (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing all users
 */
function fetchAllUsers (req, res) {
  Users.findAll().then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Delete a user
 * @policy :: TBA
 * @path :: /api/v1/users/:userId (DELETE)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.userId.value :: The userId to delete
 * @result :: { success: true }
 */
function removeUser (req, res) {
  Users.destroy({
    where: {
      id: parseInt(req.swagger.params.userId.value)
    },
    truncate: false
  }).then((result) => {
    if (result === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}
