import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{

  const centres = await prisma.centre.findMany();
  res.json(centres);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const centre = await prisma.centre.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(centre);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
  const {idutilisateurs, ...newcentre} = req.body;
  const centre = await prisma.centre.create({
    data: newcentre,
  });
  res.status(201).json(centre);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updatedcentre = req.body;
  const centre = await prisma.centre.update({
    where: { id: parseInt(req.params.id) },
    data: updatedcentre,
  });
  res.json(centre);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.centre.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
