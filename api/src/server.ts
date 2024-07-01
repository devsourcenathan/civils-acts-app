import express from 'express';

const cors = require('cors');

import utilisateurRoutes from './routes/utilisateur';
import registreRoutes from './routes/registre';
import formationRoutes from './routes/formation';
import centreRoutes from './routes/centre';
import acteRoutes from './routes/acte';
import mariageRoutes from './routes/mariage';
import naissanceRoutes from './routes/naissance';
import decesRoutes from './routes/deces';
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());


app.use('/utilisateurs', utilisateurRoutes);
app.use('/auth', authRoutes);
app.use('/registres', registreRoutes);
app.use('/formations', formationRoutes);
app.use('/centres', centreRoutes);
app.use('/actes', acteRoutes);
app.use('/mariages', mariageRoutes);
app.use('/naissances', naissanceRoutes);
app.use('/deces', decesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
