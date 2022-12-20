const express = require('express')
const { connect } = require('./db/connect')
const routerUtilisateurs = require('./routers/utilisateur')
const routerQuartiers = require('./routers/quartier')
const routerInformations = require('./routers/information')
const routerAvis = require('./routers/avis')
const routerCommentaires = require('./routers/commentaire')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/', routerUtilisateurs, routerQuartiers, routerInformations, routerAvis, routerCommentaires)

app.get('/', (req, res) => {
  res.json({ msg: 'Merci de vous diriger vers le lien http://localhost:3000/api/ ...' })
})

connect('mongodb://localhost:27017/', (err) => {
  if (err) {
    console.log('Erreur lors de la connexion à la base de données')
    process.exit(-1)
  } else {
    console.log('Connexion avec la base de données réusssie')
    app.listen(3000)
  }
})
