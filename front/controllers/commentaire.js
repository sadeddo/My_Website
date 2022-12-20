const { ObjectID } = require('bson')
const client = require('../db/connect')

const newCommentaireQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const commentairess = req.body.commentaires

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $push: { commentaires: commentairess } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Commentaire ajouté avec succès !' })
    } else {
      res.status(404).json({ msg: 'Quartier inconnu !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const suppCommentaireQuartier = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const commentairess = req.body.commentaires

    const result = await client
      .db()
      .collection('quartiers')
      .updateOne({ _id: id }, { $pull: { commentaires: commentairess } })
    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: 'Commentaire supprimée avec succès !' })
    } else {
      res.status(404).json({ msg: 'Commentaire ou quartier inéxistants !' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

const quartierCommentaire = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id)
    const cursor = client.db().collection('quartiers').find({ _id: id }, { commentaires: 1 })
    const result = await cursor.toArray()
    if (result.length > 0) {
      // db.test.find({ class="hljs-string">"shapes.color": "red"}, {"shapes.color": 1})
      res.status(200).json([{ message: 'Commentaires du quartier trouvées ! :' }, result])
    } else {
      res.status(404).json({ msg: 'Commentaires non trouvées.' })
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

module.exports = {
  newCommentaireQuartier,
  suppCommentaireQuartier,
  quartierCommentaire
}
