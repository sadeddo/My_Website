const { ObjectID } = require('bson')
const client = require('../db/connect')
const { Quartier } = require('../models/Quartier')

const ajouterQuartier = async (req, res) => {
  try {
    const quartier = new Quartier(
      req.body.noms,
      req.body.pays,
      req.body.adresse,
      req.body.infos,
      req.body.avis,
      req.body.commentaires
    )
    const result = await client.db().collection('quartiers').insertOne(quartier)

    res.status(200).json([{ message: 'Quartier ajouté avec succès !' }, result])
  } catch (error) {
    res.status(501).json(error)
  }
}

const getQuartiers = async (req, res) => {
  try {
    const cursor = client.db().collection('quartiers').find().sort({ noms: 1 })
    const result = await cursor.toArray()
    if (result.length > 0) {
      res.status(200).json([{ message: 'Liste des Quartiers!' }, result])
    } else {
      res.status(404).json({ msg: 'Aucun quartier trouvé !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const getQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const cursor = client.db().collection('quartiers').find({ _id: id })
    const result = await cursor.toArray()
    if (result.length > 0) {
      res.status(200).json([{ message: 'Quartier trouvé ! :' }, result])
    } else {
      res.status(404).json({ msg: 'Quartier inconnu' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const updateQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const noms = req.body.noms
    const pays = req.body.pays
    const adresse = req.body.adresse
    const infos = req.body.infos
    const avis = req.body.avis
    const commentaires = req.body.commentaires
    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $set: { noms, pays, adresse, infos, avis, commentaires } })

    if (result.modifiedCount === 1) {
      res.status(200).json([{ message: 'Modification du quartier réussie ! :' }, result])
    } else {
      res.status(404).json({ msg: 'Quartier inconnu !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const deleteQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const result = await client.db().collection('quartiers').deleteOne({ _id: id })
    if (result.deletedCount === 1) {
      res.status(200).json([{ message: 'Suppression du quartier réussie ! :' }, result])
    } else {
      res.status(404).json({ msg: "Ce quartier n'existe pas !" })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const viderCollection = async (req, res) => {
  const collection = String(req.params.collection)
  await client.db().collection(collection).deleteMany({})

  res.status(200).json({ msg: 'Collection vidée/remise à 0 !' })
}

module.exports = {
  ajouterQuartier,
  getQuartiers,
  getQuartier,
  updateQuartier,
  deleteQuartier,
  viderCollection
}
