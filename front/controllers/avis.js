const { ObjectID } = require('bson')
const client = require('../db/connect')

const newAvisQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const aviss = req.body.avis

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $push: { avis: aviss } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Avis ajouté avec succès !' })
    } else {
      res.status(404).json({ msg: 'Quartier inconnu !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const suppAvisQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const aviss = req.body.avis

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $pull: { avis: aviss } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Avis supprimée avec succès !' })
    } else {
      res.status(404).json({ msg: 'Avis ou quartier inéxistants !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const quartierAvis = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const cursor = client.db().collection('quartiers').find({ _id: id }, { avis: 1 })
    const result = await cursor.toArray()
    if (result.length > 0) {
      // db.test.find({ class="hljs-string">"shapes.color": "red"}, {"shapes.color": 1})
      res.status(200).json([{ message: 'Avis du quartier trouvées ! :' }, result])
    } else {
      res.status(404).json({ msg: 'Avis non trouvées.' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

module.exports = {
  newAvisQuartier,
  suppAvisQuartier,
  quartierAvis
}
