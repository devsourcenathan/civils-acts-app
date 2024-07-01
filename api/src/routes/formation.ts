import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const formations = await prisma.formation.findMany();
  res.json(formations);
});

router.get('/:id', async (req, res) => {
  const formation = await prisma.formation.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(formation);
});

router.post('/', async (req, res) => {
  const newformation = req.body;
  const formation = await prisma.formation.create({
    data: newformation,
  });
  res.status(201).json(formation);
});

router.put('/:id', async (req, res) => {
  const updatedformation = req.body;
  const formation = await prisma.formation.update({
    where: { id: parseInt(req.params.id) },
    data: updatedformation,
  });
  res.json(formation);
});

router.delete('/:id', async (req, res) => {
  await prisma.formation.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
