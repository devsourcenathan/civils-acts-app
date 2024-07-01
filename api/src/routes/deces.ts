
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const decess = await prisma.deces.findMany();
  res.json(decess);
});

router.get('/:id', async (req, res) => {
  const deces = await prisma.deces.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deces);
});

router.post('/', async (req, res) => {
  const newdeces = req.body;
  const deces = await prisma.deces.create({
    data: newdeces,
  });
  res.status(201).json(deces);
});

router.put('/:id', async (req, res) => {
  const updateddeces = req.body;
  const deces = await prisma.deces.update({
    where: { id: parseInt(req.params.id) },
    data: updateddeces,
  });
  res.json(deces);
});

router.delete('/:id', async (req, res) => {
  await prisma.deces.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
