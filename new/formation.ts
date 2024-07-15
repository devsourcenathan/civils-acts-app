import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const formations = await prisma.formation.findMany();
  res.json(formations);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const formation = await prisma.formation.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(formation);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
  const {idutilisateurs, ...newformation} = req.body;
  const formation = await prisma.formation.create({
    data: newformation,
  });
  res.status(201).json(formation);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updatedformation = req.body;
  const formation = await prisma.formation.update({
    where: { id: parseInt(req.params.id) },
    data: updatedformation,
  });
  res.json(formation);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.formation.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
