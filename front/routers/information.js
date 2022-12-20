const express = require('express')
const { newinformationQuartier, suppinformationQuartier, quartierInformations } = require('../controllers/information')
const router = express.Router()

router.route('/quartiers/:id/informations').get(quartierInformations)
router.route('/quartiers/:id/informations').post(newinformationQuartier)
router.route('/quartiers/:id/informations').delete(suppinformationQuartier)

module.exports = router
