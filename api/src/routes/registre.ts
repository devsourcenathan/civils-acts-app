import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const registres = await prisma.registre.findMany();
  res.json(registres);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const registre = await prisma.registre.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(registre);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
  const newRegistre = req.body;
  const registre = await prisma.registre.create({
    data: newRegistre,
  });
  res.status(201).json(registre);

} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updatedRegistre = req.body;
  const registre = await prisma.registre.update({
    where: { id: parseInt(req.params.id) },
    data: updatedRegistre,
  });
  res.json(registre);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.registre.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
