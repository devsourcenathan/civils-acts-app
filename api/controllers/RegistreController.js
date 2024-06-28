const Registre = require('../models/Registre');

const registres = []; // This array will act as an in-memory database

exports.getAllRegistres = (req, res) => {
  res.json(registres);
};

exports.createRegistre = (req, res) => {
  const { id, libelle, annee, idutilisateurs } = req.body;
  const registre = new Registre(id, libelle, annee, idutilisateurs);
  registres.push(registre);
  res.status(201).json(registre);
};

exports.getRegistreById = (req, res) => {
  const registre = registres.find(r => r.id === parseInt(req.params.id));
  if (!registre) return res.status(404).send('Registre not found');
  res.json(registre);
};

exports.updateRegistre = (req, res) => {
  const registre = registres.find(r => r.id === parseInt(req.params.id));
  if (!registre) return res.status(404).send('Registre not found');
  
  const { libelle, annee, idutilisateurs } = req.body;
  registre.libelle = libelle;
  registre.annee = annee;
  registre.idutilisateurs = idutilisateurs;
  
  res.json(registre);
};

exports.deleteRegistre = (req, res) => {
  const registreIndex = registres.findIndex(r => r.id === parseInt(req.params.id));
  if (registreIndex === -1) return res.status(404).send('Registre not found');
  
  registres.splice(registreIndex, 1);
  res.status(204).send();
};