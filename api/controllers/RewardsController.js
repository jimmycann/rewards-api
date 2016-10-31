'use strict'

/**
 * RewardsController
 *
 * @description :: Logic for managing rewards
 */

module.exports = {
  createReward: createReward,
  updateReward: updateReward,
  fetchOneReward: fetchOneReward,
  fetchAllRewards: fetchAllRewards,
  removeReward: removeReward
}

/**
 * @description :: Create a new reward
 * @policy :: TBA
 * @path :: /api/v1/rewards/create (POST)
 * @param {{int}} req.body :: Reward parameters to be created
{
  name: string *
  description: string *
  level: integer *
  products: array of strings
  discountType: string ('pc' or 'abs')
  amount: integer
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing the newly created reward
 */
function createReward (req, res) {
  Rewards.create({
    name: req.body.name,
    description: req.body.description,
    level: parseInt(req.body.level),
    products: req.body.products,
    discountType: req.body.discountType,
    amount: parseInt(req.body.amount)
  }).then((result) => {
    return res.status(201).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Update a reward
 * @policy :: TBA
 * @path :: /api/v1/rewards/update (PUT)
 * @param {{int}} req.body :: Reward parameters
{
   rewardId: integer
   rewardData: {
     name: string *
     description: string *
     level: integer *
     products: array of strings
     discountType: string ('pc' or 'abs')
     amount: integer
  }
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: { success: true }
 */
function updateReward (req, res) {
  if (req.body.rewardData.level) req.body.rewardData.level = parseInt(req.body.rewardData.level)
  if (req.body.rewardData.amount) req.body.rewardData.amount = parseInt(req.body.rewardData.amount)
  Rewards.update(req.body.rewardData, {
    where: {
      id: parseInt(req.body.rewardId)
    }
  }).then((result) => {
    if (result[0] === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves a reward
 * @policy :: TBA
 * @path :: /api/v1/rewards/:rewardId (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.rewardId.value :: The rewardId to retrieve
 * @result :: Object containing the requested reward data
 */
function fetchOneReward (req, res) {
  Rewards.findById(parseInt(req.swagger.params.rewardId.value)).then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves all rewards
 * @policy :: TBA
 * @path :: /api/v1/rewards (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: Object containing all rewards
 */
function fetchAllRewards (req, res) {
  Rewards.findAll().then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Delete a reward
 * @policy :: TBA
 * @path :: /api/v1/rewards/:rewardId (DELETE)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.rewardId.value :: The rewardId to delete
 * @result :: { success: true }
 */
function removeReward (req, res) {
  Rewards.destroy({
    where: {
      id: parseInt(req.swagger.params.rewardId.value)
    },
    truncate: false
  }).then((result) => {
    if (result === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}
