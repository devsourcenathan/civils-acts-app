
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const naissances = await prisma.naissance.findMany();
  res.json(naissances);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const naissance = await prisma.naissance.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(naissance);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
  const newnaissance = req.body;
  const naissance = await prisma.naissance.create({
    data: newnaissance,
  });
  res.status(201).json(naissance);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updatednaissance = req.body;
  const naissance = await prisma.naissance.update({
    where: { id: parseInt(req.params.id) },
    data: updatednaissance,
  });
  res.json(naissance);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.naissance.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
