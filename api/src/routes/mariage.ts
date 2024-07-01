
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const mariages = await prisma.mariage.findMany();
  res.json(mariages);
});

router.get('/:id', async (req, res) => {
  const mariage = await prisma.mariage.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(mariage);
});

router.post('/', async (req, res) => {
  const newmariage = req.body;
  const mariage = await prisma.mariage.create({
    data: newmariage,
  });
  res.status(201).json(mariage);
});

router.put('/:id', async (req, res) => {
  const updatedmariage = req.body;
  const mariage = await prisma.mariage.update({
    where: { id: parseInt(req.params.id) },
    data: updatedmariage,
  });
  res.json(mariage);
});

router.delete('/:id', async (req, res) => {
  await prisma.mariage.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
