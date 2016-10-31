'use strict'

/**
 * TitlesController
 *
 * @description :: Logic for managing titles
 */

module.exports = {
  createTitle: createTitle,
  updateTitle: updateTitle,
  fetchOneTitle: fetchOneTitle,
  fetchAllTitles: fetchAllTitles,
  removeTitle: removeTitle
}

/**
 * @description :: Create a new title
 * @policy :: TBA
 * @path :: /api/v1/titles/create (POST)
 * @param {{int}} req.body :: title parameters to be created
{
  name: string *
  description: string
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (201) Object containing the newly created title
 */
function createTitle (req, res) {
  Titles.create({
    name: req.body.name,
    description: req.body.description
  }).then((result) => {
    return res.status(201).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Update a title
 * @policy :: TBA
 * @path :: /api/v1/titles/update (PUT)
 * @param {{int}} req.body :: Title parameters
{
   titleId: integer
   titleData: {
     name: string *
     description: string
  }
}
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (200) { success: true }
 */
function updateTitle (req, res) {
  Titles.update(req.body.titleData, {
    where: {
      id: parseInt(req.body.titleId)
    }
  }).then((result) => {
    if (result[0] === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves a title
 * @policy :: TBA
 * @path :: /api/v1/titles/:titleId (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.titleId.value :: The titleId to retrieve
 * @result :: (200) Object containing the requested title data
 */
function fetchOneTitle (req, res) {
  Titles.findById(parseInt(req.swagger.params.titleId.value)).then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Retrieves all titles
 * @policy :: TBA
 * @path :: /api/v1/titles (GET)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @result :: (200) Array containing all titles
 */
function fetchAllTitles (req, res) {
  Titles.findAll().then((result) => {
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  }).catch((err) => {
    return res.status(500).send(err)
  })
}

/**
 * @description :: Delete a title
 * @policy :: TBA
 * @path :: /api/v1/titles/:titleId (DELETE)
 * @param {{obj}} req :: Request data
 * @param {{obj}} res :: Response data
 * @param {{int}} req.swagger.params.titleId.value :: The titleId to delete
 * @result :: (200) { success: true }
 */
function removeTitle (req, res) {
  Titles.destroy({
    where: {
      id: parseInt(req.swagger.params.titleId.value)
    },
    truncate: false
  }).then((result) => {
    if (result === 0) return res.status(204).send()
    return res.status(200).send({ success: true })
  }).catch((err) => {
    return res.status(500).send(err)
  })
}
