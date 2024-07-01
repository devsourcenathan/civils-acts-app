import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const registres = await prisma.registre.findMany();
  res.json(registres);
});

router.get('/:id', async (req, res) => {
  const registre = await prisma.registre.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(registre);
});

router.post('/', async (req, res) => {
  const newRegistre = req.body;
  const registre = await prisma.registre.create({
    data: newRegistre,
  });
  res.status(201).json(registre);
});

router.put('/:id', async (req, res) => {
  const updatedRegistre = req.body;
  const registre = await prisma.registre.update({
    where: { id: parseInt(req.params.id) },
    data: updatedRegistre,
  });
  res.json(registre);
});

router.delete('/:id', async (req, res) => {
  await prisma.registre.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
