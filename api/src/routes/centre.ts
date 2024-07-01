import express from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const centres = await prisma.centre.findMany();
  res.json(centres);
});

router.get('/:id', async (req, res) => {
  const centre = await prisma.centre.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(centre);
});

router.post('/', async (req, res) => {
  const newcentre = req.body;
  const centre = await prisma.centre.create({
    data: newcentre,
  });
  res.status(201).json(centre);
});

router.put('/:id', async (req, res) => {
  const updatedcentre = req.body;
  const centre = await prisma.centre.update({
    where: { id: parseInt(req.params.id) },
    data: updatedcentre,
  });
  res.json(centre);
});

router.delete('/:id', async (req, res) => {
  await prisma.centre.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).send();
});

export default router;
