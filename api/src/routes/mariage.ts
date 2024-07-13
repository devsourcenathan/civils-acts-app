
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const mariages = await prisma.mariage.findMany();
  res.json(mariages);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.get('/:id', async (req, res) => {
  try{
  const mariage = await prisma.mariage.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(mariage);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.post('/', async (req, res) => {
  try{
    const { idcentre, idutilisateurs, ...newmariage } = req.body;
  const mariage = await prisma.mariage.create({
    data: {
      ...newmariage, 
      datenaissanceepoux: new Date(newmariage.datenaissanceepoux),
      datenaissanceepouse: new Date(newmariage.datenaissanceepouse),
      centre: {connect: {id: idcentre}},
      utilisateur: {connect: {id: idutilisateurs}}
    },
  });
  res.status(201).json(mariage);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.put('/:id', async (req, res) => {
  try{
  const updatedmariage = req.body;
  const mariage = await prisma.mariage.update({
    where: { id: parseInt(req.params.id) },
    data: updatedmariage,
  });
  res.json(mariage);
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

router.delete('/:id', async (req, res) => {
  try{
  await prisma.mariage.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.' });
}
});

export default router;
