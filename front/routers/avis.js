const express = require('express')
const { newAvisQuartier, suppAvisQuartier, quartierAvis } = require('../controllers/avis')
const router = express.Router()

router.route('/quartiers/:id/avis').get(quartierAvis)
router.route('/quartiers/:id/avis').post(newAvisQuartier)
router.route('/quartiers/:id/avis').delete(suppAvisQuartier)

module.exports = router
