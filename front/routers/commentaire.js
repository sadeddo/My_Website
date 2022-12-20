const express = require('express')
const { newCommentaireQuartier, suppCommentaireQuartier, quartierCommentaire } = require('../controllers/commentaire')
const router = express.Router()

router.route('/quartiers/:id/commentaires').get(quartierCommentaire)
router.route('/quartiers/:id/commentaires').post(newCommentaireQuartier)
router.route('/quartiers/:id/commentaires').delete(suppCommentaireQuartier)

module.exports = router
