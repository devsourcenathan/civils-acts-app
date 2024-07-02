
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const decess = await prisma.deces.findMany();
  res.json(decess);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const deces = await prisma.deces.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deces);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
  const newdeces = req.body;
  const deces = await prisma.deces.create({
    data: newdeces,
  });
  res.status(201).json(deces);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updateddeces = req.body;
  const deces = await prisma.deces.update({
    where: { id: parseInt(req.params.id) },
    data: updateddeces,
  });
  res.json(deces);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.deces.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
