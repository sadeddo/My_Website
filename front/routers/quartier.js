const express = require('express')
const {
  ajouterQuartier,
  getQuartiers,
  getQuartier,
  updateQuartier,
  deleteQuartier,
  viderCollection
} = require('../controllers/quartier')
const router = express.Router()

router.route('/').get(getQuartiers)

router.route('/quartiers').post(ajouterQuartier)
router.route('/quartiers').get(getQuartiers)

router.route('/quartiers/:id').get(getQuartier)
router.route('/quartiers/:id').put(updateQuartier)

router.route('/quartiers/:id').delete(deleteQuartier)

router.route('/collection/:collection').delete(viderCollection)

module.exports = router
