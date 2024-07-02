import express from 'express';

const bcrypt = require("bcrypt")

import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const utilisateurs = await prisma.utilisateur.findMany();
  res.json(utilisateurs);
});

router.get('/:id', async (req, res) => {
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(utilisateur);
});

router.post('/', async (req, res) => {
  const { nom, prenom, email, password, roles, telephone } = req.body;

  try {
      // Générer le sel pour le hachage du mot de passe
      const salt = await bcrypt.genSalt(10);
      // Hasher le mot de passe avec le sel généré
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insérer l'utilisateur avec le mot de passe crypté dans la base de données
      const utilisateur = await prisma.utilisateur.create({
          data: {
              nom,
              prenom,
              email,
              password: hashedPassword, // Stocker le mot de passe haché
              roles,
              telephone
          }
      });

      res.json(utilisateur);
  } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
});

// router.post('/', async (req, res) => {
//   const newUser = req.body;
//   const utilisateur = await prisma.utilisateur.create({
//     data: newUser,
//   });
//   res.status(201).json(utilisateur);
// });

router.put('/:id', async (req, res) => {
  try{
  const updatedUser = req.body;
  const utilisateur = await prisma.utilisateur.update({
    where: { id: parseInt(req.params.id) },
    data: updatedUser,
  });
  res.json(utilisateur);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.utilisateur.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
