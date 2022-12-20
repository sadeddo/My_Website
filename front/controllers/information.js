const { ObjectID } = require('bson')
const client = require('../db/connect')

const newinformationQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const infoss = req.body.infos

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $push: { infos: infoss } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Information ajoutée avec succès !' })
    } else {
      res.status(404).json({ msg: 'Quartier inconnu !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const suppinformationQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const infoss = req.body.infos

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $pull: { infos: infoss } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Information supprimée avec succès !' })
    } else {
      res.status(404).json({ msg: 'Information ou quartier inéxistants !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const quartierInformations = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const cursor = client.db().collection('quartiers').find({ _id: id }, { infos: 1 })
    const result = await cursor.toArray()
    if (result.length > 0) {
      // db.test.find({ class="hljs-string">"shapes.color": "red"}, {"shapes.color": 1})
      res.status(200).json([{ message: 'Informations du quartier trouvées ! :' }, result])
    } else {
      res.status(404).json({ msg: 'Informations non trouvées.' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

module.exports = {
  newinformationQuartier,
  suppinformationQuartier,
  quartierInformations
}
