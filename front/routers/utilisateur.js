const express = require('express')
const {
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  Login,
  Register
} = require('../controllers/utilisateur')
const router = express.Router()

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/utilisateurs').get(getUtilisateurs)
router.route('/utilisateurs/:id').get(getUtilisateur)
router.route('/utilisateurs/:id').put(updateUtilisateur)
router.route('/utilisateurs/:id').delete(deleteUtilisateur)

module.exports = router
