
import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const naissances = await prisma.naissance.findMany();
  res.json(naissances);
});

router.get('/:id', async (req, res) => {
  const naissance = await prisma.naissance.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(naissance);
});

router.post('/', async (req, res) => {
  const newnaissance = req.body;
  const naissance = await prisma.naissance.create({
    data: newnaissance,
  });
  res.status(201).json(naissance);
});

router.put('/:id', async (req, res) => {
  const updatednaissance = req.body;
  const naissance = await prisma.naissance.update({
    where: { id: parseInt(req.params.id) },
    data: updatednaissance,
  });
  res.json(naissance);
});

router.delete('/:id', async (req, res) => {
  await prisma.naissance.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
