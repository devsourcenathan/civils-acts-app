import express from 'express';
import Web3 from 'web3';
import Acte from '../../build/contracts/Acte.json';
import prisma from '../db';

const router = express.Router();
// const web3 = new Web3('http://127.0.0.1:7545');

(async () => {
  // const networkId: "5777" = (await web3.eth.net.getId()).toString() as "5777";
  // const deployedNetwork = Acte.networks[networkId];

  // const contract = new web3.eth.Contract(Acte.abi, deployedNetwork.address);

  router.get('/', async (req, res) => {
    try {
      const actes = await prisma.acte.findMany();
      res.json(actes);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des actes.', data: error });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const acte = await prisma.acte.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!acte) {
        return res.status(404).json({ error: 'Acte non trouvé.' });
      }
      res.json(acte);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'acte.', data: error });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { numacte, cnipere, cnimere, cnitemoin1, cnitemoin2, dateetablissementacte, idregistre, idformation } = req.body;
       let typeValue: number;
      switch (req.body.type) {
        case "Mariage":
          typeValue = 0;  
          break;
        case "Naissance":
          typeValue = 1;
          break;
        case "Deces":
          typeValue = 2;
          break;
        default:
          throw new Error("Type invalide");
      }
  
      // const accounts = await web3.eth.getAccounts();
      // await contract.methods.createActe(numacte,cnipere,cnimere,cnitemoin1,cnitemoin2, dateetablissementacte,idregistre,
      //   idformation,
      //   typeValue
      // ).send({ from: accounts[0] });
  
      const acte = await prisma.acte.create({
        data: {...req.body, dateetablissementacte: new Date(req.body.dateetablissementacte)},
      });
      res.status(201).json(acte);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'acte.', data: error });
    }
  });
  

  router.put('/:id', async (req, res) => {
    try {
      const { status } = req.body;
      // const accounts = await web3.eth.getAccounts();
      // await contract.methods.updateStatus(parseInt(req.params.id), status)
      //   .send({ from: accounts[0] });

      const acte = await prisma.acte.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.json(acte);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'acte.', data: error });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await prisma.acte.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'acte.', data: error });
    }
  });

  // Export router for use in your Express application
})();

export default router;
