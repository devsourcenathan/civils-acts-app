
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const actes = await prisma.acte.findMany();
  res.json(actes);
});

router.get('/:id', async (req, res) => {
  const acte = await prisma.acte.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(acte);
});

router.post('/', async (req, res) => {
  const newacte = req.body;
  const acte = await prisma.acte.create({
    data: newacte,
  });
  res.status(201).json(acte);
});

router.put('/:id', async (req, res) => {
  const updatedacte = req.body;
  const acte = await prisma.acte.update({
    where: { id: parseInt(req.params.id) },
    data: updatedacte,
  });
  res.json(acte);
});

router.delete('/:id', async (req, res) => {
  await prisma.acte.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
