class Mariage {
    constructor(
      id, id_acte, cniepoux, cniepouse, nomepoux, datenaissanceepoux, lieunaissanceepoux,
      professionepoux, domicileepoux, nationaliteepoux, situationmatrimonialeepoux,
      nomepouse, datenaissanceepouse, lieunaissanceepouse, professionepouse, domicileepouse,
      nationaliteepouse, situationmatrimonialeepouse, regimematrimonial, idcentre, idutilisateur
    ) {
      this.id = id;
      this.id_acte = id_acte;
      this.cniepoux = cniepoux;
      this.cniepouse = cniepouse;
      this.nomepoux = nomepoux;
      this.datenaissanceepoux = datenaissanceepoux;
      this.lieunaissanceepoux = lieunaissanceepoux;
      this.professionepoux = professionepoux;
      this.domicileepoux = domicileepoux;
      this.nationaliteepoux = nationaliteepoux;
      this.situationmatrimonialeepoux = situationmatrimonialeepoux;
      this.nomepouse = nomepouse;
      this.datenaissanceepouse = datenaissanceepouse;
      this.lieunaissanceepouse = lieunaissanceepouse;
      this.professionepouse = professionepouse;
      this.domicileepouse = domicileepouse;
      this.nationaliteepouse = nationaliteepouse;
      this.situationmatrimonialeepouse = situationmatrimonialeepouse;
      this.regimematrimonial = regimematrimonial;
      this.idcentre = idcentre;
      this.idutilisateur = idutilisateur;
    }
  }
  
  module.exports = Mariage;
  