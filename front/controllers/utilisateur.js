const { ObjectID } = require('bson')
const client = require('../db/connect')

const Register = async (req, res) => {
  try {
    const utilisateur = new Utilisateur(req.body.noms, req.body.mail, req.body.mdp)
    const result = await client.db().collection('utilisateurs').insertOne(utilisateur)
    res.status(200).json([{ message: 'Inscription réussie ! ' }, result])
  } catch (error) {
    res.status(501).json(error)
  }
}

const getUtilisateurs = async (req, res) => {
  try {
    const cursor = client.db().collection('utilisateurs').find().sort({ noms: 1 })
    const result = await cursor.toArray()
    if (result.length > 0) {
      res.status(200).json([{ message: 'Liste des Utilisateurs ; ' }, result])
    } else {
      res.status(204).json({ msg: 'Aucun utilisateur trouvé' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const getUtilisateur = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const cursor = client.db().collection('utilisateurs').find({ _id: id })
    const result = await cursor.toArray()
    if (result.length > 0) {
      res.status(200).json([{ message: 'Utilisateur trouvé ;' }, result[0]])
    } else {
      res.status(404).json({ msg: 'Utilisateur inconnu' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const updateUtilisateur = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const noms = req.body.noms
    const mail = req.body.mail
    const mdp = req.body.mdp
    const result = await client.db().collection('utilisateurs').updateOne({ _id: id }, { $set: { noms, mail, mdp } })

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification de l'utilisateur réussie" })
    } else {
      res.status(404).json({ msg: 'Vérifiez les informations' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const deleteUtilisateur = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const result = await client.db().collection('utilisateurs').deleteOne({ _id: id })
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression de l'utilisateur réussie" })
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const Login = async (req, res) => {
  try {
    maild = req.body.mail
    mdpd = req.body.mdp

    const cursor = client
      .db()
      .collection('utilisateurs')
      .find({ $and: [{ mail: maild }, { mdp: mdpd }] })
    const result = await cursor.toArray()
    if (result.length > 0) {
      res.status(200).json([{ message: 'Connexion réussie !' }, result[0]])
    } else {
      res.status(404).json({ msg: 'Connexion refusée, vérifiez vos informations' })
    }
  } catch (error) {
    res.status(501).json({ msg: 'Connexion refusée, vérifiez vos informations' })
  }
}

module.exports = {
  Register,
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  Login
}
