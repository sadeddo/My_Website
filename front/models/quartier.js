class Quartier {
  constructor(noms, pays, adresse, infos, avis, commentaires) {
    this.noms = noms
    this.pays = pays
    this.adresse = adresse
    this.infos = [infos]
    this.avis = [avis]
    this.commentaires = [commentaires]
  }
}

module.exports = { Quartier }
