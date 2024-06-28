class Naissance {
    constructor(
      id, id_acte, sexe, nomenfant, datenaissanceenfant, lieunaissanceenfant, nompere,
      proffessionpere, domicileparent, nomemere, proffessionmere, etatparent, idformation,
      idacte, idcentre, idutilisateurs
    ) {
      this.id = id;
      this.id_acte = id_acte;
      this.sexe = sexe;
      this.nomenfant = nomenfant;
      this.datenaissanceenfant = datenaissanceenfant;
      this.lieunaissanceenfant = lieunaissanceenfant;
      this.nompere = nompere;
      this.proffessionpere = proffessionpere;
      this.domicileparent = domicileparent;
      this.nomemere = nomemere;
      this.proffessionmere = proffessionmere;
      this.etatparent = etatparent;
      this.idformation = idformation;
      this.idacte = idacte;
      this.idcentre = idcentre;
      this.idutilisateurs = idutilisateurs;
    }
  }
  
  module.exports = Naissance;
  