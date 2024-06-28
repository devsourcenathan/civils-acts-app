class Acte {
    constructor(
      id, numacte, datedeclaration, cnipere, cnimere, cnitemoin1, cnitemoin2,
      dateetablissementacte, idregistre, idcentre, idutilisateur
    ) {
      this.id = id;
      this.numacte = numacte;
      this.datedeclaration = datedeclaration;
      this.cnipere = cnipere;
      this.cnimere = cnimere;
      this.cnitemoin1 = cnitemoin1;
      this.cnitemoin2 = cnitemoin2;
      this.dateetablissementacte = dateetablissementacte;
      this.idregistre = idregistre;
      this.idcentre = idcentre;
      this.idutilisateur = idutilisateur;
    }
  }
  
  module.exports = Acte;
  