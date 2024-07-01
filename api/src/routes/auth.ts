import express from 'express';
const bcrypt = require("bcrypt")

import prisma from '../db';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email
        const utilisateur = await prisma.utilisateur.findUnique({
            where: {
                email
            }
        });

        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier si le mot de passe correspond
        const isMatch = await bcrypt.compare(password, utilisateur.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Envoyer une réponse réussie si l'authentification est réussie
        res.json({ message: 'Connexion réussie', data: utilisateur });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de la connexion de l\'utilisateur');
    }
});

export default router;
