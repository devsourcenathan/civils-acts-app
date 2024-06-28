class Deces {
    constructor(
      id, id_acte, nomdeclarant, professiondeclarant, domiciledeclarant, qualitedeclarant,
      nomdefun, datenaissance, lieunaissance, profession, domiciledefun, nationalitedefun,
      datedeces, lieudeces, circonstancesdeces, idformation, idacte, idcentre, idutilisateurs
    ) {
      this.id = id;
      this.id_acte = id_acte;
      this.nomdeclarant = nomdeclarant;
      this.professiondeclarant = professiondeclarant;
      this.domiciledeclarant = domiciledeclarant;
      this.qualitedeclarant = qualitedeclarant;
      this.nomdefun = nomdefun;
      this.datenaissance = datenaissance;
      this.lieunaissance = lieunaissance;
      this.profession = profession;
      this.domiciledefun = domiciledefun;
      this.nationalitedefun = nationalitedefun;
      this.datedeces = datedeces;
      this.lieudeces = lieudeces;
      this.circonstancesdeces = circonstancesdeces;
      this.idformation = idformation;
      this.idacte = idacte;
      this.idcentre = idcentre;
      this.idutilisateurs = idutilisateurs;
    }
  }
  
  module.exports = Deces;
  