 class User {
  constructor(id, nom, prenom, email, password, roles, telephone) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.telephone = telephone;
  }
}

module.exports = User;
